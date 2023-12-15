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
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from '../utils/Constants';

const IconClose = <Icon name="close" size={24} color="white" />;
const IconCheck = <Icon name="check" size={24} color="white" />;

