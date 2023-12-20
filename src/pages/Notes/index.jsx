import React, {ReactNode, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import API_Manager from '../../utils/API_Manager.jsx';
import styles from './styles.js';

const IconClose = <Icon name="close" size={24} color="white" />;

const NotesScreen = props => {
  const [caseNo, setCaseNo] = useState(props.route.params.plateResObj.CSN);
  const [notes, setNotes] = useState(props.route.params.plateResObj.NTS);

  const updateNotes = () => {
    showPageLoader(true);

    const apiManager = new API_Manager();
    let params = {
      CSN: caseNo,
      NTS: notes.replace(' ', '%20'),
      RIN: props.route.params.plateResObj.RIN,
    };

    apiManager.UpdateNotes(params, response => {
      console.log('RESULT>>>', response);
      showPageLoader(false);
    });
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/bluebg.jpg')}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              props.navigation.goBack();
            }}>
            {IconClose}
          </TouchableOpacity>

          <Text style={styles.label}>Case Number</Text>
          <TextInput
            style={styles.inputText}
            value={caseNo}
            keyboardType={'default'}
            autoCapitalize="characters"
            onChangeText={text => setCaseNo(text)}
            placeholder={''}
          />

          <Text style={[styles.label, {marginTop: 15}]}>Notes</Text>
          <TextInput
            style={styles.multilineText}
            value={notes}
            multiline={true}
            numberOfLines={5}
            keyboardType={'default'}
            autoCapitalize="characters"
            onChangeText={text => setNotes(text)}
            placeholder={''}
          />

          <TouchableOpacity style={styles.mainButton} onPress={updateNotes}>
            <Text style={styles.btnText}>UpdateNotes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default NotesScreen;
