/* eslint-disable global-require,import/no-unresolved */

import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import { Icon, Picker, Text } from 'native-base';

import colors from '../../utils/colors';

const styles = StyleSheet.create({
  header: { flexDirection: 'row', paddingVertical: 14, paddingLeft: 30, paddingRight: 18 },
  img: { width: 59, height: 59 },
  userContainer: { paddingLeft: 16, alignItems: 'center', flex: 1 },
  name: { fontSize: 17, fontWeight: '600', color: colors.darkGray, marginBottom: 4 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#dcdce6',
    borderRadius: 12,
    alignSelf: 'stretch',
  },
  picker: {
    height: 25,
    width: '100%',
    paddingHorizontal: 12,
    paddingTop: 0,
    paddingBottom: 0,
    alignSelf: 'stretch',
  },
  pickerIcon: {
    color: colors.blue,
    fontSize: 18,
    lineHeight: 18,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
  },
  pickerText: {
    fontSize: 14,
    color: '#79828b',
    paddingLeft: 0,
    paddingRight: 4,
    flexShrink: 1,
  },
});

const SidebarHeader = ({ changeDeptRole, deptRole, deptRoles, navigation, user }) => (
  <View style={styles.header}>
    <Image style={styles.img} resizeMode="contain" source={require('eoffice/assets/user.png')} />
    <View style={styles.userContainer}>
      <Text style={styles.name}>{user?.fullName}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          mode="dropdown"
          selectedValue={deptRole?.id}
          textStyle={styles.pickerText}
          iosIcon={<Icon name="chevron-down" style={styles.pickerIcon} />}
          style={styles.picker}
          onValueChange={val => {
            const newDr = deptRoles.find(d => d.id === val);
            if (newDr) {
              changeDeptRole(newDr);
              navigation.navigate('Dashboard');
              navigation.closeDrawer();
            }
          }}
        >
          {deptRoles.map(({ deptName, id, positionName }) => (
            <Picker.Item key={id} label={`${positionName} - ${deptName}`} value={id} />
          ))}
        </Picker>
      </View>
    </View>
  </View>
);

SidebarHeader.propTypes = {
  changeDeptRole: PropTypes.func.isRequired,

  deptRole: PropTypes.shape({}),
  deptRoles: PropTypes.arrayOf(PropTypes.shape({})),
  user: PropTypes.shape({}),
};
SidebarHeader.defaultProps = {
  deptRole: null,
  deptRoles: [],
  user: {},
};

export default SidebarHeader;
