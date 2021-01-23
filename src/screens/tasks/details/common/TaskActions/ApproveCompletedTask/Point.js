import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import colors from 'eoffice/utils/colors';

const iconSize = variables.deviceWidth * 0.08;

const styles = StyleSheet.create({
  textPoint: {
    fontSize: 14,
    paddingLeft: 0,
    paddingRight: 0,
  },
  btnPoint: {
    borderRadius: 50,
    borderColor: colors.lightBlue,
    backgroundColor: 'white',
    height: iconSize,
    width: iconSize,
  },
  selectedPoint: {
    backgroundColor: colors.blue,
  },
});

const Point = ({ id, pressButton, selected }) => (
  <Button
    vertical
    bordered
    onPress={pressButton}
    style={[styles.btnPoint, selected ? styles.selectedPoint : null]}
  >
    <Text style={[styles.textPoint, selected ? { color: '#ffffff' } : null]}>{id}</Text>
  </Button>
);

Point.propTypes = {
  selected: PropTypes.bool.isRequired,
  pressButton: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Point;
