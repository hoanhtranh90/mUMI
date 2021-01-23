/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import PropTypes from 'prop-types';
import { Icon, Spinner } from 'native-base';
import _ from 'lodash';
import { lastDayOfWeek, startOfWeek } from 'date-fns';

import ListEmptyComponent from 'eoffice/components/ListEmptyComponent';
import { FLOW_INFO } from 'eoffice/constants/administrative';
import format from 'date-fns/format';
import RequestItem from './RequestItem';
import RequestItemLT from './RequestItemLT';
import useSearchForm from '../search/useSearchForm';
import AgendaItem from './AgendaItem';
import * as service from '../../../../store/administrative/lichTuan/detail/service';

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
});

const Requests = ({
  hasMore,
  requests,
  query,
  listRequests,
  loading,
  mode,
  onRequestPressed,
  reloadRequests,
  searchRequests,
  hcFlow,
  currentHcFlow,
  actorsGroup,
}) => {
  const [refresh, setRefresh] = useState(false);
  const [items, setItems] = useState(null);
  const [itemsPending, setItemsPending] = useState(null);
  const [markedDates, setMarkedDates] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [state] = useSearchForm();
  const today = new Date();
  const selectedDate = format(new Date(today), 'yyyy-MM-dd');

  const onRefresh = async () => {
    setRefresh(true);
    await reloadRequests(hcFlow.flowCode);
    setRefresh(false);
  };

  const truncDate = date => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const onRefreshAgenda = async () => {
    if (global.agenda && global.agenda.state) {
      const selectedDate = global.agenda.state.selectedDay.toDate();
      selectedDate.setDate(selectedDate.getDate() - 1);
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      if (items[dateStr]) {
        global.agenda.onDayChange(selectedDate);
      } else {
        reloadLT(selectedDate, endTime);
      }
    }
  };

  const getFirstLastDayOfWeek = () => {
    const firstDayInWeek = startOfWeek(today, { weekStartsOn: 0 });
    const lastDayInWeek = lastDayOfWeek(today, { weekStartsOn: 0 });
    return { firstDayInWeek, lastDayInWeek: truncDate(lastDayInWeek) };
  };

  const reloadLT = async (startDate, endDate) => {
    const { firstDayInWeek, lastDayInWeek } = getFirstLastDayOfWeek();
    state.startDate = startDate ? startDate : firstDayInWeek;
    state.endDate = endDate ? endDate : lastDayInWeek;
    state.isSearch = true;
    await searchRequests(state);
    if (!_.isNull(global.agenda)) {
      global.agenda.onDayChange(startDate);
    }
  };

  const getDaysInRange = (startDate, endDate) => {
    let days = [];
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    while (startDate.getTime() < endDate.getTime()) {
      days.push(format(new Date(startDate), 'yyyy-MM-dd'));
      startDate.setDate(startDate.getDate() + 1);
    }
    return days;
  };

  useEffect(
    () => {
      if (query) {
        query.endDate && setEndTime(new Date(query.endDate));
        query.startDate && setStartTime(new Date(query.startDate));
      }
    },
    [query]
  );

  const populateMarkDates = tempGroup => {
    let markDate = {};
    let daysInRange;
    if (query && query.startDate && query.endDate) {
      daysInRange = getDaysInRange(query.startDate, query.endDate);
    } else {
      const { firstDayInWeek, lastDayInWeek } = getFirstLastDayOfWeek();
      lastDayInWeek.setDate(lastDayInWeek.getDate() + 1);
      daysInRange = getDaysInRange(firstDayInWeek, lastDayInWeek);
    }
    daysInRange.forEach((day, idx) => {
      if (!tempGroup[day]) {
        tempGroup[day] = [{}];
      } else {
        markDate[day] = { marked: true };
      }
    });
    setMarkedDates(markDate);
  };

  function buildListCalendar2() {
    // if (requests.length === 0) return;
    const requestsTmp = _.uniqBy(requests, obj => obj.hcCaseCalendarView?.id);
    if (!_.isEmpty(requestsTmp)) {
      const newItems = {};
      _.forEach(requestsTmp, obj => {
        let start = obj.hcCaseCalendarView?.startTime;
        let curTime = obj.hcCaseCalendarView?.endTime;
        if (start === null || curTime === null) return;
        for (let loopTime = start; loopTime < curTime; loopTime += 86400000) {
          const strTime = format(new Date(loopTime), 'yyyy-MM-dd');
          const currentTime = new Date();
          currentTime.setHours(12);
          const currentHour = currentTime.getHours();
          if (!newItems[strTime]) {
            newItems[strTime] = [];
            let coop = '';
            _.forEach(obj.hcCoopDepts, obj => {
              coop = coop + ', ' + obj.cooperateDeptName;
            });

            newItems[strTime].push({
              // loop: format(new Date(loopTime), 'MM/dd/yyyy HH:mm'),
              ...obj.hcCaseCalendarView,
              dateFormat: strTime,
              isDay: new Date(obj.hcCaseCalendarView?.startTime).getHours() < currentHour,
              meetingTitle: obj.hcCaseCalendarView.meetingTitle,
              meetingPlace: obj.hcCaseCalendarView.meetingPlace,
              caseMasterId: obj.hcCaseCalendarView.caseMasterId,
              startTime: format(new Date(obj.hcCaseCalendarView?.startTime), 'MM/dd/yyyy HH:mm'),
              endTime: format(new Date(obj.hcCaseCalendarView.endTime), 'MM/dd/yyyy HH:mm'),
              startTimeTmp:
                format(new Date(loopTime), 'MM/dd/yyyy') ===
                format(new Date(obj.hcCaseCalendarView?.startTime), 'MM/dd/yyyy')
                  ? format(new Date(obj.hcCaseCalendarView?.startTime), 'HH:mm')
                  : '08:00',

              endTimeTmp:
                format(new Date(loopTime), 'MM/dd/yyyy') ===
                format(new Date(obj.hcCaseCalendarView.endTime), 'MM/dd/yyyy')
                  ? format(new Date(obj.hcCaseCalendarView.endTime), 'HH:mm')
                  : '17:30',
              caseType: FLOW_INFO.LICH_TUAN,
              parentDeptName: obj.hcCaseCalendarView.parentDeptName,
              leaderNames: obj.hcCaseCalendarView.leaderNames,
              chairedUnit: obj.hcCaseCalendarView.chairedUnit,
              coop: coop.substring(2, coop.length),
              videoConferenceUnit: obj.hcCaseCalendarView.videoConferenceUnit,
              otherInvolved: obj.hcCaseCalendarView.otherInvolved,
              id: obj.hcCaseCalendarView.id,
              attachments: obj.attachments,
              hcMeetingRoomId: obj.hcCaseCalendarView.hcMeetingRoomId,
              meetingType: obj.hcCaseCalendarView.meetingType,
            });
          } else {
            let coop = '';
            _.forEach(obj.hcCoopDepts, obj => {
              coop = coop + ', ' + obj.cooperateDeptName;
            });
            newItems[strTime].push({
              // loop: format(new Date(loopTime), 'MM/dd/yyyy HH:mm'),
              ...obj.hcCaseCalendarView,
              dateFormat: strTime,
              isDay: new Date(obj.hcCaseCalendarView?.startTime).getHours() < currentHour,
              meetingTitle: obj.hcCaseCalendarView.meetingTitle,
              meetingPlace: obj.hcCaseCalendarView.meetingPlace,
              caseMasterId: obj.hcCaseCalendarView.caseMasterId,
              startTime: format(new Date(obj.hcCaseCalendarView?.startTime), 'MM/dd/yyyy HH:mm'),
              endTime: format(new Date(obj.hcCaseCalendarView.endTime), 'MM/dd/yyyy HH:mm'),
              startTimeTmp:
                format(new Date(loopTime), 'MM/dd/yyyy') ===
                format(new Date(obj.hcCaseCalendarView?.startTime), 'MM/dd/yyyy')
                  ? format(new Date(obj.hcCaseCalendarView?.startTime), 'HH:mm')
                  : '08:00',

              endTimeTmp:
                format(new Date(loopTime), 'MM/dd/yyyy') ===
                format(new Date(obj.hcCaseCalendarView.endTime), 'MM/dd/yyyy')
                  ? format(new Date(obj.hcCaseCalendarView.endTime), 'HH:mm')
                  : '17:30',
              caseType: FLOW_INFO.LICH_TUAN,
              leaderNames: obj.hcCaseCalendarView.leaderNames,
              chairedUnit: obj.hcCaseCalendarView.chairedUnit,
              hcMeetingRoomId: obj.hcCaseCalendarView.hcMeetingRoomId,
              meetingType: obj.hcCaseCalendarView.meetingType,
              id: obj.hcCaseCalendarView.id,
              coop: coop.substring(2, coop.length),
              parentDeptName: obj.hcCaseCalendarView.parentDeptName,
              videoConferenceUnit: obj.hcCaseCalendarView.videoConferenceUnit,
              otherInvolved: obj.hcCaseCalendarView.otherInvolved,
              attachments: obj.attachments,
            });
          }
        }
      });

      _.forEach(newItems, objItem => {
        objItem = objItem.sort((a, b) => new Date(a?.startTime) - new Date(b?.startTime));
      });
      // const tempGroup = _.groupBy(newItems, 'dateFormat');
      populateMarkDates(newItems);
      if (!_.isEmpty(newItems)) {
        setItems({ ...newItems });
      } else {
        setItems({});
      }

      // setItems(newItems);
    } else {
      setItems({});
    }
  }

  useEffect(
    () => {
      const requestTmp = [];
      if (hcFlow.flowCode === FLOW_INFO.LICH_TUAN) {
        if (mode === 2) {
          buildListCalendar2();
          if (!_.isUndefined(global.startDate)) {
            if (!_.isNull(global.agenda) && !_.isUndefined(global.agenda)) {
              global.agenda.onDayChange(global.startDate);
            }
          }
        } else if (mode === 1) {
          const itemsPendingTmp = _.uniqBy(requests, 'caseMasterId');
          setItemsPending(itemsPendingTmp);
        }
      } else {
        const itemsPendingTmp = _.uniqBy(requests, 'caseMasterId');
        setItemsPending(itemsPendingTmp);
      }
    },
    [requests]
  );

  const onDayPress = day => {
    const date = new Date(day.timestamp);
    const start = startTime ? startTime : startOfWeek(today, { weekStartsOn: 0 });
    if (date.getTime() < start.getTime()) {
      reloadLT(date, endTime);
    }
  };

  function rowHasChanged(r1, r2) {
    return r1.caseMasterId !== r2.caseMasterId;
  }
  return mode === 2 && hcFlow.flowCode === FLOW_INFO.LICH_TUAN ? (
    <>
      {items && (
        <Agenda
          // loadItemsForMonth={loadItems()}
          ref={ref => {
            global.agenda = ref;
          }}
          // firstDay={1}
          items={items}
          selected={selectedDate}
          markedDates={markedDates}
          scrollEnabled
          onDayPress={onDayPress}
          renderItem={(item, firstItemInDay) =>
            item.caseMasterId ? (
              <AgendaItem
                item={item}
                key={item.id}
                onRequestPressed={onRequestPressed}
                actorsGroup={actorsGroup}
              />
            ) : (
              <View
                styles={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
              >
                <View style={styles.br} />
              </View>
            )
          }
          rowHasChanged={rowHasChanged}
          onRefresh={onRefreshAgenda}
          renderEmptyData={() => <ListEmptyComponent />}
        />
      )}
      {!items && <ListEmptyComponent />}
    </>
  ) : (
    <FlatList
      refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
      style={{ flexGrow: 1 }}
      data={itemsPending}
      renderItem={item =>
        hcFlow?.flowCode === FLOW_INFO.LICH_TUAN ? (
          <RequestItemLT
            request={item}
            onPress={() => {
              const itemTmp = item;
              itemTmp.item.caseType = FLOW_INFO.LICH_TUAN;
              return onRequestPressed(itemTmp);
            }}
            mode={mode}
            key={item.item.caseMasterId}
          />
        ) : (
          <RequestItem
            request={item}
            onPress={() => onRequestPressed(item)}
            mode={mode}
            key={item.item.caseMasterId}
          />
        )
      }
      ListFooterComponent={<>{loading && <Spinner color="#044987" />}</>}
      keyExtractor={(item, key) => key.toString()}
      onEndReached={() => {
        if (hasMore) {
          listRequests(hcFlow?.flowCode);
        }
      }}
      onEndReachedThreshold={0.3}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
    />
  );
  // : null;
};

Requests.propTypes = {
  mode: PropTypes.number.isRequired,
  requests: PropTypes.arrayOf(PropTypes.shape({})),
  listRequests: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onRequestPressed: PropTypes.func,
  hasMore: PropTypes.bool.isRequired,
  reloadRequests: PropTypes.func,
  hcFlow: PropTypes.string,
};

Requests.defaultProps = {
  requests: [],
  loading: false,
  onRequestPressed() {},
  reloadRequests() {},
  hcFlow: '',
};

export default Requests;
