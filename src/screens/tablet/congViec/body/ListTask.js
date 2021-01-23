import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Tasks from '../../../tasks/common/Tasks';
import ListHeading from '../../../tasks/list/ListHeading.container';


const ListTask = () => {
  return (
    <View style={styles.container}>
      <ListHeading/>
      <Tasks/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 2.5,
    paddingHorizontal: 15,
    paddingBottom: 12,
  },
  horizontalFilters: {
    height: 60,
  },
});

export default ListTask;
