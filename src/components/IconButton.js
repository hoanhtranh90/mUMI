import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import colors from '../utils/colors';

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 25,
    height: 40,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    paddingTop: 0,
    marginLeft: 0,
    marginRight: 0,
  },
});

const IconButton = ({ icon, iconFamily, iconStyle, style, ...restProp }) => (
  <Button {...restProp} bordered icon style={[styles.btn, style]}>
    <Icon name={icon} type={iconFamily} style={[styles.icon, iconStyle]} />
  </Button>
);

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,

  iconFamily: PropTypes.string,
  iconStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
};
IconButton.defaultProps = {
  iconFamily: 'Feather',
  iconStyle: {},
  style: {},
};

export default IconButton;
