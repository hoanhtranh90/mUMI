import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import Avatar from '../../../components/Avatar';
import { Icon } from 'native-base';
import { CHI_DAO_MESSAGE_TYPE } from '../../../constants/administrative';
import { getNotifyActionNameByNotifyMessageType } from '../../../utils/utils';
import { formatTimestamp, formatDateTime } from 'eoffice/utils/utils';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import Swipeout from 'react-native-swipeout';
import handlerNotification from '../../../utils/handlerNotification';
import { DOCUMENT_TYPE } from '../../../constants/documents';

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
        <Text style={styles.txtDefault}>văn bản </Text>
        <Text style={styles.txtDefault}>"{JSON.parse(notification.dataJson).data.quote}"</Text>
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

const buildDocInBHanh = notification => (
  <View style={styles.rowFlex}>
    <View style={styles.fieldAva}>
      <Avatar
        name={JSON.parse(notification.dataJson).vbIncomingDoc.publisherName}
        size={styles.avaSize}
      />
    </View>
    <View style={styles.fieldTxt}>
      <Text style={styles.bsTxt}>
        <Text style={styles.txtDefault}>
          <Text style={styles.boldTxt}>
            {JSON.parse(notification.dataJson).vbIncomingDoc.publisherName}
          </Text>{' '}
          đã{' '}
        </Text>
        <Text style={styles.borderTxt}>{getActionText(notification.messageType)} </Text>
        <Text style={styles.txtDefault}>văn bản số </Text>
        <Text style={styles.boldTxt}>
          {JSON.parse(notification.dataJson).vbIncomingDoc.docCode}{' '}
        </Text>
        <Text style={styles.txtDefault}>về việc </Text>
        <Text style={styles.txtDefault}>
          "{JSON.parse(notification.dataJson).vbIncomingDoc.quote}"
        </Text>
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
  const data = JSON.parse(notification.dataJson);
  const detail = buildDetailItem(data);
  return (
    <View style={styles.rowFlex}>
      <View style={styles.fieldAva}>
        <Avatar name={notification.fromUserName} size={styles.avaSize} />
      </View>
      {(notification.messageType === CHI_DAO_MESSAGE_TYPE.BAO_CAO ||
        notification.messageType === CHI_DAO_MESSAGE_TYPE.GIA_HAN ||
        notification.messageType === CHI_DAO_MESSAGE_TYPE.DK_DEADLINE) && (
        <View style={styles.fieldTxt}>
          <Text>
            <Text style={styles.boldTxt}>{detail.deptName}</Text>
            <Text style={styles.txtDefault}> đã </Text>
            <Text style={[styles.txtDefault, { color: '#007aff' }]}>
              {getNotifyActionNameByNotifyMessageType(notification.messageType)}
            </Text>
            <Text style={styles.txtDefault}> cho kết luận chỉ đạo </Text>
            <Text style={styles.txtDefault}>{`"${detail.meeting}"`}</Text>
          </Text>
          <View style={[styles.dateDoc, { marginTop: 4 }]}>
            <Icon name="clock" type="Feather" style={styles.dateIcon} />
            <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
          </View>
        </View>
      )}
      {(notification.messageType === CHI_DAO_MESSAGE_TYPE.CREATE ||
        notification.messageType === CHI_DAO_MESSAGE_TYPE.UPDATE ||
        notification.messageType === CHI_DAO_MESSAGE_TYPE.HUY ||
        notification.messageType === CHI_DAO_MESSAGE_TYPE.PHE_DUYET ||
        notification.messageType === CHI_DAO_MESSAGE_TYPE.CHO_Y_KIEN ||
        notification.messageType === CHI_DAO_MESSAGE_TYPE.YCBS) && (
        <View style={styles.fieldTxt}>
          <Text>
            <Text style={styles.txtDefault}> Ông/Bà </Text>
            <Text style={[styles.txtDefault, { color: '#007aff' }]}>{data.updator.fullName}</Text>
            <Text style={styles.txtDefault}> đã </Text>
            <Text style={[styles.txtDefault, { color: '#007aff' }]}>
              {getNotifyActionNameByNotifyMessageType(notification.messageType)}
            </Text>
            <Text style={styles.txtDefault}> cho kết luận chỉ đạo </Text>
            <Text style={styles.txtDefault}>{`"${detail.meeting}"`}</Text>
          </Text>
          <View style={[styles.dateDoc, { marginTop: 4 }]}>
            <Icon name="clock" type="Feather" style={styles.dateIcon} />
            <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const buildDieuXe = notification => {
  const data = JSON.parse(notification.dataJson);
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
          <Text style={[styles.txtDefault, { color: '#007aff' }]}>
            {getNotifyActionNameByNotifyMessageType(notification.messageType)}
          </Text>
          <Text style={styles.txtDefault}> yêu cầu điều xe </Text>
          <Text style={styles.boldTxt}>{`"${data.hcCaseDieuXe.title}"`}</Text>
        </Text>
        <View style={[styles.dateDoc, { marginTop: 4 }]}>
          <Icon name="clock" type="Feather" style={styles.dateIcon} />
          <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
        </View>
      </View>
    </View>
  );
};

const buildDetailItem = data => {
  let detail = {};
  if (data) {
    if (data.hcCaseCommands) {
      detail.caseMasterId = data.hcCaseCommands.hcCaseMasterId;
      detail.id = data.hcCaseCommands.id;
      detail.commandsStatus = data.hcCaseCommands.commandsStatus;
      detail.processType = data.hcCaseCommands.processType;
      detail.deadline = data.hcCaseCommands.deadline
        ? new Date(data.hcCaseCommands.deadline).getTime()
        : '';
      detail.parentDeptId = data.hcCaseCommands.parentDeptId;
      detail.deptId = data.hcCaseCommands.deptId;
      detail.state = data.hcCaseCommands.state;
    }
    if (data.hcCaseCommandsCommon) {
      detail.conclusion = data.hcCaseCommandsCommon.conclusion;
      detail.sector = data.hcCaseCommandsCommon.sector;
      detail.meeting = data.hcCaseCommandsCommon.meeting;
      detail.hcCaseCommandsCommonId = data.hcCaseCommandsCommon.id;
      detail.commandsDate = data.hcCaseCommandsCommon.commandsDate
        ? new Date(data.hcCaseCommandsCommon.commandsDate).getTime()
        : null;
      detail.updateTime = data.hcCaseCommandsCommon.updateTime
        ? new Date(data.hcCaseCommandsCommon.updateTime).getTime()
        : null;
      detail.directionContent = data.hcCaseCommandsCommon.directionContent;
    }
    if (data.performActor) {
      detail.performFullName = data.performActor.fullName;
      detail.performId = data.performActor.id;
    }
    if (data.directiveActor) {
      detail.directiveFullName = data.directiveActor.fullName;
      detail.directiveId = data.directiveActor.id;
    }
    if (data.donViThuchien) {
      detail.deptName = data.donViThuchien.deptName;
    }
  }
  return detail;
};

const buildVeMayBay = notification => {
  const data = JSON.parse(notification.dataJson);
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
          <Text style={[styles.txtDefault, { color: '#007aff' }]}>
            {getNotifyActionNameByNotifyMessageType(notification.messageType)}
          </Text>
          <Text style={styles.txtDefault}> yêu cầu đặt vé máy bay </Text>
          <Text style={styles.boldTxt}>{`"${data.hcCaseFlight.requestName}"`}</Text>
        </Text>
        <View style={[styles.dateDoc, { marginTop: 4 }]}>
          <Icon name="clock" type="Feather" style={styles.dateIcon} />
          <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
        </View>
      </View>
    </View>
  );
};

const buildKhachSan = notification => {
  const data = JSON.parse(notification.dataJson);
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
          <Text style={[styles.txtDefault, { color: '#007aff' }]}>
            {getNotifyActionNameByNotifyMessageType(notification.messageType)}
          </Text>
          <Text style={styles.txtDefault}> yêu cầu đặt khách sạn </Text>
          <Text style={styles.boldTxt}>{`"${data.hcCaseHotel.requestName}"`}</Text>
        </Text>
        <View style={[styles.dateDoc, { marginTop: 4 }]}>
          <Icon name="clock" type="Feather" style={styles.dateIcon} />
          <Text style={styles.dateTxt}>{formatTimestamp(notification.createTime)}</Text>
        </View>
      </View>
    </View>
  );
};

const handleAction = (action, notification) => {
  console.log(notification);
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
    case 'incoming.banhanh':
      return buildDocInBHanh(notification);
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
    case 'hcCommands.create':
    case 'hcCommands.update':
    case 'hcCommands.dkDeadline':
    case 'hcCommands.giaHan':
    case 'hcCommands.huy':
    case 'hcCommands.ycbs':
    case 'hcCommands.pheDuyet':
    case 'hcCommands.baoCao':
    case 'hcCommands.choYKien':
      return buildReport(notification);
    case 'hcDieuXe.capnhat':
    case 'hcDieuXe.huyyeucau':
    case 'hcDieuXe.pheduyet':
    case 'hcDieuXe.dangky':
    case 'hcDieuXe.tuchoi':
      return buildDieuXe(notification);
    case 'hcCaseFlight.capnhat':
    case 'hcCaseFlight.huyyeucau':
    case 'hcCaseFlight.pheduyet':
    case 'hcCaseFlight.dangky':
    case 'hcCaseFlight.tuchoi':
      return buildVeMayBay(notification);
    case 'hcCaseHotel.capnhat':
    case 'hcCaseHotel.huyyeucau':
    case 'hcCaseHotel.pheduyet':
    case 'hcCaseHotel.dangky':
    case 'hcCaseHotel.tuchoi':
      return buildKhachSan(notification);
    default:
      return <View />;
  }
};

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
    case 'incoming.banhanh':
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
    case 'hcCommands.baoCao':
      return 'Báo cáo';
    default:
      return '';
  }
};

const NotificationItem = ({ notify, markAsRead, deleteNotify }) => {
  const swipeRef = useRef(null);

  const DeleteBtn = () => {
    return (
      <View
        style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'red' }}
      >
        <Icon style={{ color: '#fff', fontSize: 18 }} type="Feather" name="trash-2" />
      </View>
    );
  };
  const MarkAsReadBtn = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: '#ff8727',
        }}
      >
        <Icon style={{ color: '#fff', fontSize: 18 }} type="Feather" name="eye" />
      </View>
    );
  };

  const filterSwipeBtn = () => {
    if (notify.status === 'seen')
      return [
        {
          component: <DeleteBtn />,
          onPress: async () => {
            await deleteNotify(notify.notificationDetailId);
            swipeRef.current._close();
          },
        },
      ];
    return [
      {
        component: <MarkAsReadBtn />,
        onPress: async () => {
          await markAsRead(notify.notificationDetailId);
          swipeRef.current._close();
        },
      },
      {
        component: <DeleteBtn />,
        onPress: async () => {
          await deleteNotify(notify.notificationDetailId);
          swipeRef.current._close();
        },
      },
    ];
  };

  const onPressNotify = () => {
    const dataJson = JSON.parse(notify.dataJson);
    const vbIncomingDoc = { ...dataJson.object, ...dataJson.vbIncomingDoc };
    const vbOutgoingDoc = { ...dataJson.object };
    const tkTask = { ...dataJson.tkTask };
    const hcCaseDieuXe = { ...dataJson.hcCaseDieuXe };
    const hcCaseFlight = { ...dataJson.hcCaseFlight };
    const hcCaseHotel = { ...dataJson.hcCaseHotel };
    const receiver = '{}';
    const data = JSON.stringify({
      vbIncomingDoc,
      vbOutgoingDoc,
      tkTask,
      ...hcCaseDieuXe,
      ...hcCaseFlight,
      ...hcCaseHotel,
    });
    const vbNotificationDetail = JSON.stringify({ id: notify.notificationDetailId });
    let messageType = notify.messageType;
    if (dataJson.docType === 0 || dataJson.docType === 1) {
      messageType = dataJson.docType === DOCUMENT_TYPE.VB_DEN - 1 ? 'incomingDoc' : 'outgoingDoc';
    }
    const notificationProcessed = {
      data,
      receiver,
      messageType,
      vbNotificationDetail,
    };
    handlerNotification(notificationProcessed);
  };

  return (
    <Swipeout ref={swipeRef} right={filterSwipeBtn()} buttonWidth={50}>
      <TouchableOpacity
        onPress={onPressNotify}
        style={[styles.fieldTouchable, notify.status === 'unSeen' ? styles.unread : styles.read]}
      >
        {handleAction(notify.messageType, notify)}
        <View style={styles.lineUnder} />
      </TouchableOpacity>
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  rowFlex: {
    flexDirection: 'row',
  },
  fieldTouchable: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  field: { flex: 1, marginVertical: 10 },
  container: { paddingVertical: 10, paddingTop: variables.isIphoneX ? 20 : 5 },
  lineUnder: { borderColor: '#d8d8d9', borderWidth: 0.5, marginHorizontal: 20 },
  avaSize: 36,
  fieldAva: { flex: 1 },
  fieldTxt: { flex: 7, paddingBottom: 7 },
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
});

export default NotificationItem;
