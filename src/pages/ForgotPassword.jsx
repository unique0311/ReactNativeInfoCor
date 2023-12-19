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
    return <Text>ForgotPassword</Text>;
  }
}
