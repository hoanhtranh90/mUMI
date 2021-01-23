import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  Picker,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Icon } from 'native-base';
import ReactNativeModal from 'react-native-modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2d3e4f',
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  itemText: {
    fontSize: 14,
    color: '#242020',
  },
  icon: {
    color: '#fff',
    fontSize : 14
  },
  dropdown: {
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 0,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const SelectBox = ({ hcFlows = [], currentHcFlow, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(val => !val);
  };

  const selectItem = itemId => {
    onSelect(itemId);
    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleDropdown}>
        <View style={styles.label}>
          <Text style={styles.labelText}>{currentHcFlow ? currentHcFlow.deptName : ''}</Text>
          <Icon style={styles.icon} type="Feather" name="chevron-down" />
        </View>
      </TouchableWithoutFeedback>
      {isOpen && (
        <ReactNativeModal
          onBackdropPress={() => setIsOpen(false)}
          isVisible={isOpen}
          style={styles.bottomModal}
        >
          <View style={styles.modalContent}>
            <View style={{ padding: 20 }}>
              <Text style={{ fontSize: 16, color: '#545454' }}>Chọn cấp quy trình</Text>
            </View>
            <Picker
              selectedValue={currentHcFlow?.id}
              style={{ width: 400, height: 200 }}
              onValueChange={(itemValue, itemIndex) => selectItem(itemValue)}
            >
              {hcFlows.map(item => (
                <Picker.Item key={item.id} label={item.deptName} value={item.id} />
              ))}
            </Picker>
          </View>
        </ReactNativeModal>
      )}
    </View>
  );
};

export default SelectBox;
