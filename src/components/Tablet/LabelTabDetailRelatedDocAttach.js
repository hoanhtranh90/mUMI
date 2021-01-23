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

const LabelTabDetailRelatedDocAttach = ({ type, count, onPress, isMinusAttach }) => {
  const labels = {
    0: {
      label: 'Luồng xử lý',
      icon: 'eoffice/assets/shuffle.png',
      style: {
        width: 20,
        height: 13,
        marginTop: 12,
        paddingLeft: 8,
      },
    },
    1: {
      label: 'Bình luận',
      icon: 'eoffice/assets/comment.png',
      style: {
        width: 24,
        height: 24,
        marginTop: 8,
        paddingLeft: 8,
      },
    },
    2: {
      label: 'Văn bản liên quan ban hành kèm',
      icon: 'eoffice/assets/clipboard-list-gray.png',
      style: {
        width: 24,
        height: 24,
        marginTop: 6,
        paddingLeft: 8,
      },
    },
  };
  return (
    <>
      {DeviceInfo.isTablet() && (
        <TouchableOpacity style={styles.field} onPress={onPress}>
          <Image
            style={labels[type].style}
            source={
              type === 0
                ? require('eoffice/assets/shuffle-gray.png')
                : require('eoffice/assets/clipboard-list-gray.png')
            }
            resizeMode="contain"
          />
          <Text style={styles.txt}>
            {labels[type].label} ({count})
          </Text>
          <Right>
            <Icon type="Feather" name={isMinusAttach ? 'plus' : 'minus'} style={{ fontSize: 11 }} />
          </Right>
        </TouchableOpacity>
      )}
      {!DeviceInfo.isTablet() && (
        <View style={styles.field} onPress={onPress}>
          <Image
            style={labels[type].style}
            source={
              type === 0
                ? require('eoffice/assets/shuffle-gray.png')
                : require('eoffice/assets/clipboard-list-gray.png')
            }
            resizeMode="contain"
          />
          <Text style={styles.txt}>
            {labels[type].label} ({count})
          </Text>
        </View>
      )}
    </>
  );
};

LabelTabDetailRelatedDocAttach.propTypes = {
  type: PropTypes.number.isRequired,
  count: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  isMinusAttach: PropTypes.bool,
};

LabelTabDetailRelatedDocAttach.defaultProps = {
  count: 0,
  isMinusAttach: true,
};

export default LabelTabDetailRelatedDocAttach;
