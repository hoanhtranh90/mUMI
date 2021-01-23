import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, View } from 'react-native';
import { Icon } from 'native-base';

import colors from 'eoffice/utils/colors';

const defaultStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.darkGray,
    width: 35,
    textAlign: 'center',
    paddingVertical: 0,
  },
  icon: {
    marginTop: 0,
    paddingRight: 0,
    fontSize: 17,
    color: colors.darkGray,
  },
});

const PercentInput = ({ styles, ...props }) => (
  <View style={[defaultStyles.wrapper, styles.wrapper]}>
    <TextInput
      {...props}
      keyboardType="numeric"
      returnKeyType="done"
      style={[defaultStyles.input, styles.input]}
    />
    <Icon name="percent" style={[defaultStyles.icon, styles.icon]} />
  </View>
);

PercentInput.propTypes = {
  styles: PropTypes.shape({
    wrapper: PropTypes.shape({}),
    input: PropTypes.shape({}),
    icon: PropTypes.shape({}),
  }),
};
PercentInput.defaultProps = {
  styles: {},
};

export default PercentInput;
