import React from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';

import Constants from '../utils/Constants';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Progress from 'react-native-progress';

const IconClose = <Icon name="close" size={24} color="white" />;
const Iconcheck = <Icon name="check" size={24} color="white" />;

export default class DownloadModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      showDownloadModal,
      onTapClose,
      onTapDownload,
      progress,
      disablebuttons,
    } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDownloadModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: Constants.darkBlue,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 0,
            paddingBottom: 50,
            paddingHorizontal: 0,
            elevation: 5,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.2,
          }}>
          <View
            style={{
              width: '90%',
              backgroundColor: Constants.blackTrans,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 15}}>
              **** ATTENTION ****
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                marginTop: 20,
                textAlign: 'center',
              }}>
              DOWNLOAD IS AVAILABLE. PLEASE ACCEPT TO DOWNLOAD THE FILES FROM
              SERVER
            </Text>
            <TouchableOpacity
              style={{
                width: Constants.WINDOW_WIDTH * 0.6,
                ...styles1.mainButton,
              }}
              onPress={() => {
                if (onTapDownload) {
                  onTapDownload();
                }
              }}
              disabled={disablebuttons}>
              <Text style={styles1.btnText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={disablebuttons}
              style={{
                width: Constants.WINDOW_WIDTH * 0.6,
                ...styles1.mainButton,
              }}
              onPress={() => {
                if (onTapClose) {
                  onTapClose();
                }
              }}>
              <Text style={styles1.btnText}>Later</Text>
            </TouchableOpacity>
            <Progress.Bar style={styles1.progress} progress={progress} />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles1 = StyleSheet.create({
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
  progress: {
    margin: 10,
  },
});
