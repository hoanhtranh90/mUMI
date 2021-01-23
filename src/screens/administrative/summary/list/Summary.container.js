import { connect } from 'react-redux';
import { actions, selectors } from 'eoffice/store/administrative/summary';
import { selectors as selectorsAuth } from 'eoffice/store/auth';
import Summary from './Summary';

export default connect(
  state => ({
    mode: selectors.modeSelector(state),
    hcFlow: selectors.hcFlowSelector(state),
    userDeptRole: selectorsAuth.deptRoleSelector(state),
  }),
  dispatch => ({
    changeMode: params => dispatch(actions.changeMode(params)),
    changeModeLT: params => dispatch(actions.changeModeLT(params)),
  })
)(Summary);
