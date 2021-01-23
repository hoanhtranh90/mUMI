import React from 'react';
import { StyleSheet, View } from 'react-native';
import VanPhongPhamHeader from './list/Header';
import VanPhongPhamList from './list/List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const VanPhongPhamMain = () => {
  return (
    <View style={styles.container}>
      <VanPhongPhamHeader />
      <VanPhongPhamList />
    </View>
  );
};

export default VanPhongPhamMain;
