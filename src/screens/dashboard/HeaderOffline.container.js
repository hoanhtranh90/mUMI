import { connect } from 'react-redux';
import { actions as documentActions } from 'eoffice/store/documents/notification';
import { selectors } from '../../store/auth';
import HeaderOffline from './HeaderOffline';

const mapStateToProps = state => ({
  user: selectors.meSelector(state),
});

const mapDispatchToProps = () => ({
  getNotifications: documentActions.getNotifications,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderOffline);
