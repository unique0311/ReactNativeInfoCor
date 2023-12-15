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
  Modal,
  TouchableOpacity,
} from 'react-native';
import Constants from '../utils/Constants';
import HeaderBar from '../components/HeaderBar';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import SharedUtility from '../utils/SharedUtility';
import API_Manager from '../utils/API_Manager';

export default class AAVC extends React.Component {
  // public ViewController parentVC;

  api = new API_Manager();

  accountModel = null;

  // public event EventHandler<AccountModel> LoginCompletionEvent;

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
      isCheckPasswrod: true,
      newpassword: '',
      newconfirmpassword: '',
      newpin: '',
      newcomfirmpin: '',
      isOther: false,
      isQuestionOpen: false,
      qvalue: null,
      pvalue: null,
      qselectedItem: null,
      pselectedItem: null,
      questionsItem: [
        {
          label: "What is your mother's maiden name?",
          value: "What is your mother's maiden name",
        },
        {
          label: 'What was the name of your first pet?',
          value: 'What was the name of your first pet',
        },
        {
          label: 'What elementary school did you attend?',
          value: 'What elementary school did you attend',
        },
        {
          label: 'What middle school did you attend?',
          value: 'What middle school did you attend',
        },
        {
          label: 'What high school did you attend?',
          value: 'What high school did you attend',
        },
        {
          label: 'What college did you attend?',
          value: 'What college did you attend',
        },
        {
          label: "What is your father's middle name?",
          value: "What is your father's middle name",
        },
        {
          label: "What is your mother's middle name?",
          value: "What is your mother's middle name",
        },
        {
          label: 'What was your favorite class in school?',
          value: 'What was your favorite class in school',
        },
        {
          label: 'What is the name of your favorite sibling?',
          value: 'What is the name of your favorite sibling',
        },
        {
          label: 'What is your favorite activity?',
          value: 'What is your favorite activity',
        },
        {
          label: 'What is your favorite sport?',
          value: 'What is your favorite sport',
        },
        {
          label: 'What was your childhood nickname?',
          value: 'What was your childhood nickname',
        },
        {
          label: 'In what city did you meet your significant other?',
          value: 'In what city did you meet your significant other',
        },
        {
          label: 'What is the name of your favorite childhood friend?',
          value: 'What is the name of your favorite childhood friend',
        },
        {
          label: 'What street did you live on in third grade?',
          value: 'What street did you live on in third grade',
        },
        {
          label: 'What is your oldest sibling’s birthday month and year?',
          value: 'What is your oldest sibling’s birthday month and year',
        },
        {
          label: 'What is the middle name of your oldest child?',
          value: 'What is the middle name of your oldest child',
        },
        {
          label: "What is your oldest sibling's middle name?",
          value: "What is your oldest sibling's middle name",
        },
        {
          label:
            'What school did you attend for sixth gradeWhat was your childhood phone number including area code?',
          value:
            'What school did you attend for sixth gradeWhat was your childhood phone number including area code',
        },
        {
          label: "What is your oldest cousin's first and last name?",
          value: "What is your oldest cousin's first and last name",
        },
        {
          label: 'What was the name of your first stuffed animal?',
          value: 'What was the name of your first stuffed animal',
        },
        {
          label: 'In what city or town did your mother and father meet?',
          value: 'In what city or town did your mother and father meet',
        },
        {
          label: 'Where were you when you had your first kiss?',
          value: 'Where were you when you had your first kiss',
        },
        {
          label:
            'What is the first name of the boy or girl that you first kissed?',
          value:
            'What is the first name of the boy or girl that you first kissed',
        },
        {
          label: 'What was the last name of your third grade teacher?',
          value: 'What was the last name of your third grade teacher',
        },
        {
          label: 'In what city does your nearest sibling live?',
          value: 'In what city does your nearest sibling live',
        },
        {
          label: 'What is your oldest brother’s birthday month and year?',
          value: 'What is your oldest brother’s birthday month and year',
        },
        {
          label: "What is your maternal grandmother's maiden name?",
          value: "What is your maternal grandmother's maiden name",
        },
        {
          label: 'In what city or town was your first job?',
          value: 'In what city or town was your first job',
        },
        {
          label:
            'What is the name of the place your wedding reception was held?',
          value:
            'What is the name of the place your wedding reception was held',
        },
        {
          label:
            "What is the name of a college you applied to but didn't attend?",
          value:
            "What is the name of a college you applied to but didn't attend",
        },
        {
          label: 'Where were you when you first heard about 9/11?',
          value: 'Where were you when you first heard about 9/11',
        },
        {
          label: 'What was the name of your elementary / primary school?',
          value: 'What was the name of your elementary / primary school',
        },
        {
          label: 'What is the name of the company of your first job?',
          value: 'What is the name of the company of your first job',
        },
        {
          label: 'What was your favorite place to visit as a child?',
          value: 'What was your favorite place to visit as a child',
        },
        {
          label: "What is your spouse's mother's maiden name?",
          value: "What is your spouse's mother's maiden name",
        },
        {
          label: 'What is the country of your ultimate dream vacation?',
          value: 'What is the country of your ultimate dream vacation',
        },
        {
          label: 'What is the name of your favorite childhood teacher?',
          value: 'What is the name of your favorite childhood teacher',
        },
        {
          label: 'To what city did you go on your honeymoon?',
          value: 'To what city did you go on your honeymoon',
        },
        {
          label: 'What time of the day were you born?',
          value: 'What time of the day were you born',
        },
        {
          label: 'What was your dream job as a child?',
          value: 'What was your dream job as a child',
        },
        {
          label: 'What is the street number of the house you grew up in?',
          value: 'What is the street number of the house you grew up in',
        },
        {
          label: "What is the license plate of your dad's first car?",
          value: "What is the license plate of your dad's first car",
        },
        {
          label: 'Who was your childhood hero?',
          value: 'Who was your childhood hero?',
        },
        {
          label: 'What was the first concert you attended?',
          value: 'What was the first concert you attended',
        },
        {
          label: 'What are the last 5 digits of your credit card?',
          value: 'What are the last 5 digits of your credit card',
        },
        {
          label: 'What are the last 5 of your Social Security number?',
          value: 'What are the last 5 of your Social Security number',
        },
        {
          label: 'What is your current car registration number?',
          value: 'What is your current car registration number',
        },
        {
          label: "What are the last 5 digits of your driver's license number?",
          value: "What are the last 5 digits of your driver's license number",
        },
        {
          label: 'What month and day is your anniversary?',
          value: 'What month and day is your anniversary',
        },
        {
          label: "What is your grandmother's first name?",
          value: "What is your grandmother's first name",
        },
        {
          label: "What is your mother's middle name?",
          value: "What is your mother's middle name",
        },
        {
          label: 'What is the last name of your favorite high school teacher?',
          value: 'What is the last name of your favorite high school teacher',
        },
        {
          label: 'What was the make and model of your first car?',
          value: 'What was the make and model of your first car',
        },
        {
          label: 'Where did you vacation last year?',
          value: 'Where did you vacation last year',
        },
        {
          label: "What is the name of your grandmother's dog?",
          value: "What is the name of your grandmother's dog",
        },
        {
          label: 'What is the name, breed, and color of current pet?',
          value: 'What is the name, breed, and color of current pet',
        },
        {
          label: 'What is your preferred musical genre?',
          value: 'What is your preferred musical genre',
        },
        {
          label: 'In what city and country do you want to retire?',
          value: 'In what city and country do you want to retire',
        },
        {
          label:
            'What is the name of the first undergraduate college you attended?',
          value:
            'What is the name of the first undergraduate college you attended',
        },
        {
          label: 'What was your high school mascot?',
          value: 'What was your high school mascot',
        },
        {
          label: 'What year did you graduate from High School?',
          value: 'What year did you graduate from High School',
        },
        {
          label: 'What is the name of the first school you attended?',
          value: 'What is the name of the first school you attended',
        },
      ],

      photoItems: [
        {
          label: 'badge',
          value: 'badge',
          icon: () => (
            <Image
              source={require('../../assets/images/badge.png')}
              style={styles.photoitem}
            />
          ),
        },
        {
          label: 'bullet',
          value: 'bullet',
          icon: () => (
            <Image
              source={require('../../assets/images/bullet.png')}
              style={styles.photoitem}
            />
          ),
        },
        {
          label: 'cannon',
          value: 'cannon',
          icon: () => (
            <Image
              source={require('../../assets/images/cannon.png')}
              style={styles.photoitem}
            />
          ),
        },
        {
          label: 'circle day',
          value: 'circle_day',
          icon: () => (
            <Image
              source={require('../../assets/images/circle_day.png')}
              style={styles.photoitem}
            />
          ),
        },
        {
          label: 'circle night',
          value: 'circle_night',
          icon: () => (
            <Image
              source={require('../../assets/images/circle_night.png')}
              style={styles.photoitem}
            />
          ),
        },
        {
          label: 'dog',
          value: 'dog',
          icon: () => (
            <Image
              source={require('../../assets/images/dog.png')}
              style={styles.photoitem}
            />
          ),
        },
        {
          label: 'flashlight',
          value: 'flashlight',
          icon: () => (
            <Image
              source={require('../../assets/images/flashlight.png')}
              style={styles.photoitem}
            />
          ),
        },
        {
          label: 'handcuffs',
          value: 'handcuffs',
          icon: () => (
            <Image
              source={require('../../assets/images/handcuffs.png')}
              style={styles.photoitem}
            />
          ),
        },
        {
          label: 'key',
          value: 'key',
          icon: () => (
            <Image
              source={require('../../assets/images/key.png')}
              style={styles.photoitem}
            />
          ),
        },
      ],
    };
    this.setQuestionValue = this.setQuestionValue.bind(this);
    this.setPhotoValue = this.setPhotoValue.bind(this);
    this.onBack = this.onBack.bind(this);
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
    //RSK = (string)dict ["RSK"].ToString();
    //STP = (string)dict ["STP"].ToString();
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

  async ResetPassword() {
    showPageLoader(true);

    // let server = SharedUtility.sharedSettingModel.serverAddress;
    // server = !server ? 'demo.infocopmobile.com' : server;
    // let apikey = (await SharedUtility.GetSharedAPIKey()).getAPIKey ("NULL");

    // let RequestURL = 'https://' + server + '/api/prod/Login/ResetPassword?';
    // // + 'UID=' + this.UID;
    // + '&EmpID=' + this.UID;
    // + '&DeviceCodeName=' + 'TestAND25';
    // + '&Dept=' + 'DEMO'
    // + '&CallType=' + '3'
    // + '&NewPassword=' + ''
    // // + '&OTPType='
    // // + '&CellPhone=' + this.UID;
    // // + '&EmailID=' + this.UID;

    // let sr = await this.api.MakeRequest(RequestURL, 'none', null);

    // let Rsp = sr;
    // console.log(Rsp);
    // console.log('MID:' + SharedUtility.sharedSettingModel.getMID(''));

    let params = {
      EmpID: this.UID,
      DeviceCodeName: 'TESTKM6',
      Dept: 'DEMO',
      CallType: '3',
      OTPType: '',
      NewPassword: this.state.password + '',
      ConfirmPassword: this.state.password + '',
      OTP: '',
    };

    //alert(JSON.stringify(params))
    //console.log(JSON.stringify(params))
    this.api.ResetPasswordApi(params, response => {
      showPageLoader(false);
      // alert(JSON.stringify(response))
    });

    // return Rsp;
  }
  async onCheckPinAndPassword() {
    // showPageLoader(true);

    let params = {
      EmpID: this.UID,
      DeviceCodeName: 'TESTKM6',
      Dept: 'DEMO',
      CallType: '5',
      CurrentPassword: this.state.password + '',
      CurrentPIN: this.PIN + '',
    };

    this.api.ResetPasswordApi5(params, response => {
      showPageLoader(false);
      //alert(JSON.stringify(response))
      if (response.Result) {
        this.setState({isCheckPasswrod: false});
      } else {
        Alert.alert(JSON.stringify(response), '', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        this.setState({isCheckPasswrod: true});
      }
    });
  }
  async onBack() {
    await this.api.CheckLogOff();
    Alert.alert('Successfully changed!', '', [
      {text: 'OK', onPress: () => this.props.OnBack()},
    ]);
  }
  async onResetNewPassword() {
    showPageLoader(true);

    let params = {
      EmpID: this.UID,
      DeviceCodeName: 'TESTKM6',
      Dept: 'DEMO',
      CallType: '6',
      CurrentPassword: this.state.password,
      NewPassword: this.state.newpassword + '',
      ConfirmPassword: this.state.newconfirmpassword + '',
      ChangeOtherSettings: this.state.isOther,
      CurrentPIN: this.PIN + '',
      NewPIN: this.state.newpin,
      ConfirmPIN: this.state.newcomfirmpin,
      SecurityQuestion: this.state.qvalue,
      SecurityAnswer: this.state.answer,
      SecurityPhoto: this.state.pvalue,
    };

    this.api.ResetPasswordApi6(params, response => {
      showPageLoader(false);
      if (response.Result) {
        this.onBack();
      } else {
        Alert.alert(JSON.stringify(response), '', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    });
  }
  async loginToMainActivity() {
    let res = await this.SetLowRisk();
  }

  async forgotPasswordActivity() {
    let res = await this.ResetPassword();
    // alert(JSON.stringify(res))
  }

  async onLogin() {
    if (this.CanLogIn()) {
      // if(isFromMain) {
      //   await this.loginToMainActivity();
      // }
      // else {
      // await this.forgotPasswordActivity();
      // }
      this.ResetPassword();
      // if (this.props.LoginCompletionEvent != null) {
      //   this.props.LoginCompletionEvent(this.accountModel);
      // }
    } else {
      Alert.alert('Invalid login credentials', '', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }

  async onTapClose() {
    this.setState({
      isCheckPasswrod: true,
      pin: '',
      password: '',
      newpassword: '',
      newconfirmpassword: '',
      newpin: '',
      newcomfirmpin: '',
      answer: '',
      isOther: false,
    });
    this.props.OnTapCloseAAVC();
  }
  setQuestionValue(callback) {
    this.setState(state => ({
      qvalue: callback(state.qvalue),
    }));
  }
  setPhotoValue(callback) {
    this.setState(state => ({
      pvalue: callback(state.pvalue),
    }));
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
              nestedScrollEnabled={true}
              contentContainerStyle={{
                paddingBottom: 0,
              }}>
              <View
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
              </View>
              {this.state.isCheckPasswrod && (
                <View
                  style={{
                    margin: 10,
                    backgroundColor: Constants.blackTrans,
                    borderRadius: 8,
                    padding: 20,
                  }}>
                  {/* <Text style={styles.labelText}>Your Question</Text>
                <TextInput
                  ref={'questionRef'}
                  style={styles.TextArea}
                  keyboardType={'default'}
                  editable={false}
                  value={initDataAAVC ? initDataAAVC.QUE : ''}
                  placeholder={''}
                  onSubmitEditing={() => {
                    this.refs.answerRef.current?.focus();
                  }}
                />

                <Text style={styles.labelText}>Your Answer</Text>

                <TextInput
                  ref={'answerRef'}
                  style={styles.InputText}
                  keyboardType={'default'}
                  value={this.state.answer}
                  onChangeText={(text) => {
                    this.setState({answer: text});
                  }}
                  placeholder={''}
                  onSubmitEditing={() => {
                    this.refs.pin.current?.focus();
                  }}
                /> */}

                  <Text style={styles.labelText}>Current PIN</Text>

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

                  {isFromMain && (
                    <Text style={styles.labelText}>Current Password</Text>
                  )}

                  {isFromMain && (
                    <TextInput
                      ref={'password'}
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
                  )}

                  <TouchableOpacity
                    style={styles.mainButton}
                    onPress={async () => {
                      // await this.onLogin();
                      await this.onCheckPinAndPassword();
                    }}>
                    <Text style={styles.btnText}>
                      {isFromMain ? 'Submit' : 'LOG ON'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {!this.state.isCheckPasswrod && (
                <View
                  style={{
                    margin: 10,
                    backgroundColor: Constants.blackTrans,
                    borderRadius: 8,
                    padding: 20,
                  }}>
                  <Text style={styles.labelText}>New Password</Text>
                  <TextInput
                    ref={'password'}
                    style={styles.InputText}
                    value={this.state.newpassword}
                    // keyboardType={'number-pad'}
                    secureTextEntry={true}
                    onChangeText={text => {
                      // if (text.length <= 6) {
                      this.setState({newpassword: text});
                      // }
                    }}
                    placeholder={''}
                    onSubmitEditing={() => {}}
                  />
                  <Text style={styles.labelText}>Confirm Password</Text>
                  <TextInput
                    ref={'password'}
                    style={styles.InputText}
                    value={this.state.newconfirmpassword}
                    // keyboardType={'number-pad'}
                    secureTextEntry={true}
                    onChangeText={text => {
                      // if (text.length <= 6) {
                      this.setState({newconfirmpassword: text});
                      // }
                    }}
                    placeholder={''}
                    onSubmitEditing={() => {}}
                  />
                  <TouchableOpacity
                    style={styles.checkBtn}
                    onPress={async () => {
                      this.setState({isOther: !this.state.isOther});
                    }}
                    activeOpacity={1.0}>
                    <Image
                      source={
                        this.state.isOther
                          ? require('../../assets/images/checked.png')
                          : require('../../assets/images/unchecked.png')
                      }
                      style={{width: 20, height: 20}}
                    />
                    <Text style={styles.checkText}>Change other settings</Text>
                  </TouchableOpacity>
                  {this.state.isOther && (
                    <View>
                      <Text style={styles.labelText}>New PIN</Text>

                      <TextInput
                        ref={'pin'}
                        style={styles.InputText}
                        value={this.state.newpin}
                        keyboardType={'number-pad'}
                        secureTextEntry={true}
                        onChangeText={text => {
                          if (text.length <= 6) {
                            this.setState({newpin: text});
                          }
                        }}
                        placeholder={''}
                        onSubmitEditing={() => {}}
                      />

                      <Text style={styles.labelText}>Confirm PIN</Text>
                      <TextInput
                        ref={'pin'}
                        style={styles.InputText}
                        value={this.state.newcomfirmpin}
                        keyboardType={'number-pad'}
                        secureTextEntry={true}
                        onChangeText={text => {
                          if (text.length <= 6) {
                            this.setState({newcomfirmpin: text});
                          }
                        }}
                        placeholder={''}
                        onSubmitEditing={() => {}}
                      />
                    </View>
                  )}
                  {this.state.isOther && (
                    <View>
                      <Text style={styles.labelText}>Security questions:</Text>
                      <DropDownPicker
                        items={this.state.questionsItem}
                        listMode="SCROLLVIEW"
                        dropDownDirection="TOP"
                        label={'Select question'}
                        placeholder="Select question"
                        open={this.state.isQuestionOpen}
                        setOpen={() =>
                          this.setState({
                            isQuestionOpen: !this.state.isQuestionOpen,
                          })
                        }
                        setValue={this.setQuestionValue}
                        value={this.state.qvalue}
                        defaultIndex={0}
                        containerStyle={{height: 40}}
                        listItemContainer={{
                          marginBottom: -10,
                        }}
                        scrollViewProps={{
                          nestedScrollEnabled: true,
                        }}
                        onChangeItem={item =>
                          this.setState({qselectedItem: item})
                        }
                      />
                    </View>
                  )}

                  {this.state.isOther && (
                    <View>
                      <Text style={styles.labelText}>Security Answer:</Text>
                      <TextInput
                        ref={'password'}
                        style={styles.InputText}
                        value={this.state.answer}
                        onChangeText={text => {
                          this.setState({answer: text});
                        }}
                        placeholder={''}
                        onSubmitEditing={() => {}}
                      />
                    </View>
                  )}

                  {this.state.isOther && (
                    <View>
                      <Text style={styles.labelText}>Security Photo:</Text>
                      <DropDownPicker
                        items={this.state.photoItems}
                        listMode="SCROLLVIEW"
                        dropDownDirection="TOP"
                        label={'Select photos'}
                        placeholder="Select photos"
                        open={this.state.isPhotoOpen}
                        setOpen={() =>
                          this.setState({isPhotoOpen: !this.state.isPhotoOpen})
                        }
                        setValue={this.setPhotoValue}
                        value={this.state.pvalue}
                        defaultIndex={0}
                        containerStyle={{height: 40}}
                        listItemContainer={{
                          marginBottom: -10,
                        }}
                        scrollViewProps={{
                          nestedScrollEnabled: true,
                        }}
                        onChangeItem={item => {
                          console.log(item);
                          this.setState({pselectedItem: item});
                        }}
                      />
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.mainButton}
                    onPress={async () => {
                      await this.onResetNewPassword();
                    }}>
                    <Text style={styles.btnText}>{'Submit'}</Text>
                  </TouchableOpacity>
                </View>
              )}
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
    height: 80,
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
  checkBtn: {
    height: 25,
    flexDirection: 'row',
    marginTop: 10,
  },
  checkText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  photoitem: {
    height: 30,
    width: 30,
    resizeMode: 'cover',
    marginVertical: 10,
  },
});

AAVC.propTypes = {
  isShow: PropTypes.bool.isRequired,
  aavcAccountModel: PropTypes.object,
  initDataAAVC: PropTypes.object,
  LoginCompletionEvent: PropTypes.func.isRequired,
  OnTapCloseAAVC: PropTypes.func.isRequired,
};
