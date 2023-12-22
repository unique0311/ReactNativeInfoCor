import Constants from './Constants';
import moment from 'moment';

const Utils = {
  shuffle: arr => {
    let endIndex = arr.length - 1;
    let res = arr.map(x => x);

    for (let i = 0; i <= endIndex; i += 2) {
      const newIndex = Math.round(Math.random() * endIndex);
      let temp = res[i];
      res[i] = res[newIndex];
      res[newIndex] = temp;
    }
    return res;
  },
  getBase64Png: src => {
    return 'data:image/png;base64,' + src;
  },

  getLocaleTime: () => {
    let date = new Date();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  },
  toLocalDateTime: timestamp => {
    let date = new Date(timestamp);
    let res = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    console.log('Type of date parsed', typeof date, date.toLocaleTimeString());
    return res;
  },

  CheckTimeDiff: (dateTime1, dateTime2, unit = 'seconds') => {
    let dt1 =
      Constants.getDateStr(dateTime1) + ' ' + Constants.getTimeStr(dateTime1);
    let moment1 = moment(dt1, 'YYYY-MM-DD HH:mm:ss');

    let dt2 =
      Constants.getDateStr(dateTime2) + ' ' + Constants.getTimeStr(dateTime2);
    let moment2 = moment(dt2, 'YYYY-MM-DD HH:mm:ss');

    let diff = moment2.diff(moment1, unit);
    console.log(dateTime1, dateTime2, ' **** DIFF', diff);
    return diff;
  },

  timeStrAdded: (timeFullStr, valueAdded, unit = 'minutes') => {
    let mObj = moment(timeFullStr, 'YYYY-MM-DD HH:mm:ss').add(valueAdded, unit);
    return mObj.format('YYYY-MM-DD HH:mm:00');
  },

  timeDateFullStr: time_str => {
    try {
      return moment(time_str, 'YYYY-MM-DD HH:mm:ss', true).format(
        'HH:mm,  D MMM YYYY',
      );
    } catch (e) {
      return time_str;
    }
  },

  genRandPwd: () => {
    return Math.random().toString(36).slice(-8);
  },

  isNullOrEmptyStr: str => {
    if (!str) {
      return true;
    } else {
      let val = str.trim();
      if (val == '') {
        return true;
      }
    }

    return false;
  },
  sleep: ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
};

export default Utils;
