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
  const navigation = useNavigation();
  const route = useRoute();

  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [animationLineHeight, setAnimationLineHeight] = useState(0);
  const [focusLineAnimation, setFocusLineAnimation] = useState(
    new Animated.Value(0),
  );

  useEffect(() => {
    getPermissionsAsync();
    animateLine();
  }, []);

  const animateLine = () => {
    Animated.sequence([
      Animated.timing(focusLineAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(focusLineAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(animateLine);
  };

  const getPermissionsAsync = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    const isPermissionGranted = status === 'granted';
    console.log(isPermissionGranted);
    setCameraPermission(isPermissionGranted);
  };

  const handleBarCodeScanned = ({type, data}) => {
    if (BarCodeScanner.Constants.BarCodeType.pdf417 === type) {
      setScanned(true);
      route.params.onGoBack(data);
      navigation.goBack();
    }
  };

  if (hasCameraPermission === null) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasCameraPermission === false) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={scanStyles.container}>
      <BarCodeScanner
        style={{
          width: Constants.WINDOW_WIDTH,
          height: Constants.WINDOW_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.pdf417,
        ]}></BarCodeScanner>
      <View style={scanStyles.overlay}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 10,
            top: 10,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          {IconClose}
        </TouchableOpacity>
        <View style={scanStyles.unfocusedContainer}></View>
        <View style={scanStyles.middleContainer}>
          <View style={scanStyles.unfocusedContainer}></View>

          <View
            onLayout={e => setAnimationLineHeight(e.nativeEvent.layout.height)}
            style={scanStyles.focusedContainer}>
            {!scanned && (
              <Animated.View
                style={[
                  scanStyles.animationLineStyle,
                  {
                    transform: [
                      {
                        translateY: focusLineAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, animationLineHeight],
                        }),
                      },
                    ],
                  },
                ]}
              />
            )}
            {scanned && (
              <TouchableOpacity
                onPress={() => setScanned(false)}
                style={scanStyles.rescanIconContainer}>
                <Text>Rescan</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={scanStyles.unfocusedContainer}></View>
        </View>
        <View style={scanStyles.unfocusedContainer}></View>
      </View>
    </View>
  );
};

const scanStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1.5,
  },
  focusedContainer: {
    flex: 6,
  },
  animationLineStyle: {
    height: 2,
    width: '100%',
    backgroundColor: 'red',
  },
  rescanIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DLScanPage;
