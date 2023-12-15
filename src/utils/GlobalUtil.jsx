import AsyncStorage from '@react-native-community/async-storage';

import NotificationService from './NotificationService';
import FingerprintScanner from 'react-native-fingerprint-scanner';
const AppJson = require('../../app.json');

export default class GlobalUtil {
  static FireLocalNotification(fireDate, title, body) {
    let scheduleDate = fireDate ? fireDate : new Date(Date.now() + 200);
    let notification = new NotificationService();
    notification.scheduleNotification(title, body, scheduleDate);
  }

  static IsTouchAvailable() {
    return new Promise((resolve, reject) => {
      FingerprintScanner.isSensorAvailable()
        .then(biometryType => {
          resolve(biometryType);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static GetVersionCode() {
    let ver = '';
    try {
      let version = AppJson.version;
      return version;
    } catch (e) {
      console.log('In GetVersionCode : ' + e.message);
      ver = '0.9.0.?';
    }
    return ver;
  }

  static async saveString(key, val) {
    await AsyncStorage.setItem(key, val);
  }

  static async readString(key, defStr) {
    let str = await AsyncStorage.getItem(key);
    return str;
  }

  static async saveBool(key, val) {
    await AsyncStorage.setItem(key, val.toString());
  }

  static async saveInt(key, val) {
    await AsyncStorage.setItem(key, val);
  }
  static async getString(key) {
    let res = await AsyncStorage.getItem(key);
    return res;
  }

  static async setDate(key, val) {
    await AsyncStorage.setItem(key, val);
  }
  static async getDate(key) {
    let res = await AsyncStorage.getItem(key);
    return res;
  }

  static async getInt(key) {
    let str = await AsyncStorage.getItem(key);
    if (str) {
      try {
        let intVal = parseInt(str);
        return intVal;
      } catch (ex) {
        return null;
      }
    } else {
      return null;
    }
  }
  static async getBool(key) {
    let str = await AsyncStorage.getItem(key);
    return str && str.toLowerCase() == 'true';
  }
}
