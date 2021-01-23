/* eslint-disable react/no-unescaped-entities */
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Container, Text, View, Icon, Spinner } from 'native-base';
import * as DocumentNavigation from 'eoffice/utils/DocumentNavigation';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import { formatTimestamp, formatDateTime } from 'eoffice/utils/utils';
import colors from 'eoffice/utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import {
  getProcessIdVbIncomingDoc,
  getProcessIdVbOutgoingDoc,
} from '../../../../store/documents/notification/service';
import Avatar from '../../../../components/Avatar';
import { DOCUMENT_TYPE } from '../../../../constants/documents';
import {
  ACTION_CODE,
  CHI_DAO_MESSAGE_TYPE,
  FLOW_INFO,
  MESSAGE_TYPE_DIEU_XE,
  MESSAGE_TYPE_MAY_BAY, STATUS_CODE
} from "../../../../constants/administrative";
import {getNotifyActionNameByNotifyMessageType} from "../../../../utils/utils";
import NavigationService from "../../../../utils/NavigationService";
import firebase from "react-native-firebase";
import {getDetailVeMayBay} from "../../../../store/administrative/veMayBay/detail/service";

const styles = StyleSheet.create({
  field: { flex: 1, marginTop: 10 },
  container: { paddingTop: variables.isIphoneX ? 20 : 5, backgroundColor: '#f8f9fd' },
  fieldTouchable: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  txtNoti: {
    paddingTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  lineUnder: { borderColor: '#d8d8d9', borderWidth: 0.5, marginHorizontal: 20 },
  avaSize: 36,
  fieldAva: { flex: 1, paddingLeft: 8 },
  fieldTxt: { flex: 7, paddingBottom: 7 },
  rowFlex: { flexDirection: 'row' },
  dateDoc: { flexDirection: 'row', alignItems: 'center' },
  boldTxt: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  txtDefault: {
    fontSize: 13,
  },
  read: {
    backgroundColor: 'white',
  },
  unread: {
    backgroundColor: '#edf1f2',
  },
  borderTxt: {
    backgroundColor: 'white',
    color: '#007aff',
    fontSize: 13,
    borderColor: '#007aff',
    borderWidth: 1,
  },
  bsTxt: {
    fontSize: 13,
    paddingBottom: 7,
  },
  dateIcon: { color: '#abb4bd', fontSize: 11 },
  dateTxt: { color: '#abb4bd', fontSize: 11, paddingLeft: 5 },
  emptyContainer: { justifyContent: 'center', alignItems: 'center' },
});

const getActionText = action => {
  switch (action) {
    case 'chuyenXuLy':
      return 'Chuyển xử lý';
    case 'outgoing.comment':
    case 'ingoing.comment':
      return 'Gửi bình luận';
    case 'incoming.comment':
      return 'Gửi bình luận';
    case 'thuHoi':
      return 'Thu hồi';
    case 'ketThuc':
      return 'Ký duyệt';
    case 'tuChoi':
      return 'Từ chối';
    case 'lanhDaoTuChoi':
      return 'Từ chối';
    case 'banhanh':
      return 'Ban hành';
    case 'choBanHanh':
      return 'Ký duyệt';
    case 'CC':
      return 'Chuyển tiếp';
    case 'chuyenTiep':
      return 'Chuyển tiếp';
    case 'chuyenTiepLanhDao':
      return 'Chuyển tiếp';
    case 'tuChoiTiepNhan':
      return 'Từ chối tiếp nhận';
    case 'tuChoiBanHanh':
      return 'Từ chối ban hành';
    case 'cv.canhBaoQuaHan':
      return 'Công việc';
    default:
      return '';
  }
};

const buildCXL = notification => (
  <View style={styles.rowFlex}>
    <View style={styles.fieldAva}>
      <Avatar name={notification.fromUserName} size={styles.avaSize} />
    </View>
    <View style={styles.fieldTxt}>
      <Text style={styles.bsTxt}>
        <Text style={styles.txtDefault}>Ông/bà </Text>
        <Text style={styles.boldTxt}>{notification.fromUserName} </Text>
        <Text style={styles.txtDefault}>đã </Text>
        <Text style={styles.borderTxt}>{getActionText(notification.messageType)} </Text>
        <Text style={styles.txtDefault}>văn bản </Text>
        <Text style={styles.txtDefault}>"{JSON.parse(notification.dataJson).object.quote}"</Text>
      </Text>
      <View style={styles.dateDoc}>
        <Icon name="clock" type="Feather" style={styles.dateIcon} />
        <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
      </View>
    </View>
  </View>
);

const buildTuChoi = notification => (
  <View style={styles.rowFlex}>
    <View style={styles.fieldAva}>
      <Avatar name={notification.fromUserName} size={styles.avaSize} />
    </View>
    <View style={styles.fieldTxt}>
      <Text style={styles.bsTxt}>
        <Text style={styles.txtDefault}>Ông/bà </Text>
        <Text style={styles.boldTxt}>{notification.fromUserName} </Text>
        <Text style={styles.txtDefault}>đã </Text>
        <Text style={styles.borderTxt}>{getActionText(notification.messageType)} </Text>
        <Text style={styles.txtDefault}>văn bản </Text>
        <Text style={styles.txtDefault}>"{JSON.parse(notification.dataJson).object.quote}"</Text>
      </Text>
      <View style={styles.dateDoc}>
        <Icon name="clock" type="Feather" style={styles.dateIcon} />
        <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
      </View>
    </View>
  </View>
);

const buildTuChoiBanHanh = notification => (
  <View style={styles.rowFlex}>
    <View style={styles.fieldAva}>
      <Avatar name={notification.fromUserName} size={styles.avaSize} />
    </View>
    <View style={styles.fieldTxt}>
      <Text style={styles.bsTxt}>
        <Text style={styles.txtDefault}>Ông/bà </Text>
        <Text style={styles.boldTxt}>{notification.fromUserName} </Text>
        <Text style={styles.txtDefault}>đã </Text>
        <Text style={styles.borderTxt}>{getActionText(notification.messageType)} </Text>
        <Text style={styles.txtDefault}>văn bản </Text>
        <Text style={styles.txtDefault}>"{JSON.parse(notification.dataJson).object.quote}"</Text>
      </Text>
      <View style={styles.dateDoc}>
        <Icon name="clock" type="Feather" style={styles.dateIcon} />
        <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
      </View>
    </View>
  </View>
);

const buildChuyenTiep = notification => (
  <View style={styles.rowFlex}>
    <View style={styles.fieldAva}>
      <Avatar name={notification.fromUserName} size={styles.avaSize} />
    </View>
    <View style={styles.fieldTxt}>
      <Text style={styles.bsTxt}>
        <Text style={styles.boldTxt}>{notification.fromUserName} </Text>
        <Text style={styles.borderTxt}>{getActionText(notification.messageType)} </Text>
        <Text style={styles.txtDefault}>văn bản số </Text>
        <Text style={styles.boldTxt}>{JSON.parse(notification.dataJson).object.docCode} </Text>
        {/* <Text style={styles.txtDefault}>ngày </Text>
        <Text style={styles.boldTxt}>
          {formatDateTime(JSON.parse(notification.dataJson).object.docDate)}{' '}
        </Text> */}
        <Text style={styles.txtDefault}>về việc </Text>
        <Text style={styles.txtDefault}>"{JSON.parse(notification.dataJson).object.quote}"</Text>
      </Text>
      <View style={styles.dateDoc}>
        <Icon name="clock" type="Feather" style={styles.dateIcon} />
        <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
      </View>
    </View>
  </View>
);

const buildChuyenTiepCC = notification => (
  <View style={styles.rowFlex}>
    <View style={styles.fieldAva}>
      <Avatar name={notification.fromUserName} size={styles.avaSize} />
    </View>
    <View style={styles.fieldTxt}>
      <Text style={styles.bsTxt}>
        <Text style={styles.boldTxt}>{notification.fromUserName} </Text>
        <Text style={styles.borderTxt}>{getActionText(notification.messageType)} </Text>
        <Text style={styles.txtDefault}>văn bản số </Text>
        <Text style={styles.boldTxt}>{JSON.parse(notification.dataJson).object.docCode} </Text>
        <Text style={styles.txtDefault}>về việc </Text>
        <Text style={styles.txtDefault}>"{JSON.parse(notification.dataJson).object.quote}"</Text>
      </Text>
      <View style={styles.dateDoc}>
        <Icon name="clock" type="Feather" style={styles.dateIcon} />
        <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
      </View>
    </View>
  </View>
);

const buildBHanh = notification => (
  <View style={styles.rowFlex}>
    <View style={styles.fieldAva}>
      <Avatar name={notification.fromUserName} size={styles.avaSize} />
    </View>
    <View style={styles.fieldTxt}>
      <Text style={styles.bsTxt}>
        <Text style={styles.txtDefault}>Văn thư đã </Text>
        <Text style={styles.borderTxt}>{getActionText(notification.messageType)} </Text>
        <Text style={styles.txtDefault}>văn bản số </Text>
        <Text style={styles.boldTxt}>{JSON.parse(notification.dataJson).object.docCode} </Text>
        <Text style={styles.txtDefault}>về việc </Text>
        <Text style={styles.txtDefault}>"{JSON.parse(notification.dataJson).object.quote}"</Text>
      </Text>
      <View style={styles.dateDoc}>
        <Icon name="clock" type="Feather" style={styles.dateIcon} />
        <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
      </View>
    </View>
  </View>
);

const buildComment = notification => (
  <View style={styles.rowFlex}>
    <View style={styles.fieldAva}>
      <Avatar name={notification.fromUserName} size={styles.avaSize} />
    </View>
    <View style={styles.fieldTxt}>
      <Text style={styles.bsTxt}>
        <Text style={styles.txtDefault}>Ông/bà </Text>
        <Text style={styles.boldTxt}>{notification.fromUserName} </Text>
        <Text style={styles.txtDefault}>đã </Text>
        <Text style={styles.borderTxt}>{getActionText(notification.messageType)} </Text>
        <Text style={styles.txtDefault}>trong văn bản về việc </Text>
        <Text style={styles.txtDefault}>"{JSON.parse(notification.dataJson).data.quote}"</Text>
      </Text>
      <View style={styles.dateDoc}>
        <Icon name="clock" type="Feather" style={styles.dateIcon} />
        <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
      </View>
    </View>
  </View>
);

const buildTuChoiTiepNhan = notification => (
  <View style={styles.rowFlex}>
    <View style={styles.fieldAva}>
      <Avatar name={notification.fromUserName} size={styles.avaSize} />
    </View>
    <View style={styles.fieldTxt}>
      <Text style={styles.bsTxt}>
        <Text style={styles.boldTxt}>{notification.fromUserName} </Text>
        <Text style={styles.borderTxt}>{getActionText(notification.messageType)} </Text>
        <Text style={styles.txtDefault}>văn bản số </Text>
        <Text style={styles.boldTxt}>{JSON.parse(notification.dataJson).object.docCode} </Text>
        <Text style={styles.txtDefault}>ngày </Text>
        <Text style={styles.boldTxt}>"{JSON.parse(notification.dataJson).object.docDate}" </Text>
        <Text style={styles.txtDefault}>về việc </Text>
        <Text style={styles.txtDefault}>"{JSON.parse(notification.dataJson).object.quote}"</Text>
      </Text>
      <View style={styles.dateDoc}>
        <Icon name="clock" type="Feather" style={styles.dateIcon} />
        <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
      </View>
    </View>
  </View>
);

const buildCanhBao = notification => (
  <View style={styles.rowFlex}>
    <View style={styles.fieldAva}>
      <Avatar name={notification.fromUserName} size={styles.avaSize} />
    </View>
    <View style={styles.fieldTxt}>
      <Text style={styles.bsTxt}>
        <Text style={styles.txtDefault}>Bạn có công việc </Text>
        <Text style={styles.boldTxt}>{JSON.parse(notification.dataJson).tkTask.taskTitle} </Text>
        {/* <Text style={styles.txtDefault}>
          {JSON.parse(notification.dataJson).remainingDay > 0 ? 'sắp tới hạn' : 'quá hạn'}
        </Text> */}
        {JSON.parse(notification.dataJson).remainingDay >= 0 ? (
          <Text style={{ ...styles.txtDefault, color: '#F0C330' }}>
            sắp tới hạn (còn {JSON.parse(notification.dataJson).remainingDay} ngày)
          </Text>
        ) : (
          <Text style={{ ...styles.txtDefault, color: '#E54D42' }}>quá hạn</Text>
        )}
      </Text>
      <View style={styles.dateDoc}>
        <Icon name="clock" type="Feather" style={styles.dateIcon} />
        <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
      </View>
    </View>
  </View>
);
const buildReport = notification => {
  const data = JSON.parse(notification.dataJson)
  const detail = buildDetailItem(data)
  return (
    <View style={styles.rowFlex}>
      <View style={styles.fieldAva}>
        <Avatar name={notification.fromUserName} size={styles.avaSize} />
      </View>
      {
        (notification.messageType === CHI_DAO_MESSAGE_TYPE.BAO_CAO ||
          notification.messageType === CHI_DAO_MESSAGE_TYPE.GIA_HAN ||
          notification.messageType === CHI_DAO_MESSAGE_TYPE.DK_DEADLINE) &&
        <View style={styles.fieldTxt}>
          <Text>
            <Text style={styles.boldTxt}>{detail.deptName}</Text>
            <Text style={styles.txtDefault}> đã </Text>
            <Text style={[styles.txtDefault,{color: '#007aff'}]}>
              {getNotifyActionNameByNotifyMessageType(notification.messageType)}
            </Text>
            <Text style={styles.txtDefault}> cho kết luận chỉ đạo </Text>
            <Text style={styles.txtDefault}>{`"${detail.meeting}"`}</Text>
          </Text>
          <View style={[styles.dateDoc,{marginTop: 4}]}>
            <Icon name="clock" type="Feather" style={styles.dateIcon} />
            <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
          </View>
        </View>
      }
      {
        ( notification.messageType === CHI_DAO_MESSAGE_TYPE.CREATE ||
          notification.messageType === CHI_DAO_MESSAGE_TYPE.UPDATE ||
          notification.messageType === CHI_DAO_MESSAGE_TYPE.HUY ||
          notification.messageType === CHI_DAO_MESSAGE_TYPE.PHE_DUYET ||
          notification.messageType === CHI_DAO_MESSAGE_TYPE.CHO_Y_KIEN ||
          notification.messageType === CHI_DAO_MESSAGE_TYPE.YCBS) &&
        <View style={styles.fieldTxt}>
          <Text>
            <Text style={styles.txtDefault}> Ông/Bà </Text>
            <Text style={[styles.txtDefault,{color: '#007aff'}]}>
              {data.updator.fullName}
            </Text>
            <Text style={styles.txtDefault}> đã </Text>
            <Text style={[styles.txtDefault,{color: '#007aff'}]}>
              {getNotifyActionNameByNotifyMessageType(notification.messageType)}
            </Text>
            <Text style={styles.txtDefault}> cho kết luận chỉ đạo </Text>
            <Text style={styles.txtDefault}>{`"${detail.meeting}"`}</Text>
          </Text>
          <View style={[styles.dateDoc,{marginTop: 4}]}>
            <Icon name="clock" type="Feather" style={styles.dateIcon} />
            <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
          </View>
        </View>
      }

    </View>
  );
}
const buildDieuXe = notification => {
  const data = JSON.parse(notification.dataJson)
  return (
    <View style={styles.rowFlex}>
      <View style={styles.fieldAva}>
        <Avatar name={notification.fromUserName} size={styles.avaSize} />
      </View>
      <View style={styles.fieldTxt}>
        <Text>
          <Text style={styles.txtDefault}> Ông/Bà </Text>
          <Text style={styles.boldTxt}>{data.updator.fullName}</Text>
          <Text style={styles.txtDefault}> đã </Text>
          <Text style={[styles.txtDefault,{color: '#007aff'}]}>
            {getNotifyActionNameByNotifyMessageType(notification.messageType)}
          </Text>
          <Text style={styles.txtDefault}> yêu cầu điều xe </Text>
          <Text style={styles.boldTxt}>{`"${data.hcCaseDieuXe.title}"`}</Text>
        </Text>
        <View style={[styles.dateDoc,{marginTop: 4}]}>
          <Icon name="clock" type="Feather" style={styles.dateIcon} />
          <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
        </View>
      </View>

    </View>
  );
}

const buildVeMayBay = notification => {
  const data = JSON.parse(notification.dataJson)
  return (
    <View style={styles.rowFlex}>
      <View style={styles.fieldAva}>
        <Avatar name={notification.fromUserName} size={styles.avaSize} />
      </View>
      <View style={styles.fieldTxt}>
        <Text>
          <Text style={styles.txtDefault}> Ông/Bà </Text>
          <Text style={styles.boldTxt}>{data.updator.fullName}</Text>
          <Text style={styles.txtDefault}> đã </Text>
          <Text style={[styles.txtDefault,{color: '#007aff'}]}>
            {getNotifyActionNameByNotifyMessageType(notification.messageType)}
          </Text>
          <Text style={styles.txtDefault}> yêu cầu đặt vé máy bay </Text>
          <Text style={styles.boldTxt}>{`"${data.hcCaseFlight.requestName}"`}</Text>
        </Text>
        <View style={[styles.dateDoc,{marginTop: 4}]}>
          <Icon name="clock" type="Feather" style={styles.dateIcon} />
          <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
        </View>
      </View>
    </View>
  );
}

function buildDetailItem(data) {
  let detail = {}
  if (data) {
    if (data.hcCaseCommands) {
      detail.caseMasterId = data.hcCaseCommands.hcCaseMasterId
      detail.id = data.hcCaseCommands.id
      detail.commandsStatus = data.hcCaseCommands.commandsStatus
      detail.processType = data.hcCaseCommands.processType
      detail.deadline = data.hcCaseCommands.deadline ?
        new Date(data.hcCaseCommands.deadline).getTime() : ''
      detail.parentDeptId = data.hcCaseCommands.parentDeptId
      detail.deptId = data.hcCaseCommands.deptId
      detail.state = data.hcCaseCommands.state
    }
    if (data.hcCaseCommandsCommon) {
      detail.conclusion = data.hcCaseCommandsCommon.conclusion
      detail.sector = data.hcCaseCommandsCommon.sector
      detail.meeting = data.hcCaseCommandsCommon.meeting
      detail.hcCaseCommandsCommonId = data.hcCaseCommandsCommon.id
      detail.commandsDate = data.hcCaseCommandsCommon.commandsDate ?
        new Date(data.hcCaseCommandsCommon.commandsDate).getTime() : null;
      detail.updateTime = data.hcCaseCommandsCommon.updateTime ?
        new Date(data.hcCaseCommandsCommon.updateTime).getTime() : null;
      detail.directionContent = data.hcCaseCommandsCommon.directionContent
    }
    if (data.performActor){
      detail.performFullName = data.performActor.fullName
      detail.performId = data.performActor.id
    }
    if (data.directiveActor){
      detail.directiveFullName = data.directiveActor.fullName
      detail.directiveId = data.directiveActor.id
    }
    if (data.donViThuchien){
      detail.deptName = data.donViThuchien.deptName
    }
  }
  return detail
}

const checkType = msgType => {
  if (
    msgType === 'chuyenXuLy' ||
    msgType === 'chuyenXuly' ||
    msgType === 'outgoing.comment' ||
    msgType === 'ingoing.comment' ||
    msgType === 'thuHoi' ||
    msgType === 'ketThuc' ||
    msgType === 'tuChoi' ||
    msgType === 'CC' ||
    msgType === 'banhanh' ||
    msgType === 'choBanHanh' ||
    msgType === 'tuChoiTiepNhan' ||
    msgType === 'chuyenTiepLanhDao' ||
    msgType === 'tuChoiBanHanh' ||
    msgType === 'chuyenTiep' ||
    msgType === 'incoming.comment' ||
    msgType === 'lanhDaoTuChoi' ||
    msgType === 'cv.canhBaoQuaHan'||
    Object.values(CHI_DAO_MESSAGE_TYPE).includes(msgType) ||
    Object.values(MESSAGE_TYPE_DIEU_XE).includes(msgType) ||
    Object.values(MESSAGE_TYPE_MAY_BAY).includes(msgType)
  ) return true;

  return false;
};
const handleAction = (action, notification) => {
  switch (action) {
    case 'outgoing.comment':
    case 'ingoing.comment':
      return buildComment(notification);
    case 'incoming.comment':
      return buildComment(notification);
    case 'chuyenXuLy':
      return buildCXL(notification);
    case 'thuHoi':
      return buildTuChoi(notification);
    case 'ketThuc':
      return buildTuChoi(notification);
    case 'tuChoi':
      return buildTuChoi(notification);
    case 'lanhDaoTuChoi':
      return buildTuChoi(notification);
    case 'CC':
      return buildChuyenTiepCC(notification);
    case 'chuyenTiep':
      return buildChuyenTiep(notification);
    case 'banhanh':
      return buildBHanh(notification);
    case 'choBanHanh':
      return buildTuChoi(notification);
    case 'tuChoiTiepNhan':
      return buildTuChoiTiepNhan(notification);
    case 'chuyenTiepLanhDao':
      return buildChuyenTiep(notification);
    case 'tuChoiBanHanh':
      return buildTuChoiBanHanh(notification);
    case 'cv.canhBaoQuaHan':
      return buildCanhBao(notification);
    case "hcCommands.create":
    case "hcCommands.update":
    case "hcCommands.dkDeadline":
    case "hcCommands.giaHan":
    case "hcCommands.huy":
    case "hcCommands.ycbs":
    case "hcCommands.pheDuyet":
    case "hcCommands.baoCao":
    case "hcCommands.choYKien":
      return buildReport(notification)
    case "hcDieuXe.capnhat":
    case "hcDieuXe.huyyeucau":
    case "hcDieuXe.pheduyet":
    case "hcDieuXe.dangky":
    case "hcDieuXe.tuchoi":
      return buildDieuXe(notification)
    case "hcCaseFlight.capnhat":
    case "hcCaseFlight.huyyeucau":
    case "hcCaseFlight.pheduyet":
    case "hcCaseFlight.dangky":
    case "hcCaseFlight.tuchoi":
      return buildVeMayBay(notification)
    default:
      return <View />;
  }
};

function buildDisplay(actionCode) {
  switch (actionCode) {
    case ACTION_CODE.DANG_KY:
      return {
        status: STATUS_CODE.DANGXULY,
        state: 'Chờ xử lý'
      }
    case ACTION_CODE.CAP_NHAT:
    case ACTION_CODE.PHE_DUYET:
      return {
        status: STATUS_CODE.HOANTHANH,
        state: 'Đã phê duyệt'
      }
    case ACTION_CODE.TU_CHOI:
      return {
        status: STATUS_CODE.HUY,
        state: 'Không phê duyệt'
      }
    case ACTION_CODE.HUY_YEU_CAU:
      return {
        status: STATUS_CODE.HUY,
        state: 'Hủy yêu cầu'
      }
    default:
      return null
  }
}

const Empty = () => (
  <View style={styles.emptyContainer}>
    <Text>Không có dữ liệu</Text>
  </View>
);

const NotificationsScreen = ({
  notifications,
  navigation,
  getNotifications,
  viewDocDetail,
  notificationsLoading,
  refreshNotifications,
  setItem,
  setVisible,
  markAsRead,
  getFlowInfo,
  openDetail,
  setHcFlow,
  setDisplay
}) => {

  function markSeen(notification) {
    notification.notificationDetailId && markAsRead(notification.notificationDetailId)
  }

  const funcs = useRef({
    async onDocPress(notification) {
      markSeen(notification)
      setVisible(false)
      if (notification.messageType === 'outgoing.comment') {
        const document = JSON.parse(notification.dataJson).data;
        await getProcessIdVbOutgoingDoc(document.id).then(res => {
          const docUserView = res.data[0];
          if (docUserView === undefined) {
            viewDocDetail(null, notification);
          } else {
            viewDocDetail(docUserView, notification);
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
            navigation.navigate('Details', {
              documentId: document.id,
            });
          }
        });
        return;
      }
      if (notification.messageType === 'incoming.comment') {
        const document = JSON.parse(notification.dataJson).data;
        await getProcessIdVbIncomingDoc(document.id).then(res => {
          const docUserView = res.data[0];
          if (docUserView === undefined) {
            viewDocDetail(null, notification);
          } else {
            viewDocDetail(docUserView, notification);
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
            navigation.navigate('Details', {
              documentId: document.id,
            });
          }
        });
        return;
      }

      if (notification.messageType === 'cv.canhBaoQuaHan') {
        const document = JSON.parse(notification.dataJson).tkTask;
        await getProcessIdVbIncomingDoc(document.id).then(res => {
          const docUserView = res.data[0];
          if (docUserView === undefined) {
            viewDocDetail(null, notification);
          } else {
            viewDocDetail(docUserView, notification);
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
            navigation.navigate('Details', {
              documentId: document.id,
            });
          }
        });
        return;
      }

        if (Object.values(CHI_DAO_MESSAGE_TYPE).includes(notification.messageType)) {
          const data = JSON.parse(notification.dataJson);
          const item = buildDetailItem(data)
          await setItem({item})
          NavigationService.navigate('ChiDaoScreenTablet');
          return;
        }

      if (Object.values(MESSAGE_TYPE_MAY_BAY).includes(notification.messageType)) {
        const data = JSON.parse(notification.dataJson);
        const caseMasterId = data.hcCaseFlight.caseMasterId
        const item = await getDetailVeMayBay({caseMasterId})
        const display = {
          state: item.hcCaseMaster.state,
          status: item.hcCaseMaster.status
        }
        if (caseMasterId) {
          Promise.all([
            setHcFlow(FLOW_INFO.VE_MAY_BAY),
            getFlowInfo(FLOW_INFO.VE_MAY_BAY),
          ]).then(
            openDetail(caseMasterId, FLOW_INFO.VE_MAY_BAY),
            setDisplay(display),
            NavigationService.navigate('MayBayScreenTablet'),
          )
        }
        return;
      }

      const document = JSON.parse(notification.dataJson).object;
      if (JSON.parse(notification.dataJson).docType + 1 === DOCUMENT_TYPE.VB_DEN) {
        await getProcessIdVbIncomingDoc(document.id).then(res => {
          const docUserView = res.data[0];
          if (docUserView === undefined) {
            viewDocDetail(null, notification);
          } else {
            viewDocDetail(docUserView, notification);
            DocumentNavigation.goToSummary(JSON.parse(notification.dataJson).docType + 1);
            navigation.navigate('Details', {
              documentId: document.id,
            });
          }
        });
      } else {
        await getProcessIdVbOutgoingDoc(document.id).then(res => {
          const docUserView = res.data[0];
          if (docUserView === undefined) {
            viewDocDetail(null, notification);
          } else {
            viewDocDetail(docUserView, notification);
            DocumentNavigation.goToSummary(JSON.parse(notification.dataJson).docType + 1);
            navigation.navigate('Details', {
              documentId: document.id,
            });
          }
        });
      }
    },
  });

  const [refreshing, setRefreshing] = useState(false);
  return (
    <Container style={styles.container}>
      <Text style={styles.txtNoti}>Thông báo</Text>
      <View style={styles.field}>
        {notifications.length > 0 && (
          <FlatList
            refreshControl={
              <RefreshControl
                colors={[colors.blue]}
                tintColor={colors.blue}
                refreshing={refreshing}
                onRefresh={async () => {
                  setRefreshing(true);
                  refreshNotifications();
                  await getNotifications();
                  setRefreshing(false);
                }}
              />
            }
            style={styles.field}
            data={notifications}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item: notification }) => (
              <>
                {checkType(notification.messageType) && (
                  <TouchableOpacity
                    style={[
                      styles.fieldTouchable,
                      notification.status === 'unSeen' ? styles.unread : styles.read,
                    ]}
                    onPress={() => {
                      funcs.current.onDocPress(notification);
                    }}
                  >
                    {handleAction(notification.messageType, notification)}
                    <View style={styles.lineUnder} />
                  </TouchableOpacity>
                )}
              </>
            )}
            onEndReached={() => {
              getNotifications();
            }}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={<Empty />}
          />
        )}
        {notificationsLoading === true && (
          <View>
            <Spinner color={colors.blue} />
          </View>
        )}
        {notifications.length === 0 && notificationsLoading === false && (
          <ScrollView>
            <Empty />
          </ScrollView>
        )}
      </View>
    </Container>
  );
};

NotificationsScreen.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({})),
  getNotifications: PropTypes.func.isRequired,
  viewDocDetail: PropTypes.func.isRequired,
  refreshNotifications: PropTypes.func.isRequired,
  notificationsLoading: PropTypes.bool,
};

NotificationsScreen.defaultProps = {
  notifications: [],
  notificationsLoading: false,
};

export default withNavigation(NotificationsScreen);
