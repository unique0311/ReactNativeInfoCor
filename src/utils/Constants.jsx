import {Dimensions, Platform, StatusBar} from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {height, width} = Dimensions.get('window');

export const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;

export const StatusBarHeight = Platform.select({
  ios: isIPhoneX() ? 40 : 20,
  android: StatusBar.currentHeight,
  default: 0,
});

export function isIOS() {
  return Platform.OS == 'ios' ? true : false;
}

const Constants = {
  IsTest: true,
  WINDOW_WIDTH: Dimensions.get('window').width,
  WINDOW_HEIGHT: Dimensions.get('window').height,

  Months: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Org',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  Days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

  ucfirst: string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  lcfirst: string => {
    return string.charAt(0).toLowerCase() + string.slice(1);
  },

  emptyString: str => {
    if (str != null) {
      str.replace(' ', '');
    }
    return str == '' || str == null;
  },

  numberToFix2: val => {
    let number = parseFloat(val);
    if (!number) {
      return null;
    }
    return number.toFixed(2);
  },

  getDateStr: date => {
    console.log('getDateStr function: ', typeof date, date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let mins = date.getMinutes();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (mins < 10) {
      mins = '0' + mins;
    }
    return year + '-' + month + '-' + day;
  },

  getTimeStr: date => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let mins = date.getMinutes();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (mins < 10) {
      mins = '0' + mins;
    }

    return hour + ':' + mins + ':00';
  },

  shortString: (value, len = 30) => {
    try {
      if (value.length > len) {
        let res = value.substr(0, len) + ' ...';
        return res;
      }
      return value;
    } catch (ex) {
      return null;
    }
  },
  distance(lat1, lon1, lat2, lon2, unit = 'K') {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == 'K') {
        dist = dist * 1.609344;
      }
      if (unit == 'N') {
        dist = dist * 0.8684;
      }
      let res = 0;
      try {
        res = dist.toFixed(2);
      } catch (e) {
        console.log('Exception in Constants.js line 245:', e);
        res = 0;
      }
      return res;
    }
  },

  convKmToMiles: km => {
    try {
      let miles = km / 1.6;
      return miles.toFixed(2);
    } catch (e) {
      console.log('Execption in convKmToMiles:', e);
      return 0;
    }
  },

  getDateTimeStr: (dateTimeObj, showSeconds = false) => {
    let h = dateTimeObj.getHours();
    let m = dateTimeObj.getMinutes();
    let s = dateTimeObj.getSeconds();
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    if (showSeconds == true) {
      return Constants.getDateStr(dateTimeObj) + ' ' + h + ':' + m + ':' + s;
    } else {
      return Constants.getDateStr(dateTimeObj) + ' ' + h + ':' + m;
    }
  },

  style: {
    defaultShadow: {
      elevation: 5,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.2,
    },
  },

  transparent: '#0000',
  blackTrans: '#8885',
  placeholderColor: '#fff8',
  fbColor: '#4267B2',
  googleColor: '#dd4b39',
  backWhite: '#E7F6FB',
  white: '#FFFFFF',
  black: '#000000',
  purple: '#B888FA',
  darkBlue: '#00002D',

  lightBlue: '#009FE9',
  FrameBlue: '#271CFC',
  FrameGreen: '#31859D',
  FrameLightGreen: '#92D051',
  FrameBlack: '#000000',
  FrameRed: '#FF3737',
  FrameLightRed: '#EE8DAC',
  FrameLightPurple: '#B3A1C7',
  FrameWhite: '#FFFFFF',
};

export default Constants;
