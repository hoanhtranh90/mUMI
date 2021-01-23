import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/auth';
import OtpForm from './OtpForm';

const mapStateToProps = (state) => ({
  user : selectors.getUser(state)
});

const mapDispatchToProps = {
  reGenerateOtp: actions.reGenerateOtp,
  validateOtp: actions.validateOtp,
  logout: actions.logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtpForm);
