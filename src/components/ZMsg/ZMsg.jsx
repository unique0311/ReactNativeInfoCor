import React, {forwardRef, useImperativeHandle} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {BallIndicator} from 'react-native-indicators';
import PropTypes from 'prop-types';
import Constants from '../../utils/Constants';

import * as Feather from 'react-native-vector-icons/Feather';
import * as AntDesign from 'react-native-vector-icons/AntDesign';
import * as MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const WINDOW_WIDTH = Dimensions.get('window').width;

export const MsgTypes = {
  success: 1,
  failed: 2,
  error: 3,
  warn: 4,
  confirm: 5,
};

const iconBack = {
  width: 48,
  height: 48,
  borderRadius: 24,
  alignItems: 'center',
  justifyContent: 'center',
};

const iconSize = 25;
const iconColor = 'white';

export const MsgTypeIcons = {
  1: () => {
    return (
      <View style={{...iconBack, backgroundColor: Constants.purpleColor}}>
        <Feather name="check" size={iconSize} color={iconColor} />
      </View>
    );
  },
  2: () => {
    return (
      <View style={{...iconBack, backgroundColor: Constants.purpleColor}}>
        <AntDesign name="close" size={iconSize} color={iconColor} />
      </View>
    );
  },
  3: () => {
    return (
      <View style={{...iconBack, backgroundColor: Constants.purpleColor}}>
        <MaterialIcons name="error" size={iconSize} color={iconColor} />
      </View>
    );
  },
  4: () => {
    return (
      <View style={{...iconBack, backgroundColor: Constants.purpleColor}}>
        <AntDesign name="warning" size={iconSize} color={iconColor} />
      </View>
    );
  },
  5: () => {
    return (
      <View style={{...iconBack, backgroundColor: Constants.purpleColor}}>
        <AntDesign name="question" size={iconSize} color={iconColor} />
      </View>
    );
  },
};

export const MsgTypeButtons = {
  Ok: ({title = 'OK', onPress}) => {
    return (
      <TouchableOpacity
        key={10001}
        style={{
          ...styles.button,
          backgroundColor: Constants.purpleColor,
          width: '100%',
        }}
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}>
        <Text style={{color: 'white', fontSize: 15}}>{title}</Text>
      </TouchableOpacity>
    );
  },
  Cancel: ({title = 'CANCEL', onPress}) => {
    return (
      <TouchableOpacity
        key={10002}
        style={{
          ...styles.button,
          borderColor: Constants.purpleColor,
          borderWidth: 1,
        }}
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}>
        <Text style={{color: Constants.purpleColor, fontSize: 15}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  },
};

const ZMsg = forwardRef((props, ref) => {
  const {
    type = MsgTypes.success,
    title = 'Alarm of PhotoStar',
    text,
    isLoadingIndicator = false,
    onTapOkButton = null,
    onTapCancelButton = null,
    showDefaultOk = true,
    showDefaultCancel = false,
    btnGroups = [],
  } = props;

  const [isShow, setIsShow] = React.useState(false);

  let btns = btnGroups.map((btnItem, index) => {
    let title = btnItem.title;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          if (btnItem.onPress) {
            btnItem.onPress();
          }
        }}>
        <View style={{...styles.button}}>
          <Text style={{fontSize: 15}}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  });

  const show = () => {
    setIsShow(true);
  };

  const hide = () => {
    setIsShow(false);
  };

  useImperativeHandle(ref, () => ({
    showMsg() {
      show();
    },
    hideMsg() {
      hide();
    },
  }));

  const onTapOk = () => {
    hide();
    if (onTapOkButton) {
      onTapOkButton();
    }
  };

  const onTapCancel = () => {
    hide();
    if (onTapCancelButton) {
      onTapCancelButton();
    }
  };

  if (showDefaultOk) {
    btns.push(MsgTypeButtons.Ok({onPress: onTapOk}));
  }
  if (showDefaultCancel || type == MsgTypes.confirm) {
    btns.push(MsgTypeButtons.Cancel({onPress: onTapCancel}));
  }

  return (
    <Modal animationType="fade" transparent={true} visible={isShow}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(13,13,13,0.35)',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 5,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.2,
        }}>
        {isLoadingIndicator ? (
          <BallIndicator color={Constants.white} size={45} />
        ) : (
          <View style={styles.mainContainer}>
            <View style={styles.iconContainer}>{MsgTypeIcons[type]}</View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgText}>{text}</Text>
            </View>
            <View style={styles.btnGroupContainer}>
              {btns.map(item => item)}
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
});

ZMsg.propTypes = {
  isPageLoader: PropTypes.bool,
};

ZMsg.defaultProps = {
  isPageLoader: false,
};

export default ZMsg;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    elevation: 15,
  },
  iconContainer: {
    height: 45,
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  titleContainer: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgContainer: {
    paddingVertical: 5,
    alignItems: 'center',
  },
  btnGroupContainer: {
    paddingVertical: 5,

    alignItems: 'stretch',
  },
  iconBack: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: Constants.purpleColor,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  msgText: {
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    height: 45,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginVertical: 5,
    paddingVertical: 5,
  },
});
