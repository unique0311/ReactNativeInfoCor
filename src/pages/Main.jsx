import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
  BackHandler,
  Share,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Constants from '../utils/Constants';
import Icon from 'react-native-vector-icons/AntDesign';

import VersionNumber from 'react-native-version-number';
import {FlatList} from 'react-native-gesture-handler';
import DeviceBrightness from '@adrianso/react-native-device-brightness';

import {DotsIcon} from '../components/HeaderBar';
import SettingsModal from '../modals/SettingsModal';
import API_Manager from '../utils/API_Manager';
import MainSegBar from '../components/MainSegBar';
import SharedUtility from '../utils/SharedUtility';
import AAVC from './AAVC';
import {AccountModel, PlateRunResModel} from '../utils/models';
import Utils from '../utils/Utils';

const IconEdit = <Icon name="edit" size={24} color="white" />;
const IconCopy = <Icon name="copy1" size={24} color="white" />;
const IconSetting = <Icon name="setting" size={24} color="white" />;

export function MainTopHeader({
  onTapLogo,
  onTapEdit,
  onTapCopy,
  onTapSettings,
  onTapMoreMenu,
  onTapLogOff,
}) {
  const [isShowMenu, setIsShowMenu, isShowSetting] = useState(false);

  const onTapMenuItem = index => {
    if (index == 0) {
      onTapLogo();
    } else if (index == 1) {
      onTapLogOff();
    }
    setIsShowMenu(false);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingLeft: 10,
        height: 50,
        backgroundColor: Constants.black,
      }}>
      <TouchableOpacity
        style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
        onPress={() => {
          onTapLogo();
        }}>
        <Image
          source={require('../../assets/images/startlogo.png')}
          style={{width: 40, height: 40, resizeMode: 'contain'}}
        />
        <View>
          <Text style={{color: 'white', fontSize: 18, marginLeft: 10}}>
            InfoCopMobile
          </Text>
          <Text style={{color: 'white', fontSize: 12, marginLeft: 14}}>
            {VersionNumber.appVersion} - {VersionNumber.buildVersion}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => {
            onTapSettings();
          }}
          style={{paddingHorizontal: 10, paddingVertical: 10}}>
          {IconSetting}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTapEdit();
          }}
          style={{paddingHorizontal: 10, paddingVertical: 10}}>
          {IconEdit}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTapCopy();
          }}
          style={{paddingHorizontal: 10, paddingVertical: 10}}>
          {IconCopy}
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingHorizontal: 10, paddingVertical: 10}}
          onPress={() => {
            // onTapMoreMenu();
            setIsShowMenu(true);
          }}>
          <DotsIcon color={'white'} size={24} />
        </TouchableOpacity>
      </View>

      <Modal animationType={'fade'} transparent={true} visible={isShowMenu}>
        <View
          style={{
            flex: 1,
            width: Constants.WINDOW_WIDTH,
            height: Constants.WINDOW_HEIGHT,
            backgroundColor: 'rgba(13,13,13,0.4)',
          }}>
          <TouchableOpacity
            style={{
              width: Constants.WINDOW_WIDTH,
              height: Constants.WINDOW_HEIGHT,
            }}
            onPress={() => {
              setIsShowMenu(false);
            }}></TouchableOpacity>

          <View
            style={{
              borderRadius: 10,
              position: 'absolute',
              right: 10,
              top: 40,
              backgroundColor: 'white',
              width: 150,
            }}>
            <TouchableOpacity
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 15,
              }}
              onPress={() => {
                onTapMenuItem(0);
              }}>
              <Text>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 15,
              }}
              onPress={() => {
                onTapMenuItem(1);
              }}>
              <Text>LogOff</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.apiManager = new API_Manager();
    this.state = {
      isShowSetting: false,

      curSelMainBtnIndex: -1,
      selTabIndex: 0,
      isShowMainBtnGroup: true,

      isShowPlateView: false,
      plateResObj: null,

      isHistoryView: false,

      selMainBtnIndex: 0,

      appBrightness: 0.5,

      isShowAAVC: false,
      aavcAccountModel: null,

      initDataAAVC: null,
      historyData: [],

      isLicenceData: false,
      licenceImage: '',
      licenceValue: '',
      licenceState: '',

      showResponseView: false,
      plateNumber: null,
    };
  }

  componentDidMount() {
    this._backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (this.state.isShowMainBtnGroup == true) {
          // BackHandler.exitApp();
          // this.props.navigation.goBack()
          return true;
        } else {
          if (this.state.showResponseView) {
            this.setState({showResponseView: false});
          } else {
            this.setState({
              isShowPlateView: false,
              isShowMainBtnGroup: true,
              selMainBtnIndex: 0,
              selTabIndex: 0,
              isShowSetting: false,
              showResponseView: false,
            });
          }
          return true;
        }
      },
    );
  }

  componentWillUnmount() {
    this._backHandler.remove();
  }

  logOff = async () => {
    showPageLoader(true);
    let res = await this.apiManager.CheckLogOff();

    showPageLoader(false);
    this.props.navigation.goBack();
  };

  onTapMainBtnGroup = async (index, title) => {
    this.setState({
      curSelMainBtnIndex: index,
    });
    console.log('se:' + index);
    if (index == 0) {
      this.actionPlate();
    } else if (index == 1) {
      this.actionScanALPR();
    } else if (index == 2) {
      this.actionName();
    } else if (index == 3) {
      this.actionVIN();
    } else if (index == 4) {
      this.actionDL(true);
    } else if (index == 5) {
      this.openDLScanPage();
    } else if (index == 6) {
      this.actionHistory();
    } else if (index == 7) {
      this.actionStatus();
    } else if (index == 8) {
      this.actionHazmat();
    } else if (index == 9) {
      let dict = JSON.parse(await SharedUtility.getString('dict'));

      this.setState({
        selMainBtnIndex: 10,
        isShowPlateView: false,
        isShowMainBtnGroup: false,
        initDataAAVC: dict,
      });
    } else if (index == 10) {
      DeviceBrightness.setBrightnessLevel(
        this.state.appBrightness > 0.6 ? 0.2 : 1,
      );
      this.setState({
        appBrightness: this.state.appBrightness > 0.6 ? 0.1 : 1,
      });
    } else if (index == 11) {
      let _am = JSON.parse(await SharedUtility.getString('am'));
      let am = new AccountModel();
      am.Pin = _am.pin;
      am.Password = _am.pwd;
      am.UserID = _am.userId;

      let dict = JSON.parse(await SharedUtility.getString('dict'));
      this.setState(
        {
          aavcAccountModel: am,
          initDataAAVC: dict,
        },
        () => {
          this.setState({
            isShowAAVC: true,
          });
        },
      );
    }
  };

  actionPlate = () => {
    this.setState({
      selMainBtnIndex: 0,
      isShowPlateView: true,
      isShowMainBtnGroup: false,
    });
  };

  actionScanALPR = () => {
    this.props.navigation.navigate('plate-scan', {
      onGoBack: plateNumber => {
        if (plateNumber) {
          global.plateNumber = plateNumber;
          this.setState({
            selMainBtnIndex: 0,
            isShowPlateView: true,
            isShowMainBtnGroup: false,
          });
        }
      },
    });
  };

  openDLScanPage = () => {
    this.props.navigation.navigate('dl-scan', {
      onGoBack: scanData => {
        let resultWithoutSpace = scanData.split('\n').join('');
        var idValue = 'NA';
        var stateValue = 'NA';

        let _tempArray = resultWithoutSpace.split('DAQ');
        let _tempArray2 = resultWithoutSpace.split('DAJ');
        if (_tempArray.length > 1) {
          if (_tempArray[1].length > 15) {
            idValue = _tempArray[1].replace('\n', '').substring(0, 15);
          }
        }
        if (_tempArray2.length > 1) {
          if (_tempArray2[1].length > 2) {
            stateValue = _tempArray2[1].substring(0, 2);
          }
        }

        this.setState(
          {
            licenceImage: '',
            licenceValue: idValue,
            licenceState: stateValue,
            isLicenceData: true,
            isShowPlateView: true,
            isShowMainBtnGroup: false,
          },
          () => {
            this.actionDL(false);
          },
        );
      },
    });
  };

  closeLicenceView = () => {
    this.setState({
      isLicenceData: false,
      licenceImage: '',
      licenceValue: '',
    });
  };

  actionName = () => {
    this.setState({
      selMainBtnIndex: 2,
      isShowPlateView: true,
      isShowMainBtnGroup: false,
    });
  };

  actionVIN = () => {
    this.setState({
      selMainBtnIndex: 3,
      isShowPlateView: true,
      isShowMainBtnGroup: false,
    });
  };

  actionDL = isClear => {
    if (isClear) {
      this.setState(
        {
          licenceState: '',
          licenceValue: '',
        },
        () => {
          this.setState({
            selMainBtnIndex: 4,
            isShowPlateView: true,
            isShowMainBtnGroup: false,
          });
        },
      );
    } else {
      this.setState({
        selMainBtnIndex: 4,
        isShowPlateView: true,
        isShowMainBtnGroup: false,
      });
    }
  };

  actionStatus = () => {
    this.setState({
      selMainBtnIndex: 8,
      isShowPlateView: false,
      isShowMainBtnGroup: false,
    });
  };

  actionHazmat = () => {
    this.setState({
      selMainBtnIndex: 9,
      isShowPlateView: false,
      isShowMainBtnGroup: false,
    });
  };

  actionHistory = () => {
    this.setState({
      selMainBtnIndex: 6,
      isShowPlateView: false,
      isShowMainBtnGroup: false,
      isHistoryView: true,
    });
  };

  getHistory = () => {
    showPageLoader(true);
    this.apiManager.GetHistory(response => {
      showPageLoader(false);
      if (response.ICHist != null && response.ICHist.length > 0) {
        this.setState({
          historyData: response.ICHist,
        });
      }
      // alert(JSON.stringify(response));
    });
  };

  historyView = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          height: 70,
        }}
        onPress={async () => {
          showPageLoader(true);
          let result = await this.getRunResult(item.RIN);
          showPageLoader(false);

          if (result && result !== -1) {
            this.setState(
              {
                plateResObj: result,
                selTabIndex: 1,
              },
              () => {
                this.refs.scrollRef.scrollTo({
                  x: 1 * Constants.WINDOW_WIDTH,
                  y: 0,
                  animated: true,
                });
              },
            );
          }
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '600',
            height: 32,
            marginTop: 7,
          }}>
          {item.VPL}
        </Text>
        <View
          style={{
            height: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'white',
            }}>
            {item.NAM}
          </Text>
          <Text
            style={{
              color: 'white',
            }}>
            {item.RDT}
          </Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: 'white',
            width: '100%',
          }}
        />
      </TouchableOpacity>
    );
  };

  CreateRequest = Request => {
    console.log('Creating Requests');

    let RequestURL = '';
    if (!!SharedUtility.sharedSettingModel.serverAddress) {
      RequestURL =
        'https://' +
        SharedUtility.sharedSettingModel.serverAddress +
        '/api/prod/icrequest?' +
        Request;
    } else {
      RequestURL =
        'https://' +
        SharedUtility.sharedSettingModel.Def_Server_Address +
        '/api/prod/icrequest?' +
        Request;
    }

    console.log('before encoding : ' + RequestURL);

    let enCoded = RequestURL.replace(' ', '%20');

    console.log('after encoding : ' + enCoded);

    return enCoded;
  };

  BuildRspLn = (Id, Val, lf) => {
    let txt = '';
    let str = Val?.trim();
    if (str && str.length > 0) {
      if (lf) txt = Id + ' ' + str + '\r\n';
      else txt = Id + ' ' + str + ' ';
    }
    return txt;
  };

  COUNTCALL = 21;

  getRunResult = async RIN => {
    try {
      this._RIN = RIN;
      console.log('Starting getRunRequest with RIN of ', RIN);

      let RequestURL = this.CreateRequest('RIN=' + RIN + '&DMV=FULLREQUEST');

      let apiKey = (await SharedUtility.GetSharedAPIKey('')).getAPIKey();
      let Rsp = '';
      let DMV = '';
      let Key = '';

      let DMVResp = null; // PlateRunRes_DMVRspModel
      console.log('request url :' + RequestURL);
      console.log('apiKey :' + apiKey);

      let sr = await this.apiManager.MakeRequest(RequestURL, apiKey, null);
      console.log('LINE 117 PlateInputView >>>> MakeRequest : ' + sr);
      let prrModel = new PlateRunResModel(sr);
      let count = 0;
      let DLNumber = '';

      let returnObject = {
        imgPhoto: null,
        tvKey: null,
        tvResp: null,
        webViewPercentMatch: null,
        webViewRes: null,
      };

      while ((!Rsp || Rsp.length < 1) && count < this.COUNTCALL) {
        sr = await this.apiManager.MakeRequest(RequestURL, apiKey, null);
        console.log('MakeRequest Response -> : ', JSON.stringify(sr, null, 4));

        if (!sr) {
          console.log('SR is null will continue to next while loop: >>');
          continue;
        }
        console.log('LINE 154: Each step response in while loop : ', sr);
        prrModel = new PlateRunResModel(sr);

        Key = prrModel.Keywords;
        Key += '\r\n\r\n\r\n';
        Key += prrModel.NCICKeywords;
        console.log('Key valud :>>>>> LINE 162: ', Key);
        if (Key && Key.length > 0) {
          if (Key.indexOf('ALERT') > 0)
            Key = '<font color=#FFFF00>' + Key + '</font>';
          else if (Key.indexOf('HIT') > 0)
            Key = '<font color=#FF0000>' + Key + '</font>';
          Key = Key.replace('\r\n', '<br>');
        }
        console.log('Key value updated :>>>>> LINE 162: ', Key);
        if (prrModel.RspModel != null) {
          Rsp = prrModel.RspModel.TxtMsgRsp + prrModel.RspModel.NCICRsp;

          this.NTS = prrModel.RspModel.Notes;
          this.CSN = prrModel.RspModel.CaseNo;

          DMVResp = prrModel.RspModel.dmvRsp;
        }

        DMV = this.BuildRspLn('NAM:', DMVResp?.Name, true);
        DMV += this.BuildRspLn('DOB:', DMVResp?.DOB, false);
        DMV += this.BuildRspLn('AGE:', DMVResp?.Age, true);
        DMV += this.BuildRspLn('SSN:', DMVResp?.SSN, true);

        let dl = this.BuildRspLn('OLN:', DMVResp?.DLNumber, false);

        DLNumber = DMVResp?.DLNumber;

        DMV += dl;

        DMV += this.BuildRspLn('PTS:', DMVResp?.Points, true);
        DMV += this.BuildRspLn('EXP:', DMVResp?.DLExp, true);
        DMV += this.BuildRspLn(
          'LIC:',
          DMVResp?.PlateState + ' ' + DMVResp?.PlateNumber,
          true,
        );
        DMV += this.BuildRspLn('VIN:', DMVResp?.VIN, true);
        DMV += this.BuildRspLn(
          'VEH:',
          DMVResp?.VehYear +
            ' ' +
            DMVResp?.VehMake +
            ' ' +
            DMVResp?.VehModel +
            ' ' +
            DMVResp?.VehColor,
          true,
        );
        DMV += this.BuildRspLn('LIY:', DMVResp?.VehYear, true);

        count++;
        console.log(
          'End of While in one Loop Check result >>> Key:' +
            Key +
            '   DMV : ' +
            DMV +
            '   RSP : ' +
            Rsp,
        );
        console.log('Rsp.Length >> : ', Rsp.Length);
        console.log(
          'this.COUNTCALL >> count >> : Rsp.Length > ',
          Rsp.Length,
          count,
          this.COUNTCALL,
        );

        if ((Rsp && Rsp.Length >= 1) || count >= this.COUNTCALL) {
          console.log('Will Break Here :>>>>> LINE 217: Rsp> ', Rsp);
          console.log('Current Count Value: >> ', count);
          break;
        }

        console.log('before sleep: ', new Date());
        await Utils.sleep(2000);
        console.log('after sleep: ', new Date());
      }

      let TSRsp = Rsp;
      let TSDMV = DMV;
      let TSKey = Key;

      this.GlblDMVResp = DMVResp;

      console.log('LINE 198:  DMVResp >> ', JSON.stringify(DMVResp, null, 4));

      console.log(
        'TSDMV : ' + TSDMV + ' TSKey : ' + TSKey + ' TSRsp : ' + TSRsp,
      );
      let baseUrl = 'https://' + SharedUtility.sharedSettingModel.serverAddress;

      returnObject.tvResp = DMV;

      returnObject.tvKey = TSKey;
      returnObject.webViewRes = {
        html: TSRsp.toString(),
        baseUrl: baseUrl.toString(),
      };

      if (prrModel.RspModel != null) {
        if (prrModel.RspModel.PercentMatch != null) {
          returnObject.webViewPercentMatch = {
            html: prrModel.RspModel.PercentMatch.toString(),
            baseUrl: baseUrl.toString(),
          };
        } else {
        }
      }

      console.log('Retrieving Photo for RIN ' + RIN);

      RequestURL = this.CreateRequest('PHRIN=' + RIN);

      let tmpRes = await this.apiManager.MakeRequest(RequestURL, apiKey, null); // ServiceResponse

      console.log('tempRes:', typeof tmpRes, tmpRes?.ReqPhotos);

      let photo = tmpRes?.ReqPhotos?.Photo;
      console.log('photo: ', photo);

      let photoList = photo;

      let temp = photoList[0];

      if (temp?.toLowerCase() != 'no photo') {
        if (temp == null) {
          returnObject.imgPhoto = require('../../assets/images/defaultimg.png');
        } else {
          returnObject.imgPhoto = {uri: `data:image/png;base64,${temp}`};
        }
      } else {
        returnObject.imgPhoto = require('../../assets/images/defaultimg.png');
      }
      return returnObject;
    } catch (e) {
      console.log('LINE 344 > PlateInputView >>  Exception : ', e);
      Alert.alert(
        'InfoCop',
        'Failed to request, try again after a moment.' + e.message,
      );
      return null;
    }
  };

  render() {
    return (
      <>
        <Text>Main Page</Text>
      </>
    );
  }
}

export default function (props) {
  let navigation = useNavigation();
  let route = useRoute();

  return <Main {...props} navigation={navigation} route={route} />;
}
