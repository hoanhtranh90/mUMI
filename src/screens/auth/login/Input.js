import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Item } from 'native-base';

import { moderateScale } from 'eoffice/utils/scaling';

const styles = StyleSheet.create({
  item: {
    marginLeft: 0,
    marginBottom: moderateScale(10, 0.5),
    paddingBottom: moderateScale(1, 10.5),
  },
  text: {
    color: '#0091ff',
    fontSize: moderateScale(16, 0.5),
  },
});

const FormInput = ({ containerStyle, ...inputProps }) => (
  <View style={containerStyle}>
    <Item style={styles.item}>
      <Input {...inputProps} style={styles.text} autoCapitalize="none" />
    </Item>
  </View>
);

FormInput.propTypes = {
  containerStyle: PropTypes.shape({}),
};
FormInput.defaultProps = {
  containerStyle: {},
};

export default FormInput;
