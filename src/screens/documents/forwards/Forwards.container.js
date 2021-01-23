import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/documents/detail';
import DeviceInfo from 'react-native-device-info';
import { actions as docsActions } from 'eoffice/store/documents/list';
import Forwards from './Forwards';
import ForwardsTablet from './tablet/Forwards';

const mapStateToProps = state => ({
  groupedHandlers: selectors.handlersByDeptSelector(state),
  departments: selectors.handlerDeptsSelector(state),
});

const mapDispatchToProps = {
  loadDetail: actions.loadDetail,
  loadHandlers: actions.listUsersHandlers,
  loadDepartments: actions.listDepartmentsHandlers,
  chuyenXuLyNhieuVbDen: actions.chuyenXuLyNhieuVbDen,
  resetDocuments: docsActions.resetDocuments,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceInfo.isTablet() ? ForwardsTablet : Forwards);
