import React from 'react';
import { StyleSheet } from 'react-native';
import { Title } from 'native-base';

import IconButton from 'eoffice/components/IconButton';
import CustomHeader from 'eoffice/components/CustomHeader';
import colors from 'eoffice/utils/colors';
import NavigationService from "../../../../utils/NavigationService";

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

const CreateScreenHeader = ({ navigation }) => (
  <CustomHeader
    Left={
      <IconButton
        icon="arrow-left"
        iconStyle={{ color: colors.gray }}
        style={styles.grayBg}
        onPress={() => NavigationService.goBack()}
      />
    }
    Content={<Title style={styles.titleStyleContent}>Đặt vé máy bay</Title>}
    hasBorder
  />
);

export default CreateScreenHeader;
