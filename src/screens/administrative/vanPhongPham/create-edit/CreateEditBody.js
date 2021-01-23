import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconField from '../../common/IconField';
import { Button, Form, Icon, Textarea } from 'native-base';
import colors from '../../../../utils/colors';
import ModalAddPlace from './ModalAddPlace';

const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 50
  },
  input: {
    paddingBottom: 0,
    height: null,
    marginTop: 0,
    paddingTop: 7,
    color: '#2b2d50',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 0,
    alignSelf: 'stretch',
  },
  textarea: {
    ...Platform.select({
      ios: {
        marginTop: 6,
      },
      android: {
        marginTop: 0,
      },
    }),
    fontSize: 16,
    color: colors.darkGray,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    paddingLeft: 0,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: colors.blue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#5386ba',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  btnText: {
    color: 'white',
  },
  btnIcon: {
    color: 'white',
    fontSize: 14,
    marginRight: 5,
  },
  row: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 },

  rowTotal: {
    marginVertical: 10,
    flexDirection: 'row',
    paddingRight: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  label: {
    color: colors.blue,
    fontWeight: 'bold',
    fontSize: 20,
  },

  text: {
    color: colors.blue,
    width: 120,
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'right',
  },
});

const CreateEditBody = ({ createRequest, currentUserDeptRole }) => {
  const [openAddPlace, setOpenAddPlace] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [requestName, setRequestName] = useState('');
  const requestDeptName = currentUserDeptRole.deptName;
  const [listPlace, setListPlace] = useState([]);

  const addPlace = place => {
    setOpenAddPlace(false);

    let currentIndex = listPlace.findIndex(item => item.id === place.id);
    if (currentIndex !== -1) {
      setListPlace(val => {
        val.splice(currentIndex, 1);
        return [...val, place];
      });
    } else setListPlace(val => [...val, place]);
  };

  useEffect(
    () => {
      let sum = 0;

      listPlace.forEach(item => (sum += item.quantity * item.dongia));

      setTotalPrice(sum);
    },
    [listPlace]
  );

  const submitRequest = () => {
    if (!requestName) {
      Alert.alert('Thông báo', 'Chưa nhập tên yêu cầu', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    if (listPlace.length === 0) {
      Alert.alert('Thông báo', 'Chưa nhập lộ trình', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }

    let submitForm = {
      id: new Date().getTime(),
      requestName,
      requestDeptName,
      status : 1,
      approveStatus : 1,
      listPlace,
      creatorId : currentUserDeptRole.id,
      deptId : currentUserDeptRole.deptId,
      parentDeptId : currentUserDeptRole.parentDeptId
    };

    createRequest(submitForm);
  };


  const PlaceItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          borderBottomColor: '#efeff4',
          borderBottomWidth: 1,
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.darkGray }}>
            {item.name} x {item.quantity}
          </Text>
          <Text style={{ fontSize: 14, color: colors.gray }}>{item.dongia}/{item.donvi}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.blue }}>
            {(item.dongia * item.quantity).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ListPlace = () => (
    <View style={{ flex: 1 }}>
      <FlatList
        data={listPlace}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        renderItem={({ item }) => <PlaceItem item={item} />}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ModalAddPlace
        isOpen={openAddPlace}
        toggleIsOpen={flag => setOpenAddPlace(flag)}
        onSubmit={addPlace}
      />
      <ScrollView style={{ flex: 1 }}>
        <Form style={styles.form}>
          <IconField label="Tên yêu cầu" iconName="book" required>
            <Textarea
              placeholder="-"
              rowSpan={3}
              value={requestName}
              style={styles.input}
              onChangeText={txt => setRequestName(txt)}
            />
          </IconField>
          <IconField label="Đơn vị yêu cầu" iconName="book" required>
            <Textarea
              rowSpan={3}
              placeholder="-"
              value={requestDeptName}
              disabled={true}
              style={styles.input}
            />
          </IconField>

          <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
            <TouchableOpacity style={styles.btn} onPress={() => setOpenAddPlace(true)}>
              <Icon name="plus" type="Feather" style={styles.btnIcon} />
              <Text style={styles.btnText}>Thêm danh mục VPP</Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 20, height: 200, marginVertical: 20 }}>
            {listPlace.length === 0 && (
              <View
                style={{
                  backgroundColor: '#eee',
                  flex: 1,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: colors.darkGray }}>Chưa có danh mục VPP</Text>
              </View>
            )}
            {listPlace.length > 0 && <ListPlace />}
          </View>

          <View style={styles.rowTotal}>
            <Text style={styles.label}>Tổng :</Text>
            <Text style={styles.text}>{totalPrice}</Text>
          </View>

          <View style={styles.rowTotal}>
            <Text style={[styles.label, { color: colors.blue, fontSize: 18 }]}>
              Hạn mức VPP của đơn vị
            </Text>
            <Text style={[styles.text, { color: colors.blue, fontSize: 18 }]}>2,500,000</Text>
          </View>
          <View style={styles.rowTotal}>
            <Text style={[styles.label, { color: colors.blue, fontSize: 18 }]}>
              Hạn mức đã ứng trước
            </Text>
            <Text style={[styles.text, { color: colors.blue, fontSize: 18 }]}>0</Text>
          </View>
          <View style={styles.rowTotal}>
            <Text style={[styles.label, { color: colors.blue, fontSize: 18 }]}>
              Hạn mức còn lại
            </Text>
            <Text style={[styles.text, { color: colors.blue, fontSize: 18 }]}>2,000,000</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
              paddingHorizontal: 20,
            }}
          >
            <Button
              style={[{ flex: 1, justifyContent: 'center' }, styles.btn]}
              onPress={submitRequest}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>Gửi yêu cầu</Text>
            </Button>
          </View>
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateEditBody;
