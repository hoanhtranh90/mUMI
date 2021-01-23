import { connect } from 'react-redux';

import { selectors, actions } from 'eoffice/store/documents/list';
import LeftBar from './LeftBar';

const mapStateToProps = state => ({
  query: selectors.querySelector(state),
});

const mapDispatchToProps = {
  updateQuery: actions.updateQuery,
  getSummary: actions.getSummary,
  resetDocuments: actions.resetDocuments,
  setMode: actions.setMode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftBar);
