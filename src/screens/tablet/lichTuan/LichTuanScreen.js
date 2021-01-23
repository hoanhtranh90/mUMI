import Header from './header/Header';
import MainContent from './body/MainContent';
import React from 'react';
import { View } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#fff'
  }
});

const LichTuanScreen = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <Header />
        <MainContent navigation={navigation}/>
      </View>
    </>
  );
};

export default LichTuanScreen;
