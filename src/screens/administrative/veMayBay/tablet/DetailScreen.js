import React, { useState, useEffect } from 'react';
import {Alert, FlatList, Platform, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Form, Icon, Input, Spinner, Text, Textarea, Title, Container, Content, Footer} from 'native-base';
import {styles} from './StylesMayBay'
import colors from "../../../../utils/colors";
import IconField from "../../common/IconField";
import {ACTION_CODE, CREATE_LABELS_VE_MAY_BAY, REQUEST_TYPE, STATUS_CODE} from "../../../../constants/administrative";
import AttachmentItem from "../common/AttachmentItem";
import RoundButton from "../../common/RoundButton";
import useFileUploadFile from 'eoffice/utils/useFileUploadFile';
import useFileUploadTickets from 'eoffice/utils/useFileUploadTickets';
import CreateFooter from "../create/CreateFooter";
import {ATTACHMENT_TYPES} from "../../../../constants/common";
import IconButton from 'eoffice/components/IconButton';
import _ from "lodash";
import useCreateForm from "../create/useCreateForm";
import CustomHeader from 'eoffice/components/CustomHeader';
import ChangBayFlatList from "../common/ChangBayFlatList";
import ChangBayPopup from "../common/ChangBayPopup";
import DetailFooter from "../detail/DetailFooter";
import { DocumentPickerUtil } from 'react-native-document-picker';

const DetailScreen = ({setIsDetail, detail, actionList, executeVeMayBay, display}) => {
  const [state, actions] = useCreateForm();
  const [itemChangBay, setItemChangBay] = useState(null);
  const [isShowChangBayPopup, setShowChangBayPopup] = useState(false);

  const [stateFiles, actionsFiles] = useFileUploadFile({
    objectType: ATTACHMENT_TYPES.TOTRINH_VEMAYBAY,
  }, DocumentPickerUtil.pdf());
  const [stateTickets, actionsTickets] = useFileUploadTickets({
    objectType: ATTACHMENT_TYPES.VEMAYBAY,
  });

  // const checkCancelAction = () => {
  //   let isCheck = true;
  //   actionList.map(item => {
  //     if (
  //       item.actionCode === ACTION_CODE.HUY_YEU_CAU ||
  //       item.actionCode === ACTION_CODE.PHE_DUYET ||
  //       item.actionCode === ACTION_CODE.TU_CHOI ||
  //       item.actionCode === ACTION_CODE.CAP_NHAT
  //     ) {
  //       isCheck = false;
  //     }
  //   });
  //   setIsCancelAction(isCheck);
  // };
  function fillDataForm() {
    // checkCancelAction();
    if (detail) {
      actions.reset()
      stateFiles.files = detail.hcCaseFlightFiles;
      stateTickets.files = detail.hcCaseFileTickets;
      actions.setValue('flightRoute', detail.hcCaseFlightRouteUser);
      actions.setValue('hcCaseFlightFiles', detail.hcCaseFlightFiles);
      actions.setValue('hcCaseFlightRouteUser', detail.hcCaseFlightRouteUser);
      actions.setValue('requestName', detail.hcCaseFlight.requestName);
      actions.setValue('requestContent', detail.hcCaseFlight.requestContent);
      actions.setValue('flightRouteList', []);
      actions.setValue('startTime', new Date(detail.hcCaseFlight.startTime));
      actions.setValue('endTime', new Date(detail.hcCaseFlight.endTime));
      actions.setValue('fromPlace', detail.hcCaseFlight.fromPlace);
      actions.setValue('toPlace', detail.hcCaseFlight.toPlace);
      actions.setValue('numberOfPeople', `${detail.hcCaseFlight.numberOfPeople}`);
      actions.setValue('contactNumber', detail.hcCaseFlight.contactNumber);

      if (!_.isNull(detail.hcCaseFlight.note)) {
        actions.setValue('note', detail.hcCaseFlight.note);
      }
      _.forEach(REQUEST_TYPE, obj => {
        if (obj.value === detail.hcCaseFlight.requestType) {
          actions.setValue('requestType', obj);
        }
      });
    }
  }

  const updateChangBay = (item, timeReal, ticketNumber) => {
    hideChangBayPopup();
    const flightRouteTmp = state.hcCaseFlightRouteUser;
    flightRouteTmp[(item?.index)].ticketNumber = ticketNumber;
    flightRouteTmp[(item?.index)].flightTimeRealistic = timeReal;
    actions.setValue('hcCaseFlightRouteUser', flightRouteTmp);
  };

  useEffect(() => {
    fillDataForm()
  },[detail])

  const pressItemChangBayList = item => {
    setItemChangBay(item);
    showChangBayPopup();
  };

  const showChangBayPopup = () => {
    setShowChangBayPopup(true);
  };

  const hideChangBayPopup = () => {
    setShowChangBayPopup(false);
  };

  function showAlert(msg) {
    Alert.alert('Thông báo', msg, [{ text: 'OK' }], {
      cancelable: false,
    });
  }

  const submit = data => {
    let msg = '';
    if (data.actionCode === ACTION_CODE.PHE_DUYET) {
      if (stateTickets?.files?.length === 0) {
        msg = 'Chưa có vé máy bay.';
        showAlert(msg);
        return;
      }
      state.hcCaseFlightRouteUser.forEach((item, index) => {
        if (!item.ticketNumber) {
          msg = `Chưa cập nhật số vé cho ${item.userName}`;
          pressItemChangBayList({item,index})
          return
        }
        if (!item.flightTimeRealistic) {
          msg = `Chưa cập nhật thời gian bay thực tế cho ${item.userName}.`;
          pressItemChangBayList({item,index})
          return
        }
      })
    }

    if (data.actionCode === ACTION_CODE.CAP_NHAT) {
      if (stateTickets?.files?.length === 0) {
        msg = 'Chưa có vé máy bay.';
        showAlert(msg);
        return;
      }
    }

    if (!state.note) {
      msg = 'Chưa nhập ghi chú'
      showAlert(msg)
      return;
    }

    if (_.isEmpty(msg)) {
      const veMayBayRequest = {};

      veMayBayRequest.caseMasterId = detail.hcCaseMaster.id;
      veMayBayRequest.note = state.note;
      veMayBayRequest.hcCaseFlightFiles = state.hcCaseFlightFiles;
      veMayBayRequest.hcCaseFlightRouteUser = state.hcCaseFlightRouteUser;
      veMayBayRequest.stateTickets = stateTickets;
      veMayBayRequest.flightRoute = state.flightRoute;
      executeVeMayBay({
        veMayBayRequest,
        actionName: data.actionName,
        actionCode: data.actionCode,
      });
    }
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
  return (
    <Container>
      <CustomHeader
        Left={
          <IconButton
            icon="arrow-left"
            iconStyle={{ color: colors.gray }}
            style={styles.grayBg}
            onPress={() => {
              setIsDetail(false)
            }}
          />
        }
        Content={<Title style={styles.titleStyleContent}>Chi tiết đặt vé máy bay</Title>}
        hasBorder>
      </CustomHeader>
      <Content>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Form style={styles.form}>
              {display && display.state && <View style={[styles.wrapperStatus, { backgroundColor: color }]}>
                <Text style={[styles.status, { color: statusColor }]}>{display.state}</Text>
              </View>}
              <IconField label={CREATE_LABELS_VE_MAY_BAY.title} iconName="alert-circle" required>
                <Input
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={state.requestName ? state.requestName : ''}
                  style={styles.input}
                  disabled={true}
                />
              </IconField>
              <IconField label={CREATE_LABELS_VE_MAY_BAY.content} iconName="alert-circle" required>
                <Textarea
                  placeholder="-"
                  rowSpan={2}
                  placeholderTextColor={colors.gray}
                  value={state.requestContent ? state.requestContent : ''}
                  style={styles.textarea}
                  disabled={true}
                />
              </IconField>
              <View style={styles.wrapBtn}>
                <IconField label={CREATE_LABELS_VE_MAY_BAY.files} iconName="file" required>
                  <View style={styles.uploadFileContainer}>
                    <IconButton
                      disabled={stateFiles.loading}
                      icon="upload"
                      iconStyle={{ color: stateFiles.loading ? colors.lightBlue : colors.blue }}
                      style={styles.btn}
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
                    {stateFiles.files && stateFiles.files.length > 0 && (
                      <View style={styles.flatList}>
                        <FlatList
                          data={stateFiles.files}
                          keyExtractor={item => item.id}
                          renderItem={({item} ) => (
                            <AttachmentItem
                              hcCaseFlightId={detail.hcCaseFlight.id}
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
                {!( actionList.length === 1 && display.state === 'Chờ phê duyệt') &&
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
                      <View style={styles.flatList}>
                        <FlatList
                          data={stateTickets.files}
                          keyExtractor={item => item.id}
                          renderItem={({item}) => (
                            <AttachmentItem
                              hcCaseFlightId={detail.hcCaseFlight.id}
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
                <IconField label={CREATE_LABELS_VE_MAY_BAY.note} iconName="alert-circle" required>
                  <Input
                    placeholder="-"
                    placeholderTextColor={colors.gray}
                    style={styles.input}
                    value={state.note}
                    onChangeText={txt => actions.setValue('note', txt)}
                    disabled={actionList.length === 0}
                  />
                </IconField>
                <ChangBayFlatList
                  onPress={pressItemChangBayList}
                  flightRoute={detail.hcCaseFlightRouteUser}
                />
              </View>
              <ChangBayPopup
                updateChangBay={updateChangBay}
                itemChangBay={itemChangBay}
                visible={isShowChangBayPopup}
                onClose={hideChangBayPopup}
                display={display}
                actionList={actionList}
              />
            </Form>
          </View>
        </ScrollView>
      </Content>
      <Footer style={{ borderTopWidth: 0, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row',justifyContent: 'space-around', alignItems: 'center', marginBottom: 10 }}>
          {actionList.map((data, index) => (
            <DetailFooter
              actionName={data.actionName}
              actionCode={data.actionCode}
              key={index.toString()}
              onPress={() => submit(data)}
            />
          ))}
        </View>
      </Footer>
    </Container>
  )
}
export default DetailScreen;
