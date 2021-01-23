import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import Assets from '../assets';
import NavigationService from '../utils/NavigationService';

const styles = StyleSheet.create({
  btn: {
    padding: 8,
    borderRadius: 25,
    backgroundColor: '#b2d7ff',
    height: 40,
  },
  img: { height: 24, width: 24 },
});

const HomeButton = () =>{
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationService.navigate('DashboardScreen')
      }}
      style={styles.btn}
    >
      <Image resizeMode="contain" source={Assets.home} style={styles.img} />
    </TouchableOpacity>
  );
}


export default HomeButton;
