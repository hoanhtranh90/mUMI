import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import colors from 'eoffice/utils/colors';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  content: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 24,
    borderStyle: 'dashed',
  },
  name: {
    color: colors.gray,
    fontSize: 17,
    fontWeight: 'bold',
  },
  role: {
    color: colors.gray,
    fontSize: 15,
  },
});

const HandlerPlaceholder = ({ roleName }) => (
  <View style={styles.row}>
    <View style={styles.avatar} />
    <View style={styles.content}>
      <Text style={styles.name}>{`Chọn người ${roleName}`}</Text>
      <Text style={styles.role}>-</Text>
    </View>
  </View>
);

HandlerPlaceholder.propTypes = {
  roleName: PropTypes.string,
};
HandlerPlaceholder.defaultProps = {
  roleName: '',
};

export default HandlerPlaceholder;
