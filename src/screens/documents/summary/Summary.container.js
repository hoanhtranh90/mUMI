import { connect } from 'react-redux';
import { actions, selectors } from 'eoffice/store/documents/list';
import { selectors as authSelectors } from 'eoffice/store/auth';

import Summary from './Summary';

export default connect(
  state => ({
    mode: selectors.modeSelector(state),
    stats: selectors.summarySelector(state),
    countToTrinh: selectors.countToTrinhSelector(state),
    totalCT: selectors.totalCTSelector(state),
    totalNDB: selectors.totalNDBSelector(state),
    totalPH: selectors.totalPHSelector(state),
    menuConfig: authSelectors.getListMenu(state),
  }),
  {
    getSummary: actions.getSummary,
    getCountToTrinh: actions.getCountTTrinh,
    resetDocuments: actions.resetDocuments,
    setMode: actions.setMode,
  }
)(Summary);
