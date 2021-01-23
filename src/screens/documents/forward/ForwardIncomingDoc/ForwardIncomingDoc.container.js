import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/documents/detail';
import DeviceInfo from 'react-native-device-info';
import { actions as docsActions } from 'eoffice/store/documents/list';
import ForwardIncomingDoc from './ForwardIncomingDoc';
import ForwardIncomingDocTablet from './tablet/FowardIncomingDoc';

const mapStateToProps = state => ({
  departments: selectors.handlerDeptsSelector(state),
  canChuyenXuLy: selectors.canChuyenXuLySelector(state),
  groupedHandlers: selectors.handlersByDeptSelector(state),
  canChuyenXuLyDonvi: selectors.canChuyenXuLyDonviSelector(state),
  groups: selectors.groupsSelector(state),
});

const mapDispatchToProps = {
  loadHandlers: actions.listUserHandlers,
  loadGroups: actions.listGroupsHandlers,
  chuyenXuLy: actions.chuyenXuLyVbDen,
  chuyenTiep: actions.chuyenXuLyDonVi,
  loadDepartments: actions.listDepartmentHandlers,
  resetDocuments: docsActions.resetDocuments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceInfo.isTablet() ? ForwardIncomingDocTablet : ForwardIncomingDoc);
