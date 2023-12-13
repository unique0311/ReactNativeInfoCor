import AsyncStorage from '@react-native-community/async-storage';
import Constants from './Constants';
import {LoginResponse, QRCodeDataModel, SettingModel} from './models';

export default class SharedUtility {
  static Def_Server_Address = 'demo.infocopmobile.com';
  static ORI = 'NJ';

  InCollocamento = 1;
  Fondi = 0;
  NameDB = 'Arca';
  FolderBase = 'Application Support';
  FolderDB = 'DB';
  UtentePrivato = 'privato';
  UtenteProfessionale = 'collocatore';

  formatDateISO = 'yyyy-MM-ddTHH:mm:ss';

  IntrnalLink = 'applewebdata://';

  Url = Constants.IsTest
    ? 'http://www.arcaonline.it'
    : 'http://www.arcaonline.it';

  UrlWs = Url + '/api';

  UrlChiSiamo = '/app/chi-siamo.html';
  UrlSede = '/app/la-nostra-sede.html';
  UrlCedoleFondi = '/app/cedole-fondi-arca-html.html';

  KeyNgrid =
    'ty/P5j6zeieoSiFGBCxEKOvVhNgWX9hkWfJF5zvrIS7VDGd1UespFUOvvksiK/5YBsDLvT/w/HQZi/got0Dd3J6qbOwyisfgMXAIS2nGIGpNCx+5sFLwY+u383RgpAisVGJTcRl70Cdg65fyM37oPBX5nQcl145YF2kXph57+Polx39cN5kIAJza+xBFIN+/5qHllNZb5lp28ppect6lPDajt3Q7mgQmTQHuEXgrge7WLgs87ZWJuNIZUROn9T99Gho6UXOLwgZi6DHMyhNjUmyqVXzhlkKqRTMlWAQ54muRjWVfCcEsQgVTdVFDAXKIkipR13D4T2SWfAc/TCgvui+d3iPHgikwqFJhixpeS+V4oj35WggXFMSXxU1osovCkEV44cy7VfuEW1ZGjyeVtbv0yNDnHHvdHgEYJyX0CTj09AyWwgLwqB8oR+FATmnDvM3KobCKjUZF3z45vRGFYWyKtkKoCFOK6UY5qmwVmzr6mzYghTZ2r3Jl/HwhAhimxI0N4spoIO1mTI0Ex0hfzt69EHSyeev3t1sBDAVmcJhZmdIU3pqvI15ZDZGJiT5p9lIg3aF2tpTU4hppPAs0YJ40ofEHnjxCY2Nb/BO0DdrPI2AIKbWibrno6PrqRZ/mOErapIHJcSydR13UJAXXUyU9RppN/wa15ETxeOo6tdI=';

  static defaultState = 'NJ';

  static sharedSettingModel = null;

  static async setSettingModelFromLocal() {
    let settingData = await SharedUtility.getString('imported_setting');
    let obj = JSON.parse(settingData);
    let qrModel = new QRCodeDataModel(obj);
    let sm = new SettingModel();
    sm.qrData = qrModel;
    sm.serverAddress = qrModel.SVR;
    sm.deviceID = qrModel.DIN;
    sm.devicename = qrModel.DCN;
    sm.license = qrModel.MID;
    sm.sendETicket = false;

    SharedUtility.sharedSettingModel = sm;
  }

  static get StateList() {
    return [
      'AK',
      'AL',
      'AR',
      'AZ',
      'CA',
      'CO',
      'CT',
      'DC',
      'DE',
      'FL',
      'GA',
      'HI',
      'IA',
      'ID',
      'IL',
      'IN',
      'KS',
      'KY',
      'LA',
      'MA',
      'MD',
      'ME',
      'MI',
      'MN',
      'MO',
      'MS',
      'MT',
      'NC',
      'ND',
      'NE',
      'NH',
      'NJ',
      'NJ3',
      'NM',
      'NV',
      'NY',
      'OH',
      'OK',
      'OR',
      'PA',
      'RI',
      'SC',
      'SD',
      'TN',
      'TX',
      'UT',
      'VA',
      'VT',
      'WA',
      'WI',
      'WV',
      'WY',
    ];
  }

  static get SuffixList() {
    return ['Jr', 'Sr', 'I', 'II', 'III', 'IV', 'V', 'Other'];
  }

  static get AAQuestions() {
    return [
      "What is your mother's maiden name?",
      'What was the name of your first pet?',
      'What elementary school did you attend?',
      'What middle school did you attend?',
      'What high school did you attend?',
      'What college did you attend?',
      "What is your father's middle name?",
      "What is your mother's middle name?",
      'What was your favorite class in school?',
      'What is the name of your favorite sibling?',
      'What is your favorite activity?',
      'What is your favorite sport?',
      'What was your childhood nickname?',
      'In what city did you meet your significant other?',
      'What is the name of your favorite childhood friend?',
      'What street did you live on in third grade?',
      'What is your oldest sibling’s birthday month and year?',
      'What is the middle name of your oldest child?',
      "What is your oldest sibling's middle name?",
      'What school did you attend for sixth gradeWhat was your childhood phone number including area code?',
      "What is your oldest cousin's first and last name?",
      'What was the name of your first stuffed animal?',
      'In what city or town did your mother and father meet?',
      'Where were you when you had your first kiss?',
      'What is the first name of the boy or girl that you first kissed?',
      'What was the last name of your third grade teacher?',
      'In what city does your nearest sibling live?',
      'What is your oldest brother’s birthday month and year?',
      "What is your maternal grandmother's maiden name?",
      'In what city or town was your first job?',
      'What is the name of the place your wedding reception was held?',
      "What is the name of a college you applied to but didn't attend?",
      'Where were you when you first heard about 9/11?',
      'What was the name of your elementary / primary school?',
      'What is the name of the company of your first job?',
      'What was your favorite place to visit as a child?',
      "What is your spouse's mother's maiden name?",
      'What is the country of your ultimate dream vacation?',
      'What is the name of your favorite childhood teacher?',
      'To what city did you go on your honeymoon?',
      'What time of the day were you born?',
      'What was your dream job as a child?',
      'What is the street number of the house you grew up in?',
      "What is the license plate of your dad's first car?",
      'Who was your childhood hero?',
      'What was the first concert you attended?',
      'What are the last 5 digits of your credit card?',
      'What are the last 5 of your Social Security number?',
      'What is your current car registration number?',
      "What are the last 5 digits of your driver's license number?",
      'What month and day is your anniversary?',
      "What is your grandmother's first name?",
      "What is your mother's middle name?",
      'What is the last name of your favorite high school teacher?',
      'What was the make and model of your first car?',
      'Where did you vacation last year?',
      "What is the name of your grandmother's dog?",
      'What is the name, breed, and color of current pet?',
      'What is your preferred musical genre?',
      'In what city and country do you want to retire?',
      'What is the name of the first undergraduate college you attended?',
      'What was your high school mascot?',
      'What year did you graduate from High School?',
      'What is the name of the first school you attended?',
    ];
  }

  static defaultVehicleType = 'Regular Passenger Automobile Plates';
  // static defaultPlateVehicleType = 'Personalized/Customized';

  static get VehicleList() {
    return [
      'Ambulance',
      'Apportioned',
      'Antique',
      "Amateur Radio or Citizen's Band",
      'All-Terrain Vehicle',
      'Bus',
      'Consular Corps',
      'City-Owned or Municipal Vehicle',
      'Collegiate',
      'Commemorative',
      'Conservation',
      'Commercial',
      'County-Owned Vehicle',
      'Drive-Away',
      'Dunebuggy',
      'Dentist',
      'Dealer',
      'Diplomatic',
      'Duplicate, Reissue, or Replacement',
      'Disabled Veteran',
      'Disabled Person',
      'Exempt',
      'Fire Department',
      'Foreign Government',
      'Farm Vehicle',
      'Hearing Impaired',
      'International Plate',
      'In-Transit',
      'Judge or Justice',
      'Legislative, U. S.',
      'Law Enforcement',
      'Legislative, State',
      'Motorcycle',
      'Motorcycle Dealer',
      'Manufacturer',
      'Military Vehicle, Canadian',
      'Moped',
      'Armed Forces Reservist',
      'Military Vehicle, U. S.',
      'Military',
      'National Guard Member',
      'Civilian, Nonpassenger',
      'Omnibus',
      'Organization',
      'Regular Passenger Automobile Plates',
      'Personalized/Customized',
      'Professions',
      'Doctor',
      'Civilian, Passenger',
      'Press',
      'Professional Sports Teams',
      'Pharmacist',
      'Reciprocal (or Reciprocity)',
      'Rented Vehicle or Trailer',
      'Special Purpose Commercial Vehicle',
      'Snowmobile',
      'State-Owned Vehicle',
      'School Vehicle',
      'Truck',
      'Trailer',
      'Temporary',
      'Transporter',
      'Semitruck',
      'Cab',
      'U. S. Government Vehicles',
      'Medal of Honor',
      'All others',
    ];
  }

  static CreateRequest(Request) {
    // request is String

    Console.log('Creating Requests');

    let RequestURL = '';

    if (!SharedUtility.sharedSettingModel.serverAddress) {
      RequestURL =
        'https://' +
        SharedUtility.Def_Server_Address +
        '/api/prod/icrequest?' +
        Request;
    } else {
      RequestURL =
        'https://' +
        SharedUtility.sharedSettingModel.serverAddress +
        '/api/prod/icrequest?' +
        Request;
    }

    return RequestURL;
  }

  static async GetSharedAPIKey(defVal = null) {
    let value = new LoginResponse();

    let jsonVal = await AsyncStorage.getItem('sharedMID');
    if (jsonVal) {
      let data = JSON.parse(jsonVal);
      value = new LoginResponse(data);
    } else {
      value.Msg = defVal;
    }

    console.warn('GetSharedAPIKey: ', value.Msg);
    return value;
  }

  static async SetSharedAPIKey(val) {
    let jsonStr = JSON.stringify(val);
    // console.warn('>>> LINE 300 SetSharedAPIKey : ', jsonStr)
    await AsyncStorage.setItem('sharedMID', jsonStr);
  }

  static async GetDayOrNight() {
    let res = await AsyncStorage.getItem('day_night');
    return res.toLowerCase() == 'true';
  }

  static async SetDayOrNight(val) {
    await AsyncStorage.setItem('day_night', val.toString());
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
