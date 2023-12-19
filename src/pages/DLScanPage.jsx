import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Animated, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Constants from '../utils/Constants';
import Icon from 'react-native-vector-icons/AntDesign';
import {Permissions} from 'react-native-unimodules';
import {BarCodeScanner} from 'expo-barcode-scanner';

const IconClose = <Icon name="close" size={24} color="white" />;
const IconCheck = <Icon name="check" size={24} color="white" />;

const DLScanPage = () => {
  return <Text>DLScanPage</Text>;
};

export default DLScanPage;
