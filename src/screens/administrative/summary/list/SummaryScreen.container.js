import { connect } from 'react-redux';
import { actions, selectors } from 'eoffice/store/administrative/summary';

import SummaryScreen from './SummaryScreen';

const mapStateToProps = state => ({
  hcFlow: selectors.hcFlowSelector(state),
});

const mapDispatchToProps = {
  getFlowsCanStart: actions.getFlowsCanStart,
  getFlowsAvailable: actions.getFlowsAvailable,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryScreen);
