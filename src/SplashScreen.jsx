import React from 'react';
import {View, ImageBackground, Image} from 'react-native';
import Constants from './utils/Constants';
import {useNavigation, useRoute} from '@react-navigation/native';

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _bootAsync = async () => {
    setTimeout(() => {
      this.props.navigation.navigate('login');
    }, 3000);
  };

  componentDidMount() {
    this._bootAsync();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/images/bluebg.jpg')}
          style={{
            flex: 1,
            width: Constants.WINDOW_WIDTH,
            height: Constants.WINDOW_HEIGHT,
            resizeMode: 'cover',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/images/iclogo.jpg')}
            style={{
              width: '70%',
              resizeMode: 'contain',
            }}
          />
        </ImageBackground>
      </View>
    );
  }
}

export default function (props) {
  let navigation = useNavigation();
  let route = useRoute();
  return <SplashScreen {...props} navigation={navigation} route={route} />;
}
