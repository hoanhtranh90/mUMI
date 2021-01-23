import React from 'react';
import { StyleSheet } from 'react-native';
import { Title } from 'native-base';

import IconButton from 'eoffice/components/IconButton';
import CustomHeader from 'eoffice/components/CustomHeader';
import colors from 'eoffice/utils/colors';

const styles = StyleSheet.create({
  grayBg: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },

  titleStyleContent: {
    fontSize: 20,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
});

const SearchHeader = ({ navigation }) => (
  <CustomHeader
    Left={
      <IconButton
        icon="arrow-left"
        iconStyle={{ color: colors.gray }}
        style={styles.grayBg}
        onPress={() => navigation.goBack()}
      />
    }
    hasBorder
    Content={<Title style={styles.titleStyleContent}>Lọc thời gian</Title>}
  />
);

export default SearchHeader;
