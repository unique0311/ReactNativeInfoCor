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
  render() {
    return <Text>EAVC</Text>;
  }
}
