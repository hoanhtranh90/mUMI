import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { closeDetail } from '../../../../store/hcCalendar/reducer';
import NavigationService from '../../../../utils/NavigationService';
import colors from '../../../../utils/colors';
import Attachments from '../component/CalendarAttachments';
import CalendarNotes from '../component/CalendarNotes';
import { selectors } from '../../../../store/auth';
import IconField from 'eoffice/components/IconField';
import LeaderName from '../component/LeaderName';
import { format } from 'date-fns';
import { HC_CASE_CALENDAR } from '../../../../constants/administrative';
import hcCfgMeetingRoomService from '../../../../service/hcCfgMeetingRoomService';

const DetailLichTuan = ({ detail, closeDetail, actorsGroup, currentHcFlow }) => {
  const [hcCaseCalendar, setHcCaseCalendar] = useState(null);
  const [hcCaseMaster, setHcCaseMaster] = useState(null);
  const [hcCoopDepts, setHcCoopDepts] = useState([]);
  const [isMeetingOnline, setIsMeetingOnline] = useState(false);
  const [hcCfgMeetingRoom, setHcCfgMeetingRoom] = useState(null);

  useEffect(
    () => {
      if (detail) {
        setHcCaseCalendar(detail.hcCaseCalendar);
        setHcCaseMaster(detail.hcCaseMaster);
        setIsMeetingOnline(
          detail.hcCaseCalendar.status === 'HOANTHANH' &&
            detail.hcCaseCalendar &&
            (detail.hcCaseCalendar.meetingType === HC_CASE_CALENDAR.MEETING_TYPE.ONLINE ||
              detail.hcCaseCalendar.meetingType ===
                HC_CASE_CALENDAR.MEETING_TYPE.ONLINE_MOBIMEETING_CODINH)
        );
        setHcCoopDepts(detail.hcCoopDepts || []);
        loadHcCfgRoom(detail.hcCaseCalendar);
      }
    },
    [detail]
  );

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

  const FormItem = ({ icon, title, content }) => {
    return (
      <View style={{ flex: 1 }}>
        <IconField label={title} iconName={icon} iconType="Feather">
          <Text style={[styles.titleBold, { fontSize: 16 }]}>{content}</Text>
        </IconField>
      </View>
    );
  };

  const FormAttachment = () => {
    return (
      <View style={{ flex: 1 }}>
        <IconField label="File đính kèm" iconName="link" iconType="Feather">
          <Attachments hcCaseCalendar={hcCaseCalendar} isShowLabel={false} />
        </IconField>
      </View>
    );
  };

  const FormNotes = () => {
    return (
      <View style={{ flex: 1 }}>
        <IconField label="Ghi chú" iconName="file-text" iconType="Feather">
          <CalendarNotes hcCaseCalendar={hcCaseCalendar} isShowLabel={false} />
        </IconField>
      </View>
    );
  };

  const MeetingPlaceForm = () => {
    return (
      <View style={{ flex: 1 }}>
        <IconField label="Địa điểm" iconName="map-pin" iconType="Feather">
          {!isMeetingOnline && (
            <Text style={[styles.titleBold, { fontSize: 16 }]}>
              {getMeetingPlaceLabel(hcCaseCalendar, hcCfgMeetingRoom)}
            </Text>
          )}
          {isMeetingOnline && (
            <Text style={[styles.titleBold, { fontSize: 16 }]}>
              {getMeetingPlaceLabel(hcCaseCalendar, hcCfgMeetingRoom)}
            </Text>
          )}
        </IconField>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {hcCaseCalendar && (
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                closeDetail();
              }}
            >
              <Icon name="arrow-right" type="Feather" style={[styles.icon, { marginLeft: 10 }]} />
            </TouchableOpacity>
            <View style={{ paddingLeft: 15, flex: 1 }}>
              <Text style={[styles.titleBold, { fontSize: 18, marginVertical: 15 }]}>
                {hcCaseCalendar.meetingTitle}
              </Text>
            </View>
          </View>

          <ScrollView style={{ paddingBottom: 50 }}>
            {currentHcFlow.id === 0 && (
              <FormItem
                icon="globe"
                title="Cấp quy trình"
                content={hcCaseCalendar.parentDeptName}
              />
            )}
            <FormItem
              icon="info"
              title="Nội dung công việc"
              content={hcCaseCalendar.meetingContent}
            />
            <FormItem
              icon="clock"
              title="Thời gian cuộc họp"
              content={`${format(
                new Date(hcCaseCalendar.startTime),
                'dd/MM/yyyy HH:mm'
              )} - ${format(new Date(hcCaseCalendar.endTime), 'dd/MM/yyyy HH:mm')}`}
            />
            <MeetingPlaceForm />
            <View style={{ flex: 1 }}>
              <IconField label="Danh sách lãnh đạo" iconName="users">
                <LeaderName
                  item={hcCaseCalendar}
                  actorsGroup={actorsGroup}
                  textStyle={{ fontSize: 16, color: '#333333', fontWeight: 'bold' }}
                />
              </IconField>
            </View>
            {hcCoopDepts.length > 0 && (
              <FormItem
                icon="flag"
                title="Đơn vị chủ trì"
                content={hcCaseCalendar.chairedUnit ? hcCaseCalendar.chairedUnit : '-'}
              />
            )}
            {hcCoopDepts.length > 0 && (
              <FormItem
                icon="aperture"
                title="Đơn vị phối hợp"
                content={hcCoopDepts.map(dept => dept.cooperateDeptName).join(',')}
              />
            )}
            {hcCaseCalendar.otherInvolved && (
              <FormItem icon="file-text" title="Ghi chú" content={hcCaseCalendar.otherInvolved} />
            )}
            <FormAttachment />
            <FormNotes />
            <View style={{ padding: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                <Text style={{ color: colors.gray, fontWeight: 'bold' }}>
                  Đơn vị yêu cầu : {hcCaseMaster.requestDeptName}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                <Text style={{ color: colors.gray, fontWeight: 'bold' }}>
                  Người yêu cầu : {hcCaseMaster.requestUserFullname}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                <Text style={{ color: colors.gray, fontWeight: 'bold' }}>
                  Vào lúc : {format(new Date(hcCaseMaster.createTime), 'dd/MM/yyyy HH:mm')}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.blue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    shadowColor: '#5386ba',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
  topView: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleBold: {
    fontWeight: 'bold',
    color: '#333333',
  },
  titleContent: {
    fontSize: 14,
    color: '#A7A0A0',
  },
  titleFile: {
    fontSize: 14,
    color: '#2650E8',
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    fontSize: 22,
    color: '#A7A0A0',
  },
  iconBlue: {
    fontSize: 24,
    color: '#0088ff',
  },
});

const mapStateToProps = state => ({
  detail: state.hcCalendar.hcCalendarDetail,
  currentUserDeptRole: selectors.deptRoleSelector(state),
  actorsGroup: state.hcCalendar.actorsGroup,
  currentHcFlow: state.hcCalendar.currentHcFlow,
});

const mapDispatchToProps = {
  closeDetail: closeDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailLichTuan);
