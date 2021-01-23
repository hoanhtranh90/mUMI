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
  label: {
    width: 24,
    height: 24,
    marginTop: 8,
    paddingLeft: 8,
  },
});

const LabelTabDetailRelatedDoc = ({ type, count, onPress, isMinus }) => {
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
      style: styles.label,
    },
    2: {
      label: 'Văn bản liên quan',
      icon: 'eoffice/assets/clipboard-list-gray.png',
      style: styles.label,
    },
    3: {
      label: 'Files liên quan',
      icon: 'eoffice/assets/document-gray.png',
      style: styles.label,
    },
    4: {
      label: 'Văn bản báo cáo',
      icon: 'eoffice/assets/document-gray.png',
      style: styles.label,
    }
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
            <Icon type="Feather" name={isMinus ? 'plus' : 'minus'} style={{ fontSize: 11 }} />
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

LabelTabDetailRelatedDoc.propTypes = {
  type: PropTypes.number.isRequired,
  count: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  isMinus: PropTypes.bool,
};

LabelTabDetailRelatedDoc.defaultProps = {
  count: 0,
  isMinus: true,
};

export default LabelTabDetailRelatedDoc;
