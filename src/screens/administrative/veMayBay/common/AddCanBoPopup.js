import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import {Text, Picker, Input} from 'native-base';
import _ from 'lodash';
import format from 'date-fns/format';
import Modal from 'react-native-modal';
import { CREATE_LABELS_VE_MAY_BAY } from 'eoffice/constants/administrative';
import colors from 'eoffice/utils/colors';
import IconField from '../../common/IconField';
import DatePicker from '../../common/DatePicker';

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    borderRadius: 4,
    paddingHorizontal: 40,
  },
  picker: {
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 0,
    height: 20,
    marginTop: 12,
    paddingLeft: 0,
    width: '100%',
  },
  pickerText: {
    color: '#2b2d50',
    paddingLeft: 0,
    flexShrink: 1,
    fontWeight: 'bold',
  },
  pickerIcon: {
    color: colors.blue,
    fontSize: 18,
    lineHeight: 18,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
  },
  textError: {
    color: 'red',
    paddingLeft: 55,
  },
  pickerPlaceholder: { color: colors.gray, paddingLeft: 0, fontWeight: 'bold' },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'white',
    marginHorizontal: 8,
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  input: {
    height: null,
    paddingTop: 8,
    color: '#2b2d50',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 0,
    alignSelf: 'stretch',
  },
  btmButton: {
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: colors.blue,
    width: 90,
    height: 40,
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  btmText: {
    alignSelf: 'center',
    color: 'white',
    justifyContent: 'center',
  }
});
const AddCanBoPopup = ({
  onClose,
  canBoItem,
  visible,
  noteCanBo,
  positionsUser,
  departmentsUser,
  isShowDetailCanBoItem,
}) => {
  const [userName, setUserName] = useState('');
  const [genderUser, setGenderUser] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [isdn, setIsdn] = useState('');
  const [bsvNumber, setBsvNumber] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [email, setEmail] = useState('');

  const [userNameError, setUserNameError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [birthdayError, setBirthdayError] = useState(false);
  const [positionIdError, setPositionIdError] = useState(false);
  const [deptIdError, setDeptIdError] = useState(false);
  const [isdnError, setIsdnError] = useState(false);

  const [positionsList, setPositionsList] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [departmentUser, setDepartmentUser] = useState(null);
  const [positionUser, setPositionUser] = useState(null);

  useEffect(
    () => {
      if (canBoItem) {
        setUserName(canBoItem?.item?.userName);
        setGenderUser(canBoItem?.item?.gender);
        if (canBoItem?.item?.birthday) {
          setBirthday(new Date(canBoItem?.item?.birthday));
        }
        setIsdn(canBoItem?.item?.isdn);
        setBsvNumber(canBoItem?.item?.bsvNumber);
        setIdentityNumber(canBoItem?.item?.identityNumber);
        setPositionUser(canBoItem?.item?.positionId);
        setDepartmentUser(canBoItem?.item?.deptId);
        setEmail(canBoItem?.item?.email);
      } else {
        const positionsListTmp = _.values(positionsUser);
        positionsListTmp.unshift({ positionName: 'Chọn chức danh' });
        const departmentsListTmp = _.values(departmentsUser);
        departmentsListTmp.unshift({ deptName: 'Chọn đơn vị' });
        setPositionsList(_.values(positionsUser));
        setDepartmentsList(_.values(departmentsUser));
        setUserName('');
        setGenderUser('');
        setBirthday(null);
        setIsdn('');
        setBsvNumber('');
        setIdentityNumber('');
        setPositionUser('');
        setDepartmentUser('');
        setEmail('');
      }
      setUserNameError(false);
      setGenderError(false);
      setBirthdayError(false);
      setPositionIdError(false);
      setDeptIdError(false);
      setIsdnError(false);
    },
    [visible]
  );
  const genderList = [{ key: 'M', gender: 'Nam' }, { key: 'F', gender: 'Nữ' }];
  const updateInfoCanBo = () => {
    setUserNameError(!userName);
    setGenderError(!genderUser);
    setBirthdayError(!birthday);
    setPositionIdError(!positionUser);
    setDeptIdError(!departmentUser);
    setIsdnError(!isdn)
    if (userName && genderUser && birthday && departmentUser && positionUser && isdn) {
      const flightUserList = {
        userName,
        gender: genderUser,
        birthday: format(birthday, 'yyyy-MM-dd'),
        isdn,
        bsvNumber,
        identityNumber,
        //
        positionId: positionUser,
        deptId: departmentUser,
        email,
      };
      noteCanBo(flightUserList);
    }
  };
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View
        style={styles.container}
      >
        <ScrollView>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.blue, margin: 10 }}>
              {isShowDetailCanBoItem ? 'THÔNG TIN CÁN BỘ' : 'THÊM CÁN BỘ'}
            </Text>
            <IconField label={CREATE_LABELS_VE_MAY_BAY.name} iconName="user" required>
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={userName}
                onChangeText={name => {
                  setUserName(name);
                }}
                style={styles.input}
              />
            </IconField>
            {userNameError ? (
              <Text style={styles.textError}>Chưa nhập họ tên.</Text>
            ) : null}
            <IconField label={CREATE_LABELS_VE_MAY_BAY.sex} iconName="users" required>
              <Picker
                mode="dropdown"
                selectedValue={genderUser?.key}
                textStyle={styles.pickerText}
                style={styles.picker}
                onValueChange={val => {
                  const newNoteGender = genderList.find(d => d.key === val);
                  if (newNoteGender) {
                    setGenderUser(newNoteGender);
                  } else {
                    setGenderUser('');
                  }
                }}
              >
                <Picker.Item label="Chọn giới tính" value="" color="gray" />
                {genderList.map(item => (
                  <Picker.Item label={item.gender} value={item.key} color="black" />
                ))}
              </Picker>
            </IconField>
            {genderError ? <Text style={styles.textError}>Chưa nhập giới tính.</Text> : null}
            <IconField
              label={CREATE_LABELS_VE_MAY_BAY.dateOfBirth}
              iconName="calendar"
              required
            >
              <DatePicker
                mode="date"
                placeholderStyle={styles.pickerPlaceholder}
                style={styles.picker}
                textStyle={styles.pickerText}
                value={birthday}
                onChange={dateOfBirth => {
                  setBirthday(dateOfBirth);
                }}
              />
            </IconField>
            {birthdayError ? <Text style={styles.textError}>Chưa nhập ngày sinh.</Text> : null}
            <IconField
              label={CREATE_LABELS_VE_MAY_BAY.phonenumber}
              iconName="phone"
              required
            >
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={isdn}
                onChangeText={room => {
                  setIsdn(room);
                }}
                style={styles.input}
              />
            </IconField>
            {isdnError ? <Text style={styles.textError}>Chưa nhập số điện thoại</Text> : null}
            <IconField label={CREATE_LABELS_VE_MAY_BAY.card} iconName="credit-card">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={bsvNumber}
                style={styles.input}
                onChangeText={card => {
                  setBsvNumber(card);
                }}
              />
            </IconField>

            <IconField label={CREATE_LABELS_VE_MAY_BAY.passport} iconName="clipboard">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={identityNumber}
                style={styles.input}
                onChangeText={identity => {
                  setIdentityNumber(identity);
                }}
              />
            </IconField>

            <IconField label={CREATE_LABELS_VE_MAY_BAY.prefix} iconName="award" required>
              <Picker
                mode="dropdown"
                Header="Branch"
                selectedValue={positionUser?.id}
                textStyle={styles.pickerText}
                style={styles.picker}
                onValueChange={val => {
                  const newPos = positionsList.find(d => d.id === val);
                  if (newPos) {
                    setPositionUser(newPos);
                  } else {
                    setPositionUser('');
                  }
                }}
              >
                <Picker.Item label="Chọn chức danh" value="" color="gray" />
                {positionsList.map(item => (
                  <Picker.Item label={item.positionName} value={item.id} color="black" />
                ))}
              </Picker>
            </IconField>
            {positionIdError ? <Text style={styles.textError}>Chưa nhập chức danh.</Text> : null}
            <IconField label={CREATE_LABELS_VE_MAY_BAY.room} iconName="home" required>
              <Picker
                mode="dropdown"
                selectedValue={departmentUser?.id}
                textStyle={styles.pickerText}
                style={styles.picker}
                onValueChange={val => {
                  const newDepart = departmentsList.find(d => d.id === val);
                  if (newDepart) {
                    setDepartmentUser(newDepart);
                  } else {
                    setDepartmentUser('');
                  }
                }}
              >
                <Picker.Item label="Chọn đơn vị" value="" color="gray" />
                {departmentsList.map(item => (
                  <Picker.Item label={item.deptName} value={item.id} color="black" />
                ))}
              </Picker>
            </IconField>
            {deptIdError ? <Text style={styles.textError}>Chưa nhập đơn vị.</Text> : null}
            <IconField label={CREATE_LABELS_VE_MAY_BAY.email} iconName="send" >
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={email}
                style={styles.input}
                onChangeText={dept => {
                  setEmail(dept);
                }}
              />
            </IconField>
            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={updateInfoCanBo}
                style={styles.btmButton}
              >
                <Text style={[styles.btmText,{marginTop: 10}]}>
                  {canBoItem ? 'Cập nhật': 'Thêm'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClose}
                style={[styles.btmButton, {alignContent: 'center', backgroundColor: '#fff'}]}
              >
                <Text style={[styles.btmText,{marginTop: 8, color: 'black'}]}>
                  Đóng
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

AddCanBoPopup.propTypes = {
  onClose: PropTypes.func,
  noteCanBo: PropTypes.func,
  visible: PropTypes.bool,
  positionsUser: PropTypes.objectOf,
  canBoItem: PropTypes.objectOf,
  departmentsUser: PropTypes.objectOf,
  isShowDetailCanBoItem: PropTypes.bool,
};
AddCanBoPopup.defaultProps = {
  onClose() {},
  noteCanBo() {},
  visible: false,
  isShowDetailCanBoItem: false,
  positionsUser: {},
  departmentsUser: {},
  canBoItem: {},
};

export default AddCanBoPopup;
