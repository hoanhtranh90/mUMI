import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/documents/detail';
import DeviceInfo from 'react-native-device-info';
import { actions as docsActions } from 'eoffice/store/documents/list';
import Finishes from './Finishes';
import FinishesTablet from './tablet/Finishes';

const mapStateToProps = state => ({
  groupedHandlers: selectors.handlersByDeptSelector(state),
});

const mapDispatchToProps = {
  loadDetail: actions.loadDetail,
  loadHandlers: actions.listUsersHandlers,
  loadDepartments: actions.listDepartmentsHandlers,
  ketThucNhieuVBDen: actions.ketThucNhieuVBDen,
  resetDocuments: docsActions.resetDocuments,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceInfo.isTablet() ? FinishesTablet : Finishes);
