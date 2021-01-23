import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// import { Icon } from 'native-base';
import RoundButton from './RoundButton';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    borderRadius: 8,
    flex: 1,
    borderWidth: 1,
    borderColor: '#dcdce6',
    marginHorizontal: 15,
    marginBottom: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#007aff',
    marginRight: 10,
    flex: 1,
  },
  icon: {
    fontSize: 24,
    color: '#f0c330',
  },
  iconRight: {
    fontSize: 24,
    color: '#007aff',
    marginRight: 12,
  },
  round: {
    height: 48,
    width: 48,
    backgroundColor: 'rgba(240, 195, 48, 0.2)',
    borderRadius: 24,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});

const UtilityItem = ({ title, icon, onPress }) => (
  <RoundButton
    icon="calendar"
    title="Xem lịch"
    color="#007aff"
    titleColor="white"
    onPress={onPress}
  />
);

UtilityItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};
UtilityItem.defaultProps = {
  onPress: null,
};

export default UtilityItem;
