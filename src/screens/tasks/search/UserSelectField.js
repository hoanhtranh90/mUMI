import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import Avatar from 'eoffice/components/Avatar';
import ModalUser from 'eoffice/components/modals/UserSelectModal';
import colors from 'eoffice/utils/colors';

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
    marginTop: 7,
    backgroundColor: colors.lighterGray,
    borderRadius: 16.5,
    height: 36,
    flexDirection: 'row',
  },
  touchableOpacity: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  view: {
    paddingHorizontal: 7,
    alignItems: 'center',
    paddingVertical: 7.5,
  },
  tex: {
    fontSize: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textDefault: {
    ...Platform.select({
      ios: {
        paddingVertical: null,
        height: 20,
        marginTop: 12,
        fontSize: 17,
        color: '#2b2d50',
      },
      android: {
        paddingVertical: 0,
        height: null,
        marginTop: 0,
        paddingTop: 7,
        fontSize: 14,
      },
    }),
    color: colors.gray,
    fontWeight: 'bold',
  },
});

const UserSelectField = ({ setUsers, users, textDefault }) => {
  const [visible, setVisible] = useState(false);
  const text = users ? users[0]?.fullName : textDefault;
  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        {!users?.length ? (
          <Text style={styles.textDefault}>{textDefault}</Text>
        ) : (
          <View style={styles.viewContainer}>
            <Avatar name={text} size={36} />
            <View style={styles.view}>
              <Text style={text}>{users ? text : textDefault}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>

      <ModalUser isVisible={visible} onClose={() => setVisible(false)} onSelected={setUsers} />
    </>
  );
};

UserSelectField.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})),
  setUsers: PropTypes.func,
  textDefault: PropTypes.string,
};
UserSelectField.defaultProps = {
  users: null,
  setUsers() {},
  textDefault: '',
};

export default UserSelectField;
