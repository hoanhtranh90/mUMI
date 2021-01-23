import React, { useEffect } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
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

const CreateEditHeader = ({editMode}) => {
  function handleBackPress() {
    NavigationService.goBack();
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
          onPress={() => handleBackPress()}
        />
      }
      Content={<Title style={styles.titleStyleContent}>{editMode === 1 ? 'Tạo yêu cầu hỗ trợ' : 'Chi tiết yêu cầu'}</Title>}
      hasBorder
    />
  );
};

export default CreateEditHeader;
