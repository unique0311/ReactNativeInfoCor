import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import HeaderBar, {DotsIcon} from '../components/HeaderBar';
import Constants from '../utils/Constants';

import Icon from 'react-native-vector-icons/AntDesign';
import NetInfo from '@react-native-community/netinfo';
import VersionNumber from 'react-native-version-number';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import {
  AccountModel,
  SettingModel,
  LoginResponse,
  QRCodeDataModel,
} from '../utils/models';
import SettingsModal from '../modals/SettingsModal';
import SharedUtility from '../utils/SharedUtility';
import GlobalUtil from '../utils/GlobalUtil';
import AAVC from './AAVC';
import API_Manager from '../utils/API_Manager';
import ForgotPassword from './ForgotPassword';
import PasswordVC from './PasswordVC';

const IconClose = <Icon name="close" size={24} color="white" />;
const IconCheck = <Icon name="check" size={24} color="white" />;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.backButtonPressedInMain = false;
    this.apiManager = new API_Manager();
    this.state = {
      userId: '',
      pwd: '',
      pin: '',
      imgMarkImage: null,
      showDisclaimerModal: true,
      isCheckedTouchID: false,
      isShowSetting: false,
      settingData: null,
      btnLogTitle: 'LOG ON',
      isShowPwdPINFields: false,
      isShowUserIDFields: true,

      isShowCheckBoxTouchID: false,
      isShowSwitchUserBtn: false,

      isShowErrText: false,
      errText: '',

      isShowAAVC: false,
      aavcAccountModel: null,

      initDataAAVC: null,
      isShowPwdVC: false,

      pVCInitData: {},

      isShowFPwdVC: false,
    };

    this.isLoginStatue = false;

    this.uidCheckResponse = null; // UserIdCheckResponse
    this.isCanceledFromAA = false;

    this.UnStr = null;
    this.PwStr = null;
    this.PinStr = null;

    this.LogIn = false;
    this.GetUserInfo = false;
    this.isBoxVis = false;

    this.isConnected = false;
    this._debug = false;

    this.url = '';
    this.svrver = 1;
    this.lclver = 1;
    this.DelSession = 'N';

    this.mImageStr = [
      'badge',
      'bullet',
      'cannon',
      'dog',
      'flashlight',
      'handcuffs',
      'key',
      'mace',
      'nightstick',
      'pistol',
      'radar',
      'ram',
      'rifle',
      'shotgun',
      'taser',
    ];

    this.mImageList = [
      require('../../assets/images/badge.png'),
      require('../../assets/images/bullet.png'),
      require('../../assets/images/cannon.png'),
      require('../../assets/images/dog.png'),
      require('../../assets/images/flashlight.png'),
      require('../../assets/images/handcuffs.png'),
      require('../../assets/images/key.png'),
      require('../../assets/images/mace.png'),
      require('../../assets/images/nightstick.png'),
      require('../../assets/images/pistol.png'),
      require('../../assets/images/radar.png'),
      require('../../assets/images/ram.png'),
      require('../../assets/images/rifle.png'),
      require('../../assets/images/shotgun.png'),
      require('../../assets/images/taser.png'),
    ];

    this.ANS = null;
    this.PIC = null;
    this.PIN = null;
    this.QUE = null;
    this.RSK = null;
    this.STP = null;
    this.UID = null;
    this.MSG = null;
  }

  Noti_GotoMain() {
    this.gotoMainVC(this.state.userId);
  }

  Noti_Log_Off() {
    this.setState({
      pin: '',
      pwd: '',
      userId: '',
    });
  }

  gotoMainVC(curUserID) {
    if (!curUserID) {
      Alert.alert('Please input your user id. _ gotomain');
    }

    this.setState({isShowPwdPINFields: false});

    AccountModel.CusUserID = curUserID;
    this.props.navigation.navigate('main');

    this.setState({
      userId: '',
      pwd: '',
      pin: '',
    });
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      // do something
      if (global.settingScanned != null) {
        let obj = JSON.parse(global.settingScanned);
        let qrModel = new QRCodeDataModel(obj);
        let sm = new SettingModel();
        sm.qrData = qrModel;
        sm.serverAddress = qrModel.SVR;
        sm.deviceID = qrModel.DIN;
        sm.devicename = qrModel.DCN;
        sm.license = qrModel.MID;
        sm.sendETicket = false;

        SharedUtility.sharedSettingModel = sm;

        await SharedUtility.saveString(
          'imported_setting',
          global.settingScanned,
        );

        this.setState(
          {isShowSetting: true, settingData: global.settingScanned},
          () => {
            global.settingScanned = null;
          },
        );
      }

      this.initCheck();

      this.initCheckView();
    });

    this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
      this.Login = false;
      this.GetUserInfo = true;
      this.isBoxVis = false;
    });

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.backButtonPressedInMain == true) {
        BackHandler.exitApp();
        return true;
      } else {
        this.backButtonPressedInMain = true;
        if (Platform.OS != 'ios') {
          console.log('will show toast');
        }
        return true;
      }
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
    this._unsubscribe();
    this._unsubscribeBlur();
    try {
      FingerprintScanner.release();
    } catch (ex) {
      console.log(ex);
    }
  }

  CheckConnection() {
    return new Promise((res, rej) => {
      NetInfo.fetch().then(state => {
        if (state.isInternetReachable) {
          res(true);
        } else {
          rej(false);
        }
      });
    });
  }

  async initCheckView() {
    GlobalUtil.IsTouchAvailable()
      .then(biometricType => {
        this.setState({
          isShowCheckBoxTouchID: true,
          isShowSwitchUserBtn: true,
        });
      })
      .catch(err => {
        this.setState({
          isShowCheckBoxTouchID: false,
          isShowSwitchUserBtn: false,
        });
      });

    let touchenabled = await GlobalUtil.getBool('touch_enable');

    // btnSwitch.Hidden = !touchenabled;

    this.setState({
      isCheckedTouchID: touchenabled,
    });
  }

  async initCheck() {
    let apiKey = (await SharedUtility.GetSharedAPIKey()).getAPIKey();
    if (apiKey == null) {
      let lr = new LoginResponse();
      lr.Msg = 'NULL';
      await SharedUtility.SetSharedAPIKey(lr);
    }

    if (SharedUtility.sharedSettingModel == null) {
      SharedUtility.sharedSettingModel = new SettingModel();
      SharedUtility.sharedSettingModel.cleanlogoff = true;
    }
    let lrModel = await SharedUtility.GetSharedAPIKey();
    let api_key = lrModel.Msg;

    if (api_key == null) {
      api_key = 'NULL';
    }

    if (
      (api_key.toUpperCase() == 'NULL' &&
        SharedUtility.sharedSettingModel.cleanlogoff == true) ||
      SharedUtility.sharedSettingModel.cleanlogoff == false
    ) {
      //btnProceed.Enabled = false;
      this.CheckConnection()
        .then(isConnected => {})
        .catch(noConnected => {
          Alert.alert('InfoCop', 'There is no connection.');
        });

      this.LogIn = false;
      this.GetUserInfo = true;
      this.isBoxVis = false;
    } else {
      this.LaunchMain();
    }
  }

  showBoxes(show) {
    let picid = 0;

    for (let i = 0; i < this.mImageStr.length; i++) {
      if (this.PIC.toLowerCase() == this.mImageStr[i]) {
        picid = i;
      }
    }

    let img = this.mImageList[picid];

    this.setState({
      isShowPwdPINFields: show,
      isShowUserIDFields: !show,
      imgMarkImage: img,
    });

    this.isBoxVis = show;

    if (show) {
      this.isLoginStatue = true;
    } else {
      this.isLoginStatue = false;
      this.setState({
        pin: '',
        pwd: '',
      });
    }
  }

  showErrorLbl(err, show) {
    this.setState({
      isShowErrText: show,
      errText: err,
    });
  }

  async LaunchMain() {
    this.STP = '';
    this.QUE = '';
    this.ANS = '';
    this.PIC = '';
    this.PIN = '';
    this.RSK = '';
    this.UID = '';

    if (
      this.state.pin &&
      this.state.pwd &&
      !this.state.userId &&
      !AccountModel.isRegistered(this.state.userId)
    ) {
      let am = new AccountModel();

      am.Pin = this.state.pin;
      am.Password = this.state.pwd;
      am.UserID = this.state.userId;
      await am.saveSettingData();
    }

    console.log('Local Notification Firing for Logged on');

    GlobalUtil.IsTouchAvailable()
      .then(biometricType => {
        if (
          chkBoxTouch.Checked &&
          (!AccountModel.isTouchRegistered() ||
            !AccountModel.isRegistered(this.state.userId))
        ) {
          this.goToToucRegisterPage();
        } else {
          this.gotoMainVC(this.state.userId);
        }
      })
      .catch(error => {
        this.gotoMainVC(this.state.userId);
      });
  }

  goToToucRegisterPage() {
    let am = new AccountModel();
    am.UserID = this.state.userId;
    am.Password = this.state.pwd;
    am.Pin = this.state.pin;

    let myReason = 'Verify fingerprint for ' + am.UserID;

    FingerprintScanner.authenticate({title: 'Log in with Biometrics'})
      .then(async () => {
        console.log('You logged in using FingerPrint!');

        await am.saveSettingData();

        await AccountModel.setTouchRegistered(true);

        this.gotoMainVC(this.state.userId);
      })
      .catch(err => {
        Alert.alert(
          'TouchID',
          'We were unable to verify fingerprints. Please check your Touch ID setting and try again',
          [
            {
              title: 'Ok',
              onPress: () => {
                this.goToToucRegisterPage();
              },
              style: 'default',
            },
            {
              title: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
          ],
        );
        console.log(' Error : ' + error);
      });
  }

  getServerAddr() {
    let server = SharedUtility.sharedSettingModel.serverAddress;
    server = !server ? SharedUtility.Def_Server_Address : server;

    return server;
  }

  async checkUserData(user_id) {
    this.STP = '';
    this.QUE = '';
    this.ANS = '';
    this.PIC = '';
    this.PIN = '';
    this.RSK = '';
    this.UID = '';

    console.log('Begining User Process');
    this.UID = user_id;

    if (!this.UID) {
      Alert.alert('InfoCop', 'Please input the userid.');
    } else {
      showPageLoader(true);

      try {
        let server = this.getServerAddr();

        let RequestURL = 'https://' + server + '/api/prod/login?';
        RequestURL += 'STP=User&';
        RequestURL += 'UID=' + this.UID;

        let obj = await this.apiManager.MakeRequest(RequestURL, 'none', null);
        console.log('-------------------login----');
        console.log(obj);

        this.MSG = obj.Msg;
        console.warn('check userid : ', obj);
        if (obj.AAInfo != null) {
          let userinfo = obj.AAInfo;
          console.log(' line 517 >>  userinfo', userinfo);

          this.STP = userinfo.STP;
          this.QUE = userinfo.QUE;
          this.ANS = userinfo.ANS;
          this.PIC = userinfo.PIC;
          this.PIN = userinfo.PIN;
          this.RSK = userinfo.RSK;
        }

        console.log('Starting User Process : ', JSON.stringify(obj, null, 4));

        if (!this.PIN || this.MSG.toLowerCase() == 'reset')
          this.GetUserInfo = true;
        else {
          this.GetUserInfo = false;
        }

        console.log(
          'Results: From GetResponseCheckUserID :> line 502: ',
          this.MSG,
        );
      } catch (ex) {
        console.log('checkUserData  exception > line : 540 : ', ex);
        showPageLoader(false);
        Alert.alert(
          'InfoCop',
          'Connection Error, please try again after a moment.',
        );
      }
    }

    showPageLoader(false);

    if (this.MSG.toLowerCase() == 'invalid user id') {
      Alert.alert(
        'Login Error',
        'Invalid User ID. Please try again with correct User ID.',
      );
      this.setState({userId: ''});
    } else {
      await this.returnonui();
    }
  }

  EnableLogInBtn() {
    let isReady = this.state.userId.length > 1;
    if (this.state.isShowPwdPINFields) {
      isReady = this.state.pwd.length > 4 && this.state.pin.length == 4;
    }
  }

  async SetHighRisk() {
    try {
      let serverAddr = this.getServerAddr();

      let RequestURL = 'https://' + serverAddr + '/api/prod/login?';

      RequestURL += 'STP=SetHigh&';
      RequestURL += 'UID=' + this.UID;

      let sr = await this.apiManager.MakeRequest(RequestURL, 'none', null);
      console.log('at SetHighRisk ' + sr);

      return sr;
    } catch (ex) {
      console.log('exception SetHighRisk: ', ex);
      Alert.alert('ex', 'Exception raised while SetHighRisk:' + ex.message);
      return null;
    }
  }

  async LogOffDialog() {
    Alert.alert(
      'Force Log Off',
      'Another session with this EmployeeID already is signed on.',
      [
        {
          text: 'Yes',
          onPress: async () => {
            this.DelSession = 'Y';
            await this.getLogIn();
          },
          style: 'default',
        },
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  }

  async returnonui() {
    console.log(' Here is  returnonui line > 427 : ');
    let CallForceLogOff = false;

    if (this.LogIn) {
      SharedUtility.saveString(
        'am',
        JSON.stringify({
          pin: this.state.pin,
          pwd: this.state.pwd,
          userId: this.state.userId,
        }),
      );

      let dict = {
        QUE: this.QUE,
        ANS: this.ANS,
        PIC: this.PIC,
        PIN: this.PIN,
        UID: this.UID,
      };

      SharedUtility.saveString('dict', JSON.stringify(dict));

      // Call main activity

      // if (this.RSK.toUpperCase() == 'Y') {
      //   let am = new AccountModel();

      //   am.Pin = this.state.pin;
      //   am.Password = this.state.pwd;
      //   am.UserID = this.state.userId;

      //   let dict = {
      //     QUE: this.QUE,
      //     ANS: this.ANS,
      //     PIC: this.PIC,
      //     PIN: this.PIN,
      //     UID: this.UID,
      //   };
      //   console.log(
      //     '***************** this.Login is True : but RSK is Y , plese pass answer: ',
      //     JSON.stringify(am, null, 4),
      //     JSON.stringify(dict, null, 4),
      //   );
      //   this.setState(
      //     {
      //       aavcAccountModel: am,
      //       initDataAAVC: dict,
      //     },
      //     () => {
      //       this.setState({
      //         isShowAAVC: true,
      //       });
      //     },
      //   );

      //   console.log('dict : ', dict);
      // } else {
      this.LaunchMain();
      // }
      // clean up screen
      console.log('after present viewcontroller and clear all');
      //clearAll();
      this.showBoxes(false);
      this.showErrorLbl('', false);
    } else if (this.GetUserInfo == false) {
      if (!this.isBoxVis) {
        this.showBoxes(true);
        this.setState({
          btnLogTitle: 'LOG ON',
        });

        this.EnableLogInBtn();
        //
      } else {
        // means they got the wrong password

        if (this.MSG == null) {
          this.MSG = 'Error Signing On, please try again.';
          this.showErrorLbl(this.MSG, true);
        } else {
          let checkMsg =
            'Another session with this Employee ID is already signed on.';

          if (this.MSG.toLowerCase() == checkMsg.toLowerCase())
            CallForceLogOff = true;
          else {
            // set the local one to high risk
            this.RSK = 'Y';

            let res = await this.SetHighRisk();

            console.log('Set HIGHRisk result : ', res);
            this.showErrorLbl(this.MSG, true);
          }
        }
      }
    } else {
      console.log('now Presenting the passwordVC.');

      // AccountModel.CusUserID = this.state.userId;

      // let dict = {
      //   QUE: this.QUE,
      //   ANS: this.ANS,
      //   PIC: this.PIC,
      //   PIN: this.PIN,
      //   UID: this.UID,
      // };

      // this.setState({
      //   pVCInitData: dict,
      //   isShowPwdVC: true,
      // });
      this.setState({
        isShowFPwdVC: true,
      });
    }

    if (CallForceLogOff) {
      this.LogOffDialog();
    }

    console.log('after present viewcontroller and ended all');
  }

  async getLogIn() {
    try {
      showPageLoader(true);
      console.log('Starting LogIn Process');

      console.log('Check PIN');
      if (this.PinStr != this.PIN) {
        this.PwStr = '';
      }

      console.log('Building LogIn Request');

      let RequestURL = null;
      // mock up ip

      let node1 = (Math.random() * 100).toFixed(0);
      let node2 = (Math.random() * 100).toFixed(0);

      let server = SharedUtility.sharedSettingModel.serverAddress;
      server = !server ? SharedUtility.Def_Server_Address : server;

      let DCN = SharedUtility.sharedSettingModel.devicename;
      DCN = !DCN ? 'SERVER699' : DCN.split(' ').join('%20');

      let DIN = SharedUtility.sharedSettingModel.deviceID;
      DIN = !DIN ? '238' : DIN;
      let MID = SharedUtility.sharedSettingModel.license;
      MID = !MID ? '{97849BD1-8250-42E1-B923-F469226817C2}' : MID;

      RequestURL = 'https://' + server + '/api/prod/login?';
      RequestURL += 'DIN=' + DIN + '&';
      RequestURL += 'DCN=' + DCN + '&';
      RequestURL += 'IPA=192.168.' + node1 + '.' + node2 + '&';
      RequestURL += 'MID=' + MID;

      console.log(
        'getLogIn at LINE 753 >>>>>>>>> Making LogIn Request : ' +
          RequestURL +
          '   Param1 : > UnStr : ' +
          this.UnStr +
          '  Param2 : pwd > ' +
          this.PwStr,
      );

      let LogInRsp = await this.apiManager.getAPIKey(
        RequestURL,
        this.UnStr,
        this.PwStr,
        GlobalUtil.GetVersionCode(),
        this.DelSession,
      );

      // let LogInRsp = sr.Response;
      // let LogInRsp = sr;
      console.log(
        'Returned LogInRequest this.apiManager.getAPIKey -LogInRsp > line 764 :: >>>  ',
        JSON.stringify(LogInRsp, null, 4),
      );

      console.log('Checking LogIn Response');
      if (!LogInRsp) {
        this.LogIn = false;
      } else {
        // TODO - Need to change this when the web serv are changed
        let Test = JSON.stringify(LogInRsp).substr(8, 1);

        let lr = new LoginResponse(LogInRsp);

        // console.warn('LINE 739 >> Here Login result MSG : lr.Msg >>> ', lr.Msg )

        if (LogInRsp.Msg.startsWith('{')) {
          await SharedUtility.SetSharedAPIKey(lr);
          let apikey = lr.Msg;
          this.LogIn = true;
        } else {
          try {
            this.MSG = lr.Msg;
            this.LogIn = false;
            await this.SetHighRisk();
          } catch (ex) {
            this.MSG = 'Parsing Error';
            console.log(this.MSG + ' ' + ex.message);
            this.LogIn = false;
          }
        }
      }
    } catch (ex) {
      console.log('BACKGROUND_PROC' + ex.message);
      this.MSG = ex.message;
      this.LogIn = false;
    }

    showPageLoader(false);

    this.returnonui();
  }

  async gotoTouchRegisterPageFromAAVC(accModel) {
    console.log(
      'LINE 824: >>> gotoTouchRegisterPageFromAAVC > ',
      JSON.stringify(accModel, null, 4),
    );
    if (
      this.state.isCheckedTouchID &&
      GlobalUtil.IsTouchAvailable() &&
      (!AccountModel.isTouchRegistered() ||
        !AccountModel.isRegistered(accModel.UserID))
    ) {
      let myReason = 'Verify fingerprint for ' + accModel.UserID;
      console.log('LINE 835 : Login.js : ', myReason);
      FingerprintScanner.authenticate({title: myReason})
        .then(async () => {
          console.log('You logged in!');

          await accModel.saveSettingData();
          await AccountModel.setTouchRegistered(true);

          this.gotoMainVC(accModel.UserID);
        })
        .catch(err => {
          Alert.alert(
            'TouchID',
            'We were unable to verify fingerprints. Please check your Touch ID setting and try again',
            [
              {
                text: 'Ok',
                style: 'default',
                onPress: () => {
                  this.gotoTouchRegisterPageFromAAVC(accModel);
                },
              },
            ],
          );

          console.log(' Error : ' + err);
        });
    } else {
      console.log('LINE 863: Login.js: ');
      this.isCanceledFromAA = false;
      await accModel.saveSettingData();
      console.log('LINE 866: Login.js: after save setting data');
      this.setState({isShowAAVC: false});
      this.gotoMainVC(this.state.userId);
    }
  }

  isonAutoLogin = false;

  async autoLogin() {
    if (this.isonAutoLogin) {
      return;
    }
    this.isonAutoLogin = true;

    if (!this.isLoginStatue) {
      let account = new AccountModel();

      var useridsaved = this.state.userId;
      account.readSettingData(useridsaved);

      let user_id = account.UserID;

      this.UnStr = user_id;

      await this.checkUserData(user_id);

      this.PwStr = account.Password;
      this.PinStr = account.Pin;

      this.setState({
        pin: this.PinStr,
        pwd: this.PwStr,
      });

      await this.getLogIn();
      this.isonAutoLogin = false;
      //gotoMainVC (txtUserId.Text);
    } else {
      Alert.alert('InfoCop', 'Please logon again.', [
        {
          text: 'Ok',
          style: 'default',
          onPress: () => {
            this.isonAutoLogin = false;
          },
        },
      ]);
    }
  }

  loginWithFingerPrint() {
    if (!this.state.userId) {
      Alert.alert(
        'Verify',
        'Please input your user id. _ login with finger print',
      );
      return;
    }

    let myReason = 'Verify fingerprint for ' + this.state.userId;

    FingerprintScanner.authenticate({title: myReason})
      .then(async () => {
        console.log('You logged in using FingerPrint!');

        showPageLoader(true);
        this.autoLogin();
      })
      .catch(err => {
        Alert.alert(
          'Invlid Touch',
          'This is invalid touch, check the setting/Touch ID and try again please.',
        );
        console.log(' Error : ' + err);
      });
  }

  onTapLogon = async () => {
    // this.props.navigation.navigate('main');

    if (!this.state.userId) {
      Alert.alert('Required Field', 'Please input your user id.');
      return;
    }

    console.log('onTapProceed {0} Tapped Button', 12333);

    if (!this.isLoginStatue) {
      if (this.state.isCheckedTouchID) {
        let isRegistered = await AccountModel.isRegistered(this.state.userId);
        let isTouchRegistered = await AccountModel.isTouchRegistered();
        // var touchAvailable = Global.isTouchAvailable ();

        GlobalUtil.IsTouchAvailable()
          .then(biometricType => {
            if (isRegistered && isTouchRegistered) {
              this.loginWithFingerPrint();
            } else {
              this.checkUserData(this.state.userId);
            }
          })
          .catch(err => {
            this.checkUserData(this.state.userId);
          });
      } else {
        this.checkUserData(this.state.userId);
      }
    } else {
      this.UnStr = this.state.userId;
      this.PwStr = this.state.pwd;
      this.PinStr = this.state.pin;

      await this.getLogIn();
    }
  };

  async OnTapCloseAAVC() {
    showPageLoader(true);
    console.log('LINE 978 > OnTapCloseAAVC');
    let res = await this.SetHighRisk();
    console.log('LINE 980 > OnTapCloseAAVC: ', res);
    await this.apiManager.LogOff((arg1, arg2) => {
      console.log('LINE 982 > OnTapCloseAAVC: Logoff:  ', arg1, arg2);
      showPageLoader(false);
      if (arg1) {
        this.isCanceledFromAA = true;
        this.LogIn = false;

        this.setState({
          isShowAAVC: false,
        });
      } else {
        Alert.alert('', arg2);
      }
    });
  }

  render() {
    return (
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : '450'}
          style={{flex: 1}}>
          <HeaderBar
            isShowLeft={false}
            isShowRight={true}
            title={''}
            titleColor={Constants.white}
            rightIcon={<DotsIcon color={Constants.white} size={24} />}
            onRightButton={() => {
              this.setState({isShowSetting: true});
            }}
          />
          <ImageBackground
            source={require('../../assets/images/bluebg.jpg')}
            style={{
              flex: 1,
              width: Constants.WINDOW_WIDTH,
              resizeMode: 'cover',
              alignItems: 'stretch',
              paddingHorizontal: 10,
            }}>
            <ScrollView
              keyboardShouldPersistTaps={'always'}
              contentContainerStyle={{
                paddingBottom: 0,
              }}>
              <Image
                source={require('../../assets/images/iclogo.png')}
                style={{
                  height: 60,
                  width: '100%',
                  resizeMode: 'contain',
                  marginVertical: 20,
                }}
              />

              {this.state.isShowPwdPINFields && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={
                      this.state.imgMarkImage ||
                      require('../../assets/images/badge.png')
                    }
                    style={{
                      height: 80,
                      width: 80,
                      resizeMode: 'cover',
                      marginVertical: 10,
                    }}
                  />
                </View>
              )}

              <View
                style={{
                  margin: 10,
                  backgroundColor: Constants.blackTrans,
                  borderRadius: 8,
                  padding: 20,
                }}>
                {this.state.isShowUserIDFields && (
                  <>
                    <Text style={styles.labelText}>User ID</Text>
                    <TextInput
                      ref={'userId'}
                      style={styles.InputText}
                      keyboardType={'default'}
                      autoCapitalize="characters"
                      value={this.state.userId}
                      onChangeText={text => {
                        this.setState({userId: text});
                      }}
                      placeholder={''}
                      onSubmitEditing={() => {}}
                    />
                  </>
                )}

                {this.state.isShowPwdPINFields && (
                  <>
                    <Text style={styles.labelText}>
                      If your SSA person security image is correct enter your
                      password.
                    </Text>

                    <TextInput
                      ref={'pwd'}
                      style={styles.InputText}
                      keyboardType={'default'}
                      secureTextEntry={true}
                      value={this.state.pwd}
                      onChangeText={text => {
                        this.setState({pwd: text});
                      }}
                      placeholder={''}
                      onSubmitEditing={() => {
                        this.refs.pin.current?.focus();
                      }}
                    />

                    <Text style={styles.labelText}>Enter your PIN</Text>

                    <TextInput
                      ref={'pin'}
                      style={styles.InputText}
                      value={this.state.pin}
                      keyboardType={'number-pad'}
                      secureTextEntry={true}
                      onChangeText={text => {
                        if (text.length <= 6) {
                          this.setState({pin: text});
                        }
                      }}
                      placeholder={''}
                      onSubmitEditing={() => {}}
                    />
                  </>
                )}

                {this.state.isShowErrText && (
                  <Text style={styles.labelErrText}>{this.state.errText}</Text>
                )}

                <TouchableOpacity
                  style={styles.mainButton}
                  onPress={() => {
                    this.onTapLogon();
                  }}>
                  <Text style={styles.btnText}>{this.state.btnLogTitle}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    height: 45,
                    borderRadius: 25,
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    // this.props.navigation.navigate('ForgotPassword');
                    this.setState({
                      isShowFPwdVC: true,
                    });
                  }}>
                  <Text style={styles.btnText}>Forgot Password?</Text>
                </TouchableOpacity>

                {this.state.isShowPwdPINFields && (
                  <>
                    <TouchableOpacity
                      style={{
                        height: 45,
                        borderRadius: 25,
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        // this.props.navigation.navigate('ForgotPassword');
                        this.showBoxes(false);
                        this.setState({
                          isShowUserIDFields: true,
                          isShowPwdPINFields: false,
                          pwd: '',
                          pin: '',
                        });
                      }}>
                      <Text style={styles.btnBackText}>Back</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 50,
                  paddingHorizontal: 20,
                }}>
                <TouchableOpacity
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => {
                    let newChecked = !this.state.isCheckedTouchID;
                    this.setState(
                      {
                        isCheckedTouchID: newChecked,
                        isShowSwitchUserBtn: newChecked,
                      },
                      async () => {
                        await GlobalUtil.saveBool('touch_enable', newChecked);
                      },
                    );
                  }}>
                  <View
                    style={{
                      borderColor: 'white',
                      borderWidth: 1,
                      width: 25,
                      height: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                    }}>
                    {this.state.isCheckedTouchID ? IconCheck : null}
                  </View>
                  <Text style={styles.labelText}>Enable TouchID</Text>
                </TouchableOpacity>

                {false && (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}
                    onPress={() => {
                      this.setState({userId: ''});
                    }}>
                    <Text style={styles.labelText}>Switch User</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
              }}>
              <Text style={{color: 'white', fontSize: 12}}>
                {VersionNumber.appVersion} - {VersionNumber.buildVersion}
              </Text>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </>
    );
  }
}

export default function (props) {
  let navigation = useNavigation();
  let route = useRoute();

  return <Login {...props} navigation={navigation} route={route} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Constants.white,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  imgGradBack: {
    resizeMode: 'cover',
    padding: 20,
    alignItems: 'stretch',
  },
  InputText: {
    height: 40,
    color: 'white',
    backgroundColor: Constants.transparent,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    fontSize: 15,
  },
  labelText: {
    fontSize: 14,
    color: 'white',
    marginVertical: 10,
  },
  labelErrText: {
    fontSize: 14,
    color: 'red',
    marginVertical: 3,
  },

  btnText: {
    fontSize: 16,
    color: 'white',
    marginVertical: 10,
  },
  btnBackText: {
    fontSize: 14,
    color: 'white',
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  subTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mainButton: {
    height: 45,
    borderRadius: 25,
    backgroundColor: Constants.blackTrans,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
