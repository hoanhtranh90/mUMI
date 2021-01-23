import { connect } from 'react-redux';
import { actions, selectors } from 'eoffice/store/administrative/summary';

import AdvancedSearch from './AdvancedSearch';

const mapStateToProps = state => ({
  hcFlow: selectors.hcFlowSelector(state),
});

const mapDispatchToProps = {
  searchRequests: actions.searchRequests,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearch);
