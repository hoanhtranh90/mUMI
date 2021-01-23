import React from 'react';
import { StyleSheet, View } from 'react-native';
import BookHotelHeader from './list/Header';
import BookHotelList from './list/List';
import {Title} from "native-base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const BookHotelMain = () => {
  return (
    <View style={styles.container}>
      <BookHotelHeader title="Đặt phòng khách sạn"/>
      <BookHotelList />
    </View>
  );
};

export default BookHotelMain;
