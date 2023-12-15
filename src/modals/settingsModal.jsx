import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
  Switch,
} from 'react-native';

import Constants from '../utils/Constants';
import {SettingModel, QRCodeDataModel} from '../utils/models';
import SharedUtility from '../utils/SharedUtility';

import Icon from 'react-native-vector-icons/AntDesign';
import GlobalUtil from '../utils/GlobalUtil';

const IconClose = <Icon name="close" size={24} color="white" />;
const IconCloseBlue = (
  <Icon name="close" size={24} color={Constants.lightBlue} />
);
const IconCheck = <Icon name="check" size={24} color="white" />;

export default class SettingsModal extends React.Component {
  API_SERVER_ADDR_PLACE = 'The IP Address of the API Server.';
  DEVICE_NAME_PLACE = 'The Device Name';
  DEVICE_ID_PLACE = 'The ID Number Of the Device';
  API_License_Key_PLACE = 'License Key Number';
  ETicket_PLACE = 'Send Information Eticket';

  constructor(props) {
    super(props);

    this.state = {
      isEticket: false,
      showScanner: false,
      scannedData: props.scannedData,

      lblAPIKeyText: '',
      lblApiServerText: '',
      lblDeviceIDText: '',
      lblDeviceNameText: '',
      swETicketOn: false,

      isShowImportButton: false,
    };
  }

  componentDidMount() {
    this.initFields();
  }

  processingScanImportSetting(barcode) {
    try {
      let qrModel = JSON.parse(barcode);

      let sm = new SettingModel();
      sm.qrData = qrModel;
      sm.serverAddress = qrModel.SVR;
      sm.deviceID = qrModel.DIN;
      sm.devicename = qrModel.DCN;
      sm.license = qrModel.MID;
      sm.sendETicket = false;

      SharedUtility.sharedSettingModel = sm;

      this.initFields();

      // Alert.alert('Scan Results', 'QRCode : ' + barcode);
    } catch (ex) {
      console.log(ex.message);
      Alert.alert(
        'Scan Results',
        'This is invalid QRCode for setting, please try again with correct QRCode. ',
      );
    }
  }

  initFields() {
    let sm = SharedUtility.sharedSettingModel;
    let validAll = this.validAllField(sm);

    if (sm != null && validAll) {
      this.setState({
        lblAPIKeyText: sm.license,
        lblApiServerText: sm.serverAddress,
        lblDeviceIDText: sm.deviceID,
        lblDeviceNameText: sm.devicename,
        swETicketOn: sm.sendETicket,
        isShowImportButton: false,
      });
    } else {
      this.setState({
        lblApiServerText: this.API_SERVER_ADDR_PLACE,
        lblDeviceIDText: this.DEVICE_ID_PLACE,
        lblDeviceNameText: this.DEVICE_NAME_PLACE,
        lblAPIKeyText: this.API_License_Key_PLACE,
        isShowImportButton: true,
      });
    }
  }

  validAllField(sm) {
    return (
      sm &&
      sm.deviceID &&
      sm.deviceID != this.DEVICE_ID_PLACE &&
      sm.devicename &&
      sm.devicename != this.DEVICE_NAME_PLACE &&
      sm.serverAddress &&
      sm.serverAddress != this.API_SERVER_ADDR_PLACE &&
      sm.license &&
      sm.license != this.API_License_Key_PLACE
    );
  }

  async onTapCloseButton() {
    let sm = new SettingModel();
    sm.deviceID = this.state.lblDeviceIDText;
    sm.devicename = this.state.lblDeviceNameText;
    sm.serverAddress = this.state.lblApiServerText;
    sm.license = this.state.lblAPIKeyText;
    sm.sendETicket = this.state.swETicketOn;

    sm.qrData = new QRCodeDataModel();
    sm.qrData.DCN = sm.devicename;
    sm.qrData.DIN = sm.deviceID;
    sm.qrData.SVR = sm.serverAddress;
    sm.qrData.MID = sm.license;

    SharedUtility.sharedSettingModel = sm;

    await SharedUtility.sharedSettingModel.saveSettingData();

    if (this.props.onTapClose) {
      this.props.onTapClose();
    }
  }

  render() {
    const {isShow, onTapClose, onTapImportSettings, scannedData} = this.props;
    let scannedObj = null;
    console.log(
      'SharedUtility.sharedSettingModel: line >> 158>>  ',
      SharedUtility.sharedSettingModel,
    );
    if (scannedData) {
      scannedObj = JSON.parse(scannedData);

      if (this.state.scannedData == null) {
        this.processingScanImportSetting(scannedData);
        this.setState({
          scannedData: scannedObj,
        });
      }
    }

    return (
      <Modal animationType={'slide'} transparent={true} visible={isShow}>
        <View
          style={{
            flex: 1,
            backgroundColor: Constants.white,
            alignItems: 'stretch',
            paddingTop: 40,
            paddingBottom: 50,
            paddingHorizontal: 15,
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.2,
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}
            onPress={() => {
              this.onTapCloseButton();
            }}>
            {IconCloseBlue}
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
              borderBottomWidth: 0.5,
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: Constants.lightBlue,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              SETTINGS
            </Text>
          </View>
          <ScrollView style={{flex: 1}}>
            <View
              style={{
                paddingHorizontal: 10,
                alignItems: 'stretch',
              }}>
              <View style={styles.row}>
                <Text style={styles.labelText}>API Server Address</Text>
                <Text style={styles.subText}>
                  {this.state.lblApiServerText}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Device Name</Text>
                <Text style={styles.subText}>
                  {this.state.lblDeviceNameText}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>Device ID</Text>
                <Text style={styles.subText}>{this.state.lblDeviceIDText}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>API License Key</Text>
                <Text style={styles.subText}>{this.state.lblAPIKeyText}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.labelText}>ETicket Integration</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.subText}>Send Information ETicket</Text>
                  <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={
                      this.state.swETicketOn ? Constants.lightBlue : '#f4f3f4'
                    }
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={val => {
                      this.setState({swETicketOn: val});
                    }}
                    value={this.state.swETicketOn}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <Text style={styles.labelText}>Software Version</Text>
                <Text style={styles.subText}>
                  {GlobalUtil.GetVersionCode()}
                </Text>
              </View>
            </View>
          </ScrollView>

          <View
            style={{
              alignItems: 'center',
            }}>
            {this.state.isShowImportButton && (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 20,
                  width: Constants.WINDOW_WIDTH * 0.5,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  backgroundColor: Constants.blackTrans,
                }}
                onPress={() => {
                  if (onTapImportSettings) {
                    onTapImportSettings();
                  }
                }}>
                <Text style={styles.btnText}>Import Settings</Text>
              </TouchableOpacity>
            )}

            {Constants.IsTest && (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 20,
                  width: Constants.WINDOW_WIDTH * 0.5,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  backgroundColor: Constants.blackTrans,
                }}
                onPress={async () => {
                  let sm = new SettingModel();
                  sm.qrData = {
                    SVR: 'demo.infocopmobile.com',
                    DIN: '359',
                    DCN: 'EXPO2019_2',
                    MID: '{75E8E8D0-C379-4878-87E7-CA360FD64DD9}',
                  };
                  sm.serverAddress = 'demo.infocopmobile.com';
                  sm.deviceID = 'EXPO2019_2';
                  sm.devicename = '359';
                  sm.license = '{75E8E8D0-C379-4878-87E7-CA360FD64DD9}';
                  sm.sendETicket = false;

                  // sm.qrData = qrModel;
                  // sm.serverAddress = qrModel.SVR;
                  // sm.deviceID = qrModel.DIN;
                  // sm.devicename = qrModel.DCN;
                  // sm.license = qrModel.MID;
                  // sm.sendETicket = false;

                  SharedUtility.sharedSettingModel = sm;

                  await SharedUtility.saveString(
                    'imported_setting',
                    JSON.stringify(sm.qrData),
                  );
                }}>
                <Text style={styles.btnText}>Import Default</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.white,
  },

  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  subText: {
    fontSize: 14,
    marginBottom: 5,
  },
  btnText: {
    fontSize: 16,
    color: Constants.lightBlue,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  row: {
    marginVertical: 5,
  },
});
