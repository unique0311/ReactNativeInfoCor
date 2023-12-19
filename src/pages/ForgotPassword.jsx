import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Constants from '../utils/Constants';
import HeaderBar from '../components/HeaderBar';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import SharedUtility from '../utils/SharedUtility';
import API_Manager from '../utils/API_Manager';

const IconClose = <Icon name="close" size={24} color="white" />;
const IconCheck = <Icon name="check" size={24} color="white" />;

export default class ForgotPassword extends React.Component {
  api = new API_Manager();
  accountModel = null;

  ANS = null;
  PIC = null;
  PIN = null;
  QUE = null;
  RSK = null;
  STP = null;
  UID = null;

  static mImageStr = [
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

  mImageList = [
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

  constructor(props) {
    super(props);

    this.state = {
      imgMarkImage: null,
      question: '',
      answer: '',
      pin: '',
      password: '',
      cpassword: '',

      userID: '',
      otpType: '', //e,p
      otp: '',

      typeOneData: null,
      typeTwoData: null,
      typeThreeData: null,

      showUserIdSubmit: true,
      showOTPRequest: false,
      showSendNewPwdSubmit: false,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  setData(dict) {
    if (dict == null) {
      return null;
    }
    this.ANS = dict.ANS;
    this.PIC = dict.PIC;
    this.PIN = dict.PIN;
    this.QUE = dict.QUE;
    this.UID = dict.UID;

    let picid = 0;
    for (let i = 0; i < AAVC.mImageStr.length; i++) {
      if (this.PIC.toLowerCase() == AAVC.mImageStr[i].toLowerCase()) {
        picid = i;
      }
    }

    let img = this.mImageList[picid];

    return img;
  }

  async SetLowRisk() {
    showPageLoader(true);

    let server = SharedUtility.sharedSettingModel.serverAddress;
    server = !server ? 'demo.infocopmobile.com' : server;

    let RequestURL = 'https://' + server + '/api/prod/login?';
    RequestURL += 'STP=SetLow&';
    RequestURL += 'UID=' + this.UID;

    let sr = await this.api.MakeRequest(RequestURL, 'none', null);

    let Rsp = sr;
    console.log(Rsp);
    console.log('MID:' + SharedUtility.sharedSettingModel.getMID(''));

    showPageLoader(false);

    return Rsp;
  }

  async ResetPasswordApi() {
    showPageLoader(true);

    let server = SharedUtility.sharedSettingModel.serverAddress;
    server = !server ? 'demo.infocopmobile.com' : server;
    let apikey = (await SharedUtility.GetSharedAPIKey()).getAPIKey('NULL');

    let RequestURL = 'https://' + server + '/api/prod/Login/ResetPassword?';
    // + 'UID=' + this.UID;
    +'&EmpID=' + this.UID;
    +'&DeviceCodeName=' + 'TestAND25';
    +'&Dept=' + 'DEMO';
    // + '&OTPType='
    // + '&CellPhone=' + this.UID;
    // + '&EmailID=' + this.UID;
    console.log('-------------------------------');
    console.log(RequestURL);
    let sr = await this.api.MakeRequest(RequestURL, 'none', null);

    let Rsp = sr;
    console.log(Rsp);
    console.log('MID:' + SharedUtility.sharedSettingModel.getMID(''));

    showPageLoader(false);

    return Rsp;
  }

  CanLogIn() {
    let can = false;
    let pin = this.state.pin;
    let ans = this.state.answer;

    can =
      pin.toLowerCase() == this.PIN.toLowerCase() &&
      this.ANS.toLowerCase() == ans.toLowerCase();

    return can;
  }

  async SetLowRisk() {
    showPageLoader(true);

    let server = SharedUtility.sharedSettingModel.serverAddress;
    server = !server ? 'demo.infocopmobile.com' : server;

    let RequestURL = 'https://' + server + '/api/prod/login?';
    RequestURL += 'STP=SetLow&';
    RequestURL += 'UID=' + this.UID;

    let sr = await this.api.MakeRequest(RequestURL, 'none', null);

    let Rsp = sr;
    console.log(Rsp);
    console.log('MID:' + SharedUtility.sharedSettingModel.getMID(''));

    showPageLoader(false);

    return Rsp;
  }

  async ResetPasswordApi() {
    showPageLoader(true);

    let server = SharedUtility.sharedSettingModel.serverAddress;
    server = !server ? 'demo.infocopmobile.com' : server;
    let apikey = (await SharedUtility.GetSharedAPIKey()).getAPIKey('NULL');

    let RequestURL = 'https://' + server + '/api/prod/Login/ResetPassword?';
    // + 'UID=' + this.UID;
    +'&EmpID=' + this.UID;
    +'&DeviceCodeName=' + 'TestAND25';
    +'&Dept=' + 'DEMO';
    // + '&OTPType='
    // + '&CellPhone=' + this.UID;
    // + '&EmailID=' + this.UID;
    console.log('-------------------------------');
    console.log(RequestURL);
    let sr = await this.api.MakeRequest(RequestURL, 'none', null);

    let Rsp = sr;
    console.log(Rsp);
    console.log('MID:' + SharedUtility.sharedSettingModel.getMID(''));

    showPageLoader(false);

    return Rsp;
  }

  async loginToMainActivity() {
    let res = await this.SetLowRisk();
  }

  async forgotPasswordActivity() {
    let res = await this.ResetPasswordApi();
    Alert.alert(JSON.stringify(res), '', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  async onLogin() {
    if (this.CanLogIn()) {
      await this.forgotPasswordActivity();
      if (this.props.LoginCompletionEvent != null) {
        this.props.LoginCompletionEvent(this.accountModel);
      }
    } else {
      Alert.alert('Invalid login credentials', '', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }

  async onTapClose() {
    this.setState({
      showUserIdSubmit: true,
      showOTPRequest: false,
      showSendNewPwdSubmit: false,

      userID: '',
      otp: '',
      password: '',
      cpassword: '',
    });

    this.props.OnTapClose();
  }

  hideEmail(strEmail) {
    return strEmail.replace(/(\w{1})(.*)(\w{3})@(.*)/, '$1******$3@$4');
  }

  hidePhone(strPhone) {
    return strPhone.replace(/(\d{1})(.*)(\d{3})/, '$1******$3');
  }

  render() {
    const {isShow, isFromMain, initDataAAVC, aavcAccountModel} = this.props;
    let imgMark = this.setData(initDataAAVC);
    this.accountModel = aavcAccountModel;

    return (
      <Modal animationType={'slide'} transparent={false} visible={isShow}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : '450'}
          style={{flex: 1}}>
          <HeaderBar
            isShowLeft={false}
            isShowRight={true}
            title={''}
            titleColor={Constants.white}
            rightIcon={
              <Text style={{color: 'white', fontSize: 15}}>Close</Text>
            }
            onRightButton={async () => {
              await this.onTapClose();
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
              {/* <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={imgMark}
                  style={{
                    height: 80,
                    width: 80,
                    resizeMode: 'cover',
                    marginVertical: 10,
                  }}
                />
              </View> */}

              <View
                style={{
                  marginTop: '45%',
                  margin: 10,
                  backgroundColor: Constants.blackTrans,
                  borderRadius: 8,
                  padding: 20,
                }}>
                {this.state.showUserIdSubmit && (
                  <>
                    <Text style={styles.labelText}>UserID</Text>
                    <TextInput
                      ref={'questionRef'}
                      style={styles.TextArea}
                      keyboardType={'default'}
                      // editable={false}
                      autoCapitalize="characters"
                      value={this.state.userID}
                      placeholder={''}
                      onChangeText={value => {
                        this.setState({
                          userID: value,
                        });
                      }}
                      onSubmitEditing={() => {
                        this.refs.questionRef.current?.focus();
                      }}
                    />

                    <TouchableOpacity
                      style={styles.mainButton}
                      onPress={async () => {
                        let params = {
                          EmpID: this.state.userID, //this.UID,
                          DeviceCodeName: 'TESTKM6',
                          Dept: 'DEMO',
                          CallType: '1',
                          OTPType: '',
                          // 'NewPassword': this.state.password + '',
                          // 'ConfirmPassword': this.state.password + '',
                        };
                        // await this.onLogin();
                        showPageLoader(true);
                        this.api.ResetPasswordApi(params, response => {
                          showPageLoader(false);
                          if (response.Result + '' == 'true') {
                            this.setState({
                              typeOneData: response,
                              showUserIdSubmit: false,
                              showOTPRequest: true,
                            });
                          } else {
                            Alert.alert(response, '', [
                              {
                                text: 'OK',
                                onPress: () => console.log('OK Pressed'),
                              },
                            ]);
                          }
                        });
                      }}>
                      <Text style={styles.btnText}>{'Submit'}</Text>
                    </TouchableOpacity>
                  </>
                )}

                {this.state.showOTPRequest && (
                  <>
                    <Text style={styles.labelText}>Send OTP Code To:</Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 50,
                        paddingHorizontal: 20,
                      }}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          this.setState({
                            otpType: 'e',
                          });
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
                          {this.state.otpType == 'e' ? IconCheck : null}
                        </View>
                        <Text style={styles.labelText}>
                          {'Email: ' +
                            (this.state.typeOneData != null &&
                              this.hideEmail(this.state.typeOneData.EmailID))}
                        </Text>
                      </TouchableOpacity>
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
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          this.setState({
                            otpType: 'p',
                          });
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
                          {this.state.otpType == 'p' ? IconCheck : null}
                        </View>
                        <Text style={styles.labelText}>
                          {'Phone: ' +
                            (this.state.typeOneData != null &&
                              this.hidePhone(this.state.typeOneData.CellPhone))}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={styles.mainButton}
                      onPress={async () => {
                        let params = {
                          EmpID: this.state.userID, //this.UID,
                          DeviceCodeName: 'TESTKM6',
                          Dept: 'DEMO',
                          CallType: '2',
                          OTPType:
                            this.state.otpType == 'e'
                              ? 'Email'
                              : this.state.otpType == 'p'
                              ? 'Phone'
                              : '',
                          EmailID:
                            (this.state.typeOneData != null &&
                              this.state.typeOneData.EmailID) + '',
                          CellPhone:
                            (this.state.typeOneData != null &&
                              this.state.typeOneData.CellPhone) + '',
                          // 'NewPassword': this.state.password + '',
                          // 'ConfirmPassword': this.state.password + '',
                        };
                        console.log('--------------------forget---');
                        console.log(params);
                        // await this.onLogin();
                        showPageLoader(true);
                        this.api.ResetPasswordApi(params, response => {
                          showPageLoader(false);
                          // alert(JSON.stringify(response));
                          if (response.Result + '' == 'true') {
                            Alert.alert('OTP code sent successfully.', '', [
                              {
                                text: 'OK',
                                onPress: () => console.log('OK Pressed'),
                              },
                            ]);
                            this.setState({
                              typeTwoData: response,
                              showUserIdSubmit: false,
                            });

                            setTimeout(() => {
                              this.setState({
                                showOTPRequest: false,
                                showSendNewPwdSubmit: true,
                              });
                            }, 2000);
                          } else {
                            // alert(response.ErrorMessage);
                          }
                        });
                      }}>
                      <Text style={styles.btnText}>Request OTP Code</Text>
                    </TouchableOpacity>
                  </>
                )}

                {this.state.showSendNewPwdSubmit && (
                  <>
                    <Text style={styles.labelText}>OTP Code</Text>

                    <TextInput
                      ref={'pin'}
                      style={styles.InputText}
                      value={this.state.otp}
                      keyboardType={'number-pad'}
                      secureTextEntry={true}
                      onChangeText={text => {
                        // if (text.length <= 6) {
                        this.setState({otp: text});
                        // }
                      }}
                      placeholder={''}
                      onSubmitEditing={() => {}}
                    />

                    <Text style={styles.labelText}>Password</Text>
                    <TextInput
                      ref={'pin'}
                      style={styles.InputText}
                      value={this.state.password}
                      // keyboardType={'number-pad'}
                      secureTextEntry={true}
                      onChangeText={text => {
                        // if (text.length <= 6) {
                        this.setState({password: text});
                        // }
                      }}
                      placeholder={''}
                      onSubmitEditing={() => {}}
                    />

                    <Text style={styles.labelText}>Confirm Password</Text>
                    <TextInput
                      ref={'pin'}
                      style={styles.InputText}
                      value={this.state.cpassword}
                      // keyboardType={'number-pad'}
                      secureTextEntry={true}
                      onChangeText={text => {
                        // if (text.length <= 6) {
                        this.setState({cpassword: text});
                        // }
                      }}
                      placeholder={''}
                      onSubmitEditing={() => {}}
                    />

                    <TouchableOpacity
                      style={styles.mainButton}
                      onPress={async () => {
                        let dt = new Date();

                        if (this.state.otp == '') {
                          Alert.alert('Please enter OTP.', '', [
                            {
                              text: 'OK',
                              onPress: () => console.log('OK Pressed'),
                            },
                          ]);
                        } else if (this.state.password == '') {
                          Alert.alert('Please enter password.', '', [
                            {
                              text: 'OK',
                              onPress: () => console.log('OK Pressed'),
                            },
                          ]);
                        } else if (this.state.cpassword == '') {
                          Alert.alert('Please enter confirm password.', '', [
                            {
                              text: 'OK',
                              onPress: () => console.log('OK Pressed'),
                            },
                          ]);
                        } else if (
                          this.state.password != this.state.cpassword
                        ) {
                          Alert.alert(
                            'Password and confirm password mismatch.',
                            '',
                            [
                              {
                                text: 'OK',
                                onPress: () => console.log('OK Pressed'),
                              },
                            ],
                          );
                        } else {
                          let params = {
                            EmpID: this.state.userID, //this.UID,
                            DeviceCodeName: 'TESTKM6',
                            Dept: 'DEMO',
                            CallType: '7',
                            OTPType:
                              this.state.otpType == 'e'
                                ? 'Email'
                                : this.state.otpType == 'p'
                                ? 'Phone'
                                : '',
                            EmailID:
                              (this.state.typeOneData != null &&
                                this.state.typeOneData.EmailID) + '',
                            // CellPhone:
                            //   (this.state.typeOneData != null &&
                            //     this.state.typeOneData.CellPhone) + '',
                            NewPassword: this.state.password + '',
                            ConfirmPassword: this.state.cpassword + '',
                            OTPSentTime: dt.toISOString(),
                            OTP: this.state.otp,
                          };
                          // console.log(params)
                          // console.log("-------------------------")
                          // await this.onLogin();
                          showPageLoader(true);
                          this.api.ResetPasswordApi(params, response => {
                            showPageLoader(false);
                            if (response.Result + '' == 'true') {
                              this.props.OnTapClose();
                              Alert.alert('You can use the new password', '', [
                                {
                                  text: 'OK',
                                  onPress: () => console.log('OK Pressed'),
                                },
                              ]);
                              this.setState({
                                typeThreeData: response,
                              });
                              this.api.CheckLogOff();
                            } else {
                              Alert.alert(response, '', [
                                {
                                  text: 'OK',
                                  onPress: () => console.log('OK Pressed'),
                                },
                              ]);
                            }
                          });
                        }
                      }}>
                      <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </ScrollView>
          </ImageBackground>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
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
  TextArea: {
    height: 40,
    borderRadius: 20,
    color: 'white',
    paddingHorizontal: 10,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: Constants.transparent,
    marginVertical: 5,
    fontSize: 15,
  },
  labelText: {
    fontSize: 14,
    color: 'white',
    marginVertical: 10,
  },
  btnText: {
    fontSize: 16,
    color: 'white',
    marginVertical: 10,
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

ForgotPassword.propTypes = {
  isShow: PropTypes.bool.isRequired,
  aavcAccountModel: PropTypes.object,
  initDataAAVC: PropTypes.object,
  LoginCompletionEvent: PropTypes.func.isRequired,
  OnTapCloseAAVC: PropTypes.func.isRequired,
};
