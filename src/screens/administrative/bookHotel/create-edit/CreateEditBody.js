import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  BackHandler,
  View,
  ScrollView,
  Platform,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import IconField from '../../common/IconField';
import {Form, Input, Textarea, Icon, ListItem, Button, Spinner} from 'native-base';
import useCreateForm from './useCreateForm';
import ModalAddUser from './ModalAddUser';
import colors from '../../../../utils/colors';
import ModalAddPlace from './ModalAddPlace';
import format from 'date-fns/format';
import { createRequest } from '../../../../store/administrative/bookHotel/reducer';
import AttachmentItem from "../../veMayBay/common/AttachmentItem";
import {ATTACHMENT_TYPES} from "../../../../constants/common";
import {DocumentPickerUtil} from "react-native-document-picker";
import useFileUploadFile from 'eoffice/utils/useFileUploadFile';
import {styles} from "../detail/StylesDetail";
import {PlaceItem} from "../detail/PlaceItem";
import {ButtonAdd} from "../detail/ButtonAdd";
import IconButton from 'eoffice/components/IconButton';
import {UserItem} from "../detail/UserItem";

const CreateEditBody = ({ navigation, createRequest }) => {
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openAddPlace, setOpenAddPlace] = useState(false);
  const [requestName, setRequestName] = useState('');
  const [requestContent, setRequestContent] = useState('');
  const [listCanBo, setListCanBo] = useState([]);
  const [listPlace, setListPlace] = useState([]);


  const [stateFiles, actionsFiles] = useFileUploadFile({
    objectType: ATTACHMENT_TYPES.TOTRINH_KHACHSAN,
  }, DocumentPickerUtil.pdf());

  useEffect(() => {
    actionsFiles.reset()
  },[])

  const hcFlow = navigation.getParam('hcFlow')

  const addUser = user => {
    setOpenAddUser(false);
    console.log(user);
    if (user) setListCanBo(val => [...val, user]);
  };

  const addPlace = place => {
    setOpenAddPlace(false);
    console.log(place);
    if (place) setListPlace(val => [...val, {
      id: place.locationId,
      locationId: place.locationId,
      locationName: place.locate.categoryName,
      hotelId: place.hotelId,
      hotelName: place.hotel.categoryName,
      checkin: place.checkin,
      checkout: place.checkout,
      lstPrice: [
        {
          countRoom: place.countRoom1
        },
        {
          countRoom: place.countRoom2
        }
      ]
    }]);
  };

  const submitRequest = () => {
    if (!requestName) {
      Alert.alert('Thông báo', 'Chưa nhập tên yêu cầu', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    if (!requestContent) {
      Alert.alert('Thông báo', 'Chưa nhập nội dung yêu cầu', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (listCanBo.length === 0) {
      Alert.alert('Thông báo', 'Chưa thêm cán bộ', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    if (listPlace.length === 0) {
      Alert.alert('Thông báo', 'Chưa nhập lộ trình', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }

    if (stateFiles.files.length === 0) {
      Alert.alert('Thông báo', 'Chưa có file tờ trình', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    let submitForm = {};
    submitForm.requestName = requestName;
    submitForm.requestContent = requestContent;
    submitForm.flowId = hcFlow.id
    submitForm.users = listCanBo.map(item => {
      return {
        checker: item.checker,
        birthday : item.birthday.getTime(),
        identityNumber: item.cmt,
        gender: item.gender,
        email: item.email,
        isdn: item.phone,
        userName: item.name,
        positionId: item.positionId,
        deptId: item.deptId,
      }
    })
    submitForm.hotels = listPlace.map(item => {
      return {
        checkIn: item.checkin.getTime(),
        checkOut: item.checkout.getTime(),
        countRoom1: item.lstPrice[0].countRoom,
        countRoom2: item.lstPrice[1].countRoom,
        hotelId: item.hotelId,
        locationId: item.locationId
      }
    })
    submitForm.files = stateFiles.files.map(item => {
      return {
        fileExtention: item.fileExtention,
        fileName: item.fileName,
        id: item.attachmentId ? item.attachmentId : item.id
      }
    })
    console.log(submitForm)
    createRequest(submitForm);
  };


  const ListUser = () => (
    <View style={{ flex: 1 }}>
      <FlatList
        data={listCanBo}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        renderItem={({ item }) => <UserItem item={item} /> }
      />
    </View>
  );

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
      <ModalAddUser
        isOpen={openAddUser}
        toggleIsOpen={flag => setOpenAddUser(flag)}
        onSubmit={addUser}
      />
      <ModalAddPlace
        isOpen={openAddPlace}
        toggleIsOpen={flag => setOpenAddPlace(flag)}
        onSubmit={addPlace}
      />
      <ScrollView style={{ flex: 1 }}>
        <Form style={styles.form}>
          <IconField label="Tên yêu cầu" iconName="bookmark" required>
            <Textarea
              placeholder="-"
              rowSpan={3}
              value={requestName}
              style={styles.input}
              onChangeText={txt => setRequestName(txt)}
            />
          </IconField>
          <IconField label="Nội dung yêu cầu" iconName="alert-circle" required>
            <Textarea
              rowSpan={3}
              placeholder="-"
              value={requestContent}
              onChangeText={txt => setRequestContent(txt)}
              style={styles.input}
            />
          </IconField>
          <IconField label="Tệp tờ trình" iconName="file" required>
            <View style={styles.uploadFileContainer}>
              <IconButton
                disabled={stateFiles.loading}
                icon="upload"
                iconStyle={{ color: stateFiles.loading ? colors.lightBlue : colors.blue }}
                onPress={() => {
                  actionsFiles.upload(false);
                }}
              />
              {stateFiles.loading && (
                <View style={styles.loading}>
                  <Spinner color={colors.gray} size="small" style={styles.loadingSpinner} />
                  <Text style={styles.loadingText}>Đang tải file lên</Text>
                </View>
              )}
              {stateFiles.files.length > 0 && (
                <View
                  style={{paddingTop: 11, flex: 1}}>
                  <FlatList
                    data={stateFiles.files}
                    keyExtractor={item => item.id}
                    renderItem={({item} ) => (
                      <AttachmentItem
                        onRemove={() => actionsFiles.remove(item.id)}
                        item={item}
                      />
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
                  />
                </View>
              )}
            </View>
          </IconField>
          <View style={styles.headerFlat}>
            <Text style={styles.btnText}>Danh sách cán bộ</Text>
            <ButtonAdd onPress={() => {
              setOpenAddUser(true)
            }}/>
          </View>

          <View style={{ paddingHorizontal: 20 , height: 200}}>
            {listCanBo.length === 0 && (
              <View style={styles.flatView}>
                <Text style={{ color: colors.darkGray }}>Chưa có cán bộ</Text>
              </View>
            )}
            {listCanBo.length > 0 && <ListUser />}
          </View>

          <View style={styles.headerFlat}>
            <Text style={styles.btnText}>Danh sách nơi lưu trú</Text>
            <ButtonAdd onPress={() => {
              setOpenAddPlace(true)
            }}/>
          </View>

          <View style={{ paddingHorizontal: 20, height: 200 }}>
            {listPlace.length === 0 && (
              <View style={styles.flatView}>
                <Text style={{ color: colors.darkGray }}>Chưa có nơi lưu trú</Text>
              </View>
            )}
            {listPlace.length > 0 && <ListPlace />}
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
