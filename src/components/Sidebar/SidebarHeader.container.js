import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/auth';
import SidebarHeader from './SidebarHeader';

const mapStateToProps = state => ({
  deptRole: selectors.deptRoleSelector(state),
  deptRoles: selectors.deptRolesSelector(state),
  user: selectors.meSelector(state),
});

const mapDispatchToProps = {
  changeDeptRole: actions.changeDeptRole,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarHeader);
