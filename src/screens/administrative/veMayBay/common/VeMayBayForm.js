/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, FlatList } from 'react-native';
import { Form, Input, Textarea, Text, Spinner } from 'native-base';
import {
  CREATE_LABELS_VE_MAY_BAY,
  HANHCHINH_TYPE,
  REQUEST_TYPE,
  ACTION_CODE,
  ADMINISTRATIVE_TYPE,
} from 'eoffice/constants/administrative';
import { ATTACHMENT_TYPES } from 'eoffice/constants/common';
import colors from 'eoffice/utils/colors';
import _ from 'lodash';
import IconButton from 'eoffice/components/IconButton';
import useFileUploadTickets from 'eoffice/utils/useFileUploadTickets';
import useFileUploadFile from 'eoffice/utils/useFileUploadFile';
import ChangBayFlatList from './ChangBayFlatList';
import AddCanBoPopup from './AddCanBoPopup';
import AddCanBoFlatList from './AddCanBoFlatList';
import AddChangBayPopup from './AddChangBayPopup';
import ChangBayPopup from './ChangBayPopup';
import AddChangBayFlatList from './AddChangBayFlatList';
import AttachmentItem from './AttachmentItem';
import styles from './VeMayBayForm.style';
// import DatePicker from '../../common/DatePicker';
import IconField from '../../common/IconField';
import RoundButton from '../../common/RoundButton';
import {STATUS_CODE} from "../../../../constants/administrative";
import {DocumentPickerUtil} from "react-native-document-picker";

let indexCanBo = -1
let indexChangBay = -1
const VeMayBayForm = ({
  setValue,
  stateA,
  type,
  stateFilesA,
  actionsFilesA,
  stateTickets,
  actionsTickets,
  // eslint-disable-next-line no-unused-vars
  isOpenPopup,
  hcCaseFlight,
  hcCaseFlightRouteUser,
  // eslint-disable-next-line react/prop-types
  hcCaseFlightFiles,
  // eslint-disable-next-line react/prop-types
  hcCaseFileTickets,
  // eslint-disable-next-line react/prop-types
  getPositionsUser,
  // eslint-disable-next-line react/prop-types
  getDepartmentsUser,
  // eslint-disable-next-line react/prop-types
  getAirportsUser,
  // eslint-disable-next-line react/prop-types
  actionList,
  display,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [flightUserList, setFlightUserList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [flightRouteList, setFlightRouteList] = useState([]);
  const [addCanBo, setAddCanBo] = useState(false);
  const [isCancelAction, setIsCancelAction] = useState(false);
  const [addChangBay, setAddChangBay] = useState(false);
  const [isShowChangBayPopup, setShowChangBayPopup] = useState(false);

  const [itemChangBay, setItemChangBay] = useState(null);
  const [positionsUser, setPositionsUser] = useState({});
  const [departmentsUser, setDepartmentsUser] = useState({});
  const [airportsUser, setAirportsUser] = useState({});

  const [isShowDetailCanBoItem, setShowDetailCanBoItem] = useState(false);
  const [isShowDetailChangBayItem, setShowDetailChangBayItem] = useState(false);

  const [canBoItem, setCanBoItem] = useState({});
  const [changBayItem, setChangBayItem] = useState({});

  // eslint-disable-next-line no-unused-vars
  const [stateFiles, actionsFiles] = useFileUploadFile({
    objectType: ATTACHMENT_TYPES.TOTRINH_VEMAYBAY,
  }, DocumentPickerUtil.pdf());

  useEffect(() => {
    if (isOpenPopup && isOpenPopup.index !== -1) {
      pressItemChangBayList({item : stateA.hcCaseFlightRouteUser[isOpenPopup.index]})
    }
  },[isOpenPopup])

  const checkCancelAction = () => {
    let isCheck = true;
    // eslint-disable-next-line array-callback-return
    actionList.map(item => {
      if (
        item.actionCode === ACTION_CODE.HUY_YEU_CAU ||
        item.actionCode === ACTION_CODE.PHE_DUYET ||
        item.actionCode === ACTION_CODE.TU_CHOI ||
        item.actionCode === ACTION_CODE.CAP_NHAT
      ) {
        isCheck = false;
      }
    });
    setIsCancelAction(isCheck);
  };
  let color = '';
  let statusColor = '';
  if (display) {
    if (display.status === STATUS_CODE.HOANTHANH) {
      color = 'rgba(57, 202, 116, 0.2)';
      statusColor = '#39ca74';
    } else if (display.status === STATUS_CODE.HUY) {
      color = 'rgba(255, 59, 48, 0.2)';
      statusColor = '#ff3b30';
    } else {
      color = 'rgba(240, 195, 48, 0.2)';
      statusColor = '#f0c330';
    }
  }

  function fillDataForm() {
    checkCancelAction();
    stateFiles.files = hcCaseFlightFiles;
    actionsTickets.setFile(hcCaseFileTickets) ;
    setValue('flightRoute', hcCaseFlightRouteUser);
    setValue('hcCaseFlightFiles', hcCaseFlightFiles);
    setValue('hcCaseFlightRouteUser', hcCaseFlightRouteUser);
    setValue('requestName', hcCaseFlight.requestName);
    setValue('requestContent', hcCaseFlight.requestContent);
    setValue('flightRouteList', []);
    setValue('startTime', new Date(hcCaseFlight.startTime));
    setValue('endTime', new Date(hcCaseFlight.endTime));
    setValue('fromPlace', hcCaseFlight.fromPlace);
    setValue('toPlace', hcCaseFlight.toPlace);
    setValue('numberOfPeople', `${hcCaseFlight.numberOfPeople}`);
    setValue('contactNumber', hcCaseFlight.contactNumber);

    if (!_.isNull(hcCaseFlight.note)) {
      setValue('note', hcCaseFlight.note);
    }
    _.forEach(REQUEST_TYPE, obj => {
      if (obj.value === hcCaseFlight.requestType) {
        setValue('requestType', obj);
      }
    });
  }

  const showAddCanBoPopup = (isCheck, item) => {
    if (item) {
      indexCanBo = item.index
    } else {
      indexCanBo = -1
    }
    setCanBoItem(item);
    setShowDetailCanBoItem(isCheck);
    setAddCanBo(true);
  };

  const hideAddCanBoPopup = () => {
    setAddCanBo(false);
  };

  const showAddChangBayPopup = (isCheck, item) => {
    if (item) {
      indexChangBay = item.index
    } else {
      indexChangBay = -1
    }
    setChangBayItem(item);
    setShowDetailChangBayItem(isCheck);
    setAddChangBay(true);
  };

  const hideAddChangBayPopup = () => {
    setAddChangBay(false);
  };

  const showChangBayPopup = () => {
    setShowChangBayPopup(true);
  };

  const hideChangBayPopup = () => {
    setShowChangBayPopup(false);
  };

  async function pressItemChangBayList (item) {
    await setItemChangBay(item);
    showChangBayPopup();
  };


  const noteCanBo = item => {
    hideAddCanBoPopup();
    const flightUserListTmp = flightUserList;
    if (indexCanBo === -1){
      flightUserListTmp.push(item);
    } else {
      flightUserListTmp[indexCanBo] = item
    }
    setValue('flightUserList', flightUserListTmp);
  };

  const noteChangBay = item => {
    hideAddChangBayPopup();
    const flightRouteListTmp = flightRouteList;
    if (indexChangBay === -1){
      flightRouteListTmp.push(item);
    } else {
      flightRouteListTmp[indexChangBay] = item
    }
    setValue('flightRouteList', flightRouteListTmp);
  };

  const updateChangBay = (item, timeReal, ticketNumber) => {
    hideChangBayPopup();
    const flightRouteTmp = stateA.hcCaseFlightRouteUser;
    debugger
    if (item.index !== null && item.index !== undefined) {
      flightRouteTmp[(item?.index)].ticketNumber = ticketNumber;
      flightRouteTmp[(item?.index)].flightTimeRealistic = timeReal;
    } else {
      flightRouteTmp[isOpenPopup.index].ticketNumber = ticketNumber;
      flightRouteTmp[isOpenPopup.index].flightTimeRealistic = timeReal;
    }
    setValue('hcCaseFlightRouteUser', flightRouteTmp);
  };

  async function getPositionsList() {
    const positionsUserTmp = await getPositionsUser();
    setPositionsUser(positionsUserTmp?.positons);
  }
  async function getDepartmentsList() {
    const departmentsUserTmp = await getDepartmentsUser();
    setDepartmentsUser(departmentsUserTmp?.departments);
  }
  async function getAirportsList() {
    const airportsUserTmp = await getAirportsUser();
    setAirportsUser(airportsUserTmp?.airports);
  }

  useEffect(() => {
    if (type === HANHCHINH_TYPE.DETAIL) {
      fillDataForm();
    }
    if (type === HANHCHINH_TYPE.CREATE) {
      actionsFilesA.reset();
      getPositionsList();
      getDepartmentsList();
      getAirportsList();
    }
  }, []);
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Form style={styles.form}>
            {display && display.state &&
            <View style={[styles.wrapperStatus, { backgroundColor: color }]}>
              <Text style={[styles.status, { color: statusColor }]}>{display.state}</Text>
            </View>}
            <IconField label={CREATE_LABELS_VE_MAY_BAY.title} iconName="alert-circle" required>
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={stateA.requestName}
                onChangeText={txt => setValue('requestName', txt)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
                style={styles.input}
              />
            </IconField>
            <IconField label={CREATE_LABELS_VE_MAY_BAY.content} iconName="alert-circle" required>
              <Textarea
                placeholder="-"
                rowSpan={4}
                placeholderTextColor={colors.gray}
                value={stateA.requestContent}
                onChangeText={txt => setValue('requestContent', txt)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
                style={styles.textarea}
              />
            </IconField>

            {type === HANHCHINH_TYPE.CREATE ? (
              <View style={styles.wrapBtn}>
                <IconField label={CREATE_LABELS_VE_MAY_BAY.files} iconName="file" required>
                  <View style={styles.uploadFileContainer}>
                    <IconButton
                      disabled={stateFilesA.loading}
                      icon="upload"
                      iconStyle={{ color: stateFilesA.loading ? colors.lightBlue : colors.blue }}
                      style={styles.btn}
                      onPress={() => {
                        actionsFilesA.upload(false);
                      }}
                    />
                    {stateFilesA.loading && (
                      <View style={styles.loading}>
                        <Spinner color={colors.gray} size="small" style={styles.loadingSpinner} />
                        <Text style={styles.loadingText}>Đang tải file lên</Text>
                      </View>
                    )}
                    {stateFilesA.files.length > 0 && (
                      <View
                        style={{
                          paddingTop: 11,
                          flex: 1,
                        }}
                      >
                        <FlatList
                          data={stateFilesA.files}
                          keyExtractor={item => item.id}
                          renderItem={({item} ) => (
                            <AttachmentItem
                              hcCaseFlightId={hcCaseFlight.id}
                              onRemove={() => actionsFilesA.remove(item.id)}
                              item={item}
                            />
                          )}
                          ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
                        />
                      </View>
                    )}
                  </View>
                </IconField>
                <RoundButton
                  icon="plus-circle"
                  title="THÊM CÁN BỘ"
                  color="#007aff"
                  titleColor="white"
                  itemSyle={{ width: 200, marginTop: 20 }}
                  onPress={() => showAddCanBoPopup(false, null)}
                />
                <AddCanBoFlatList
                  onPress={item => {
                    showAddCanBoPopup(true, item);
                  }}
                  flightUserList={stateA.flightUserList}
                />
                <RoundButton
                  icon="plus-circle"
                  title="THÊM CHẶNG BAY"
                  color="#007aff"
                  titleColor="white"
                  itemSyle={{ width: 200, marginTop: 20 }}
                  onPress={() => showAddChangBayPopup(false, null)}
                />
                <AddChangBayFlatList
                  onPress={item => {
                    showAddChangBayPopup(true, item);
                  }}
                  flightRouteList={stateA.flightRouteList}
                />
                <AddCanBoPopup
                  isShowDetailCanBoItem={isShowDetailCanBoItem}
                  canBoItem={canBoItem}
                  positionsUser={positionsUser}
                  departmentsUser={departmentsUser}
                  noteCanBo={noteCanBo}
                  visible={addCanBo}
                  onClose={hideAddCanBoPopup}
                />
                <AddChangBayPopup
                  isShowDetailChangBayItem={isShowDetailChangBayItem}
                  changBayItem={changBayItem}
                  airportsUser={airportsUser}
                  noteChangBay={noteChangBay}
                  itemChangBay={itemChangBay}
                  visible={addChangBay}
                  onClose={hideAddChangBayPopup}
                />
              </View>
            ) : (
              <View>
                <IconField label={CREATE_LABELS_VE_MAY_BAY.files} iconName="file" required>
                  <View style={styles.uploadFileContainer}>
                    <IconButton
                      disabled={stateFiles.loading}
                      icon="upload"
                      iconStyle={{ color: stateFiles.loading ? colors.lightBlue : colors.blue }}
                      style={styles.btn}
                      onPress={() => {
                        actionsFilesA.upload(false);
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
                        style={{
                          paddingTop: 11,
                          flex: 1,
                        }}
                      >
                        <FlatList
                          data={stateFiles.files}
                          keyExtractor={item => item.id}
                          renderItem={({item} ) => (
                            <AttachmentItem
                              hcCaseFlightId={hcCaseFlight.id}
                              onRemove={() => actionsFilesA.remove(item.id)}
                              item={item}
                            />
                          )}
                          ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
                        />
                      </View>
                    )}
                  </View>
                </IconField>
              </View>
            )}
            {type === HANHCHINH_TYPE.DETAIL && (
              <>
                <View>
                  {!(actionList.length === 1 && display.state === 'Chờ phê duyệt') &&
                  <IconField label={CREATE_LABELS_VE_MAY_BAY.ticket} iconName="file" required>
                    <View style={styles.uploadFileContainer}>
                      <IconButton
                        disabled={stateTickets.loading}
                        icon="upload"
                        iconStyle={{ color: stateTickets.loading ? colors.lightBlue : colors.blue }}
                        style={styles.btn}
                        onPress={() => actionsTickets.upload(false)}
                      />
                      {stateTickets.loading && (
                        <View style={styles.loading}>
                          <Spinner color={colors.gray} size="small" style={styles.loadingSpinner} />
                          <Text style={styles.loadingText}>Đang tải file lên</Text>
                        </View>
                      )}
                      {stateTickets.files.length > 0 && (
                        <View
                          style={{
                            paddingTop: 11,
                            flex: 1,
                          }}
                        >
                          <FlatList
                            data={stateTickets.files}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                              <AttachmentItem
                                hcCaseFlightId={hcCaseFlight.id}
                                onRemove={() => actionsTickets.remove(item.id)}
                                item={item}
                              />
                            )}
                            ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
                          />
                        </View>
                      )}
                    </View>
                  </IconField>}
                </View>
                <ChangBayFlatList
                  onPress={pressItemChangBayList}
                  flightRoute={stateA.flightRoute}
                />
                <IconField label={CREATE_LABELS_VE_MAY_BAY.note} iconName="alert-circle" required>
                  <Input
                    placeholder="-"
                    placeholderTextColor={colors.gray}
                    style={styles.input}
                    value={stateA.note}
                    onChangeText={txt => setValue('note', txt)}
                    disabled={actionList.length === 0}
                  />
                </IconField>
              </>
            )}
            <ChangBayPopup
              updateChangBay={updateChangBay}
              itemChangBay={itemChangBay}
              visible={isShowChangBayPopup}
              onClose={hideChangBayPopup}
              actionList={actionList}
              display={display}
            />
          </Form>
        </View>
      </ScrollView>
    </View>
  );
};

VeMayBayForm.propTypes = {
  setValue: PropTypes.func,
  stateA: PropTypes.shape({}),
  type: PropTypes.number,
  hcCaseFlight: PropTypes.shape({}),
  hcCaseFlightRouteUser: PropTypes.shape({}),
  actionList: PropTypes.arrayOf(PropTypes.shape({})),
  currentState: PropTypes.shape({}),
  mode: PropTypes.number,
};
VeMayBayForm.defaultProps = {
  setValue() {},
  stateA: {},
  hcCaseFlight: {},
  hcCaseFlightRouteUser: {},
  type: HANHCHINH_TYPE.CREATE,
  actionList: [],
  currentState: null,
  mode: ADMINISTRATIVE_TYPE.PENDING,
};

export default VeMayBayForm;
