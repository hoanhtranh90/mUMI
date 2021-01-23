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
import ModalAddUser from '../create-edit/ModalAddUser';
import ModalAddPlace from '../create-edit/ModalAddPlace';
import IconButton from 'eoffice/components/IconButton';
import {Button, Form, Icon, Spinner, Textarea} from 'native-base';
import IconField from '../../common/IconField';
import DetailFooter from "../../veMayBay/detail/DetailFooter";
import _ from "lodash";
import {ACTION_CODE, STATUS_CODE} from "../../../../constants/administrative";
import {UserItem} from "./UserItem";
import {PlaceItem} from "./PlaceItem";
import { styles } from './StylesDetail';
import {ButtonAdd} from "./ButtonAdd";
import AttachmentItem from "../../veMayBay/common/AttachmentItem";
import {ATTACHMENT_TYPES} from "../../../../constants/common";
import {DocumentPickerUtil} from "react-native-document-picker";
import useFileUploadFile from 'eoffice/utils/useFileUploadFile';
import useFileUploadTickets from 'eoffice/utils/useFileUploadTickets';

const DetailBody = ({
  bookHotelDetail,
  cancelRequest,
  approveRequest,
  updateRequest
}) => {
  const [requestName, setRequestName] = useState('');
  const [requestContent, setRequestContent] = useState('');
  const [listCanBo, setListCanBo] = useState([]);
  const [listPlace, setListPlace] = useState([]);
  const [note, setNote] = useState('');
  const [caseMasterId, setCaseMasterId] = useState('');
  const [isCanAdd, setIsCanAdd] = useState(false)

  const [openAddUser, setOpenAddUser] = useState(false);
  const [openAddPlace, setOpenAddPlace] = useState(false);

  const [stateFiles, actionsFiles] = useFileUploadFile({
    objectType: ATTACHMENT_TYPES.TOTRINH_KHACHSAN,
  }, DocumentPickerUtil.pdf());

  const [stateTickets, actionsTickets] = useFileUploadTickets({
    objectType: ATTACHMENT_TYPES.KHACHSAN,
  });

  useEffect(
    () => {
      if (bookHotelDetail) {
        getListUsers(bookHotelDetail)
        getListPlaces(bookHotelDetail)
        fillData(bookHotelDetail)
        getFiles(bookHotelDetail)
      }
      console.log(bookHotelDetail)
    },
    [bookHotelDetail]
  );

  function getFiles(bookHotelDetail) {
    actionsFiles.setFile(bookHotelDetail.documentsHotel ? bookHotelDetail.documentsHotel : [])
    actionsTickets.setFile(bookHotelDetail.ticketHotel ? bookHotelDetail.ticketHotel : [])
  }

  function getListUsers(bookHotelDetail) {
    let users = bookHotelDetail.hcCaseHotelUserView.map(user => {
      return {
        name: user.userName,
        gender: user.gender,
        positionId: user.positionId,
        phone: user.isdn,
        cmt: user.identityNumber,
        email: user.email,
        birthday: new Date(user.birthday),
        checker: user.checker,
        deptId: user.deptId,
      };
    });
    setListCanBo(users);
  }

  function getListPlaces(bookHotelDetail) {
    let places = bookHotelDetail.hcCaseHotelLocationView.map(location => {
      return {
        id: location.id,
        locationId: location.locationId,
        locationName: location.locationName,
        hotelId: location.hotelId,
        hotelName: location.hotelName,
        checkin: new Date(location.checkIn),
        checkout: new Date(location.checkOut),
        lstPrice: bookHotelDetail.hcCaseHotelPrice.filter(item => item.locationId === location.id),
      };
    });
    setListPlace(places);
  }
  function fillData(bookHotelDetail) {
    setCaseMasterId(bookHotelDetail.hcCaseMaster.id);
    setRequestName(bookHotelDetail.hcCaseHotel.requestName);
    setRequestContent(bookHotelDetail.hcCaseHotel.requestContent);
    setNote(bookHotelDetail.hcCaseHotel.note)
    if (bookHotelDetail.listActions.length > 0) {
      bookHotelDetail.listActions.forEach(item => {
        if (item.actionCode === ACTION_CODE.CAP_NHAT || item.actionCode === ACTION_CODE.PHE_DUYET) {
          setIsCanAdd(true)
          return true
        }
      })
    }
  }

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

  const submit = data => {
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
    switch (data.actionCode) {
      case ACTION_CODE.PHE_DUYET:
        if (stateTickets.files.length === 0) {
          Alert.alert('Thông báo', 'Chưa có giấy tờ khách sạn', [
            { text: 'Đóng', style: 'destructive' },
          ]);
          return;
        }
        onAcceptRequest()
        break;
      case ACTION_CODE.CAP_NHAT:
        onUpdateRequest()
        break;
      case ACTION_CODE.TU_CHOI:
        onCancel(ACTION_CODE.TU_CHOI)
        break;
      case ACTION_CODE.HUY_YEU_CAU:
        onCancel(ACTION_CODE.HUY_YEU_CAU)
        break;
      case ACTION_CODE.TU_HUY_YEU_CAU:
        onCancel(ACTION_CODE.TU_HUY_YEU_CAU)
        break;
      default:
        break;
    }
  };

  const onCancel = (actionCode) => {
    const form = {
      note: note,
      caseMasterId: caseMasterId,
      action: actionCode
    }
    switch (actionCode) {
      case ACTION_CODE.TU_CHOI:
        approveRequest(form, 'Từ chối yêu cầu thành công');
        break;
      case ACTION_CODE.HUY_YEU_CAU:
      case ACTION_CODE.TU_HUY_YEU_CAU:
        cancelRequest(form)
        break;
    }
  };

  const onUpdateRequest = () => {
    const form = {
      note: note,
      caseMasterId: caseMasterId,
      action: ACTION_CODE.CAP_NHAT,
      files: stateTickets.files.map(item => {
        return {
          fileExtention: item.fileExtention,
          fileName: item.fileName,
          id: item.attachmentId ? item.attachmentId : item.id
        }
      }),
      toTrinhFiles: stateFiles.files.map(item => {
        return {
          fileExtention: item.fileExtention,
          fileName: item.fileName,
          id: item.attachmentId ? item.attachmentId : item.id
        }
      }),
      requestContent: requestContent,
      requestName: requestName,
      users: listCanBo.map(item => {
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
      }),
      hotels: listPlace.map(item => {
        return {
          checkIn: item.checkin.getTime(),
          checkOut: item.checkout.getTime(),
          countRoom1: item.lstPrice[0].countRoom,
          countRoom2: item.lstPrice[1].countRoom,
          hotelId: item.hotelId,
          locationId: item.locationId
        }
      })
    }
    updateRequest(form)
  };

  const onAcceptRequest = () => {
    let form = {
      note: note,
      caseMasterId: caseMasterId,
      action: ACTION_CODE.PHE_DUYET,
      files: stateTickets.files.map(item => {
        return {
          fileExtention: item.fileExtention,
          fileName: item.fileName,
          id: item.attachmentId ? item.attachmentId : item.id
        }
      }),

      hotels: listPlace.map(item => {
        return {
          checkIn: item.checkin.getTime(),
          checkOut: item.checkout.getTime(),
          countRoom1: item.lstPrice[0].countRoom,
          countRoom2: item.lstPrice[1].countRoom,
          hotelId: item.hotelId,
          locationId: item.locationId
        }
      })
    };
    approveRequest(form, 'Phê duyệt yêu cầu thành công');
  };



  const ListUser = () => (
    <View style={{ flex: 1 }}>
      <FlatList
        data={listCanBo}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        renderItem={({ item }) => <UserItem item={item} />}
      />
    </View>
  );
    let color = '';
    let statusColor = '';
    if (bookHotelDetail && bookHotelDetail.hcCaseMaster.status) {
      if (bookHotelDetail.hcCaseMaster.status === STATUS_CODE.HOANTHANH) {
        color = 'rgba(57, 202, 116, 0.2)';
        statusColor = '#39ca74';
      } else if (bookHotelDetail.hcCaseMaster.status === STATUS_CODE.HUY) {
        color = 'rgba(255, 59, 48, 0.2)';
        statusColor = '#ff3b30';
      } else {
        color = 'rgba(240, 195, 48, 0.2)';
        statusColor = '#f0c330';
      }
    }
    const ListPlace = () => (
      <View style={{ flex: 1 }}>
        <FlatList
          data={listPlace}
          ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
          renderItem={({ item }) => <PlaceItem item={item} />}
        />
      </View>
    );

    const InfoItem = ({label, iconName, value}) => (
      <IconField label={label} iconName={iconName}>
        <Textarea
          placeholder="-"
          rowSpan={3}
          value={value}
          style={styles.input}
          disabled={true}
        />
      </IconField>
    )
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }}>
        <Form style={styles.form}>
          {bookHotelDetail && bookHotelDetail.hcCaseMaster.state &&
          <View style={[styles.wrapperStatus, { backgroundColor: color }]}>
            <Text style={[styles.status, { color: statusColor }]}>{bookHotelDetail.hcCaseMaster.state}</Text>
          </View>}
          <InfoItem label={'Đơn vị yêu cầu'} iconName={"layers"} value={bookHotelDetail.requester.deptName}/>
          <InfoItem label={"Người yêu cầu"} iconName={"user"} value={bookHotelDetail.requester.fullName}/>
          <InfoItem label={"Tên yêu cầu"} iconName={"bookmark"} value={requestName}/>
          <InfoItem label={"Nội dung yêu cầu"} iconName={"alert-circle"} value={requestContent}/>
          <IconField label="Ghi chú" iconName="feather" required>
            <Textarea
              rowSpan={3}
              placeholder="-"
              value={note}
              style={styles.input}
              onChangeText={text => setNote(text)}
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
          <IconField label="Giấy tờ khách sạn" iconName="file" required>
            <View style={styles.uploadFileContainer}>
              <IconButton
                disabled={stateTickets.loading}
                icon="upload"
                iconStyle={{ color: stateTickets.loading ? colors.lightBlue : colors.blue }}
                onPress={() => {
                  actionsTickets.upload(false);
                }}
              />
              {stateTickets.loading && (
                <View style={styles.loading}>
                  <Spinner color={colors.gray} size="small" style={styles.loadingSpinner} />
                  <Text style={styles.loadingText}>Đang tải file lên</Text>
                </View>
              )}
              {stateTickets.files.length > 0 && (
                <View
                  style={{paddingTop: 11, flex: 1}}>
                  <FlatList
                    data={stateTickets.files}
                    keyExtractor={item => item.id}
                    renderItem={({item} ) => (
                      <AttachmentItem
                        onRemove={() => actionsTickets.remove(item.id)}
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
            {isCanAdd && <ButtonAdd onPress={() => {
              setOpenAddUser(true)
            }}/>}
          </View>

          <View style={{ paddingHorizontal: 20}}>
            {listCanBo.length === 0 && (
              <View style={styles.flatView}>
                <Text style={{ color: colors.darkGray }}>Chưa có cán bộ</Text>
              </View>
            )}
            {listCanBo.length > 0 && <ListUser />}
          </View>

          <View style={styles.headerFlat}>
            <Text style={styles.btnText}>Danh sách nơi lưu trú</Text>
            {isCanAdd && <ButtonAdd onPress={() => {
              setOpenAddPlace(true)
            }}/>}
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            {listPlace.length === 0 && (
              <View style={styles.flatView}>
                <Text style={{ color: colors.darkGray }}>Chưa có nơi lưu trú</Text>
              </View>
            )}
            {listPlace.length > 0 && <ListPlace />}
          </View>
          <View style={styles.btmActions}>
            {bookHotelDetail.listActions && bookHotelDetail.listActions.map((data, index) => (
              <DetailFooter
                actionName={data.actionName}
                actionCode={data.actionCode}
                key={index.toString()}
                onPress={() => submit(data)}
              />
            ))}
          </View>
        </Form>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailBody;
