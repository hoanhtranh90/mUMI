import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import IconButton from 'eoffice/components/IconButton';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  field: {
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  rowFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtNoti: {
    fontSize: 19,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  txtRole: {
    fontWeight: 'bold',
  },
  txtRoleField: {
    paddingVertical: 8,
  },
});

const Header = ({ selectedDeptRole, navigation }) => (
  <View style={styles.field}>
    <View style={styles.rowFlex}>
      <IconButton
        icon="arrow-left"
        iconStyle={{ color: '#abb4bd' }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.txtNoti}>Thông báo</Text>
    </View>
    {/* <IconButton
      icon="arrow-left"
      iconStyle={{ color: '#abb4bd' }}
      onPress={() => {
        console.log(notifications);
      }}
    /> */}
    <Text style={styles.txtRoleField}>
      <Text>Chức vụ: </Text>
      <Text style={styles.txtRole}>{selectedDeptRole.positionName}</Text>
    </Text>
  </View>
);

Header.propTypes = {
  selectedDeptRole: PropTypes.shape({}),
};
Header.defaultProps = {
  selectedDeptRole: null,
};

export default withNavigation(Header);
