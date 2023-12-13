import AsyncStorage from '@react-native-community/async-storage';

export class UserIdCheckResponse {
  constructor(data) {
    this.Msg = null;
    this.isValidUserID = false;
    this.aaInfo = null;
  }
}

export class AAInfoUserIDCheck {
  constructor(data) {
    this.STP = null;
    this.QUE = null;
    this.ANS = null;
    this.PIC = null;
    this.PIN = null;
    this.RSK = null;
  }
}

export class AccountModel {
  UserID = null;
  Password = null;
  Pin = null;
  static tmpPwd = null;
  static tempPin = null;

  constructor(data = null) {
    if (data !== null) {
    }
  }

  static get CusUserID() {
    return (async () => await AsyncStorage.getItem('curuser_id'))();
  }

  static set CusUserID(val) {
    return (async () => await AsyncStorage.setItem('curuser_id', val))();
  }

  async saveSettingData() {
    let jsonVal = JSON.stringify(this);
    console.log('account_registration save ' + jsonVal);
    await AsyncStorage.setItem('account_registration_' + this.UserID, jsonVal);
  }

  static async isTouchRegistered() {
    let res = await AsyncStorage.getItem('touch_registered');
    return res?.toLowerCase() == 'true';
  }

  static async setTouchRegistered(boolVal) {
    await AsyncStorage.setItem('touch_registered', boolVal.toString());
  }

  static async isActiveLockScreen(boolVal = null) {
    if (boolVal === null) {
      let res = await AsyncStorage.getItem('isActiveLockScreen');
      return res?.toLowerCase() == 'true';
    } else {
      await AsyncStorage.setItem('isActiveLockScreen', boolVal.toString());
    }
  }

  async readSettingData(userID) {
    let jsonVal = await AsyncStorage.getItem('account_registration_' + userID);

    console.log('account_registration  ' + jsonVal);
    if (!jsonVal) {
      return false;
    }
    let am = JSON.parse(jsonVal);

    this.UserID = am.UserID;
    this.Password = am.Password;
    this.Pin = am.Pin;

    return true;
  }

  static async isRegistered(userId) {
    let jsonVal = await AsyncStorage.getItem('account_registration_' + userId);

    if (!jsonVal) {
      return false;
    }

    let ac = new AccountModel();
    ac.readSettingData(userId);

    if (!ac.Pin || !ac.Password || !ac.UserID) {
      return false;
    }
    return true;
  }

  static async isNotShowTouchRegisterPage() {
    let res = await AsyncStorage.getItem('not_show_touch_page');
    return res?.toLowerCase() == 'true';
  }
  static async setNotShowTouchRegisterPage(boolVal) {
    await AsyncStorage.setItem('not_show_touch_page', boolVal.toString());
  }
}

export class PlateReqModel {
  RequestID = null;
  Msg = null;

  constructor(data) {
    if (data) {
      this.RequestID = data.RequestID;
      this.Msg = data.Msg;
    }
  }
}

export class PlateRunResModel {
  RequestID = null;
  Hit = null;
  Alert = null;
  Keywords = null;
  NCICKeywords = null;
  Msg = null;
  RspModel = null; //PlateRunRes_RSPModel

  constructor(data) {
    if (data) {
      this.RequestID = data.RequestID;
      this.Hit = data.Hit;
      this.Alert = data.Alert;
      this.Keywords = data.Keywords;
      this.NCICKeywords = data.NCICKeywords;
      this.Msg = data.Msg;
      this.RspModel = new PlateRunRes_RSPModel(data.Rsp);
    }
  }
}

export class PlateRunRes_RSPModel {
  dmvRsp = null; //PlateRunRes_DMVRspModel

  NCICRsp = null;
  TxtMsgRsp = null;
  CaseNo = null;
  Notes = null;
  PercentMatch = null;

  constructor(data) {
    if (data) {
      this.dmvRsp = new PlateRunRes_DMVRspModel(data.DMVRsp);

      this.NCICRsp = data.NCICRsp;
      this.TxtMsgRsp = data.TxtMsgRsp;
      this.CaseNo = data.CaseNo;
      this.Notes = data.Notes;
      this.PercentMatch = data.PercentMatch;
    }
  }
}

export class PlateRunRes_DMVRspModel {
  RequestID = null;
  PlateNumber = null;
  PlateState = null;

  PlateYear = null;
  VIN = null;
  PASGVWLEN = null;
  VehYear = null;
  VehMake = null;
  VehModel = null;
  VehBody = null;
  VehColor = null;
  VehExp = null;
  AxelsProp = null;
  Name = null;
  FirstName = null;
  MiddleName = null;
  LastName = null;
  Suffix = null;
  DLNumber = null;
  DLState = null;
  DLExp = null;
  Class = null;
  DOB = null;
  Sex = null;
  Eyes = null;
  Height = null;
  Weight = null;
  SSN = null;
  Age = null;
  Points = null;

  Photo = null;
  Address = null;
  City = null;
  State = null;
  Zip = null;
  Restrictions = null;
  Msg = null;
  Corporate = null;

  UserName = null; //User_Name_Model  Credentials

  constructor(data) {
    if (data) {
      this.RequestID = data.RequestID;
      this.PlateNumber = data.PlateNumber;
      this.PlateState = data.PlateState;

      this.PlateYear = data.PlateYear;
      this.VIN = data.VIN;
      this.PASGVWLEN = data.PASGVWLEN;
      this.VehYear = data.VehYear;
      this.VehMake = data.VehMake;
      this.VehModel = data.VehModel;
      this.VehBody = data.VehBody;
      this.VehColor = data.VehColor;
      this.VehExp = data.VehExp;
      this.AxelsProp = data.AxelsProp;
      this.Name = data.Name;
      this.FirstName = data.FirstName;
      this.MiddleName = data.MiddleName;
      this.LastName = data.LastName;
      this.Suffix = data.Suffix;
      this.DLNumber = data.DLNumber;
      this.DLState = data.DLState;
      this.DLExp = data.DLExp;
      this.Class = data.Class;
      this.DOB = data.DOB;
      this.Sex = data.Sex;
      this.Eyes = data.Eyes;
      this.Height = data.Height;
      this.Weight = data.Weight;
      this.SSN = data.SSN;
      this.Age = data.Age;
      this.Points = data.Points;

      this.Photo = data.Photo;
      this.Address = data.Address;
      this.City = data.City;
      this.State = data.State;
      this.Zip = data.Zip;
      this.Restrictions = data.Restrictions;
      this.Msg = data.Msg;
      this.Corporate = data.Corporate;

      UserName = new User_Name_Model(data.Credentials);
    }
  }
}

export class User_Name_Model {
  username = null;
  constructor(data) {
    if (data) {
      this.username = data.username;
    }
  }
}

export class LoginResponse {
  Msg = null;

  constructor(data = null) {
    if (data != null) {
      this.Msg = data.Msg;
    }
  }

  get IsValidApiKey() {
    if (!this.Msg) {
      return false;
    } else {
      const regex = /[A-Za-z0-9\-]+/g;
      const list = [...this.Msg.matchAll(regex)];
      if (list.length > 0) {
        let key = list[0][0];
        console.log(key);
        if (key.length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  getAPIKey(place) {
    let din = this.Msg;
    din = din ? din : place;
    return din;
  }
}

export class SettingModel {
  qrData = null; // QRCodeDataModel
  serverAddress = null;
  devicename = null;
  deviceID = null;
  license = null;
  sendETicket = false;

  // [JsonIgnore]
  cleanlogoff = false;

  getDIN(placeHolder) {
    let din = this.deviceID;
    din = din ? din : placeHolder;
    return din;
  }

  getDCN(placeHolder) {
    let din = this.devicename;
    din = din ? din : placeHolder;
    return din;
  }

  getMID(placeHolder) {
    let din = this.license;

    din = din ? din : placeHolder;

    return din;
  }

  getServerAddr(placeHolder) {
    let din = this.serverAddress;

    din = din ? din : placeHolder;

    return din;
  }

  async saveSettingData() {
    let jsonVal = JSON.stringify(this);
    AsyncStorage.setItem('setting_model', jsonVal);
    // SharedUtility.saveString ("setting_model", jsonVal);
  }

  async readSettingData() {
    let jsonVal = await AsyncStorage.getItem('setting_model');

    if (!jsonVal) {
      return;
    }

    let sm = JSON.parse(jsonVal);
    console.log('readSettingData line > 244 :', sm);
    license = sm.license;
    qrData = sm.qrData;
    serverAddress = sm.serverAddress;
    deviceID = sm.deviceID;
    devicename = sm.devicename;
    sendETicket = sm.sendETicket;
  }
}

export class QRCodeDataModel {
  SVR = null;
  DCN = null;
  DIN = null;
  MID = null;

  constructor(data = null) {
    if (data) {
      this.SVR = data.SVR;
      this.DCN = data.DCN;
      this.DIN = data.DIN;
      this.MID = data.MID;
    }
  }
}
