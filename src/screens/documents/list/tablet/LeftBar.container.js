import { connect } from 'react-redux';

import { selectors, actions } from 'eoffice/store/documents/list';
import { selectors as authSelectors } from 'eoffice/store/auth';
import LeftBar from './LeftBar';

const mapStateToProps = state => ({
  mode: selectors.modeSelector(state),
  stats: selectors.summarySelector(state),
  countToTrinh: selectors.countToTrinhSelector(state),
  menuConfig: authSelectors.getListMenu(state),
});

const mapDispatchToProps = {
  getSummary: actions.getSummary,
  resetDocuments: actions.resetDocuments,
  setMode: actions.setMode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftBar);
