/* eslint-disable import/no-extraneous-dependencies */
import createOperation from 'eoffice/store/createOperation';
import { Toast } from 'native-base';
import { Alert } from 'react-native';
import slice from './slice';
import * as requestsService from './service';
import {querySelector, listChuTriPhoiHopSelector, itemDetailSelector} from './selectors';
import { deptRoleSelector } from '../../auth/selectors';
import * as service from "./service";
import * as h from "../../../utils/h";
import {HC_CASE_COMMANDS_USER} from "../../../constants/common";
import {getHcCommandSectorName} from "../../../utils/utils";

const { actions } = slice;

export const listRequests = createOperation({
  actions: {
    startAction: actions.listStart,
    successAction: actions.listSuccess,
    failedAction: actions.listError,
  },
  process({ getState }) {
    const state = getState();
    const query = querySelector(state);

    const params = {
      ...query,
    };
    return requestsService.listChiDaoNew(params);
  },
});


export const getDetailChiDao = createOperation({
  actions: {
    successAction: actions.getDetailChiDaoSuccess,
  },
  async process({ payload }) {
    const caseMasterId = payload;
    return requestsService.findByCaseMasterId(caseMasterId);
  },
});

export const findAllLanhDao = createOperation({
  actions: {
    successAction: actions.listLDDVSuccess,
  },
  async process({ payload }) {
    let deptId = 'TTCNTT-TCT';
    if (payload.item && payload.item.parentDeptId) {
      deptId = payload.item.parentDeptId
    }
    return requestsService.getListHcCommands(deptId);
  },
});

export const findChuTriPhoiHop = createOperation({
  actions: {
    successAction: actions.listChuTriPhoiHopSuccess,
  },
  async process({ payload }) {
    let deptId = 'TTCNTT-TCT';
    if (payload.item && payload.item.parentDeptId) {
      deptId = payload.item.parentDeptId
    }
    return service.getListHcCaseCommands(deptId);
  },
});

export const findAllSector = createOperation({
  actions: {
    successAction: actions.findAllSectorSuccess,
  },
  async process() {
    let groupCode = 'hcCommand.sector';
    const sectorCategories = await service.findAllSectorByGroupCode(groupCode)
    if (sectorCategories.length > 0) {
      const result = await sectorCategories.map(function(obj) {
        return {
          value: obj.categoryCode,
          label: obj.categoryName,
        }
      });
      return result
    } else {
      return []
    }
  },
});

export const setItemDetail = createOperation({
  process: ({ dispatch, payload }) => {
     dispatch(actions.setItem(payload.item));
   },
})

export const setViewDetail = createOperation({
  process: ({ dispatch, payload }) => {
    dispatch(actions.setViewDetail(payload));
  },
})

export const getHcCaseCommands = createOperation({
  actions: {
    successAction: actions.getHcCaseCommandsSuccess,
  },
  async process({ payload }) {
    if (payload.item && payload.item.caseMasterId) {
      const hcCaseCommands = await service.findByCaseMasterId(payload.item.caseMasterId);
      let phuTrachCap1UserDeptRole = null
      let phuTrachCap2UserDeptRole = null
      let donViThucHienDept = null
      if (hcCaseCommands ) {
        if ( hcCaseCommands.id ) {
          const dataUserDeptRole = await service.findByHcCaseCommandsId(hcCaseCommands.id)
          if (dataUserDeptRole) {
            let phuTrachCap1 = h.find(
              dataUserDeptRole,
              hcCaseCommandsUser =>
                hcCaseCommandsUser.type ===
                HC_CASE_COMMANDS_USER.TYPE.PHU_TRACH_CAP1
            );
            let phuTrachCap2 = h.find(
              dataUserDeptRole,
              hcCaseCommandsUser =>
                hcCaseCommandsUser.type ===
                HC_CASE_COMMANDS_USER.TYPE.PHU_TRACH_CAP2
            )
            if (phuTrachCap1 && phuTrachCap1.userId) {
              phuTrachCap1UserDeptRole = await service.findUserDeptRoleViewByID(phuTrachCap1.userId)
            }
            if (phuTrachCap2 && phuTrachCap2.userId) {
              phuTrachCap2UserDeptRole = await service.findUserDeptRoleViewByID(phuTrachCap2.userId)
            }
          }
        }
        if (hcCaseCommands.deptId) {
          donViThucHienDept = await service.findDeptByID(hcCaseCommands.deptId)
        }
      }
      return {hcCaseCommands, phuTrachCap1UserDeptRole, phuTrachCap2UserDeptRole, donViThucHienDept }
    } else {
      return null
    }
  },
});

export const findEachChuTriPhoiHop = createOperation({
  actions: {
    successAction: actions.findEachChuTriPhoiHopSuccess,
  },
  async process({ getState ,payload }) {
    const state = getState();
    const listChuTriPhoiHop = listChuTriPhoiHopSelector(state);
    if (payload.item && payload.item.hcCaseCommandsCommonId) {
      const lst = await service.getListPhoiHopChuTri(payload.item.hcCaseCommandsCommonId)
      if (lst.length > 0) {
        let chuTri = [];
        let phoiHop = [];
        lst.forEach(item => {
          if (item.processType === 'phoiHop') {
            const ph = listChuTriPhoiHop.find(obj => obj.id === item.deptId)
            if (ph) phoiHop.push(ph);
          } else {
            const ct = listChuTriPhoiHop.find(obj => obj.id === item.deptId)
            if (ct) chuTri.push(ct);
          }
        })
        return {chuTri, phoiHop};
      }
    }
  },
});

export const searchRequests = createOperation({
  process: ({ dispatch, payload, getState }) => {
    dispatch(actions.reset());
    const state = getState();
    const query = querySelector(state);
    if (payload.meeting) query.meeting = payload.meeting;
    if (payload.sector) query.sector = payload.sector.value;
    if (payload.conclusion) query.conclusion = payload.conclusion;
    if (payload.directiveId) query.directiveId = payload.directiveId.id;
    if (payload.performId) query.performId = payload.performId.id;
    if (payload.deptId) query.deptId = payload.deptId.id;
    if (payload.progress) query.progress = payload.progress.value;
    if (payload.commandsStatus) query.commandsStatus = payload.commandsStatus.value;
    if (payload.startTimeCommand) query.startTimeCommand = payload.startTimeCommand;
    if (payload.endTimeCommand) query.endTimeCommand = payload.endTimeCommand;
    if (payload.startTimeDeadline) query.startTimeDeadline = payload.startTimeDeadline.getTime();
    if (payload.endTimeDeadline) query.endTimeDeadline = payload.endTimeDeadline.getTime();
    if (payload.startTimeFinish) query.startTimeFinish = payload.startTimeFinish.getTime();
    if (payload.endTimeFinish) query.endTimeFinish = payload.endTimeFinish.getTime();

    // const params = {
    //   ...query,
    // };

    dispatch(actions.setQuery(query));

    dispatch(listRequests());
  },
});

export const updateChiDao = createOperation({
  process: async ({ dispatch, payload }) => {
    const params = {
      action: payload.actionCode,
      caseMasterId: payload.caseMasterId,
      directionContent: payload.directionContent,
    };
    try {
      await requestsService.updateForLD(params);
      dispatch(getDetailChiDao({ caseMasterId: payload.caseMasterId }));

      Toast.show({
        text: 'Gửi yêu cầu thành công',
        type: 'success',
        duration: 3000,
      });
    } catch (e) {
      Alert.alert('Thông báo', 'Gửi yêu cầu lỗi', [{ text: 'Đóng', style: 'destructive' }]);
    }
  },
});
