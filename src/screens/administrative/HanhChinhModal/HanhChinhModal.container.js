/* eslint-disable import/no-extraneous-dependencies */
import _ from 'lodash';
import { connect } from 'react-redux';

import { actions } from 'eoffice/store/administrative/summary';
import NavigationService from 'eoffice/utils/NavigationService';
import { ADMINISTRATIVE_TYPE, FLOW_INFO } from 'eoffice/constants/administrative';
import { actions as authActions, selectors } from 'eoffice/store/auth';
import { actions as chiDaoActions } from 'eoffice/store/administrative/theoDoiChiDaoLanhDao';
import HanhChinhModal from './HanhChinhModal';
import DeviceInfo from 'react-native-device-info'

const mapStateToProps = state => ({
  menuHanhChinh: selectors.getMenuHanhChinh(state),
  roleId: selectors.getRoleId(state),
});

const mapDispatchToProps = dispatch => ({
  onModalItemPress: async item => {
      const hcFlow = await dispatch(actions.getFlowInfo(item.flowCode));
      console.log(hcFlow)
      if (!_.isNull(hcFlow) && !_.isUndefined(hcFlow.id)) {
        const itemTmp = {
          mode: ADMINISTRATIVE_TYPE.COMPLETE,
          flow: item.flowCode,
        };
        await dispatch(actions.changeModeLT(itemTmp));
      } else {
        const itemTmp = {
          mode: ADMINISTRATIVE_TYPE.PENDING,
          flow: item.flowCode,
        };
        await dispatch(actions.changeModeLT(itemTmp));
      }
      if (item.flowCode === FLOW_INFO.THEO_DOI_CHI_DAO_LANH_DAO) {
        await dispatch(chiDaoActions.reset())
        await dispatch(chiDaoActions.refreshPage())
        if (DeviceInfo.isTablet()) {
          NavigationService.navigate('ChiDaoScreenTablet')
        } else {
          NavigationService.navigate('TheoDoiChiDaoLanhDao');
        }
      } else if (item.flowCode === FLOW_INFO.VE_MAY_BAY){
        if (DeviceInfo.isTablet()) {
          NavigationService.navigate('MayBayScreenTablet')
        } else {
          NavigationService.navigate('ListScreenMayBay');
        }
      } else if (item.flowCode === FLOW_INFO.KHACH_SAN) {
        // NavigationService.navigate('BookHotel');
      } else {
        NavigationService.navigate('AdministrativeSummary');
      }
  },
  getMenuConfig: async roleId => {
    dispatch(authActions.getMenuConfig(roleId));
  },
  getMenuItemConfig: async roleId => {
    dispatch(authActions.getMenuItemConfig(roleId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HanhChinhModal);
