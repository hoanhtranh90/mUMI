import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/documents/list';

import SearchHeader from './SearchHeader';

const mapStateToProps = state => ({
  query: selectors.querySelector(state),
});

const mapDispatchToProps = {
  resetDocuments: actions.resetDocuments,
  updateQuery: actions.updateQuery,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHeader);
