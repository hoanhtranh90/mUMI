import React from 'react';
import { StyleSheet } from 'react-native';
import colors from 'eoffice/utils/colors';
import { Title } from 'native-base';
import HomeButton from 'eoffice/components/HomeButton';
import CustomHeader from 'eoffice/components/CustomHeader';

const style = StyleSheet.create({
  buttonStyleLeft: {
    borderColor: colors.lightGray,
  },
  titleStyleLeft: {
    fontSize: 22,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
  titleStyleContent: {
    fontSize: 20,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 16,
    color: colors.gray,
  },
  row: {
    flexDirection: 'row',
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dcdce6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  txtTime: {
    fontSize: 15,
    fontWeight: '600',
    color: '#007aff',
    marginRight: 21,
  },
});

const RequestSupportHeader = ({}) => {
  return (
    <CustomHeader
      Left={<HomeButton />}
      Content={<Title style={style.titleStyleContent}>Yêu cầu hỗ trợ</Title>}
      Right={
        // <TouchableOpacity onPress={() => NavigationService.navigate('Search')}>
        //   <View style={style.row}>
        //     <Text style={style.txtTime}>Tìm kiếm</Text>
        //     <Icon name="date-range" style={style.icon} />
        //   </View>
        // </TouchableOpacity>
        <></>
      }
      hasBorder
    />
  );
};

export default RequestSupportHeader;
