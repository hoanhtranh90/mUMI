import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from 'eoffice/utils/colors';
import { Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeButton from 'eoffice/components/HomeButton';
import CustomHeader from 'eoffice/components/CustomHeader';
import { FLOW_INFO } from 'eoffice/constants/administrative';

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
    fontSize: 31,
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

const SummaryHeader = ({ navigation, hcFlow }) => {
  let title = '';
  if (hcFlow.flowCode === FLOW_INFO.PHONG_HOP) {
    title = 'Phòng họp';
  } else if (hcFlow.flowCode === FLOW_INFO.PHONG_HOP_DX) {
    title = 'Phòng họp đột xuất';
  } else if (hcFlow.flowCode === FLOW_INFO.DIEU_XE) {
    title = 'Điều xe đơn vị';
  } else if (hcFlow.flowCode === FLOW_INFO.DIEU_XE_DX) {
    title = 'Điều xe đột xuất';
  } else if (hcFlow.flowCode === FLOW_INFO.LICH_TUAN) {
    title = 'Lịch tuần';
  } else if (hcFlow.flowCode === FLOW_INFO.VE_MAY_BAY) {
    title = 'Vé Máy Bay';
  }

  return (
    <CustomHeader
      Left={<HomeButton />}
      Content={<Title style={style.titleStyleContent}>{title}</Title>}
      Right={
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <View style={style.row}>
            <Text style={style.txtTime}>Tìm kiếm</Text>
            <Icon name="date-range" style={style.icon} />
          </View>
        </TouchableOpacity>
      }
      hasBorder
    />
  );
};
SummaryHeader.propTypes = {
  hcFlow: PropTypes.shape({}).isRequired,
};
SummaryHeader.defaultProps = {};

export default SummaryHeader;
