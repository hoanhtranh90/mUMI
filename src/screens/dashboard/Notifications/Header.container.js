import { connect } from 'react-redux';
import { selectors as authSelectors } from 'eoffice/store/auth';
import { selectors as notiSelectors } from 'eoffice/store/documents/notification';
import Header from './Header';

const mapStateToProps = state => ({
  selectedDeptRole: authSelectors.deptRoleSelector(state),
  notifications: notiSelectors.listNotificationsSelector(state),
});
const mapDispatchToProps = null;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
