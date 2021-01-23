import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/tasks/detail';
import ActionHistory from 'eoffice/components/ActionHistory';

const mapStateToProps = state => ({
  history: selectors.actionHistorySelector(state),
});

const mapDispatchToProps = {
  loadHistory: actions.loadActionHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionHistory);
