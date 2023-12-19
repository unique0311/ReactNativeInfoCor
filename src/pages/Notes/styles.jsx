import {StyleSheet} from 'react-native';
import Constants from '../../utils/Constants';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'stretch',
    paddingHorizontal: 0,
    ...StyleSheet.absoluteFillObject,
  },

  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: 10,
  },

  closeButton: {
    paddingVertical: 10,
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    color: 'white',
    marginTop: 5,
  },

  inputText: {
    height: 40,
    color: 'white',
    backgroundColor: 'transparent',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    fontSize: 15,
  },
  multilineText: {
    height: 150,
    color: 'white',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    fontSize: 15,
    textAlignVertical: 'top',
  },

  mainButton: {
    height: 45,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: Constants.blackTrans,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    color: 'white',
    marginVertical: 10,
  },
});

export default styles;
