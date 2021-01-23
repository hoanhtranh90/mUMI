import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 13,
    marginLeft: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const CountBadge = ({ bgColor, color, count }) => (
  <View
    style={[
      styles.badge,
      {
        backgroundColor: bgColor,
      },
    ]}
  >
    <Text style={[styles.text, { color }]}>{count}</Text>
  </View>
);

CountBadge.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  count: PropTypes.number,
};
CountBadge.defaultProps = {
  bgColor: '#fff',
  color: '#000',
  count: 0,
};

export default CountBadge;
