import {
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  closeDetail,
  loadAcceptedRequests,
  loadHcFlows,
  openDetail,
} from '../../../../store/hcCalendar/reducer';
import { connect } from 'react-redux';
import { Icon, Spinner, Footer } from 'native-base';
import { addWeeks, endOfWeek, format, startOfWeek } from 'date-fns';
import { vi } from 'date-fns/locale';
import _ from 'lodash';
import { FLOW_INFO } from 'eoffice/constants/administrative';
import ListEmptyComponent from 'eoffice/components/ListEmptyComponent';
import { selectors } from '../../../../store/auth';
import CalendarItem from '../component/CalendarItem';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';

const styles = StyleSheet.create({
  btmHeader: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: { fontSize: 14, fontWeight: 'bold' },
  timeWeek: {
    flexDirection: 'row',
  },
  iconSmall: {
    color: 'black',
    width: 40,
    height: 20,
  },
  btnBorder: {
    marginLeft: 2,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderWidth: 0.5,
    justifyContent: 'center',
    borderColor: '#ccc',
  },
  icon: {
    color: '#0091ff',
  },
  headerTitle: {
    height: 40,
    backgroundColor: '#2d3e4f',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
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

const DaBanHanhScreen = ({
  acceptedRequests,
  loadHcFlows,
  currentHcFlow,
  loadAcceptedRequests,
  currentUserDeptRole,
  query,
  openDetail,
  closeDetail,
  actorsGroup,
  navigation,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [acceptedRequestsPopulated, setAcceptedRequestsPopulated] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      loadHcFlows();
    },
    [currentUserDeptRole]
  );

  useEffect(
    () => {
      const initData = navigation.getParam('data', null);
      if (initData) {
        openDetail(initData.hcCaseCalendar);
        setCurrentDate(new Date(initData.hcCaseCalendar.startTime));
        navigation.state.params = null;
      }
    },
    [navigation]
  );

  useEffect(
    () => {
      setIsLoading(false);
      if (acceptedRequests && acceptedRequests.length > 0) {
        populateAcceptedRequests();
      }
    },
    [acceptedRequests]
  );

  useEffect(
    () => {
      if (currentHcFlow) {
        setAcceptedRequestsPopulated([]);
        setIsLoading(true);
        loadData();
      }
    },
    [currentHcFlow, currentDate]
  );

  const getEndTimeOfWorkingDay = time => {
    return moment(time)
      .startOf('days')
      .hour(17)
      .minute(30)
      .second(0)
      .millisecond(0)
      .toDate();
  };

  //biến đổi về 08:00 cùng hôm sau
  const getStartTimeOfNextWorkingDay = time => {
    return moment(time)
      .startOf('days')
      .add(1, 'day')
      .hour(8)
      .toDate();
  };
  //biến đổi về 08:00 cùng ngày
  const getStartTimeOfWorkingDay = time => {
    return moment(time)
      .startOf('days')
      .hour(8)
      .toDate();
  };

  const isSameDate = (time1, time2) => {
    return (
      moment(time1)
        .startOf('days')
        .toDate()
        .getTime() ===
      moment(time2)
        .startOf('days')
        .toDate()
        .getTime()
    );
  };

  const populateRequest = request => {
    const days = [];
    let startTime =
      request.hcCaseCalendarView?.startTime > query.startDate
        ? request.hcCaseCalendarView?.startTime
        : getStartTimeOfWorkingDay(query.startDate);
    let endTime = request.hcCaseCalendarView?.endTime;
    while (startTime < endTime && startTime < query.endDate) {
      let endOfDay = getEndTimeOfWorkingDay(startTime).getTime();
      days.push({
        startTime: startTime,
        ...request,
        endTime: isSameDate(endOfDay, endTime) ? endTime : endOfDay,
      });
      startTime = getStartTimeOfNextWorkingDay(startTime).getTime();
    }
    return days;
  };

  const populateAcceptedRequests = () => {
    acceptedRequests.sort(
      (a, b) => a.hcCaseCalendarView?.startTime - b.hcCaseCalendarView?.startTime
    );
    let acceptedRequestsTmp = _.uniqBy(acceptedRequests, obj => obj.hcCaseCalendarView.id);
    acceptedRequestsTmp = acceptedRequestsTmp.reduce((hash, acc) => {
      return [...hash, ...populateRequest(acc)];
    }, []);
    const temp = acceptedRequestsTmp.map(request => {
      const dateFormat = format(new Date(request.startTime), 'yyyy-MM-dd');
      const currentTime = new Date();
      currentTime.setHours(12);
      const currentHour = currentTime.getHours();
      return {
        ...request.hcCaseCalendarView,
        hcCoopDepts: request.hcCoopDepts,
        dateFormat,
        attachments: request.attachments,
        caseType: FLOW_INFO.LICH_TUAN,
        startTime: format(new Date(request.hcCaseCalendarView?.startTime), 'MM/dd/yyyy HH:mm'),
        startTimeTmp: format(new Date(request.startTime), 'HH:mm'),
        endTime: format(new Date(request.hcCaseCalendarView.endTime), 'MM/dd/yyyy HH:mm'),
        endTimeTmp: format(new Date(request.endTime), 'HH:mm'),
        isDay: new Date(request.startTime).getHours() < currentHour,
        coop: request.hcCoopDepts.map(coop => coop.cooperateDeptName) || [],
      };
    });

    const tempGroup = _.groupBy(temp, 'dateFormat');
    const tempGroupList = [];
    Object.keys(tempGroup).forEach(key => {
      tempGroupList.push({
        title: key,
        data: tempGroup[key],
      });
    });

    if (!_.isEmpty(tempGroupList)) {
      setAcceptedRequestsPopulated(tempGroupList);
    } else {
      setAcceptedRequestsPopulated([]);
    }
  };

  const getTimeRange = () => {
    let startTime = startOfWeek(currentDate, { weekStartsOn: 1 }).getTime();
    let endTime = endOfWeek(currentDate, { weekStartsOn: 1 }).getTime();
    return { startTime, endTime };
  };

  const loadData = () => {
    let queryState = query || {};
    let timeRange = getTimeRange();

    queryState.startDate = timeRange.startTime;
    queryState.endDate = timeRange.endTime;
    queryState.includeShared = true;
    queryState.deptId = currentHcFlow.id === 0 ? '' : currentHcFlow.deptId;
    queryState.sort = 'createTime,desc';
    queryState.keyword = '';

    loadAcceptedRequests(queryState);
  };

  const preWeek = () => {
    let preWeek = addWeeks(currentDate, -1);
    setCurrentDate(preWeek);
  };

  const nextWeek = () => {
    let nextWeek = addWeeks(currentDate, 1);
    setCurrentDate(nextWeek);
  };

  const getDateWeek = () => {
    let firstday = startOfWeek(currentDate, { weekStartsOn: 1 });
    let lastday = endOfWeek(currentDate, { weekStartsOn: 1 });
    return `${format(firstday, 'dd/MM/yyyy')} - ${format(lastday, 'dd/MM/yyyy')}`;
  };

  const onRefresh = () => {
    loadData();
  };

  const HeaderTop = () => {
    return (
      <View style={[styles.btmHeader]}>
        <View style={styles.timeWeek}>
          <TouchableOpacity style={styles.btnBorder} onPress={preWeek}>
            <Icon name="chevron-left" type="Feather" style={{ fontSize: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBorder} onPress={() => setCurrentDate(new Date())}>
            <Text style={{ fontSize: 16 }}>Tuần này</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBorder} onPress={nextWeek}>
            <Icon name="chevron-right" type="Feather" style={{ fontSize: 20 }} />
          </TouchableOpacity>
          <View style={[styles.btnBorder, { marginLeft: 10 }]}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="calendar" type="EvilIcons" style={{ fontSize: 20, color: '#007aff' }} />
              <Text style={[styles.title, { color: '#007aff' }]}>{getDateWeek()}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const GroupHeader = ({ time }) => {
    let date = new Date(time);
    let timeStr = format(date, "EEEE',' dd 'tháng' MM',' yyyy", { locale: vi });
    return (
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{timeStr}</Text>
      </View>
    );
  };

  const MainList = () => {
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Spinner />
        </View>
      );
    } else {
      return acceptedRequestsPopulated.length > 0 ? (
        <SectionList
          refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
          sections={acceptedRequestsPopulated}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => (
            <CalendarItem
              key={item.id}
              item={item}
              currentHcFlow={currentHcFlow}
              actorsGroup={actorsGroup}
              openDetail={openDetail}
            />
          )}
          renderSectionHeader={({ section: { title } }) => <GroupHeader time={title} />}
        />
      ) : (
        <ListEmptyComponent />
      );
    }
  };

  return (
    <>
      <NavigationEvents
        onDidBlur={() => {
          closeDetail();
        }}
        onDidFocus={() => {
          console.log('loadData');
          currentHcFlow && loadData();
        }}
      />
      <View style={{ flex: 1 }}>
        <HeaderTop />
        <MainList />
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  listLD: state.hcCalendar.listLD,
  acceptedRequests: state.hcCalendar.acceptedRequests,
  currentHcFlow: state.hcCalendar.currentHcFlow,
  query: state.hcCalendar.query,
  actorsGroup: state.hcCalendar.actorsGroup,
  currentUserDeptRole: selectors.deptRoleSelector(state),
});

const mapDispatchToProps = {
  loadHcFlows: loadHcFlows,
  loadAcceptedRequests: loadAcceptedRequests,
  openDetail: openDetail,
  closeDetail: closeDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DaBanHanhScreen);
