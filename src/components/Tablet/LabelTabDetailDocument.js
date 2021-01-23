/* eslint-disable global-require,import/no-unresolved, react/prop-types */

import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

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

const LabelTabDetailDocument = ({ type }) => {
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
      label: 'Văn bản liên quan',
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
    <View style={styles.field}>
      <Image
        style={labels[type].style}
        source={
          type === 0
            ? require('eoffice/assets/shuffle-gray.png')
            : require('eoffice/assets/clipboard-list-gray.png')
        }
        resizeMode="contain"
      />
      <Text style={styles.txt}>{labels[type].label}</Text>
    </View>
  );
};

LabelTabDetailDocument.propTypes = {
  type: PropTypes.number.isRequired,
};

export default LabelTabDetailDocument;
