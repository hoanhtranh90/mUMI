import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, View, Linking, Alert } from 'react-native';
import { Icon, Text } from 'native-base';
import colors from '../../utils/colors';
import { selectors } from '../../store/auth';
import ModalShareCalendar from '../../screens/tablet/lichTuan/component/ModalShareCalendar';
import * as service from '../../store/administrative/lichTuan/detail/service';
import {
  ROLE_CODE,
  TCT_DEPT_ID,
  HDTV_DEPT_CODE,
  TCT_DEPT_CODE,
  TOGIUPVIEC_HDTV,
  POSITION_CODE,
} from 'eoffice/constants/administrative';
import NavigationService from '../../utils/NavigationService';
import { HC_CASE_CALENDAR } from '../../constants/administrative';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  routeBtn: {
    width: 87,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 32,
    width: 32,
    marginBottom: 8,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  currentRoute: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  currentLabel: {
    color: 'white',
  },
  banHanhImg: { position: 'relative' },
  checkView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: -6,
    bottom: 3,
    backgroundColor: colors.blue,
    padding: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  checkIcon: {
    color: 'white',
    fontSize: 8,
  },
});

const HcCalendarButton = ({ currentUserDeptRole, detail }) => {
  const [isOpenModalShare, setIsOpenModalShare] = useState(false);
  const [isCanUpload, setIsCanUpload] = useState(false);
  const [hcCaseCalendar, setHcCaseCalendar] = useState(null);
  const [isToShared, setIsToShared] = useState(false);
  const [ableToJoinMeeting, setAbleToJoinMeeting] = useState(false);

  const loadQuyTrinhDepartment = hcCaseCalendar => {
    return service.findDeptById(hcCaseCalendar.parentDeptId).then(response => response.data);
  };

  useEffect(
    () => {
      if (detail) {
        setHcCaseCalendar(detail.hcCaseCalendar);
        Promise.all([
          loadQuyTrinhDepartment(detail.hcCaseCalendar),
          service.findAllByHcCaseMasterId(detail.hcCaseCalendar.id),
        ]).then(results => {
          let quyTrinhDepartment = results[0];
          let hcCaseMasterUser = results[1];
          if (hcCaseMasterUser) setIsToShared(true);
          else setIsToShared(false);
          let isCanUpload =
            detail.hcCaseCalendar.requestUserId === currentUserDeptRole.userId ||
            currentUserDeptRole.roleCode === ROLE_CODE.TONG_HOP_LICH_TUAN ||
            currentUserDeptRole.roleCode === ROLE_CODE.DANG_KY_LICH_TUAN ||
            currentUserDeptRole.deptId === detail.hcCaseCalendar.chairedUnitId ||
            (currentUserDeptRole.roleCode === ROLE_CODE.LANH_DAO &&
              (detail.hcCoopDepts.findIndex(dept => dept.cooperateDeptId === currentUserDeptRole.deptId) !==
                -1 ||
                detail.hcCaseCalendarUsers.findIndex(
                  item => item.userId === currentUserDeptRole.userId
                ) !== -1)) ||
            !!hcCaseMasterUser;
          setIsCanUpload(isCanUpload);
          let isMeetingOnline =
            detail.hcCaseCalendar.status === 'HOANTHANH' &&
            detail.hcCaseCalendar &&
            (detail.hcCaseCalendar.meetingType === HC_CASE_CALENDAR.MEETING_TYPE.ONLINE ||
              detail.hcCaseCalendar.meetingType ===
                HC_CASE_CALENDAR.MEETING_TYPE.ONLINE_MOBIMEETING_CODINH);
          let isLanhdao =
            currentUserDeptRole.roleCode === ROLE_CODE.LANH_DAO &&
            (currentUserDeptRole.deptId === detail.hcCaseCalendar.parentDeptId ||
              //hdtv thi cung la lanhdao cua tct;
              (detail.hcCaseCalendar.parentDeptId === TCT_DEPT_ID &&
                currentUserDeptRole.deptCode === HDTV_DEPT_CODE) ||
              //neu la lanh dao cua don vi cha thi cung co quyen xem;
              quyTrinhDepartment.path.startsWith(currentUserDeptRole.deptPath + '/'));

          setAbleToJoinMeeting(
            isMeetingOnline &&
              (isCanUpload ||
                (currentUserDeptRole &&
                  (currentUserDeptRole.userName === 'cuong.tm' ||
                    currentUserDeptRole.userName === 'thangnm' ||
                    //thu ky ban tgd
                    (currentUserDeptRole.posCode === POSITION_CODE.THU_KY &&
                      currentUserDeptRole.deptCode === TCT_DEPT_CODE) ||
                    //to giup viec hoi dong thanh vien
                    (currentUserDeptRole.roleCode === ROLE_CODE.CHUYEN_VIEN &&
                      currentUserDeptRole.deptCode === TOGIUPVIEC_HDTV) ||
                    isLanhdao)))
          );
        });
      }
    },
    [detail, currentUserDeptRole]
  );

  const joinMeeting = async () => {
    try {
      const res = await service.joinRoom(hcCaseCalendar.id);
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

  return (
    <View style={styles.container}>
      <ModalShareCalendar
        isOpen={isOpenModalShare}
        close={() => setIsOpenModalShare(false)}
        detail={hcCaseCalendar}
      />
      {(isToShared || isCanUpload) && (
        <TouchableOpacity style={[styles.routeBtn]} onPress={() => setIsOpenModalShare(true)}>
          <Icon
            type="Feather"
            name="share-2"
            style={{ color: '#fff', fontSize: 26, marginBottom: 5 }}
          />
          <Text style={[styles.label]}>Chia sẻ</Text>
        </TouchableOpacity>
      )}
      {ableToJoinMeeting && (
        <TouchableOpacity style={[styles.routeBtn]} onPress={joinMeeting}>
          <Icon
            type="Feather"
            name="video"
            style={{ color: '#fff', fontSize: 26, marginBottom: 5 }}
          />
          <Text style={[styles.label]}>Tham gia họp</Text>
        </TouchableOpacity>
      )}
      {(isToShared || isCanUpload) && (
        <TouchableOpacity
          style={[styles.routeBtn]}
          onPress={() =>
            NavigationService.navigate('GhiChuLichTuan', { initCalendar: detail.hcCaseCalendar })
          }
        >
          <Icon
            type="Feather"
            name="feather"
            style={{ color: '#fff', fontSize: 26, marginBottom: 5 }}
          />
          <Text style={[styles.label]}>Ghi chú</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  detail: state.hcCalendar.hcCalendarDetail,
  currentUserDeptRole: selectors.deptRoleSelector(state),
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HcCalendarButton);
