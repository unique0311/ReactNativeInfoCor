import VersionNumber from 'react-native-version-number';
import {LoginResponse, PlateReqModel} from '../utils/models';
import SharedUtility from '../utils/SharedUtility';
import {Alert} from 'react-native';

const futch = (url, opts = {}, onProgress) => {
  console.log(url, opts);
  return new Promise((res, rej) => {
    var xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'get', url);
    for (var k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k]);
    xhr.onload = e => res(e.target);
    xhr.onerror = rej;
    if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress;
    xhr.send(opts.body);
  });
};

const requestCall = (
  fullUrl,
  method,
  body,
  headers,
  callBack,
  isResponseJson = true,
) => {
  let reqParams = {
    method: method,
  };
  if (headers !== null) {
    reqParams.headers = headers;
  }
  if (body !== null) {
    reqParams.body = JSON.stringify(body);
  }
  // let fullUrl = isFullUrl ? subUrl : hostURL + subUrl;

  console.log(fullUrl);
  console.log('reqParams:', reqParams);
  if (isResponseJson == false) {
    fetch(fullUrl).then(function (response) {
      console.log('response:', response);
      return response.text().then(text => {
        console.log('text:', text);
        callBack(text, null);
      });
    });
  } else {
    fetch(fullUrl, reqParams)
      .then(function (response) {
        console.log('response:', response);

        return response.json();
      })
      .then(function (data) {
        console.log(data);
        // if ( isResponseJson == true ){
        callBack(data, null);
        // }
      })
      .catch(function (err) {
        console.log('err', err);
        callBack(null, err);
      })
      .then(function () {
        console.log('final callback');
      });
  }
};

function BearerHeader(token) {
  const header = {
    Authorization: 'Bearer ' + token,
  };
  return header;
}

const formDataCall = (
  fullUrl,
  method,
  body,
  headers,
  callBack,
  isFullLink = false,
) => {
  let link = fullUrl;
  futch(
    link,
    {
      method: method,
      body: body,
      headers: headers,
    },
    progressEvent => {
      const progress = progressEvent.loaded / progressEvent.total;
      console.log(progress);
    },
  ).then(
    function (resJson) {
      console.log('Here is response from server!>>>>>|||>>|:>');

      try {
        let res = JSON.parse(resJson.response);
        console.log('after parsing: ', res);
        callBack(res, null);
      } catch (exception) {
        console.log(exception);
        callBack(null, exception);
      }
    },
    err => {
      console.log('parsing err ', err);
      callBack(null, err);
    },
  );
};

export default class API_Manager {
  static apiUrl = 'https://demo.infocopmobile.com/api/prod/';

  static CheckUserIDurl = 'login?STP=User&UID=';

  getAPIKey = async (urlToRead, un, pw, ver, del) => {
    //Task<ServiceResponse>

    let headers = {
      icun: un,
      icpw: pw,
      ver: ver,
      del: del,
    };

    console.log('request url :', urlToRead);
    console.log('getAPiKey >  headers :', JSON.stringify(headers, null, 4));

    return new Promise((resolve, reject) => {
      requestCall(urlToRead, 'get', null, headers, (res, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };

  getRootUrl = () => {
    let sm = SharedUtility.sharedSettingModel;
    let value = '';
    if (sm != null) {
      value = `https://${sm.serverAddress}/api/prod/`;
    } else {
      value = 'https://demo.infocopmobile.com/api/prod/';
    }
    return value;
  };

  CheckUserID = userId => {
    let url =
      API_Manager.apiUrl + '' + API_Manager.CheckUserIDurl + '' + userId;

    return new Promise((resolve, reject) => {
      requestCall(
        url,
        'get',
        null,
        null,
        (res, err) => {
          if (err) {
            reject(err);
          } else {
            resolve({...res, avatar: avatar});
          }
        },
        true,
      );
    });
  };

  MakeRequest = async (urlToRead, apikey, stuff) => {
    console.log('MakeRequest Params: ', urlToRead, apikey, stuff);
    try {
      let res = await this.getMakeRequestResonse(urlToRead, apikey, stuff);
      console.log('Service Response : ', res);
      return res;
    } catch (ex) {
      console.log('Exception raised', ex.message);
      return null;
    }
  };

  MakePostRequest = async (urlToRead, apikey, stuff) => {
    console.log('MakeRequest Params: ', urlToRead, apikey, stuff);
    try {
      let res = await this.getMakeRequestResonse(urlToRead, apikey, stuff);
      console.log('Service Response : ', res);
      return res;
    } catch (ex) {
      console.log('Exception raised', ex.message);
      return null;
    }
  };

  getMakeRequestResonse = (urlToRead, apikey, stuff) => {
    let sm = SharedUtility.sharedSettingModel;

    if (sm != null) {
      let headers = {'api-key': apikey};

      if (stuff != null && stuff.length >= 2) {
        headers.lat = stuff[0];
        headers.long = stuff[1];
      }

      console.log('request url :' + urlToRead);
      console.log('apikey :' + apikey);

      if (stuff != null) {
        console.log('lat :' + stuff[0]);
        console.log('long :' + stuff[1]);
      }

      return new Promise((resolve, reject) => {
        requestCall(urlToRead, 'get', null, headers, (res, err) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    } else {
      return null;
    }
  };

  postMakeRequestResonse = (urlToRead, apikey, stuff) => {
    let sm = SharedUtility.sharedSettingModel;

    if (sm != null) {
      let headers = {'api-key': apikey};

      if (stuff != null && stuff.length >= 2) {
        headers.lat = stuff[0];
        headers.long = stuff[1];
      }

      console.log('request url :' + urlToRead);
      console.log('apikey :' + apikey);

      if (stuff != null) {
        console.log('lat :' + stuff[0]);
        console.log('long :' + stuff[1]);
      }

      return new Promise((resolve, reject) => {
        requestCall(urlToRead, 'post', null, headers, (res, err) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    } else {
      return null;
    }
  };

  LogOff = async CompletionHandler => {
    let stillon = true;
    let i = 0;
    while (stillon && i < 7) {
      await this.ProcessLogOff();
      stillon = await this.CheckLogOff();
      i++;
    }

    if (CompletionHandler != null) {
      if (stillon == false) {
        CompletionHandler(true, 'Successfully logout.');
      } else {
        CompletionHandler(false, 'Failed to logout.');
      }
    }

    if (stillon == false) {
      await SharedUtility.SetSharedAPIKey(new LoginResponse());
    }
  };

  ProcessLogOff = async () => {
    console.log('Starting LogOff Process');

    let apikey = (await SharedUtility.GetSharedAPIKey('NULL')).getAPIKey();
    console.log('LINE 284 >> API_Manager: apikey: ', apikey);
    let serverip = SharedUtility.sharedSettingModel.getServerAddr('NULL');

    let LogInRsp = await this.MakeRequest(
      'https://' + serverip + '/api/prod/logoff',
      apikey,
      null,
    );
    console.log('API_Mannager  LogInRsp: Line: 248 ', LogInRsp);
    console.log('API_Mannager apikey:  LINE : 249', apikey);

    return LogInRsp;
  };

  CheckLogOff = async () => {
    console.log('Starting CheckLogOff Process');

    let apikey = (await SharedUtility.GetSharedAPIKey()).getAPIKey('NULL');

    let serverip = SharedUtility.sharedSettingModel.getServerAddr('NULL');

    let sr = await this.MakeRequest(
      'https://' + serverip + '/api/prod/logoff?onoff=doit',
      apikey,
      null,
    );

    let LogInRsp = sr.Msg;

    console.log(apikey);
    console.warn('LogOff response : LogInRsp > ', LogInRsp);
    if (LogInRsp.toLowerCase() == 'on') {
      return true;
    } else if (LogInRsp.toLowerCase() == 'off') {
      SharedUtility.sharedSettingModel.cleanlogoff = true;
      let lr = new LoginResponse();
      lr.Msg = '';
      await SharedUtility.SetSharedAPIKey(lr);
      return false;
    } else {
      return false;
    }
  };

  MakeRequestPlate = async (urlToRead, apikey, stuff) => {
    // string urlToRead, string apikey, string[] stuff

    console.log(
      ' LINE 305 >> MakeRequestPlate >>  urlToRead, apikey, stuff >> : ',
      urlToRead,
      apikey,
      stuff,
    );

    let res = await this.getMakeRequestResonse(urlToRead, apikey, stuff);

    if (res == null) {
      return null;
    }
    console.log(
      'getMakeRequestResonse  response >>> ',
      JSON.stringify(res, null, 4),
    );
    let resReq = new PlateReqModel(res);
    return resReq;
  };

  UpdateNotes = async (params, CompletionHandler) => {
    let apikey = (await SharedUtility.GetSharedAPIKey()).getAPIKey('NULL');
    let serverip = SharedUtility.sharedSettingModel.getServerAddr('NULL');
    let _url = 'https://' + serverip + '/api/prod/icrequest?';
    let pms =
      'CSN=' + params.CSN + '&NTS=' + params.NTS + '&Dept=' + params.RIN;

    let sr = await this.MakePostRequest(
      _url + pms + '&MID=' + apikey,
      apikey,
      null,
    );
    CompletionHandler(sr);
  };

  GetUserStatus = async CompletionHandler => {
    console.log('Starting GetUserStatus Process');

    let apikey = (await SharedUtility.GetSharedAPIKey()).getAPIKey('NULL');
    // alert(apikey)
    let serverip = SharedUtility.sharedSettingModel.getServerAddr('NULL');
    // alert(serverip)
    let sr = await this.MakePostRequest(
      'https://' + serverip + '/api/prod/icrequest?MID=' + apikey,
      apikey,
      null,
    );

    CompletionHandler(sr);
  };

  UpdateUserStatus = async (sta, zone, staff, CompletionHandler) => {
    console.log('Starting GetUserStatus Process');

    let apikey = (await SharedUtility.GetSharedAPIKey()).getAPIKey('NULL');
    // alert(apikey)
    let serverip = SharedUtility.sharedSettingModel.getServerAddr('NULL');
    // alert(serverip) 37.42199833333335-122.08400000000002
    let sr = await this.MakePostRequest(
      'https://' +
        serverip +
        '/api/prod/icrequest?STA=' +
        sta +
        '&LOC=' +
        zone +
        '&GPS=GPSCOOR&ADR=' +
        staff +
        '&MID=' +
        apikey,
      apikey,
      null,
    );

    CompletionHandler(sr);
  };

  GetHazmat = async (hazmat, CompletionHandler) => {
    console.log('Starting GetUserStatus Process');

    let apikey = (await SharedUtility.GetSharedAPIKey()).getAPIKey('NULL');
    // alert(apikey)
    let serverip = SharedUtility.sharedSettingModel.getServerAddr('NULL');
    // alert(serverip)
    let sr = await this.MakePostRequest(
      'https://' + serverip + '/api/prod/icrequest?HAZMAT=' + hazmat,
      apikey,
      null,
    );

    CompletionHandler(sr);
  };

  GetHistory = async CompletionHandler => {
    console.log('Starting GetUserStatus Process');

    let apikey = (await SharedUtility.GetSharedAPIKey()).getAPIKey('NULL');
    // alert(apikey)
    let serverip = SharedUtility.sharedSettingModel.getServerAddr('NULL');
    // alert(serverip)
    let sr = await this.MakePostRequest(
      'https://' + serverip + '/api/prod/icrequest?HIST=50',
      apikey,
      null,
    );

    CompletionHandler(sr);
  };

  ResetPasswordApi = async (params, CompletionHandler) => {
    console.log('Starting GetUserStatus Process');
    let dt = new Date();
    let apikey = (await SharedUtility.GetSharedAPIKey()).getAPIKey('NULL');
    // alert(apikey)
    let serverip = SharedUtility.sharedSettingModel.getServerAddr('NULL');
    // alert(serverip)
    let _url = 'https://' + serverip + '/api/Login/ResetPassword?';
    let pms =
      'EmpID=' +
      params.EmpID +
      '&DeviceCodeName=' +
      params.DeviceCodeName +
      '&Dept=' +
      params.Dept +
      '&CallType=' +
      params.CallType +
      '&OTPType=' +
      params.OTPType +
      '&NewPassword=' +
      params.NewPassword +
      '&ConfirmPassword=' +
      params.ConfirmPassword +
      '&CellPhone=' +
      '' +
      '&EmailID=' +
      params.EmailID +
      '&OTPSentTime=' +
      params.OTPSentTime +
      '&OTP=' +
      params.OTP;

    let __url = _url + pms;
    // alert(__url)
    // let sr =  await this.postMakeRequestResonse (__url, apikey, params);

    let sm = SharedUtility.sharedSettingModel;

    // if (sm != null) {

    let headers = {
      'api-key': apikey,
      'dmvApi-key': '{b09eafe2-6d5q-4178-a80d-wq841991f631}',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    console.log(headers);
    // if (stuff != null && stuff.length >= 2) {
    //     headers.lat = stuff [0]
    //     headers.long = stuff [1]
    // }

    // console.log("request url :" + urlToRead);
    // console.log("apikey :" + apikey);

    // if (stuff != null) {
    //     console.log("lat :" + stuff [0]);
    //     console.log("long :" + stuff [1]);
    // }

    // return new Promise((resolve, reject)=>{

    // requestCall( __url, 'post', params, headers, (res, err)=>{
    //     if(err){
    //         CompletionHandler( err )
    //     }else{
    //         CompletionHandler( res )
    //     }
    // })
    console.log('----url-----' + apikey);
    console.log(__url);
    fetch(__url, {
      body: pms,
      headers: headers,
      method: 'POST',
    })
      .then(function (response) {
        console.log('response:', response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        CompletionHandler(data);
      })
      .catch(function (err) {
        Alert.alert(err.message, '', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      })
      .then(function () {
        console.log('final callback');
      });
  };
  ResetPasswordApi5 = async (params, CompletionHandler) => {
    console.log('Starting GetUserStatus Process');
    let dt = new Date();

    let serverip = SharedUtility.sharedSettingModel.getServerAddr('NULL');

    let _url = 'https://' + serverip + '/api/Login/ResetPassword?';
    let pms =
      'EmpID=' +
      params.EmpID +
      '&DeviceCodeName=' +
      params.DeviceCodeName +
      '&Dept=' +
      params.Dept +
      '&CallType=' +
      params.CallType +
      '&CurrentPassword=' +
      params.CurrentPassword +
      '&CurrentPIN=' +
      params.CurrentPIN;

    let __url = _url + pms;
    let sm = SharedUtility.sharedSettingModel;
    let headers = {
      'api-key': apikey,
      'dmvApi-key': '{b09eafe2-6d5q-4178-a80d-wq841991f631}',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    console.log('----url-----' + apikey);
    console.log(__url);
    fetch(__url, {
      body: pms,
      headers: headers,
      method: 'POST',
    })
      .then(function (response) {
        console.log('response:', response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        CompletionHandler(data);
      })
      .catch(function (err) {
        alert(JSON.stringify(err));
      })
      .then(function () {
        console.log('final callback');
      });
  };
  ResetPasswordApi6 = async (params, CompletionHandler) => {
    console.log('Starting GetUserStatus Process');
    let apikey = (await SharedUtility.GetSharedAPIKey()).getAPIKey('NULL');

    let serverip = SharedUtility.sharedSettingModel.getServerAddr('NULL');

    let _url = 'https://' + serverip + '/api/Login/ResetPassword?';
    var pms = '';
    if (params.ChangeOtherSettings) {
      pms =
        'EmpID=' +
        params.EmpID +
        '&DeviceCodeName=' +
        params.DeviceCodeName +
        '&Dept=' +
        params.Dept +
        '&CallType=' +
        params.CallType +
        '&CurrentPIN=' +
        params.CurrentPIN +
        '&CurrentPassword=' +
        params.CurrentPassword +
        '&NewPassword=' +
        params.NewPassword +
        '&ConfirmPassword=' +
        params.ConfirmPassword +
        '&ChangeOtherSettings=' +
        params.ChangeOtherSettings +
        '&NewPIN=' +
        params.NewPIN +
        '&ConfirmPIN=' +
        params.ConfirmPIN +
        '&SecurityQuestion=' +
        params.SecurityQuestion +
        '&SecurityAnswer=' +
        params.SecurityAnswer +
        '&SecurityPhoto=' +
        params.SecurityPhoto;
    } else {
      pms =
        'EmpID=' +
        params.EmpID +
        '&DeviceCodeName=' +
        params.DeviceCodeName +
        '&Dept=' +
        params.Dept +
        '&CallType=' +
        params.CallType +
        '&CurrentPIN=' +
        params.CurrentPIN +
        '&CurrentPassword=' +
        params.CurrentPassword +
        '&NewPassword=' +
        params.NewPassword +
        '&ConfirmPassword=' +
        params.ConfirmPassword +
        '&ChangeOtherSettings=' +
        params.ChangeOtherSettings;
    }

    let __url = _url + pms;
    let sm = SharedUtility.sharedSettingModel;
    let headers = {
      'api-key': apikey,
      'dmvApi-key': '{b09eafe2-6d5q-4178-a80d-wq841991f631}',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    console.log('----url-----' + apikey);
    console.log(__url);
    fetch(__url, {
      body: pms,
      headers: headers,
      method: 'POST',
    })
      .then(function (response) {
        console.log('response:', response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        CompletionHandler(data);
      })
      .catch(function (err) {
        alert(JSON.stringify(err));
      })
      .then(function () {
        console.log('final callback');
      });
  };
  CheckUpdateApp = async CompletionHandler => {
    if (SharedUtility.sharedSettingModel === null) {
      CompletionHandler(null);
    } else {
      let serverip = SharedUtility.sharedSettingModel.getServerAddr('NULL');
      let apikey = (await SharedUtility.GetSharedAPIKey()).getAPIKey('NULL');
      let sr = await this.MakeRequest(
        'https://' +
          serverip +
          '/api/prod/icrequest?GetUpdate=' +
          VersionNumber.buildVersion,
        apikey,
        null,
      );
      CompletionHandler(sr);
    }
  };
  GetUserProfile = async (params, CompletionHandler) => {
    console.log('Starting GetUserStatus Process');
    let dt = new Date();
    let apikey = (await SharedUtility.GetSharedAPIKey()).getAPIKey('NULL');

    let serverip = SharedUtility.sharedSettingModel.getServerAddr('NULL');

    let _url = 'https://' + serverip + '/api/Login/ResetPassword?';
    let pms =
      'EmpID=' +
      params.EmpID +
      '&DeviceCodeName=' +
      params.DeviceCodeName +
      '&Dept=' +
      params.Dept +
      '&CallType=' +
      params.CallType;
    let __url = _url + pms;
    let sm = SharedUtility.sharedSettingModel;
    let headers = {
      'api-key': apikey,
      'dmvApi-key': '{b09eafe2-6d5q-4178-a80d-wq841991f631}',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    console.log('----url-----' + apikey);
    console.log(__url);
    fetch(__url, {
      body: pms,
      headers: headers,
      method: 'POST',
    })
      .then(function (response) {
        console.log('response:', response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        CompletionHandler(data);
      })
      .catch(function (err) {
        alert(JSON.stringify(err));
      })
      .then(function () {
        console.log('final callback');
      });
  };

  SaveUserProfile = async (params, CompletionHandler) => {
    console.log('Starting GetUserStatus Process');
    let dt = new Date();
    let apikey = (await SharedUtility.GetSharedAPIKey()).getAPIKey('NULL');

    let serverip = SharedUtility.sharedSettingModel.getServerAddr('NULL');

    let _url = 'https://' + serverip + '/api/Login/ResetPassword?';
    let pms =
      'EmpID=' +
      params.EmpID +
      '&DeviceCodeName=' +
      params.DeviceCodeName +
      '&Dept=' +
      params.Dept +
      '&CallType=' +
      params.CallType +
      '&FirstName=' +
      params.FirstName +
      '&MiddleName=' +
      params.MiddleName +
      '&LastName=' +
      params.LastName +
      '&CellPhone=' +
      params.CellPhone +
      '&EmailID=' +
      params.EmailID;

    let __url = _url + pms;
    let sm = SharedUtility.sharedSettingModel;

    let headers = {
      'api-key': apikey,
      'dmvApi-key': '{b09eafe2-6d5q-4178-a80d-wq841991f631}',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    console.log('----url-----' + apikey);
    console.log(__url);
    fetch(__url, {
      body: pms,
      headers: headers,
      method: 'POST',
    })
      .then(function (response) {
        console.log('response:', response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        CompletionHandler(data);
      })
      .catch(function (err) {
        alert(JSON.stringify(err));
      })
      .then(function () {
        console.log('final callback');
      });
  };
}
