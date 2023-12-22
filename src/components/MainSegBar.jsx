import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Constants from '../utils/Constants';

const MainSegBar = ({selIndex = 0, onTapSeg}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: Constants.transparent,
        marginVertical: 10,
        borderBottomColor: Constants.blackTrans,
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          flex: 1,
          height: 50,
          borderRadius: 25,
          backgroundColor:
            selIndex == 0 ? Constants.blackTrans : Constants.transparent,
        }}>
        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => {
            onTapSeg(0);
          }}>
          <Text style={styles.tabTitle}>REQUEST</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          height: 50,
          borderRadius: 25,
          backgroundColor:
            selIndex == 1 ? Constants.blackTrans : Constants.transparent,
        }}>
        <TouchableOpacity
          onPress={() => {
            onTapSeg(1);
          }}
          style={styles.tabBtn}>
          <Text style={styles.tabTitle}>RESPONSE</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          height: 50,
          borderRadius: 25,
          backgroundColor:
            selIndex == 2 ? Constants.blackTrans : Constants.transparent,
        }}>
        <TouchableOpacity
          onPress={() => {
            onTapSeg(2);
          }}
          style={styles.tabBtn}>
          <Text style={styles.tabTitle}>HISTORY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainSegBar;

const styles = StyleSheet.create({
  tabTitle: {
    color: Constants.white,
    fontSize: 15,
  },
  tabBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 25,
  },
});
