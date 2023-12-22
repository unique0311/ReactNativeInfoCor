import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
  BackHandler,
  Share,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Constants from '../utils/Constants';
import Icon from 'react-native-vector-icons/AntDesign';

import VersionNumber from 'react-native-version-number';
import {FlatList} from 'react-native-gesture-handler';
import DeviceBrightness from '@adrianso/react-native-device-brightness';

import {DotsIcon} from '../components/HeaderBar';
import SettingsModal from '../modals/SettingsModal';
import API_Manager from '../utils/API_Manager';
import MainSegBar from '../components/MainSegBar';
import SharedUtility from '../utils/SharedUtility';
import AAVC from './AAVC';
import {AccountModel, PlateRunResModel} from '../utils/models';
import Utils from '../utils/Utils';

const IconEdit = <Icon name="edit" size={24} color="white" />;
const IconCopy = <Icon name="copy1" size={24} color="white" />;
const IconSetting = <Icon name="setting" size={24} color="white" />;

export function MainTopHeader({
  onTapLogo,
  onTapEdit,
  onTapCopy,
  onTapSettings,
  onTapMoreMenu,
  onTapLogOff,
}) {
  const [isShowMenu, setIsShowMenu, isShowSetting] = useState(false);

  const onTapMenuItem = index => {
    if (index == 0) {
      onTapLogo();
    } else if (index == 1) {
      onTapLogOff();
    }
    setIsShowMenu(false);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingLeft: 10,
        height: 50,
        backgroundColor: Constants.black,
      }}>
      <TouchableOpacity
        style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
        onPress={() => {
          onTapLogo();
        }}>
        <Image
          source={require('../../assets/images/startlogo.png')}
          style={{width: 40, height: 40, resizeMode: 'contain'}}
        />
        <View>
          <Text style={{color: 'white', fontSize: 18, marginLeft: 10}}>
            InfoCopMobile
          </Text>
          <Text style={{color: 'white', fontSize: 12, marginLeft: 14}}>
            {VersionNumber.appVersion} - {VersionNumber.buildVersion}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => {
            onTapSettings();
          }}
          style={{paddingHorizontal: 10, paddingVertical: 10}}>
          {IconSetting}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTapEdit();
          }}
          style={{paddingHorizontal: 10, paddingVertical: 10}}>
          {IconEdit}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTapCopy();
          }}
          style={{paddingHorizontal: 10, paddingVertical: 10}}>
          {IconCopy}
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingHorizontal: 10, paddingVertical: 10}}
          onPress={() => {
            // onTapMoreMenu();
            setIsShowMenu(true);
          }}>
          <DotsIcon color={'white'} size={24} />
        </TouchableOpacity>
      </View>

      <Modal animationType={'fade'} transparent={true} visible={isShowMenu}>
        <View
          style={{
            flex: 1,
            width: Constants.WINDOW_WIDTH,
            height: Constants.WINDOW_HEIGHT,
            backgroundColor: 'rgba(13,13,13,0.4)',
          }}>
          <TouchableOpacity
            style={{
              width: Constants.WINDOW_WIDTH,
              height: Constants.WINDOW_HEIGHT,
            }}
            onPress={() => {
              setIsShowMenu(false);
            }}></TouchableOpacity>

          <View
            style={{
              borderRadius: 10,
              position: 'absolute',
              right: 10,
              top: 40,
              backgroundColor: 'white',
              width: 150,
            }}>
            <TouchableOpacity
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 15,
              }}
              onPress={() => {
                onTapMenuItem(0);
              }}>
              <Text>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 15,
              }}
              onPress={() => {
                onTapMenuItem(1);
              }}>
              <Text>LogOff</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

class Main extends React.Component {
  render() {
    return (
      <>
        <Text>Main Page</Text>
      </>
    );
  }
}

export default function (props) {
  let navigation = useNavigation();
  let route = useRoute();

  return <Main {...props} navigation={navigation} route={route} />;
}
