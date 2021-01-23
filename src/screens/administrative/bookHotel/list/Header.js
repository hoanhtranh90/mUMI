import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import colors from 'eoffice/utils/colors';
import { Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeButton from 'eoffice/components/HomeButton';
import CustomHeader from 'eoffice/components/CustomHeader';
import {
 setKeyForQuery,
} from "../../../../store/administrative/bookHotel/reducer";
import {connect} from "react-redux";

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
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 120,
  },
  txtTime: {
    flex : 1,
    fontSize: 15,
    fontWeight: '600',
  },

});

const BookHotelHeader = ({title, setKeyForQuery}) => {
  const [key, changeKey] = useState('')
  return (
    <CustomHeader
      Left={<HomeButton />}
      Content={<Title style={style.titleStyleContent}>{title}</Title>}
      Right={
        <View style={style.row}>
          <TextInput
            style={style.txtTime}
            placeholder="Tìm kiếm"
            onChangeText={ key => {
              changeKey(key)
              setKeyForQuery(key)
            }}
            value={key}
          />
          <Icon name="search" style={style.icon} />
        </View>
      }
      hasBorder
    />
  );
};

const mapDispatchToProps = {
  setKeyForQuery: setKeyForQuery
};

const mapStateToProps = (state) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookHotelHeader);
