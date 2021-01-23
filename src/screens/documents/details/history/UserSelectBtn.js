import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'native-base';

import colors from 'eoffice/utils/colors';

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    top: 0,
    left: Platform.OS === 'ios' ? 95 : 60,
    backgroundColor: colors.darkGray,
    borderRadius: 17,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  icon: {
    color: colors.yellow,
    fontSize: 16,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.lighterGray,
    paddingRight: 8,
  },
});

const UserSelectBtn = ({ onPress, users }) => {
  const hasUser = users && users.length;
  const text = hasUser
    ? `${users[0].fullName}${users.length > 1 ? ` + ${users.length - 1}` : ''}`
    : 'Chọn người nhận';
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
      <Icon name={hasUser ? 'users' : 'user-plus'} style={styles.icon} />
    </TouchableOpacity>
  );
};

UserSelectBtn.propTypes = {
  onPress: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.shape({})),
};
UserSelectBtn.defaultProps = {
  onPress() {},
  users: null,
};

export default UserSelectBtn;
