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
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import HeaderBar, {DotsIcon} from '../components/HeaderBar';
import Constants from '../utils/Constants';

import Icon from 'react-native-vector-icons/AntDesign';
import NetInfo from '@react-native-community/netinfo';
import VersionNumber from 'react-native-version-number';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import {
  AccountModel,
  SettingModel,
  LoginResponse,
  QRCodeDataModel,
} from '../utils/models';
import SettingsModal from '../modals/SettingsModal';
import SharedUtility from '../utils/SharedUtility';
import GlobalUtil from '../utils/GlobalUtil';
import API_Manager from '../utils/API_Manager';

const IconClose = <Icon name="close" size={24} color="white" />;
const IconCheck = <Icon name="check" size={24} color="white" />;
