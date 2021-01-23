import { connect } from 'react-redux';
import { actions as documentActions } from 'eoffice/store/documents/notification';

import { selectors } from '../../store/auth';

import Header from './Header';

const mapStateToProps = state => ({
  user: selectors.meSelector(state),
  notificationByRole: selectors.notificationByRole(state),
});

const mapDispatchToProps = {
  getNotifications: documentActions.getNotifications,
  refreshNotifications: documentActions.resetNotifications,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
