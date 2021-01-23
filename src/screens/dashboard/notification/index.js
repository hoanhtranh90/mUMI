import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Text, Platform, StatusBar } from 'react-native';
import NotificationHeader from './notification.header';
import NotificationList from './notification.list';

export default function({ navigation }) {
  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <NotificationHeader isMobile navigation={navigation} />
      <NotificationList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
