/* eslint-disable no-shadow */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Form, Icon, Textarea } from 'native-base';
import _ from 'lodash';
import {
  ACTION_CODE,
  CREATE_LABELS_LT,
  HANHCHINH_TYPE,
  RQMORES,
  HC_CASE_CALENDAR,
  ROLE_CODE,
  TCT_DEPT_ID,
  HDTV_DEPT_CODE,
  TCT_DEPT_CODE,
  TOGIUPVIEC_HDTV,
  POSITION_CODE,
} from 'eoffice/constants/administrative';
import colors from 'eoffice/utils/colors';
import Picker from 'eoffice/components/Picker';
import styles from './ScheduleForm.style';
import DatePicker from '../../common/DatePicker';
import IconField from '../../common/IconField';
import { FlatList } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Attachments from '../../../tablet/lichTuan/component/CalendarAttachments';
import ModalLanhDao from './ModalLanhDao';
import ModalShareCalendar from './ModalShareCalendar';
import * as service from '../../../../store/administrative/lichTuan/detail/service';
import { groupActors } from 'eoffice/utils/utils';
import hcCfgMeetingRoomService from '../../../../service/hcCfgMeetingRoomService';

const ScheduleForm = ({
  actionList,
  listFreeRooms,
  listDVPH,
  detail,
  detailLTLanhDao,
  detailDVPH,
  setValue,
  state,
  type,
  hcFlowsCanstart,
  attachments,
  actorsGroup,
  openModalShare,
  currentUserDeptRole,
  flagShowPopupShare,
  onLoaded,
}) => {
  const [rqMores, setRqMore] = useState(RQMORES.map(rqMore => ({ ...rqMore, checked: false })));
  const [rooms, setRooms] = useState([]);
  const [isOpenLDModal, setIsOpenLDModal] = useState(false);
  const [hcCfgMeetingRoom, setHcCfgMeetingRoom] = useState(null);

  async function getListRoomFree(startTime, endTime) {
    const roomFree = await listFreeRooms({ startTime, endTime });

    if (!_.isNull(roomFree) && !_.isEmpty(roomFree.dataRoomFree)) {
      const list = _.orderBy(roomFree.dataRoomFree, ['roomName'], ['asc']);
      setRooms(list);
    }
  }

  const [showDrop, setShowDrop] = useState(true);
  const { width, height } = Dimensions.get('window');
  const [showModal, setShowModal] = useState(false);
  const [chaired, setChaired] = useState('');
  const [capQT, setCapQT] = useState('');

  const [visible, setVisible] = useState(null);
  const [listLD, setListLD] = useState([]);
  const [listCT, setListCT] = useState([]);
  const [listPH, setListPH] = useState([]);

  const slRoom = rooms.find(slRoom => slRoom.id === state.roomName);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);

  const [selectedCT, setSelectedCT] = useState([]);
  const [selectedCT2, setSelectedCT2] = useState([]);

  const [selectedPH, setSelectedPH] = useState([]);
  const [selectedPH2, setSelectedPH2] = useState([]);
  const [listLDChecked, setListLDChecked] = useState([]);
  const [groupsName, setGroupsName] = useState([]);
  const [isOpenModalShare, setIsOpenModalShare] = useState(false);
  const [isCanUpload, setIsCanUpload] = useState(false);
  const [isToShared, setIsToShared] = useState(false);
  const [isMeetingOnline, setIsMeetingOnline] = useState(false);
  const [ableToJoinMeeting, setAbleToJoinMeeting] = useState(false);

  const meetingTypeOptions = [
    {
      id: HC_CASE_CALENDAR.MEETING_TYPE.ONLINE,
      label: 'Họp trực tuyến',
    },
    {
      id: HC_CASE_CALENDAR.MEETING_TYPE.OFFLINE,
      label: 'Họp thường',
    },
  ];

  const loadQuyTrinhDepartment = hcCaseCalendar => {
    return service.findDeptById(hcCaseCalendar.parentDeptId).then(response => response.data);
  };

  const loadHcCfgRoom = hcCaseCalendar => {
    hcCfgMeetingRoomService
      .findById(hcCaseCalendar.hcCfgMeetingRoomId)
      .then(data => setHcCfgMeetingRoom(data));
  };

  const getMeetingPlaceLabel = hcCaseCalendar => {
    switch (hcCaseCalendar.meetingType) {
      case HC_CASE_CALENDAR.MEETING_TYPE.OFFLINE:
      case HC_CASE_CALENDAR.MEETING_TYPE.ONLINE_OTHER:
        return hcCaseCalendar.meetingPlace;
      case HC_CASE_CALENDAR.MEETING_TYPE.ONLINE:
        return 'Họp Mobimeeting';
      case HC_CASE_CALENDAR.MEETING_TYPE.ONLINE_MOBIMEETING_CODINH:
        return `Họp Mobimeeting, ${hcCfgMeetingRoom ? hcCfgMeetingRoom?.roomName : hcCaseCalendar.meetingPlace}`;
      default:
        return hcCaseCalendar.meetingPlace;
    }
  };

  useEffect(
    () => {
      if (detail) {
        loadHcCfgRoom(detail);
        Promise.all([
          loadQuyTrinhDepartment(detail),
          service.findAllByHcCaseMasterId(detail.id),
        ]).then(results => {
          let quyTrinhDepartment = results[0];
          let hcCaseMasterUser = results[1];
          if (hcCaseMasterUser) setIsToShared(true);
          else setIsToShared(false);
          let isCanUpload =
            detail.requestUserId === currentUserDeptRole.userId ||
            currentUserDeptRole.roleCode === ROLE_CODE.TONG_HOP_LICH_TUAN ||
            currentUserDeptRole.roleCode === ROLE_CODE.DANG_KY_LICH_TUAN ||
            currentUserDeptRole.deptId === detail.chairedUnitId ||
            (currentUserDeptRole.roleCode === ROLE_CODE.LANH_DAO &&
              ((detailDVPH &&
                detailDVPH.findIndex(dept => dept.id === currentUserDeptRole.deptId) !== -1) ||
                (detailLTLanhDao &&
                  detailLTLanhDao.findIndex(item => item.userId === currentUserDeptRole.userId) !==
                    -1))) ||
            !!hcCaseMasterUser;
          setIsCanUpload(isCanUpload);
          let isMeetingOnline =
            detail.status === 'HOANTHANH' &&
            detail &&
            (detail.meetingType === HC_CASE_CALENDAR.MEETING_TYPE.ONLINE ||
              detail.meetingType === HC_CASE_CALENDAR.MEETING_TYPE.ONLINE_MOBIMEETING_CODINH);
          setIsMeetingOnline(isMeetingOnline);
          let isLanhdao =
            currentUserDeptRole.roleCode === ROLE_CODE.LANH_DAO &&
            (currentUserDeptRole.deptId === detail.parentDeptId ||
              //hdtv thi cung la lanhdao cua tct;
              (detail.parentDeptId === TCT_DEPT_ID &&
                currentUserDeptRole.deptCode === HDTV_DEPT_CODE) ||
              //neu la lanh dao cua don vi cha thi cung co quyen xem;
              quyTrinhDepartment.path.startsWith(currentUserDeptRole.deptPath + '/'));

          setAbleToJoinMeeting(
            isMeetingOnline &&
              (isCanUpload ||
                (currentUserDeptRole &&
                  (currentUserDeptRole.userName === 'cuong.tm' ||
                    currentUserDeptRole.userName === 'thangnm' ||
                    //thu ky ban tgd
                    (currentUserDeptRole.posCode === POSITION_CODE.THU_KY &&
                      currentUserDeptRole.deptCode === TCT_DEPT_CODE) ||
                    //to giup viec hoi dong thanh vien
                    (currentUserDeptRole.roleCode === ROLE_CODE.CHUYEN_VIEN &&
                      currentUserDeptRole.deptCode === TOGIUPVIEC_HDTV) ||
                    isLanhdao)))
          );
        });
      }
    },
    [detail, currentUserDeptRole]
  );

  useEffect(
    () => {
      if (flagShowPopupShare > 0) {
        setIsOpenModalShare(true);
      }
    },
    [flagShowPopupShare]
  );

  useEffect(
    () => {
      onLoaded({ isShowBtnShare: isCanUpload || isToShared });
    },
    [isCanUpload, isToShared]
  );

  useEffect(
    () => {
      let group = groupActors(listLDChecked, actorsGroup);
      setGroupsName(group);
    },
    [listLDChecked]
  );

  useEffect(
    () => {
      let listLanhDao = listLDChecked.reduce(
        (acc, crr) => (acc.includes(crr.id) ? [...acc] : [...acc, crr.id]),
        []
      );
      let leaders = listLDChecked.reduce(
        (acc, crr) =>
          acc.includes(crr.id)
            ? [...acc]
            : [...acc, { userId: crr.userId, userDeptRoleId: crr.id }],
        []
      );
      setValue('listLanhDao', listLanhDao);
      setValue('leaders', leaders);
    },
    [listLDChecked]
  );

  const joinMeeting = async () => {
    const res = await service.joinRoom(detail.id);
    const urlApp = res.data.urlApp;
    const supported = await Linking.canOpenURL(urlApp);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(urlApp);
    } else {
      Alert.alert(`Don't know how to open this URL: ${urlApp}`);
    }
  };

  const onChoosedLD = ({ listChecked }) => {
    setListLDChecked(listChecked);
    setIsOpenLDModal(false);
  };

  const removeGroup = item => {
    let leaderIds = item.data.map(obj => obj.id);
    setListLDChecked(val => val.filter(ld => !leaderIds.includes(ld.id)));
  };

  const removeLD = item => {
    setListLDChecked(val => val.filter(ld => ld.id !== item.data.id));
  };

  const LDGroupBadges = () => {
    return groupsName.map((item, index) => {
      if (item.type === 'group') {
        return (
          <Badge title={item.filter.actorGroupName} remove={() => removeGroup(item)} key={index} />
        );
      } else
        return (
          <Badge
            title={`${item.data.gender === 0 ? 'Chị' : 'Anh'} ${item.data.fullName}`}
            remove={() => removeLD(item)}
            key={index}
          />
        );
    });
  };

  const Badge = ({ title, remove }) => (
    <View style={styles.badge}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.darkGray }}>{title}</Text>
      {type === HANHCHINH_TYPE.CREATE && (
        <TouchableOpacity onPress={remove}>
          <Icon
            name="x"
            type="Feather"
            style={{ fontSize: 14, fontWeight: 'bold', color: colors.darkGray, marginLeft: 5 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  async function getListLD(deptId) {
    service.getlistLanhDao({ deptId: deptId }).then(ldao => {
      if (!!ldao) {
        ldao = ldao.users;
        if (!_.isEmpty(ldao)) {
          const list = _.orderBy(ldao, ['fullName'], ['asc']);
          list.forEach(item => item.deptCode === 'TCT' && (item.deptName = 'Ban Tổng giám đốc'));
          setListLD(list);
        }
      }
    });
  }

  async function getDetailChairedUnit() {
    const chairedUnit = [];
    chairedUnit.push(detail.chairedUnitId);
    setSelectedCT(chairedUnit);
    setChaired(detail.chairedUnitId);
  }

  async function getListDVPH() {
    const dvph = await listDVPH();
    const dvphAddCooperate = [];
    await dvph.departments.forEach(item => {
      item = { ...item, cooperateDeptName: item.deptName, cooperateDeptId: item.id };
      dvphAddCooperate.push(item);
    });

    await setListPH(dvphAddCooperate);
    await setListCT(dvphAddCooperate);

    await dvphAddCooperate.forEach(item => {
      if (item.id === detail.chairedUnitId) {
        setValue('chaired', item.deptName);
      }
    });
  }

  useEffect(
    () => {
      if (type === HANHCHINH_TYPE.DETAIL) {
        setListLDChecked(detailLTLanhDao);
      }
    },
    [detailLTLanhDao]
  );

  function fillDataForm() {
    const listLTLanhDaoTmp = [];
    detailLTLanhDao.forEach(item => {
      listLTLanhDaoTmp.push(item.userId);
    });
    setSelectedItems(listLTLanhDaoTmp);

    const listDVPHTmp = [];
    detailDVPH.forEach(item => {
      listDVPHTmp.push(item.cooperateDeptId);
    });
    setSelectedPH(listDVPHTmp);

    const chairedUnit = [];
    chairedUnit.push(detail.chairedUnitId);
    setSelectedCT(chairedUnit);
    setValue('title', detail.meetingTitle);
    setValue('content', detail.meetingContent);
    setValue('startDate', new Date(detail.startTime));
    setValue('endDate', new Date(detail.endTime));
    setValue('place', detail.meetingPlace);
    setValue('participant', detail.otherInvolved);
    setValue('meetingType', detail.meetingType);
    setValue('listPH', listDVPHTmp);
    setValue('listCT', chairedUnit);
    // setValue('chaired', detail.chairedUnit);
    // setValue('videoc', detail.videoConferenceUnit);
    setValue('rqMores', detail.isNeedRoom);
    setValue('roomName', detail.roomId);
    setValue('listLanhDao', detailLTLanhDao.map(ld => ld.userDeptRoleId));
    setValue(
      'leaders',
      detailLTLanhDao.map(ld => {
        return {
          userId: ld.userId,
          userDeptRoleId: ld.userDeptRoleId,
        };
      })
    );

    if (!_.isEmpty(actionList)) {
      _.forEach(actionList, obj => {
        if (obj.actionCode === ACTION_CODE.CAP_NHAT) {
          setVisible(true);
        }
        if (obj.actionCode === ACTION_CODE.PHE_DUYET) {
          setVisible();
        }
      });
    }

    if (!_.isNull(detail.note)) {
      setValue('note', detail.note);
    }
  }

  initData = async () => {
    getListDVPH();
    getDetailChairedUnit();
    await getListLD(detail.parentDeptId);
    fillDataForm();
    getListRoomFree(detail.startTime, detail.endTime);
  };

  useEffect(() => {
    if (type === HANHCHINH_TYPE.DETAIL) {
      initData();
    } else if (type === HANHCHINH_TYPE.CREATE) {
      // getListLD(detail.deptId);
      // getListDVPH();
    }
  }, []);

  const selectIcon = (
    <Icon
      name="chevron-down"
      type="Feather"
      style={{ fontSize: 16, color: '#fff', marginRight: 0 }}
    />
  );
  const [showPop, setShowPop] = useState(false);

  function onChangeRqMore(index) {
    if (type === HANHCHINH_TYPE.DETAIL || type === HANHCHINH_TYPE.CREATE) {
      setShowPop(!showPop);
      rqMores[index].checked = !rqMores[index].checked;
      setRqMore(rqMores);
      setValue('rqMores', rqMores);
    }
  }

  function onSelectedItemsChange(selectedItemsTmp) {
    const filteredItems = selectedItemsTmp.filter(val => !selectedItems2.includes(val));
    setSelectedItems(filteredItems);
    setValue('listLanhDao', filteredItems);
  }

  function onSelectedCTChange(selectedCTTmp) {
    const filteredItems = selectedCTTmp.filter(val => !selectedCT2.includes(val));
    setSelectedCT(filteredItems);
    setValue('listCT', filteredItems);
    if (filteredItems.length === 1) {
      listPH.forEach(item => {
        if (item.id === filteredItems[0]) {
          // console.log(item.deptName);
          setValue('chaired', item.deptName);
        }
      });
    }
  }

  function onSelectedPHChange(selectedPHTmp) {
    const filteredItems = selectedPHTmp.filter(val => !selectedPH2.includes(val));
    setSelectedPH(filteredItems);
    setValue('listPH', filteredItems);
  }

  function onChangeStartDate(date) {
    setValue('startDate', date);
    if (!_.isNull(date) && !_.isNull(state.endDate)) {
      getListRoomFree(date.getTime(), state.endDate.getTime());
    }
  }

  function convertBool(valueChange) {
    if (valueChange === true) {
      return 1;
    }
    return 0;
  }

  if (rqMores[0].checked === false) {
    convertBool((rqMores[0].checked = 0));
  } else if (rqMores[0].checked === true) {
    convertBool((rqMores[0].checked = 1));
  }

  function onChangeEndDate(date) {
    setValue('endDate', date);

    if (!_.isNull(state.startDate) && !_.isNull(date)) {
      getListRoomFree(state.startDate.getTime(), date.getTime());
    }
  }

  const Check = (
    <Image
      source={require('../../../../assets/icons-check.png')}
      style={{ width: 14, height: 14 }}
    />
  );

  onSelectDept = (deptId, deptName, id) => {
    setSelectedItems([]);
    setSelectedPH([]);
    setSelectedCT([]);
    setSelectedItems2([]);
    setSelectedPH2([]);
    setSelectedCT2([]);
    global.deptSelected = deptId;
    global.flowId = id;
    setCapQT(deptName);
    getListLD(deptId);
    getListDVPH(deptId);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <ScrollView> */}
      <View style={{ flex: 1 }}>
        <Modal
          onBackdropPress={() => {
            setShowModal(false);
          }}
          isVisible={showModal}
          style={{
            borderRadius: 10,
            flex: 0,
            marginLeft: width * 0.05,
            marginRight: width * 0.05,
            width: width * 0.9,
            height:
              hcFlowsCanstart.hcFlows.length < 4 ? hcFlowsCanstart.hcFlows.length * 80 + 30 : 300,
            marginTop:
              hcFlowsCanstart.hcFlows.length < 4
                ? (height - hcFlowsCanstart.hcFlows.length * 80 - 80) / 2
                : (height - 400) / 2,
            backgroundColor: '#ffffff',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <FlatList
              data={hcFlowsCanstart.hcFlows}
              extraData={hcFlowsCanstart.hcFlows}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    width: width * 0.85,
                    // alignSelf: 'baseline',
                    height: 70,
                    borderRadius: 10,
                    borderColor: '#007aff',
                    borderWidth: 0.5,
                  }}
                  onPress={() => {
                    setShowDrop(false);
                    setShowModal(false);
                    setSelectedItems([]);
                    setSelectedPH([]);
                    setSelectedCT([]);
                    setSelectedItems2([]);
                    setSelectedPH2([]);
                    setSelectedCT2([]);
                    setListLDChecked([]);
                    global.deptSelected = item.deptId;
                    global.flowId = item.id;
                    setCapQT(item.deptName);
                    getListLD(item.deptId);
                    getListDVPH(item.deptId);
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      margin: 12,
                      fontSize: 16,
                      color: 'black',
                      alignSelf: 'center',
                    }}
                  >
                    {item.deptName}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </Modal>
        <ScrollView>
          <Form>
            {type === HANHCHINH_TYPE.CREATE && (
              <IconField label={CREATE_LABELS_LT.capQT} iconName="book" required>
                <TouchableOpacity
                  style={{ width: width, flexDirection: 'row' }}
                  onPress={() => {
                    setShowModal(true);
                  }}
                >
                  {showDrop && (
                    <Icon
                      name="chevron-down"
                      type="Feather"
                      style={{ fontSize: 24, color: colors.gray, marginTop: 7 }}
                    />
                  )}
                  <Text style={styles.input}>{capQT}</Text>
                </TouchableOpacity>
              </IconField>
            )}
            <IconField label={CREATE_LABELS_LT.title} iconName="book" required>
              <Textarea
                rowSpan={3}
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={state.title}
                onChangeText={txt => setValue('title', txt)}
                disabled={!(type === HANHCHINH_TYPE.CREATE) && !visible}
                style={styles.input}
              />
            </IconField>
            <IconField label={CREATE_LABELS_LT.content} iconName="book-open" required>
              <Textarea
                rowSpan={5}
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={state.content}
                onChangeText={txt => setValue('content', txt)}
                disabled={!(type === HANHCHINH_TYPE.CREATE) && !visible}
                style={styles.textarea}
              />
            </IconField>
            <IconField label={CREATE_LABELS_LT.startDate} iconName="clock" required>
              <DatePicker
                placeholderStyle={styles.pickerPlaceholder}
                style={styles.picker}
                textStyle={styles.pickerText}
                value={state.startDate}
                onChange={date => onChangeStartDate(date)}
                disabled={!(type === HANHCHINH_TYPE.CREATE) && !visible}
              />
            </IconField>
            <IconField label={CREATE_LABELS_LT.endDate} iconName="clock" required>
              <DatePicker
                placeholderStyle={styles.pickerPlaceholder}
                style={styles.picker}
                textStyle={styles.pickerText}
                value={state.endDate}
                onChange={date => onChangeEndDate(date)}
                disabled={!(type === HANHCHINH_TYPE.CREATE) && !visible}
              />
            </IconField>
            <IconField label="Loại cuộc họp" iconName="map-pin" required>
              {(type === HANHCHINH_TYPE.CREATE || visible) && (
                <Picker
                  mode="dropdown"
                  iosIcon={selectIcon}
                  style={styles.picker}
                  placeholderStyle={styles.pickerLt}
                  textStyle={styles.pickerText}
                  selectedValue={state.meetingType}
                  onValueChange={val => setValue('meetingType', val)}
                  items={meetingTypeOptions.map(data => ({
                    label: data.label,
                    value: data.id,
                  }))}
                />
              )}
              {type === HANHCHINH_TYPE.DETAIL && !visible && (
                <Text style={styles.input}>
                  {isMeetingOnline ? 'Họp trực tuyến' : 'Họp thường'}
                </Text>
              )}
            </IconField>
            {state.meetingType !== HC_CASE_CALENDAR.MEETING_TYPE.ONLINE && !isMeetingOnline && (
              <IconField label={CREATE_LABELS_LT.place} iconName="map-pin" required>
                <Textarea
                  rowSpan={2}
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={state.place}
                  onChangeText={txt => setValue('place', txt)}
                  disabled={!(type === HANHCHINH_TYPE.CREATE) && !visible}
                  style={styles.input}
                />
              </IconField>
            )}
            {type === HANHCHINH_TYPE.DETAIL && isMeetingOnline && (
              <IconField label={CREATE_LABELS_LT.place} iconName="map-pin">
                <View style={{ paddingTop: 10 }}>
                  <Text style={styles.pickerText}>{getMeetingPlaceLabel(detail)}</Text>
                  {ableToJoinMeeting && (
                    <TouchableOpacity onPress={joinMeeting}>
                      <Text style={styles.btnText}>(Tham gia cuộc họp)</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </IconField>
            )}
            {type === HANHCHINH_TYPE.CREATE && (
              <View pointerEvents={!visible && type === HANHCHINH_TYPE.CREATE ? 'auto' : 'none'}>
                <IconField label={CREATE_LABELS_LT.listLanhDao} iconName="users" required>
                  {capQT === '' && (
                    <Textarea
                      placeholder={CREATE_LABELS_LT.popupChonCQT}
                      placeholderTextColor={colors.gray}
                      disabled
                      style={styles.input}
                    />
                  )}

                  {capQT !== '' && (
                    <View>
                      <TouchableOpacity
                        style={[styles.btn, { width: 200 }]}
                        onPress={() => setIsOpenLDModal(true)}
                      >
                        <Text style={styles.btnText}>Chọn lãnh đạo</Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          marginTop: 5,
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          flexDirection: 'row',
                        }}
                      >
                        <LDGroupBadges />
                      </View>
                    </View>
                  )}
                </IconField>
              </View>
            )}

            {type === HANHCHINH_TYPE.DETAIL && (
              <IconField label={CREATE_LABELS_LT.listLanhDao} iconName="users" required>
                <View
                  style={{
                    marginTop: 5,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                  }}
                >
                  <LDGroupBadges />
                </View>
              </IconField>
            )}

            {type === HANHCHINH_TYPE.CREATE && (
              <View pointerEvents={!visible && type === HANHCHINH_TYPE.CREATE ? 'auto' : 'none'}>
                <IconField label={CREATE_LABELS_LT.chaired} iconName="users">
                  {capQT === '' && (
                    <Textarea
                      placeholder={CREATE_LABELS_LT.popupChonCQT}
                      placeholderTextColor={colors.gray}
                      disabled
                      style={styles.input}
                    />
                  )}

                  {capQT !== '' && (
                    <SectionedMultiSelect
                      showDropDowns={false}
                      selectedItems={selectedCT}
                      readOnlyHeadings={false}
                      onSelectedItemsChange={tmp => onSelectedCTChange(tmp)}
                      uniqueKey="cooperateDeptId"
                      // subKey="children"
                      autoFocus
                      single={false}
                      displayKey="cooperateDeptName"
                      hideSearch
                      items={listPH}
                      confirmText="Chọn"
                      animateDropDowns={false}
                      selectedIconComponent={Check}
                      styles={{
                        container: {
                          marginTop: 150,
                          height: height * 0.5,
                          marginBottom: 150,
                          marginLeft: 25,
                          marginRight: 25,
                        },
                        confirmText: {
                          fontFamily: 'Roboto',
                          color: 'black',
                        },
                        itemText: {
                          margin: 8,
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          fontWeight: 'normal',
                        },
                        subItemText: {
                          fontFamily: 'Roboto',
                          fontSize: 18,
                          marginLeft: 15,
                          fontWeight: 'normal',
                        },
                        button: {
                          backgroundColor: 'white',
                        },
                      }}
                    />
                  )}
                </IconField>
              </View>
            )}

            {type !== HANHCHINH_TYPE.CREATE &&
              !_.isNull(detail.chairedUnit) &&
              detail.chairedUnit !== '' && (
                <IconField label={CREATE_LABELS_LT.chaired} iconName="users">
                  <Textarea
                    rowSpan={2}
                    disabled={!(type === HANHCHINH_TYPE.CREATE) && !visible}
                    placeholder="-"
                    placeholderTextColor={colors.gray}
                    value={detail.chairedUnit}
                    style={styles.input}
                  />
                </IconField>
              )}

            {type === HANHCHINH_TYPE.CREATE && (
              <View pointerEvents={!visible && type === HANHCHINH_TYPE.CREATE ? 'auto' : 'none'}>
                <IconField label={CREATE_LABELS_LT.coop} iconName="users">
                  {capQT === '' && (
                    <Textarea
                      placeholder={CREATE_LABELS_LT.popupChonCQT}
                      placeholderTextColor={colors.gray}
                      disabled
                      style={styles.input}
                    />
                  )}

                  {capQT !== '' && (
                    <SectionedMultiSelect
                      showDropDowns={false}
                      selectedItems={selectedPH}
                      readOnlyHeadings={false}
                      onSelectedItemsChange={tmp => onSelectedPHChange(tmp)}
                      uniqueKey="cooperateDeptId"
                      // subKey="children"
                      autoFocus
                      single={false}
                      displayKey="cooperateDeptName"
                      hideSearch
                      items={listPH}
                      confirmText="Chọn"
                      animateDropDowns={false}
                      selectedIconComponent={Check}
                      styles={{
                        container: {
                          marginTop: 150,
                          height: height * 0.5,
                          marginBottom: 150,
                          marginLeft: 25,
                          marginRight: 25,
                        },
                        confirmText: {
                          fontFamily: 'Roboto',
                          color: 'black',
                        },
                        itemText: {
                          margin: 8,
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          fontWeight: 'normal',
                        },
                        subItemText: {
                          fontFamily: 'Roboto',
                          fontSize: 18,
                          marginLeft: 15,
                          fontWeight: 'normal',
                        },
                        button: {
                          backgroundColor: 'white',
                        },
                      }}
                    />
                  )}
                </IconField>
              </View>
            )}

            {type !== HANHCHINH_TYPE.CREATE && detailDVPH.length > 0 && (
              <IconField label={CREATE_LABELS_LT.coop} iconName="users">
                <FlatList
                  data={detailDVPH}
                  renderItem={({ item }) => (
                    <Textarea
                      rowSpan={2}
                      disabled={!(type === HANHCHINH_TYPE.CREATE) && !visible}
                      placeholder="-"
                      placeholderTextColor={colors.gray}
                      value={item.cooperateDeptName}
                      style={styles.input}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </IconField>
            )}
            {type == HANHCHINH_TYPE.CREATE && (
              <IconField label={CREATE_LABELS_LT.noteDK} iconName="file">
                <Textarea
                  rowSpan={3}
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={state.participant}
                  onChangeText={txt => setValue('participant', txt)}
                  disabled={!(type === HANHCHINH_TYPE.CREATE) && !visible}
                  style={styles.input}
                />
              </IconField>
            )}
            {type !== HANHCHINH_TYPE.CREATE &&
              !_.isNull(state.participant) &&
              state.participant !== '' && (
                <IconField label={CREATE_LABELS_LT.noteDK} iconName="file">
                  <Textarea
                    rowSpan={2}
                    placeholder="-"
                    placeholderTextColor={colors.gray}
                    value={state.participant}
                    onChangeText={txt => setValue('participant', txt)}
                    disabled={!(type === HANHCHINH_TYPE.CREATE) && !visible}
                    style={styles.input}
                  />
                </IconField>
              )}

            {showPop && (
              <IconField label={CREATE_LABELS_LT.roomName} iconName="box" required>
                <Picker
                  mode="dropdown"
                  iosIcon={selectIcon}
                  style={styles.picker}
                  placeholder={slRoom?.roomName ? slRoom?.roomName : '-'}
                  placeholderStyle={styles.pickerLt}
                  textStyle={styles.pickerText}
                  selectedValue={state.room}
                  onValueChange={val => setValue('room', val)}
                  // disabled={!(type === HANHCHINH_TYPE.CREATE) && !visible}
                  enable={type !== HANHCHINH_TYPE.CREATE}
                  items={rooms.map(data => ({
                    label: data.roomName,
                    value: data,
                  }))}
                />
              </IconField>
            )}
            {type === HANHCHINH_TYPE.DETAIL && (
              <>
                {(state.note || actionList.length > 0) && (
                  <IconField label={CREATE_LABELS_LT.cancel} iconName="file" required>
                    <Textarea
                      rowSpan={2}
                      placeholder="-"
                      placeholderTextColor={colors.gray}
                      value={state.note}
                      onChangeText={txt => setValue('note', txt)}
                      disabled={actionList.length === 0}
                      style={styles.input}
                    />
                  </IconField>
                )}
              </>
            )}
            {type === HANHCHINH_TYPE.DETAIL && detail && (
              <IconField label={CREATE_LABELS_LT.attachments} iconName="file">
                <Attachments hcCaseCalendar={detail} isShowLabel={false} />
              </IconField>
            )}
          </Form>
        </ScrollView>
        <ModalShareCalendar
          isOpen={isOpenModalShare}
          close={() => setIsOpenModalShare(false)}
          detail={detail}
        />
        {isOpenLDModal && listLD && (
          <ModalLanhDao
            isOpen={isOpenLDModal}
            listLDChecked={listLDChecked}
            closeModal={() => setIsOpenLDModal(false)}
            listLD={listLD}
            onSubmit={onChoosedLD}
          />
        )}
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

ScheduleForm.propTypes = {
  setValue: PropTypes.func,
  state: PropTypes.shape({}),
  detail: PropTypes.shape({}),
  actionList: PropTypes.arrayOf(PropTypes.shape({})),
  detailLTLanhDao: PropTypes.arrayOf(PropTypes.shape({})),
  currentState: PropTypes.shape({}),
  type: PropTypes.number,
  listFreeRooms: PropTypes.func,
  listLanhDao: PropTypes.func,
  onLoaded: PropTypes.func,
};
ScheduleForm.defaultProps = {
  setValue() {},
  listLanhDao() {},
  state: {},
  detail: {},
  actionList: [],
  detailLTLanhDao: [],
  currentState: null,
  type: HANHCHINH_TYPE.CREATE,
  listFreeRooms() {},
};

export default ScheduleForm;
