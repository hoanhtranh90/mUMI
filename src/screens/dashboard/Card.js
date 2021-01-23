import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

import variables from '../../native-base-theme/variables/commonColor';

const size = Math.min((variables.deviceWidth - 42) / 2, 400);
const styles = StyleSheet.create({
  wrapper: {
    width: size,
    height: size,
    borderColor : '#eee',
    borderWidth : 0.5,
    borderRadius: 12,
    backgroundColor : "#fff",
    padding: 15,
    margin: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: 54,
    height: 54,
    marginBottom: 26,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const Card = ({ borderColor, color, img, label, onPress, sub }) => (
  <TouchableOpacity style={[styles.wrapper]} onPress={onPress}>
    <Image style={styles.img} resizeMode="contain" source={img} />
    <Text style={[styles.label, { color }]}>{label}</Text>
    {sub}
  </TouchableOpacity>
);

Card.propTypes = {
  borderColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  img: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,

  sub: PropTypes.node,
};
Card.defaultProps = {
  sub: null,
};

export default Card;
