import React, { useEffect, useState } from 'react';
import ReactNativeModal from 'react-native-modal';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ListCalendar from './ListCalendar';

const ModalLinkNote = ({ isOpen, close, addMore }) => {
  const onItemChoose = item => {
    addMore(item);
  };

  return (
    <ReactNativeModal
      onBackdropPress={close}
      isVisible={isOpen}
      animationInTiming={500}
      animationOutTiming={500}
      style={styles.modalContainer}
    >
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ListCalendar onItemChoose={onItemChoose} close={close}/>
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default ModalLinkNote;
