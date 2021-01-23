import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import colors from 'eoffice/utils/colors';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 50,
  },
});

const SelectDeptLT = ({ navigation, handleSelect }) => {
  const list = navigation.state.params.listAvailable;
  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        extraData={list}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              navigation.state.params.onSelect(item.deptId, item.deptName);
            }}
          >
            <Text style={{ margin: 15, fontSize: 16, color: 'black' }}>{item.deptName}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default SelectDeptLT;
