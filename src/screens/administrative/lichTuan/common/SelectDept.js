import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 50,
  },
});

const SelectDept = ({ navigation, handleSelect }) => {
  const list = navigation.state.params.listAvailable;
  return (
    <View style={styles.container}>
      <FlatList
        data={list.hcFlows}
        extraData={list.hcFlows}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              navigation.state.params.onSelectDept(item.deptId, item.deptName, item.id);
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

export default SelectDept;
