import { connect } from 'react-redux';
import { actions } from 'eoffice/store/tasks/list';

import SearchHeader from './SearchHeader';

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  updateQuery: actions.updateQuery,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHeader);
