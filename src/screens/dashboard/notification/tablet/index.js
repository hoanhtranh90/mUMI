import { withNavigation } from 'react-navigation';

import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Text, Platform, StatusBar } from 'react-native';
import NotificationHeader from '../notification.header';
import NotificationList from '../notification.list';

const NotificationTablet = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.fill}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <NotificationHeader isMobile={false} navigation={navigation} />
      <NotificationList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default withNavigation(NotificationTablet);
