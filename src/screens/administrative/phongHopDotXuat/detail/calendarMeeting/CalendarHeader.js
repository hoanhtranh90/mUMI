import React from 'react';
import { StyleSheet } from 'react-native';
import { Title } from 'native-base';

import IconButton from 'eoffice/components/IconButton';
import CustomHeader from 'eoffice/components/CustomHeader';
import colors from 'eoffice/utils/colors';
import NavigationService from 'eoffice/utils/NavigationService';

const styles = StyleSheet.create({
  left: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  grayBg: {
    borderColor: colors.lightGray,
  },
  input: {
    color: colors.darkGray,
    height: 40,
    paddingLeft: 0,
  },
  titleStyleContent: {
    fontSize: 20,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
});

const CalendarHeader = ({ navigation }) => (
  <CustomHeader
    Left={
      <IconButton
        icon="arrow-left"
        iconStyle={{ color: colors.gray }}
        style={styles.grayBg}
        // onPress={() => navigation.goBack()}
        onPress={() => NavigationService.navigate('AdministrativeSummary')}
      />
    }
    Content={<Title style={styles.titleStyleContent}>Quay lại</Title>}
    hasBorder
  />
);

export default CalendarHeader;
