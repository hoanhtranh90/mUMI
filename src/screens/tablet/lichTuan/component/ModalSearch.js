import { StyleSheet, TextInput, View, Text, SectionList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import ReactNativeModal from 'react-native-modal';
import { Icon, Spinner, Button } from 'native-base';

const styles = StyleSheet.create({
  modalContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    margin: 0,
    width: 400,
    backgroundColor: 'white',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },

  childContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  inputText: {
    flex : 1,
    fontSize: 16,
  },

  icon: {
    fontSize: 18,
    color: '#aaa',
    marginRight : 5
  },

  formItem: {
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const ModalSearch = ({ isOpen, toggleIsOpen, search }) => {
  const [keyword, setKeyword] = useState('');

  const searchCalendar = () => {
    search({ keyword });
  };

  return (
    <ReactNativeModal
      onBackdropPress={() => toggleIsOpen(false)}
      isVisible={isOpen}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={500}
      animationOutTiming={500}
      style={styles.modalContainer}
    >
      <View style={styles.childContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tìm kiếm</Text>
          <TouchableOpacity onPress={searchCalendar}>
            <Text style={{ fontSize: 16, color: '#0091ff', fontWeight: 'bold' }}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formItem}>
          <Icon type="Feather" name="search" style={styles.icon} />
          <TextInput
            style={styles.inputText}
            autoFocus={true}
            placeholder="Nội dung tìm kiếm"
            value={keyword}
            onSubmitEditing={searchCalendar}
            onChangeText={text => setKeyword(text)}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ModalSearch;
