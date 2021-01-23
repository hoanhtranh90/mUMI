import { connect } from 'react-redux';

import { selectors } from 'eoffice/store/auth';
import HistoryTree from './HistoryTree';

const mapStateToProps = state => ({
  currentUser: selectors.meSelector(state),
});

export default connect(mapStateToProps)(HistoryTree);
