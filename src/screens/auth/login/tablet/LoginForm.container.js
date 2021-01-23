import { connect } from 'react-redux';

import { actions } from 'eoffice/store/auth';
import LoginForm from './LoginForm';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  login: actions.login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
