import { StyleSheet, Text, View, TouchableOpacity, Alert, Linking } from 'react-native';
import Attachments from './CalendarAttachments';
import CalendarNotes from './CalendarNotes';
import React, { useState, useEffect } from 'react';
import LeaderName from './LeaderName';
import * as service from '../../../../store/hcCalendar/service';
import { Icon } from 'native-base';
import { HC_CASE_CALENDAR } from '../../../../constants/administrative';
import hcCfgMeetingRoomService from '../../../../service/hcCfgMeetingRoomService';
import MeetingPlace from './MeetingPlace';

const styles = StyleSheet.create({
  icon: {
    color: '#0091ff',
  },
  rowContainer: {
    flexDirection: 'row',
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  rowTime: {
    width: 170,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  rowInfo: {
    flex: 1,
    padding: 10,
    textAlign: 'left',
  },
  label: {
    fontWeight: 'bold',
    lineHeight: 25,
    fontSize: 16,
  },
  textBlue: {
    color: '#0073ff',
    fontWeight: 'normal',
    lineHeight: 25,
  },
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  day: {
    borderLeftColor: '#F38621',
    borderLeftWidth: 6,
  },
  afternoon: {
    borderLeftColor: '#0091ff',
    borderLeftWidth: 6,
  },
});

const CalendarItem = ({
  item,
  actorsGroup,
  openDetail,
  currentHcFlow,
  rowNumber,
  onItemChoose,
}) => {
  const [isShared, setIsShared] = useState(false);
  const [isMeetingOnline, setIsMeetingOnline] = useState(false);
  const [hcCfgMeetingRoom, setHcCfgMeetingRoom] = useState(null);

  useEffect(
    () => {
      let isMounted = true;
      Promise.all([
        service.findAllByHcCaseMasterId(item.id),
        hcCfgMeetingRoomService.findById(item.hcCfgMeetingRoomId),
      ]).then(results => {
        let data = results[0];
        let hcCfgMeetingRoom = results[1];
        if (isMounted) {
          setHcCfgMeetingRoom(hcCfgMeetingRoom);
          setIsMeetingOnline(
            item.status === 'HOANTHANH' &&
              item &&
              (item.meetingType === HC_CASE_CALENDAR.MEETING_TYPE.ONLINE ||
                item.meetingType === HC_CASE_CALENDAR.MEETING_TYPE.ONLINE_MOBIMEETING_CODINH)
          );
          if (data) setIsShared(true);
        }
      });
      return () => {
        isMounted = false;
      };
    },
    [item]
  );


  const onItemClick = item => {
    if (onItemChoose) onItemChoose(item);
    else openDetail(item);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        onItemClick(item);
      }}
    >
      <View style={[styles.rowContainer, item.isDay ? styles.day : styles.afternoon]}>
        {isShared && (
          <Icon
            type="MaterialCommunityIcons"
            name="account-circle"
            style={{ top: 10, left: 10, color: '#aaa', position: 'absolute' }}
          />
        )}
        <View style={styles.rowTime}>
          <Text
            style={{
              color: item.isDay ? '#F38621' : '#0088ff',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            {item.isDay ? 'SA' : 'CH'}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {item.startTimeTmp} - {item.endTimeTmp}
          </Text>
        </View>
        <View style={styles.rowInfo}>
          {isShared && currentHcFlow.id === 0 && (
            <View style={styles.formItem}>
              <Text style={styles.label}>
                Cấp quy trình: <Text style={styles.textBlue}>{item.parentDeptName}</Text>
              </Text>
            </View>
          )}
          <View style={styles.formItem}>
            <Text style={styles.label}>
              Tiêu đề:{' '}
              <Text style={styles.textBlue}>{item.meetingTitle ? item.meetingTitle : '-'}</Text>
            </Text>
          </View>
          <View style={styles.formItem}>
            <Text style={styles.label}>
              Nội dung công việc:{' '}
              <Text style={styles.textBlue}>{item.meetingContent ? item.meetingContent : '-'}</Text>
            </Text>
          </View>
          <View style={styles.formItem}>
            <Text style={styles.label}>
              LĐ tham dự: <LeaderName item={item} actorsGroup={actorsGroup} />
            </Text>
          </View>
          {item.chairedUnit && (
            <View style={styles.formItem}>
              <Text style={styles.label}>
                Chủ trì: <Text style={styles.textBlue}>{item.chairedUnit}</Text>
              </Text>
            </View>
          )}

          {item.coop && item.coop.length > 0 && (
            <View style={styles.formItem}>
              <Text style={styles.label}>
                Phối hợp: <Text style={styles.textBlue}>{item.coop.join(', ')}</Text>
              </Text>
            </View>
          )}
        </View>
        {rowNumber !== 1 && (
          <View style={styles.rowInfo}>
            <MeetingPlace item={item} />
            {item.otherInvolved && (
              <View style={styles.formItem}>
                <Text style={styles.label}>
                  Ghi chú: <Text style={styles.textBlue}>{item.otherInvolved}</Text>
                </Text>
              </View>
            )}
            {item && <Attachments hcCaseCalendar={item} />}
            {item && <CalendarNotes hcCaseCalendar={item} />}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CalendarItem;
