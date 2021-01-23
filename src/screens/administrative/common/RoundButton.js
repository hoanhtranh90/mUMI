import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import DeviceInfo from 'react-native-device-info'
const w = Dimensions.get('window').width;

const styles = StyleSheet.create({
  wrapper: {
    height: 48,
    width: DeviceInfo.isTablet() ? 160 : w * 0.4,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.1)',
    borderBottomWidth: 0,
    shadowColor: 'rgba(0, 122, 255, 0.2)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginRight: 10,
  },
  icon: {
    fontSize: 24,
    color: 'white',
  },
});

const RoundButton = ({ icon, title, titleColor, color, itemSyle, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.wrapper, itemSyle, { backgroundColor: color }]}>
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      <Icon name={icon} type="Feather" style={styles.icon} />
    </View>
  </TouchableOpacity>
);

RoundButton.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  itemSyle: PropTypes.shape({}),
  onPress: PropTypes.func,
};
RoundButton.defaultProps = {
  onPress: null,
  icon: null,
  titleColor: null,
  itemSyle: {},
};

export default RoundButton;
