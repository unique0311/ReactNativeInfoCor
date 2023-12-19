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
  render() {
    return <Text>ForgotPassword</Text>;
  }
}
