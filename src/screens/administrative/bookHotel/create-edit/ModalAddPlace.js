import { StyleSheet, TextInput, View, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import ReactNativeModal from 'react-native-modal';
import { Icon, Spinner, Button } from 'native-base';
import Modal from 'react-native-modal';
import DatePicker from '../../common/DatePicker';
import Picker from 'eoffice/components/Picker';
import {getHotels, getLocations} from "../../../../store/administrative/bookHotel/service";

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },

  childContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  inputText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15
  },

  icon: {
    fontSize: 18,
    color: '#aaa',
    marginRight: 10,
  },

  pickerPlaceholder: {
    color: '#aaa',
  },

  pickerText: {
    color: '#000',
    fontWeight: 'normal',
  },

  formItem: {
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const ModalAddPlace = ({ isOpen, toggleIsOpen, onSubmit }) => {
  const [place, setPlace] = useState({});
  const [hotels, setHotels] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() =>  {
    getListHotels()
    getLocation()
  },[])

  async function getListHotels() {
    const hotels = await getHotels();
    setHotels(hotels);
  }
  async function getLocation() {
    const locations = await getLocations();
    setLocations(locations);
  }

  const submitPlace = () => {
    if (!place.locationId) {
      Alert.alert('Thông báo', 'Chưa chọn địa điểm', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    if (!place.hotelId) {
      Alert.alert('Thông báo', 'Chưa chọn khách sạn', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    if (!place.checkin) {
      Alert.alert('Thông báo', 'Chưa nhập ngày checkin', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    if (!place.checkout) {
      Alert.alert('Thông báo', 'Chưa nhập ngày checkout', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    if (!place.countRoom1 && !place.countRoom2) {
      Alert.alert('Thông báo', 'Chưa nhập số lượng phòng', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }

    onSubmit({
      ...place,
      locate: locations.find(item => item.id === place.locationId),
      hotel: hotels.find(item => item.id === place.hotelId),
    });
  };

  const setValue = (key, value) => {
    setPlace(val => {
      return {
        ...val,
        [key]: value,
      };
    });
  };

  const selectIcon = (
    <Icon
      name="chevron-down"
      type="Feather"
      style={{ fontSize: 16, color: '#fff', marginRight: 0 }}
    />
  );

  return (
    <ReactNativeModal
      onBackdropPress={() => toggleIsOpen(false)}
      isVisible={isOpen}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modalContainer}
    >
      <View style={styles.childContainer}>
        <ScrollView >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Thêm điểm lưu trú</Text>
            <TouchableOpacity onPress={() => submitPlace()}>
              <Text style={{ fontSize: 16, color: '#0091ff', fontWeight: 'bold' }}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formItem}>
            <Icon type="Feather" name="map" style={styles.icon} />
            <Picker
              mode="dropdown"
              iosIcon={selectIcon}
              style={styles.picker}
              placeholder="Địa điểm"
              placeholderStyle={styles.pickerPlaceholder}
              textStyle={styles.pickerText}
              selectedValue={place.locationId}
              onValueChange={val => setValue('locationId', val)}
              items={locations.map(data => ({
                label: data.categoryName,
                value: data.id,
              }))}
            />
          </View>
          <View style={styles.formItem}>
            <Icon type="FontAwesome5" name="hotel" style={styles.icon} />
            <Picker
              mode="dropdown"
              iosIcon={selectIcon}
              style={styles.picker}
              placeholder="Khách sạn"
              placeholderStyle={styles.pickerPlaceholder}
              textStyle={styles.pickerText}
              selectedValue={place.hotelId}
              onValueChange={val => setValue('hotelId', val)}
              items={hotels.map(data => ({
                label: data.categoryName,
                value: data.id,
              }))}
            />
          </View>
          <View style={styles.formItem}>
            <Icon type="Feather" name="calendar" style={styles.icon} />
            <DatePicker
              placeholder="Ngày checkin"
              placeholderStyle={styles.pickerPlaceholder}
              style={{marginLeft: 15}}
              textStyle={styles.pickerText}
              onChange={date => setValue('checkin', date)}
              value={place.checkin}
            />
          </View>
          <View style={styles.formItem}>
            <Icon type="Feather" name="calendar" style={styles.icon} />
            <DatePicker
              placeholder="Ngày checkout"
              placeholderStyle={styles.pickerPlaceholder}
              style={{marginLeft: 15}}
              textStyle={styles.pickerText}
              onChange={date => setValue('checkout', date)}
              value={place.checkout}
            />
          </View>
          <View style={styles.formItem}>
            <Icon type="Feather" name="inbox" style={styles.icon} />
            <TextInput
              style={styles.inputText}
              placeholder="Số lượng phòng đơn"
              value={place.countRoom1}
              keyboardType='number-pad'
              onChangeText={text => setValue('countRoom1', text)}
            />
          </View>
          <View style={styles.formItem}>
            <Icon type="Feather" name="inbox" style={styles.icon} />
            <TextInput
              style={styles.inputText}
              placeholder="Số lượng phòng đôi"
              value={place.countRoom2}
              keyboardType = 'number-pad'
              onChangeText={text => setValue('countRoom2', text)}
            />
          </View>
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};

export default ModalAddPlace;
