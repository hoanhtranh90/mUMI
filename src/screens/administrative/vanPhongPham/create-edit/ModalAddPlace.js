import { StyleSheet, TextInput, View, Text, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import ReactNativeModal from 'react-native-modal';
import { Icon, Spinner, Button } from 'native-base';
import Modal from 'react-native-modal';
import DatePicker from '../../common/DatePicker';
import Picker from 'eoffice/components/Picker';
import colors from '../../../../utils/colors';
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

  row: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  label: {
    color: colors.darkGray,
    fontWeight: 'bold',
    fontSize: 16,
  },

  text: {
    color: colors.darkGray,
    width: 100,
    fontSize: 16,
    textAlign: 'right',
  },
});

const ModalAddPlace = ({ isOpen, toggleIsOpen, onSubmit }) => {
  const [category, setCategory] = useState({});

  const vppCategories = [
    {
      id: 1,
      name: 'Băng dính 2 mặt',
      donvi: 'Cuộn',
      description: '5 cm',
      xuatxu: 'Đài Loan',
      dongia: 8000,
    },
    {
      id: 2,
      name: 'Băng dính nhỏ',
      donvi: 'Cuộn',
      description: '2 cm',
      xuatxu: 'Đài Loan',
      dongia: 2500,
    },
    {
      id: 3,
      name: 'Băng dính to',
      donvi: 'Cuộn',
      description: '5 cm',
      xuatxu: 'Đài Loan',
      dongia: 12500,
    },
  ];

  const submitPlace = () => {
    if (!category.quantity || category.quantity < 1) {
      Alert.alert('Thông báo', 'Số lượng không hợp lệ', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }

    if (!category) {
      Alert.alert('Thông báo', 'Chưa chọn danh mục VPP', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }

    onSubmit({
      ...category,
    });

    setCategory({});
  };

  const setValue = (key, value) => {
    setCategory(val => {
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

  const onChangeCategory = categoryId => {
    let cate = vppCategories.find(item => item.id === categoryId);
    setCategory(cate);
  };

  return (
    <ReactNativeModal
      onBackdropPress={() => toggleIsOpen(false)}
      isVisible={isOpen}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modalContainer}
    >
      <View style={styles.childContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Thêm danh mục VPP</Text>
          <TouchableOpacity onPress={() => submitPlace()}>
            <Text style={{ fontSize: 16, color: '#0091ff', fontWeight: 'bold' }}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formItem}>
          <Icon type="Feather" name="package" style={styles.icon} />
          <Picker
            mode="dropdown"
            iosIcon={selectIcon}
            style={styles.picker}
            placeholder="Chọn danh mục"
            placeholderStyle={styles.pickerPlaceholder}
            textStyle={styles.pickerText}
            selectedValue={category.id}
            onValueChange={val => onChangeCategory(val)}
            items={vppCategories.map(data => ({
              label: data.name,
              value: data.id,
            }))}
          />
        </View>
        <View style={styles.formItem}>
          <Icon type="FontAwesome5" name="star" style={styles.icon} />
          <TextInput
            style={styles.inputText}
            keyboardType="number-pad"
            placeholder="Số lượng"
            value={category.quantity}
            onChangeText={text => setValue('quantity', text)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Đơn vị :</Text>
          <Text style={styles.text}>{category.donvi ? category.donvi : '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Mô tả :</Text>
          <Text style={styles.text}>{category.donvi ? category.description : '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Xuất xứ :</Text>
          <Text style={styles.text}>{category.donvi ? category.xuatxu : '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Đơn giá :</Text>
          <Text style={styles.text}>{category.donvi ? category.dongia : '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { fontSize: 18 }]}>Tổng :</Text>
          <Text style={[styles.text, { fontSize: 18, fontWeight: 'bold' }]}>
            {category.quantity ? category.quantity * category.dongia : '-'}
          </Text>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ModalAddPlace;
