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
