import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';

import colors from '../utils/colors';

const styles = StyleSheet.create({
  btn: {
    borderColor: 'transparent',
    marginHorizontal: 10,
  },
  iconWrapper: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
  },
  text: {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 14,
    color: colors.darkGray,
    paddingTop: 3,
  },
});

const Fsb = ({ icon, text, borderColor, iconStyle, style, textStyle, ...props }) => (
  <Button vertical bordered style={[styles.btn, style]} {...props}>
    <View
      style={[
        styles.iconWrapper,
        { borderColor },
        {
          backgroundColor: DeviceInfo.isTablet() ? '#2d3e4f' : '#fff',
          borderWidth: DeviceInfo.isTablet() ? 0 : 1,
        },
      ]}
    >
      {React.cloneElement(icon, {
        style: [styles.icon, icon.props.style],
      })}
    </View>
    <Text
      style={[
        styles.text,
        textStyle,
        {
          color: DeviceInfo.isTablet() ? '#fff' : colors.darkGray,
        },
      ]}
      uppercase={false}
    >
      {text}
    </Text>
  </Button>
);

Fsb.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,

  borderColor: PropTypes.string,
  iconStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
  textStyle: PropTypes.shape({}),
};
Fsb.defaultProps = {
  borderColor: '#fff',
  iconStyle: {},
  style: {},
  textStyle: {},
};

export default Fsb;
