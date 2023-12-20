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
  Modal,
  TouchableOpacity,
} from 'react-native';
import Constants from '../utils/Constants';
import HeaderBar from '../components/HeaderBar';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import API_Manager from '../utils/API_Manager';

const IconClose = <Icon name="close" size={24} color="white" />;
const IconCheck = <Icon name="check" size={24} color="white" />;

export default class EAVC extends React.Component {
  CanLogOn = false;
  DelSession = 'N';
  cellID = 'cell_images';
  mLogIn = false;
  // User AA Info
  ANS = '';
  PIC = '';
  PIN = '';
  QUE = '';
  RSK = '';
  STP = '';
  UID = '';
  PAS = '';
  MSG = '';

  api = new API_Manager();
  TAG = 'In EditAAVC ';

  mImageStr = [
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
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  setData(dict) {
    this.ANS = dict.ANS;
    this.PIC = dict.PIC;
    this.PIN = dict.PIN;
    this.QUE = dict.QUE;
    this.UID = dict.UID;
    this.PAS = dict.PAS;

    let picid = 0;
    for (let i = 0; i < this.mImageStr.length; i++) {
      if (this.PIC.toLowerCase() === this.mImageStr[i].toLowerCase()) {
        picid = i;
      }
    }

    let img = this.mImageList[picid];

    return img;
  }

  async onTapClose() {
    this.props.OnTapCloseEAVC();
  }

  render() {
    const {isShow, initDataEAVC} = this.props;
    let imgMark = this.setData(initDataEAVC);

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

              <View
                style={{
                  margin: 10,
                  backgroundColor: Constants.blackTrans,
                  borderRadius: 8,
                  padding: 20,
                }}>
                <Text style={styles.labelText}>Your Question</Text>
                <TextInput
                  ref={'questionRef'}
                  style={styles.TextArea}
                  keyboardType={'default'}
                  value={this.state.question}
                  onChangeText={text => {
                    this.setState({question: text});
                  }}
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
                  onChangeText={text => {
                    this.setState({answer: text});
                  }}
                  placeholder={''}
                  onSubmitEditing={() => {
                    this.refs.pin.current?.focus();
                  }}
                />

                <Text style={styles.labelText}>Your PIN</Text>

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
                    await this.onLogin();
                  }}>
                  <Text style={styles.btnText}>Log In</Text>
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

EAVC.propTypes = {
  isShow: PropTypes.bool.isRequired,
  initDataEAVC: PropTypes.object.isRequired,
  OnTapCloseEAVC: PropTypes.func.isRequired,
};
