import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from 'eoffice/utils/colors';
import { Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeButton from 'eoffice/components/HomeButton';
import CustomHeader from 'eoffice/components/CustomHeader';

const style = StyleSheet.create({
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

const ListHeader = ({ onSearchPressed }) => (
  <CustomHeader
    Left={<HomeButton />}
    Content={<Title style={style.titleStyleContent}>Theo dõi chỉ đạo của LĐ TCT</Title>}
    Right={
      <TouchableOpacity onPress={() => onSearchPressed()}>
        <View style={style.row}>
          <Text style={style.txtTime}>Tìm kiếm</Text>
          <Icon name="date-range" style={style.icon} />
        </View>
      </TouchableOpacity>
    }
    hasBorder
  />
);

ListHeader.propTypes = {
  onSearchPressed: PropTypes.func,
};

ListHeader.defaultProps = {
  onSearchPressed() {},
};

export default ListHeader;
