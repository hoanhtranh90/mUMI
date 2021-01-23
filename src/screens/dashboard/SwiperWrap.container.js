import SwiperWrap from './SwiperWrap';
import { actions as authActions } from 'eoffice/store/auth';
import { selectors } from '../../store/auth';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  currentUserDeptRole : selectors.deptRoleSelector(state),
  changeDeptRole : selectors.changeDeptRoleSelector(state),
  deptRoles : selectors.deptRolesSelector(state)
})

const mapDispatchToProps = {
  changeUserDeptRole : authActions.changeDeptRoleSwiper
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwiperWrap);
