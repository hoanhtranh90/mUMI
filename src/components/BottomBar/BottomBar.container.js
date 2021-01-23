import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/auth';
import {
  selectors as documentSelectors,
  actions as actionsSelectors,
} from 'eoffice/store/documents/list';
import { actions as documentActions } from 'eoffice/store/documents/notification';
import BottomBar from './BottomBar';

const mapStateToProps = state => ({
  deptRole: selectors.deptRoleSelector(state),
  deptRoles: selectors.deptRolesSelector(state),
  notificationByRole: selectors.notificationByRole(state),
  documentMode: documentSelectors.modeSelector(state),
  isShowDetailHcCalendar: state.hcCalendar.isShowDetail,
});

const mapDispatchToProps = {
  changeDeptRole: actions.changeDeptRole,
  logout: actions.logout,
  resetDocuments: actionsSelectors.resetDocuments,
  getNotifications: documentActions.getNotifications,
  refreshNotifications: documentActions.resetNotifications,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomBar);
