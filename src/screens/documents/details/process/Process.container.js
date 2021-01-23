import { connect } from 'react-redux';
import { actions, selectors } from 'eoffice/store/documents/detail';

import Process from './Process';

const mapStateToProps = state => ({
  history: selectors.historySelector(state),
});

const mapDispatchToProps = {
  loadDocumentHistory: actions.loadHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Process);
