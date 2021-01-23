import {
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  changeHcFlow,
  closeDetail,
  loadAcceptedRequests,
  loadHcFlows,
  openDetail,
} from '../../../../store/hcCalendar/reducer';
import { FLOW_INFO, ROLE_CODE } from 'eoffice/constants/administrative';
import { connect } from 'react-redux';
import { Icon, Spinner } from 'native-base';
import { addWeeks, endOfWeek, format, startOfWeek } from 'date-fns';
import { vi } from 'date-fns/locale';
import _ from 'lodash';
import ListEmptyComponent from 'eoffice/components/ListEmptyComponent';
import { selectors } from '../../../../store/auth';
import CalendarItem from '../../lichTuan/component/CalendarItem';
import { NavigationEvents } from 'react-navigation';
import colors from '../../../../utils/colors';
import SelectBox from './SelectBox';
import * as lichtuanService from 'eoffice/store/administrative/lichTuan/detail/service';

const styles = StyleSheet.create({
  btmHeader: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
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

const ListCalendar = ({
  acceptedRequests,
  loadHcFlows,
  currentHcFlow,
  loadAcceptedRequests,
  currentUserDeptRole,
  query,
  openDetail,
  closeDetail,
  actorsGroup,
  onItemChoose,
  changeHcFlow,
  hcFlows,
  close,
}) => {
  const [currentDate, setCurrentDate] = useState(query?.startDate || new Date());
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
        console.log('loadData();');
      }
    },
    [currentHcFlow, currentDate]
  );

  const onItemChoose_ = async hcCalendar => {
    let permission = await hasPermission(hcCalendar);
    if (permission) onItemChoose(hcCalendar);
    else Alert.alert('Thông báo', 'Không thể chọn lịch tuần này !');
  };

  const hasPermission = hcCaseCalendar =>
    Promise.all([
      lichtuanService.getDetailLT({ caseMasterId: hcCaseCalendar.caseMasterId }),
      lichtuanService.findAllByHcCaseMasterId(hcCaseCalendar.id),
    ]).then(results => {
      let detail = results[0];
      let hcCaseMasterUser = results[1];
      return (
        detail.hcCaseCalendar.requestUserId === currentUserDeptRole.userId ||
        currentUserDeptRole.roleCode === ROLE_CODE.TONG_HOP_LICH_TUAN ||
        currentUserDeptRole.roleCode === ROLE_CODE.DANG_KY_LICH_TUAN ||
        currentUserDeptRole.deptId === detail.hcCaseCalendar.chairedUnitId ||
        (currentUserDeptRole.roleCode === ROLE_CODE.LANH_DAO &&
          (detail.hcCoopDepts.findIndex(dept => dept.cooperateDeptId === currentUserDeptRole.deptId) !== -1 ||
            detail.hcCaseCalendarUsers.findIndex(
              item => item.userId === currentUserDeptRole.userId
            ) !== -1)) ||
        !!hcCaseMasterUser
      );
    });

  const populateAcceptedRequests = () => {
    acceptedRequests.sort(
      (a, b) => a.hcCaseCalendarView?.startTime - b.hcCaseCalendarView.startTime
    );
    const acceptedRequestsTmp = _.uniqBy(acceptedRequests, obj => obj.hcCaseCalendarView.id);
    const temp = acceptedRequestsTmp.map(request => {
      const dateFormat = format(new Date(request.hcCaseCalendarView?.startTime), 'yyyy-MM-dd');
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
        startTimeTmp: format(new Date(request.hcCaseCalendarView?.startTime), 'HH:mm'),
        endTime: format(new Date(request.hcCaseCalendarView.endTime), 'MM/dd/yyyy HH:mm'),
        endTimeTmp: format(new Date(request.hcCaseCalendarView.endTime), 'HH:mm'),
        isDay: new Date(request.hcCaseCalendarView?.startTime).getHours() < currentHour,
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

  const onSelect = itemId => {
    changeHcFlow(itemId);
  };

  const HeaderTop = () => {
    return (
      <View style={[styles.btmHeader]}>
        <Text style={[styles.headerText, { color: colors.darkGray }]}>
          Chọn lịch tuần để đính kèm
        </Text>
        <View style={styles.timeWeek}>
          <View style={{ marginRight: 10 }}>
            <SelectBox hcFlows={hcFlows} currentHcFlow={currentHcFlow} onSelect={onSelect} />
          </View>
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
          <TouchableOpacity
            onPress={close}
            style={{
              marginLeft: 20,
              flexDirection : 'column',
              justifyContent : 'center'
            }}
          >
            <Icon
              name="closecircle"
              type="AntDesign"
              style={{ color: colors.gray, fontSize: 18 }}
            />
          </TouchableOpacity>
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
              rowNumber={1}
              key={item.id}
              item={item}
              currentHcFlow={currentHcFlow}
              actorsGroup={actorsGroup}
              openDetail={openDetail}
              onItemChoose={onItemChoose_}
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
  hcFlows: state.hcCalendar.hcFlows,
  actorsGroup: state.hcCalendar.actorsGroup,
  currentUserDeptRole: selectors.deptRoleSelector(state),
});

const mapDispatchToProps = {
  loadHcFlows: loadHcFlows,
  loadAcceptedRequests: loadAcceptedRequests,
  openDetail: openDetail,
  closeDetail: closeDetail,
  changeHcFlow: changeHcFlow,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCalendar);
