import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/documents/list';
import DraftsHeading from './DraftsHeading';

const mapStateToProps = state => ({
  query: selectors.querySelector(state),
});

const mapDispatchToProps = {
  updateQuery: actions.updateQuery,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftsHeading);
