import React, { useState } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import IconField from '../../common/IconField';
import { Button, Form, Icon, Input } from 'native-base';
import colors from '../../../../utils/colors';
import DatePicker from '../../common/DatePicker';
import Picker from 'eoffice/components/Picker';

const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 50,
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

const dataType = [
  {
    id: 1,
    text: 'An Ninh',
  },
  {
    id: 2,
    text: 'Cây xanh',
  },
  {
    id: 3,
    text: 'Cải tạo văn phòng, toà nhà',
  },
  {
    id: 4,
    text: 'Kỹ thuật',
  },
  {
    id: 5,
    text: 'Làm sạch',
  },
  {
    id: 6,
    text: 'Nhà ăn',
  },
  {
    id: 7,
    text: 'Phòng họp',
  },
];

const CreateEditBody = ({ createRequest, currentUserDeptRole }) => {
  const [request, setRequest] = useState({});

  const setValue = (key, value) => {
    setRequest(val => {
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

  const submitRequest = () => {
    if (!request.typeRequest) {
      Alert.alert('Thông báo', 'Chưa nhập Lĩnh vực yêu cầu', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (!request.title) {
      Alert.alert('Thông báo', 'Chưa nhập tên yêu cầu', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    if (!request.content) {
      Alert.alert('Thông báo', 'Chưa nhập nội dung yêu cầu', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (!request.place) {
      Alert.alert('Thông báo', 'Chưa nhập địa điểm yêu cầu', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (!request.time) {
      Alert.alert('Thông báo', 'Chưa nhập thời gian yêu cầu', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }

    let submitForm = {
      id: new Date().getTime(),
      title: request.title,
      typeRequest: request.typeRequest,
      content: request.content,
      place: request.place,
      time: request.time,
      status: 1,
      requestDeptName: currentUserDeptRole.deptName,
      approveStatus: 1,
      creatorId: currentUserDeptRole.id,
      deptId: currentUserDeptRole.deptId,
      parentDeptId: currentUserDeptRole.parentDeptId,
    };

    createRequest(submitForm);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }}>
        <Form style={styles.form}>
          <IconField label="Lĩnh vực yêu cầu" iconName="book" required>
            <Picker
              mode="dropdown"
              iosIcon={selectIcon}
              style={styles.picker}
              placeholder="-"
              placeholderStyle={styles.pickerPlaceholder}
              textStyle={styles.pickerText}
              selectedValue={request.typeRequest}
              onValueChange={val => {
                setValue('typeRequest', val);
              }}
              items={dataType.map(data => ({
                label: data.text,
                value: data.text,
              }))}
            />
          </IconField>
          <IconField label="Tên yêu cầu" iconName="alert-circle" required>
            <Input
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={request.title}
              onChangeText={txt => setValue('title', txt)}
              style={styles.input}
            />
          </IconField>
          <IconField label="Nội dung yêu cầu" iconName="alert-circle" required>
            <Input
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={request.content}
              onChangeText={txt => setValue('content', txt)}
              style={styles.input}
            />
          </IconField>
          <IconField label="Địa điểm yêu cầu" iconName="alert-circle" required>
            <Input
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={request.place}
              onChangeText={txt => setValue('place', txt)}
              style={styles.input}
            />
          </IconField>
          <IconField label="Thời gian yêu cầu" iconName="clock" required>
            <DatePicker
              placeholderStyle={styles.pickerPlaceholder}
              style={styles.picker}
              textStyle={styles.pickerText}
              value={request.time}
              onChange={date => setValue('time', date)}
            />
          </IconField>

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
