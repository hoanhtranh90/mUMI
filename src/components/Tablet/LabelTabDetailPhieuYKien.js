/* eslint-disable global-require,import/no-unresolved, react/prop-types */

import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Right, Icon, View } from 'native-base';
import DeviceInfo from 'react-native-device-info';

const styles = StyleSheet.create({
  field: {
    height: 36,
    backgroundColor: '#efeff4',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  txt: {
    paddingLeft: 8,
    color: '#2d3e4f',
    fontSize: 15,
    paddingTop: 8,
    fontWeight: 'bold',
  },
});

const LabelTabDetailPhieuYKien = ({count, onPress, isMinus }) => {
  const labels = {
      label: 'Phiếu ý kiến',
      icon: 'eoffice/assets/clipboard-list-gray.png',
      style: {
        width: 24,
        height: 24,
        marginTop: 6,
        paddingLeft: 8,
      }
  };
  return (
    <>
      {DeviceInfo.isTablet() && (
        <TouchableOpacity style={styles.field} onPress={onPress}>
          <Image
            style={labels.style}
            source={ require('eoffice/assets/clipboard-list-gray.png')}
            resizeMode="contain"
          />
          <Text style={styles.txt}>
            {labels.label} ({count})
          </Text>
          <Right>
            <Icon type="Feather" name={isMinus ? 'plus' : 'minus'} style={{ fontSize: 11 }} />
          </Right>
        </TouchableOpacity>
      )}
      {!DeviceInfo.isTablet() && (
        <View style={styles.field} onPress={onPress}>
          <Image
            style={labels.style}
            source={require('eoffice/assets/clipboard-list-gray.png')}
            resizeMode="contain"
          />
          <Text style={styles.txt}>
            {labels.label} ({count})
          </Text>
        </View>
      )}
    </>
  );
};

LabelTabDetailPhieuYKien.propTypes = {
  type: PropTypes.number.isRequired,
  count: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  isMinus: PropTypes.bool,
};

LabelTabDetailPhieuYKien.defaultProps = {
  count: 0,
  isMinus: true,
};

export default LabelTabDetailPhieuYKien;
