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
import {AccountModel} from '../utils/models';

import SharedUtility from '../utils/SharedUtility';
import API_Manager from '../utils/API_Manager';

export default class PasswordVC extends React.Component {
  api = new API_Manager();

  ANS = '';
  PIC = '';
  PIN = '';
  QUE = '';
  RSK = '';
  STP = '';
  UID = '';
  PAS = '';
  MSG = '';

  constructor(props) {
    super(props);

    this.state = {
      pass1: '',
      pass2: '',
    };
  }

  componentDidMount() {
    console.log('----rrreeeee---');
  }

  componentWillUnmount() {}

  ValidatePass() {
    let pas = this.state.pass1;

    let regex = /\d/g;
    let regexChar = /\w/g;
    let result = pas.match(regex);

    let can = result && result.length > 0;
    let resW = pas.match(regexChar);
    can &= resW && resW.length > 0;
    can &= pas && pas.length >= 8;

    if (can) this.PAS = pas;

    return can;
  }

  setData(dict) {
    this.ANS = dict.ANS;
    this.PIC = dict.PIC;
    this.PIN = dict.PIN;
    this.QUE = dict.QUE;
    this.UID = dict.UID;
  }

  getServerAddr() {
    let server = SharedUtility.sharedSettingModel.serverAddress;
    server = !server ? SharedUtility.Def_Server_Address : server;

    return server;
  }

  async UpdatePW() {
    showPageLoader(true);

    let RequestURL = 'https://' + this.getServerAddr() + '/api/prod/login?';
    RequestURL += 'STP=NewPW&';
    RequestURL += 'UID=' + this.UID;

    let pdict = {icpw: this.PAS};

    console.log('Request URL :' + RequestURL);
    let Rsp = await this.api.MakeRequest(RequestURL, pdict);

    console.log('LINE 126 PasswordVC:  UpdatePW > result >:  ', Rsp, pdict);
    this.MSG = this.CheckPWRsp(Rsp);
    this.PassUpdateReturn();
    showPageLoader(false);
  }

  CheckPWRsp(Rsp) {
    try {
      // let obj = JSON.parse(Rsp);
      let obj = Rsp;
      return obj.Msg.toString();
    } catch (e) {
      console.log('at CheckPWRsp : ' + e.message);
      return 'Error';
    }
  }

  PassUpdateReturn() {
    if (this.MSG.toLowerCase() === 'proceed') {
      let dataDict = {
        QUE: this.QUE,
        ANS: this.ANS,
        PIC: this.PIC,
        PIN: this.PIN,
        UID: this.UID,
        PAS: this.PAS,
      };

      Alert.alert('', 'Your password has been updated.', [
        {
          text: 'Ok',
          style: 'default',
          onPress: () => {
            AccountModel.tmpPwd = this.state.pass1;
            this.props.OnOpenEAVC(dataDict);
          },
        },
      ]);

      console.log('Your password has been updated.');
    } else if (this.MSG.toLowerCase() === 'stop') {
      Alert.alert('', 'You have used that password before.');
      console.log('You have used that password before.');
    } else {
      Alert.alert('', 'Error Updating Password.');
      console.log('Error Updating Password.');
    }
  }

  ComparePass() {
    let can = false;

    let pass = this.state.pass1;
    let pass2 = this.state.pass2;
    can = pass == pass2;
    return can;
  }

  async onTapUpdate() {
    let validPwd = this.ValidatePass();
    let comp = this.ComparePass();

    if (!comp) {
      Alert.alert('', 'Your Passwords do not match.');
    } else if (!validPwd) {
      Alert.alert('', "Your Password doesn't meet password requirements.");
    } else {
      this.SendPasswordUpdate();
    }
  }

  async SendPasswordUpdate() {
    await this.UpdatePW();
  }

  onTapClose() {
    this.props.OnTapClose();
  }

  render() {
    const {isShow, initDataDict} = this.props;
    this.setData(initDataDict);

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
            onRightButton={() => {
              this.onTapClose();
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
              <View
                style={{
                  margin: 10,
                  backgroundColor: Constants.blackTrans,
                  borderRadius: 8,
                  padding: 20,
                }}>
                <Text style={styles.labelText}>
                  Please Enter a New Password
                </Text>
                <Text style={styles.labelText}>
                  Password must be 8~10 characters long Contain only
                  alphanumeric characters Contain at least one number. Not
                  contain spaces. Not be the same as your UserID. Not be the
                  same as any of your past 10 passwords.
                </Text>

                <TextInput
                  ref={'pass1Ref'}
                  style={styles.InputText}
                  secureTextEntry={true}
                  keyboardType={'default'}
                  value={this.state.pass1}
                  onChangeText={text => {
                    this.setState({pass1: text});
                  }}
                  placeholder={''}
                  onSubmitEditing={() => {
                    this.refs.pass2Ref.focus();
                  }}
                />

                <TextInput
                  ref={'pass2Ref'}
                  style={styles.InputText}
                  value={this.state.pass2}
                  keyboardType={'default'}
                  secureTextEntry={true}
                  onChangeText={text => {
                    this.setState({pass2: text});
                  }}
                  placeholder={''}
                  onSubmitEditing={() => {}}
                />

                <TouchableOpacity
                  style={{
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: Constants.blackTrans,
                    marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={async () => {
                    await this.onTapUpdate();
                  }}>
                  <Text style={styles.btnText}>UPDATE</Text>
                </TouchableOpacity>
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
    borderRadius: 20,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: Constants.white,
    marginVertical: 5,
    fontSize: 15,
  },
  TextArea: {
    height: 80,
    borderRadius: 20,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: Constants.white,
    marginVertical: 5,
    fontSize: 15,
  },
  labelText: {
    fontSize: 14,
    color: 'white',
    marginVertical: 10,
    textAlign: 'center',
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
});

PasswordVC.propTypes = {
  isShow: PropTypes.bool.isRequired,
  OnTapClose: PropTypes.func.isRequired,
  OnOpenEAVC: PropTypes.func.isRequired,
  initDataDict: PropTypes.object.isRequired,
};
