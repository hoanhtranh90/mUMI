import { connect } from 'react-redux';

import { selectors } from 'eoffice/store/documents/list';
import ListHeader from './ListHeader';

const mapStateToProps = state => ({
  total: selectors.totalSelector(state),
  unreadReleased: selectors.unreadReleasedSelector(state),
  countToTrinh: selectors.countToTrinhSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListHeader);
