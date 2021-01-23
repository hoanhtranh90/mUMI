import React from 'react';
import { StyleSheet } from 'react-native';
import colors from 'eoffice/utils/colors';
import { Title } from 'native-base';

import HomeButton from 'eoffice/components/HomeButton';
import IconButton from 'eoffice/components/IconButton';
import CustomHeader from 'eoffice/components/CustomHeader';

const style = StyleSheet.create({
  buttonStyleLeft: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },
  titleStyleContent: {
    fontSize: 31,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
});

const SummaryHeader = ({ navigation }) => (
  <CustomHeader
    Left={<HomeButton />}
    Content={<Title style={style.titleStyleContent}>Văn Bản</Title>}
    Right={
      <IconButton
        icon="search"
        iconStyle={{ color: colors.blue }}
        style={{ borderColor: colors.lightBlue }}
        onPress={() => navigation.navigate('Search')}
      />
    }
    hasBorder
  />
);

export default SummaryHeader;
