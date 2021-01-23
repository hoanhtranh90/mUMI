import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Linking, Alert } from 'react-native';
import { Icon } from 'native-base';
import Attachments from '../../../tablet/lichTuan/component/CalendarAttachments';
import * as service from '../../../../store/administrative/lichTuan/detail/service';
import LeaderName from '../../../tablet/lichTuan/component/LeaderName';
import { HC_CASE_CALENDAR } from '../../../../constants/administrative';
import MeetingPlace from '../../../tablet/lichTuan/component/MeetingPlace';
const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: '#efeff4',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginTop: 10,
  },
  desc: {
    color: 'gray',
    marginTop: 4,
  },
  icon: {
    fontSize: 12,
    color: '#abb4bd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    flex: 1,
  },
  wrapperStatus: {
    height: 24,
    borderRadius: 4,
    backgroundColor: 'rgba(240, 195, 48, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginRight: 10,
    flexDirection: 'row',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowDate: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 4,
    flex: 1,
    marginRight: 10,
  },
  date: {
    color: '#2b2d50',
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  roomName: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#007aff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  content: {
    fontSize: 15,
    color: '#424242',
    flex: 1,
    marginTop: 5,
  },
  card: {},
  br: {
    width: '95%',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginTop: 50,
  },
  formItem: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
});

const AgendaItem = ({ item, actorsGroup, onRequestPressed }) => {
  const [isShared, setIsShared] = useState(false);

  useEffect(
    () => {
      let isMounted = true;
      service.findAllByHcCaseMasterId(item.id).then(data => {
        if (isMounted) {
          if (data) setIsShared(true);
        }
      });
      return () => {
        isMounted = false;
      };
    },
    [item]
  );


  return (
    <TouchableOpacity
      onPress={() => onRequestPressed({ item })}
      style={{
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: item.isDay ? '#f5c533' : '#007aff',
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        height: item.height,
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {isShared && (
        <Icon
          type="MaterialCommunityIcons"
          name="account-circle"
          style={{ top: 10, right: 10, color: '#aaa', position: 'absolute' }}
        />
      )}
      <Text style={styles.roomName}>{item?.meetingTitle}</Text>
      {isShared && global.selectDeptForViewLT === 0 && item.parentDeptName && (
        <View>
          <Text style={styles.title}>Cấp quy trình: </Text>
          <Text style={styles.content}>{item.parentDeptName}</Text>
        </View>
      )}
      <Text style={styles.title}>Thời gian:</Text>
      <Text style={styles.content}>
        {`${item?.startTimeTmp} - ${item?.endTimeTmp}    `}
        {item.isDay ? (
          <Icon
            type="Feather"
            name="sunrise"
            style={{ fontSize: 20, color: '#f5c533', fontWeight: 'bold' }}
          />
        ) : (
          <Icon
            type="Feather"
            name="sunset"
            style={{ fontSize: 24, color: '#007aff', fontWeight: 'bold' }}
          />
        )}
      </Text>
      <MeetingPlace item={item}/>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.title}>
          Lãnh đạo: <LeaderName item={item} actorsGroup={actorsGroup} />
        </Text>
      </View>
      {item.chairedUnit !== null && (
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>
            Chủ trì:{' '}
            <Text style={{ ...styles.content, fontWeight: 'normal' }}> {item?.chairedUnit}</Text>
          </Text>
        </View>
      )}

      {item.coop !== '' && (
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>
            Phối hợp: <Text style={{ ...styles.content, fontWeight: 'normal' }}> {item?.coop}</Text>
          </Text>
        </View>
      )}

      {item.otherInvolved !== null && (
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>
            Ghi chú:{' '}
            <Text style={{ ...styles.content, fontWeight: 'normal' }}> {item?.otherInvolved}</Text>
          </Text>
        </View>
      )}
      {item && <Attachments hcCaseCalendar={item} />}
    </TouchableOpacity>
  );
};

export default AgendaItem;
