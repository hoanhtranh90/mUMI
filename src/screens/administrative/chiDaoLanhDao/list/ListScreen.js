import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './ListHeader.container';
import Requests from './Requests.container';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
});

const ListScreen = ({ navigation }) => (
  <View style={{ flex: 1, backgroundColor: 'white' }}>
    <Header />
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Requests onRequestPressed={() => navigation.navigate('CommandDetail')} />
      </View>
    </View>
  </View>
);

export default ListScreen;
