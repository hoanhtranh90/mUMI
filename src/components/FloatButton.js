import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

import colors from '../utils/colors';

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    shadowColor: 'rgb(0, 122, 255)',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  txt: {
    fontSize: 15,
    color: colors.blue,
    fontWeight: '600',
  },
});

const FloatButton = ({ onPress, text }) => (
  <Button style={styles.btn} onPress={onPress}>
    <Text style={styles.txt} uppercase={false}>
      {text}
    </Text>
  </Button>
);

FloatButton.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
};
FloatButton.defaultProps = {
  onPress() {},
  text: '',
};

export default FloatButton;
