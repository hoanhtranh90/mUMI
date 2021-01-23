import {StyleSheet, TextInput, View, Text, Alert, TouchableOpacity, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import ReactNativeModal from 'react-native-modal';
import { Icon, Spinner, Button } from 'native-base';
import Modal from 'react-native-modal';
import DatePicker from '../../common/DatePicker';
import Picker from 'eoffice/components/Picker';
import {getPositions , getDepartments} from '../../../../store/administrative/bookHotel/service'
import {service} from "../../../../store/auth";
const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },

  childContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    marginLeft: 15,
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



const ModalAddUser = ({ isOpen, toggleIsOpen, onSubmit }) => {
  const [user, setUser] = useState({});
  const [lstPositions, setPositions] = useState([])
  const [lstDepartments, setDepartments] = useState([])

  useEffect(() =>  {
    getPositionsList()
    getDepartmentsList()
  },[])

  async function getPositionsList() {
    const positionsUserTmp = await getPositions();
    setPositions(positionsUserTmp?.positons);
  }
  async function getDepartmentsList() {
    const departmentsUserTmp = await getDepartments();
    setDepartments(departmentsUserTmp?.departments);
  }

  const submitUser = () => {
    if (!user.name) {
      Alert.alert('Thông báo', 'Chưa nhập họ tên', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    if (!user.birthday) {
      Alert.alert('Thông báo', 'Chưa nhập ngày sinh', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    if (!user.gender) {
      Alert.alert('Thông báo', 'Chưa nhập giới tính', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    if (!user.positionId) {
      Alert.alert('Thông báo', 'Chưa nhập chức danh', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    if (!user.deptId) {
      Alert.alert('Thông báo', 'Chưa nhập đơn vị', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }

    onSubmit(user);
  };

  const setValue = (key, value) => {
    setUser(val => {
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
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Thêm cán bộ</Text>
            <TouchableOpacity onPress={() => submitUser()}>
              <Text style={{ fontSize: 16, color: '#0091ff', fontWeight: 'bold' }}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formItem}>
            <Icon type="Feather" name="user" style={styles.icon} />
            <TextInput
              style={styles.inputText}
              placeholder="Họ tên"
              value={user.name}
              onChangeText={text => setValue('name', text)}
            />
          </View>
          <View style={styles.formItem}>
            <Icon type="Feather" name="calendar" style={styles.icon} />
            <DatePicker
              placeholder="Ngày sinh"
              style={{ marginLeft: 15}}
              textStyle={styles.pickerText}
              placeholderStyle={styles.pickerPlaceholder}
              onChange={date => setValue('birthday', date)}
              value={user.birthday}
              mode="date"
            />
          </View>
          <View style={styles.formItem}>
            <Icon type="FontAwesome" name="intersex" style={styles.icon} />
            <Picker
              mode="dropdown"
              iosIcon={selectIcon}
              placeholder="Giới tính"
              textStyle={styles.pickerText}
              selectedValue={user.gender}
              onValueChange={val => setValue('gender', val)}
              items={[{ id: 'M', text: 'Nam' }, { id: 'F', text: 'Nữ' }].map(data => ({
                label: data.text,
                value: data.id,
              }))}
            />
          </View>
          <View style={styles.formItem}>
            <Icon type="FontAwesome" name="check" style={styles.icon} />
            <Picker
              mode="dropdown"
              iosIcon={selectIcon}
              placeholder="Đại diện checkin"
              textStyle={styles.pickerText}
              selectedValue={user.checker}
              onValueChange={val => setValue('checker', val)}
              items={[{ id: '0', text: 'Không' }, { id: '1', text: 'Có' }].map(data => ({
                label: data.text,
                value: data.id,
              }))}
            />
          </View>
          <View style={styles.formItem}>
            <Icon type="Feather" name="mail" style={styles.icon} />
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              value={user.email}
              onChangeText={text => setValue('email', text)}
            />
          </View>
          <View style={styles.formItem}>
            <Icon type="Feather" name="phone" style={styles.icon} />
            <TextInput
              style={styles.inputText}
              placeholder="Số điện thoại"
              value={user.phone}
              keyboardType = 'number-pad'
              onChangeText={text => setValue('phone', text)}
            />
          </View>
          <View style={styles.formItem}>
            <Icon type="AntDesign" name="idcard" style={styles.icon} />
            <TextInput
              style={styles.inputText}
              placeholder="Chứng minh thư"
              value={user.cmt}
              keyboardType = 'number-pad'
              onChangeText={text => setValue('cmt', text)}
            />
          </View>
          <View style={styles.formItem}>
            <Icon type="AntDesign" name="gitlab" style={styles.icon} />
            <Picker
              mode="dropdown"
              iosIcon={selectIcon}
              placeholder="Chức danh"
              textStyle={styles.pickerText}
              selectedValue={user.positionId}
              onValueChange={val => setValue('positionId', val)}
              items={lstPositions && lstPositions.map(data => ({
                label: data.positionName,
                value: data.id,
              }))}
            />
          </View>
          <View style={styles.formItem}>
            <Icon type="AntDesign" name="addusergroup" style={styles.icon} />
            <Picker
              mode="dropdown"
              iosIcon={selectIcon}
              placeholder="Đơn vị"
              textStyle={styles.pickerText}
              selectedValue={user.deptId}
              onValueChange={val => setValue('deptId', val)}
              items={lstDepartments && lstDepartments.map(data => ({
                label: data.deptName,
                value: data.id,
              }))}
            />
          </View>
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};

export default ModalAddUser;
