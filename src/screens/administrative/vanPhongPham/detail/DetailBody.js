import {
  Alert,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../../../utils/colors';
import format from 'date-fns/format';
import { Button, Form, Icon, Textarea } from 'native-base';
import IconField from '../../common/IconField';
import ModalAddPlace from '../create-edit/ModalAddPlace';

const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    marginTop: 10,
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
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
  btnCancel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: colors.red,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: colors.red,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  btnText: {
    color: colors.darkGray,
    fontSize: 16,
    fontWeight: 'bold',
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

const DetailBody = ({
  vanPhongPhamDetail,
  cancelRequest,
  approveRequest,
  isCanAcceptRequest,
  isCanCancelRequest,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [listPlace, setListPlace] = useState([]);
  const [note, setNote] = useState(vanPhongPhamDetail.note);

  const onCancelRequest = () => {
    if (!note) {
      Alert.alert('Thông báo', 'Chưa nhập lý do', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    if (note.length > 100) {
      Alert.alert('Thông báo', 'Lý do vượt quá 100 kí tự. Vui lòng kiểm tra lại.', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }

    cancelRequest(note);
  };

  const onAcceptRequest = () => {
    approveRequest(vanPhongPhamDetail.id);
  };

  useEffect(
    () => {
      let sum = 0;

      vanPhongPhamDetail.listPlace.forEach(item => (sum += item.quantity * item.dongia));

      setTotalPrice(sum);
    },
    [vanPhongPhamDetail]
  );

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
          <Text style={{ fontSize: 14, color: colors.gray }}>
            {item.dongia}/{item.donvi}
          </Text>
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
        data={vanPhongPhamDetail.listPlace}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        renderItem={({ item }) => <PlaceItem item={item} />}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }}>
        <Form style={styles.form}>
          <IconField label="Tên yêu cầu" iconName="book" required>
            <Textarea
              placeholder="-"
              rowSpan={3}
              value={vanPhongPhamDetail.requestName}
              style={styles.input}
              disabled={true}
            />
          </IconField>
          <IconField label="Đơn vị yêu cầu" iconName="book" required>
            <Textarea
              rowSpan={3}
              placeholder="-"
              value={vanPhongPhamDetail.requestDeptName}
              disabled={true}
              style={styles.input}
            />
          </IconField>
          <IconField label="Ghi chú" iconName="book" required>
            <Textarea
              rowSpan={3}
              placeholder="-"
              value={note}
              style={styles.input}
              onChangeText={text => setNote(text)}
            />
          </IconField>

          <View style={{ paddingHorizontal: 20, height: 200, marginVertical: 20 }}>
            {vanPhongPhamDetail.listPlace.length === 0 && (
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
            {vanPhongPhamDetail.listPlace.length > 0 && <ListPlace />}
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
            {isCanAcceptRequest && (
              <Button
                style={[{ flex: 1, marginRight: 10, justifyContent: 'center' }, styles.btn]}
                onPress={() => onAcceptRequest()}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>Phê duyệt</Text>
              </Button>
            )}
            {isCanCancelRequest && (
              <Button
                style={[{ flex: 1, justifyContent: 'center' }, styles.btnCancel]}
                onPress={() => {
                  onCancelRequest();
                }}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>Hủy yêu cầu</Text>
              </Button>
            )}
          </View>
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailBody;
