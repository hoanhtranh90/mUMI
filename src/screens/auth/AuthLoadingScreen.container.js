import { connect } from 'react-redux';

import { actions } from 'eoffice/store/auth';
import AuthLoadingScreen from './AuthLoadingScreen';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  fetchInfo: actions.fetchInfo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthLoadingScreen);
