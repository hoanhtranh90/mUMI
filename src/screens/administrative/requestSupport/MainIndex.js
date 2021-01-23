import React from 'react';
import { StyleSheet, View } from 'react-native';
import RequestSupportHeader from './list/Header';
import RequestSupportList from './list/List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const RequestSupportMain = () => {
  return (
    <View style={styles.container}>
      <RequestSupportHeader />
      <RequestSupportList />
    </View>
  );
};

export default RequestSupportMain;
