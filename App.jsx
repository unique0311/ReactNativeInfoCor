import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import ZMsg, {MsgTypes} from './src/components/ZMsg/ZMsg';
import SharedUtility from './src/utils/SharedUtility';
import RNFS from 'react-native-fs';
// import RNApkInstallerN from 'react-native-apk-installer-n';
import AsyncStorage from '@react-native-community/async-storage';
import DownloadModal from './src/modals/downloadModal';

export default class App extends React.Component {
  zMsgRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      msgTitle: 'InfoCop',
      msgText: '',
      msgType: MsgTypes.success,
      showFullLoader: false,
      isShowPageLoader: false,
      showDownloadModal: false,
      isShowToast: false,
      toastMsg: '',
      progress: 0,
      disablebuttons: false,
    };
  }

  async _getappDate() {
    var value = await AsyncStorage.getItem('appDate');
    return value;
  }

  async componentDidMount() {
    this.initFunc();

    // console.disableYellowBox = true;
    await SharedUtility.setSettingModelFromLocal();
  }

  initFunc() {
    global.alert = (title, text, type = MsgTypes.success) => {
      global.onTapOkMsgButton = null;
      global.onTapCancelMsgButton = null;
      if (this.zMsgRef) {
        this.setState(
          {
            msgTitle: title,
            msgText: text,
            msgType: type,
            showFullLoader: false,
          },
          () => {
            this.zMsgRef.showMsg();
          },
        );
      }
    };

    global.warn = (title, text, type = MsgTypes.warn) => {
      global.onTapOkMsgButton = null;
      global.onTapCancelMsgButton = null;
      if (this.zMsgRef) {
        this.setState(
          {
            msgTitle: title,
            msgText: text,
            msgType: type,
            showFullLoader: false,
          },
          () => {
            this.zMsgRef.showMsg();
          },
        );
      }
    };

    global.error = (title, text, type = MsgTypes.error) => {
      global.onTapOkMsgButton = null;
      global.onTapCancelMsgButton = null;
      if (this.zMsgRef) {
        this.setState(
          {
            msgTitle: title,
            msgText: text,
            msgType: type,
            showFullLoader: false,
          },
          () => {
            this.zMsgRef.showMsg();
          },
        );
      }
    };

    global.failed = (title, text, type = MsgTypes.failed) => {
      console.log('failed > set null for both button actions');
      global.onTapOkMsgButton = null;
      global.onTapCancelMsgButton = null;
      if (this.zMsgRef) {
        this.setState(
          {
            msgTitle: title,
            msgText: text,
            msgType: type,
            showFullLoader: false,
          },
          () => {
            this.zMsgRef.showMsg();
          },
        );
      }
    };

    global.alertOk = (title, text, onTapOk, type = MsgTypes.success) => {
      console.log('alertOk > set null for both button actions');
      global.onTapOkMsgButton = null;
      global.onTapCancelMsgButton = null;
      if (zMsgRef.current) {
        global.onTapOkMsgButton = onTapOk;
        setmsgTitle(title);
        setmsgtext(text);
        setMsgType(type);
        setShowFullLoader(false);

        zMsgRef.current.showMsg();
      }
    };

    global.confirm = (title, text, onTapOk, onTapCancel) => {
      console.log('Confirm > set null for both button actions');
      global.onTapOkMsgButton = null;
      global.onTapCancelMsgButton = null;

      if (this.zMsgRef) {
        console.log('confirm > set both buttons actions');
        global.onTapOkMsgButton = onTapOk;
        global.onTapCancelMsgButton = onTapCancel;
        this.setState(
          {
            msgTitle: title,
            msgText: text,
            msgType: MsgTypes.confirm,
            showFullLoader: false,
          },
          () => {
            this.zMsgRef.showMsg();
          },
        );
      }
    };

    global.showPageLoader = isShow => {
      this.setState({isShowPageLoader: isShow});
    };

    global.showToast = msg => {
      setIsShowToast(true);
      setToastMsg(msg);
      this.setState({isShowToast: true, toastMsg: msg}, () => {
        setTimeout(() => {
          this.setState({isShowToast: false, toastMsg: ''});
        }, 5000);
      });
    };
  }

  onTapOkMsg = () => {
    if (global.onTapOkMsgButton) {
      console.log('Called onTapOkMsgButton');
      global.onTapOkMsgButton();
    } else {
      console.log('onTapOkMsgButtons is null');
    }
  };

  onTapCancelMsg = () => {
    if (global.onTapCancelMsgButton) {
      console.log('Called onTapCancelMsgButton');
      global.onTapCancelMsgButton();
    } else {
      console.log('onTapCancelMsgButton is null');
    }
  };

  onDownloadTapped = () => {
    this.setState({disablebuttons: true});
    let apiManager = new API_Manager();
    apiManager.CheckUpdateApp(res => {
      if (
        res !== null &&
        res.UpdateURL !== undefined &&
        res.UpdateURL !== null &&
        res.UpdateURL !== ''
      ) {
        const filePath =
          RNFS.DocumentDirectoryPath + '/infocop' + res.version + '.apk';
        const download = RNFS.downloadFile({
          fromUrl: res.UpdateURL,
          toFile: filePath,
          progress: res => {
            var p = parseFloat(
              (res.bytesWritten / res.contentLength).toFixed(2),
            );
            console.log('I am at ' + parseFloat(p) + 'percent');
            console.log((res.bytesWritten / res.contentLength).toFixed(2));
            this.setState({progress: p});
          },
          progressDivider: 1,
        });
        download.promise
          .then(result => {
            if (result.statusCode == 200) {
              if (Platform.OS === 'android') {
                // RNApkInstallerN.install(filePath);
                console.log(filePath);
              }
            }
          })
          .catch(e => {
            console.warn(e);
          });
      }
    });
  };

  render() {
    return (
      <>
        <StatusBar hidden={Platform.OS == 'ios' && true} />
        <DownloadModal
          disablebuttons={this.state.disablebuttons}
          showDownloadModal={this.state.showDownloadModal}
          onTapClose={() => {
            const getCurrentDate = () => {
              var date = new Date().getDate();
              var month = new Date().getMonth() + 1;
              var year = new Date().getFullYear();

              return date + '-' + month + '-' + year;
            };
            this.setState(async () => {
              await AsyncStorage.setItem('appDate', getCurrentDate());
            });
            this.setState({showDownloadModal: false});
          }}
          onTapDownload={() => {
            this.onDownloadTapped();
          }}
          progress={this.state.progress}
        />
        <StatusBar barStyle="light-content" />
        {Platform.OS == 'ios' && (
          <SafeAreaView style={{flex: 0, backgroundColor: 'black'}} />
        )}

        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
          <AppContainer />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
