import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: 60,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.2)',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 8,
  },
  icon: {
    width: 32,
    height: 32,
    marginLeft: 12,
  },
  title: {
    color: '#007aff',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 12,
    flex: 1,
  },
  count: {
    color: '#007aff',
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 13,
  },
});

const AdministrativeItem = ({ icon, title, count, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.wrapper}>
      <Image style={styles.icon} resizeMode="contain" source={icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  </TouchableOpacity>
);

AdministrativeItem.propTypes = {
  icon: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  onPress: PropTypes.func,
};
AdministrativeItem.defaultProps = {
  count: null,
  onPress: null,
};

export default AdministrativeItem;
