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

const IconEdit = <Icon name="edit" size={24} color="white" />;
const IconCopy = <Icon name="copy1" size={24} color="white" />;
const IconSetting = <Icon name="setting" size={24} color="white" />;

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
