import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Item } from 'native-base';

const styles = StyleSheet.create({
  item: {
    marginLeft: 0,
    marginBottom: 10,
    paddingBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
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
