import React, { useState, useEffect } from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import { HC_CASE_CALENDAR } from '../../../../constants/administrative';
import * as service from '../../../../store/hcCalendar/service';
import hcCfgMeetingRoomService from '../../../../service/hcCfgMeetingRoomService';

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

const MeetingPlace = ({ item }) => {

  const [isMeetingOnline, setIsMeetingOnline] = useState(false);
  const [hcCfgMeetingRoom, setHcCfgMeetingRoom] = useState(null);

  useEffect(
    () => {
      let isMounted = true;
      hcCfgMeetingRoomService.findById(item.hcCfgMeetingRoomId).then(hcCfgMeetingRoom => {
        if (isMounted) {
          setHcCfgMeetingRoom(hcCfgMeetingRoom);
          setIsMeetingOnline(
            item.status === 'HOANTHANH' &&
            item &&
            (item.meetingType === HC_CASE_CALENDAR.MEETING_TYPE.ONLINE ||
              item.meetingType === HC_CASE_CALENDAR.MEETING_TYPE.ONLINE_MOBIMEETING_CODINH),
          );
        }
      });
      return () => {
        isMounted = false;
      };
    },
    [item],
  );

  const joinMeeting = async () => {
    try {
      const res = await service.joinRoom(item.id);
      const urlApp = res.data.urlApp;
      const supported = await Linking.canOpenURL(urlApp);
      if (supported) {
        await Linking.openURL(urlApp);
      } else {
        Alert.alert(`Có lỗi khi kết nối MobiFone Meeting`);
      }
    } catch (e) {
      if (e.response.status === 403) {
        Alert.alert('Không có quyền tham gia cuộc họp');
      } else Alert.alert(`Có lỗi khi kết nối MobiFone Meeting`);
    }
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

  return (
    <>
      {!isMeetingOnline && (
        <View style={styles.formItem}>
          <Text style={styles.label}>
            Địa điểm:{' '}
            <Text style={styles.textBlue}>{getMeetingPlaceLabel(item)}</Text>
          </Text>
        </View>
      )}
      {isMeetingOnline && (
        <View style={styles.formItem}>
          <Text style={styles.label}>Địa điểm: </Text>
          <TouchableOpacity onPress={joinMeeting} style={[styles.formItem, { paddingRight: 10, flex: 1 }]}>
            <Text
              numberOfLines={1}
              style={{
                textDecorationLine: 'underline',
                fontWeight: 'normal',
                color: '#0088ff',
              }}
            >
              {getMeetingPlaceLabel(item, hcCfgMeetingRoom)}
            </Text>
            <Icon type="Feather" name="log-in" style={{ fontSize: 16, color: '#0088ff' }}/>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default MeetingPlace;
