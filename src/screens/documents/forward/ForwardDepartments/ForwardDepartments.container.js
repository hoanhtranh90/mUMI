import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/documents/detail';
import DeviceInfo from 'react-native-device-info';
import { actions as docsActions } from 'eoffice/store/documents/list';
import ForwardDepartments from './ForwardDepartments';
import ForwardDepartmentsTablet from './tablet/ForwardDepartments';

const mapStateToProps = state => ({
  departments: selectors.handlerDeptsSelector(state),
  canChuyenXuLy: selectors.canChuyenXuLySelector(state),
});

const mapDispatchToProps = {
  chuyenTiep: actions.chuyenXuLyDonVi,
  loadDepartments: actions.listDepartmentHandlers,
  resetDocuments: docsActions.resetDocuments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceInfo.isTablet() ? ForwardDepartmentsTablet : ForwardDepartments);
