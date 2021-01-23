import React,{useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button, Container, Icon, Text} from 'native-base';
import useModal from 'eoffice/utils/useModal';
import Header from "./header/Header";
import LeftBar from "./body/LeftBar";
import ListTask from "./body/ListTask";
const CongViecScreen = () => {
  const [isVisible, open, close] = useModal();
  return (
      <View style={styles.container}>
        <Header/>
        <View style={styles.rowDetail}>
          <LeftBar/>
          <ListTask/>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fd',
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  rowDetail: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingTop: 10,
    marginTop: 10,
  },
  txtHeader: {
    flex: 2.5,
    color: '#2d3e4f',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 16,
    marginBottom: 8,
  },
  scopeCalendar: {
    flex: 1.7,
    marginTop: 2,
    marginRight: 10,
  },
  touchableCalendar: {
    backgroundColor: 'white',
    borderColor: 'rgba(0, 122, 255, 0.2)',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
});

export default CongViecScreen;
