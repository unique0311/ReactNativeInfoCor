import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
export const MenuIcon = ({color, size}) => {
  return <Icon name={'menu'} size={size} color={color} />;
};
export const BackIcon = ({color, size}) => {
  return <Icon name={'chevron-thin-left'} size={size} color={color} />;
};

export const DotsIcon = ({color, size}) => {
  return <Icon name={'dots-three-vertical'} size={size} color={color} />;
};

import Constants from '../utils/Constants';

const HeaderBar = ({
  title,
  onLeftButton,
  leftIcon,
  rightIcon,
  onRightButton,
  leftIconColor,
  titleColor = Constants.white,
  isBackLeft = false,
  isShowRight = true,
  isShowLeft = true,
}) => {
  let [liveData, setLiveData] = useState('live data init value.');
  let [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(counter + 1);
  }, [liveData]);

  global.setTestLiveData = setLiveData.bind(this);

  return (
    <View style={styles.container}>
      {isShowLeft ? (
        <TouchableOpacity onPress={onLeftButton} style={styles.leftIcon}>
          {leftIcon != null ? (
            leftIcon
          ) : isBackLeft ? (
            <BackIcon size={25} color={'white'} />
          ) : (
            <MenuIcon
              size={35}
              color={leftIconColor ? leftIconColor : '#6733bb'}
            />
          )}
        </TouchableOpacity>
      ) : null}
      <View style={styles.titleContainer}>
        <Text style={{color: titleColor, fontSize: 20}}>{title}</Text>
      </View>
      {isShowRight ? (
        <TouchableOpacity onPress={onRightButton} style={styles.rightIcon}>
          {rightIcon != null ? rightIcon : null}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Constants.black,
    width: Dimensions.get('screen').width,
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 909009,
  },
  titleContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    paddingTop: 0,
    paddingRight: 50,
    fontWeight: 'bold',
    color: Constants.purple,
  },
  rightButton: {
    alignItems: 'center',
    position: 'absolute',
    top: 15,
    right: 15,
  },
  leftIcon: {
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    bottom: 5,
  },
  rightIcon: {
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
});
