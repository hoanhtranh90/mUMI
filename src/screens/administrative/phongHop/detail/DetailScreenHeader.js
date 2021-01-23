import React, { useEffect } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { Title } from 'native-base';

import IconButton from 'eoffice/components/IconButton';
import CustomHeader from 'eoffice/components/CustomHeader';
import colors from 'eoffice/utils/colors';

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

const DetailScreenHeader = ({ navigation }) => {
  function handleBackPress() {
    navigation.navigate('Summary');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  return (
    <CustomHeader
      Left={
        <IconButton
          icon="arrow-left"
          iconStyle={{ color: colors.gray }}
          style={styles.grayBg}
          onPress={() => navigation.navigate('Summary')}
        />
      }
      Content={<Title style={styles.titleStyleContent}>Chi tiết phòng họp</Title>}
      hasBorder
    />
  );
};

export default DetailScreenHeader;
