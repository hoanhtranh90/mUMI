import { connect } from 'react-redux';

import { selectors as taskSelectors, actions as taskActions } from 'eoffice/store/tasks/list';
import AdvanceSearch from './AdvancedSearch';

const mapStateToProps = state => ({
  mode: taskSelectors.modeSelector(state),
  query: taskSelectors.querySelector(state),
});

const mapDispatchToProps = {
  updateQuery: taskActions.updateQuery,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvanceSearch);
