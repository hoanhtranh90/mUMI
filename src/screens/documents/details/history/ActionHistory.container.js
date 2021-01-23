import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/documents/detail';
import ActionHistory from 'eoffice/components/ActionHistory';
import { selectors as documentSelectors } from 'eoffice/store/documents/list';

const mapStateToProps = state => ({
  history: selectors.actionHistorySelector(state),
  pagesNumberOfDoc: selectors.pagesNumberOfDocSelector(state),
  mode: documentSelectors.modeSelector(state),
});

const mapDispatchToProps = {
  loadHistory: actions.loadActionHistory,
  reloadHistory: actions.reLoadActionHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionHistory);
