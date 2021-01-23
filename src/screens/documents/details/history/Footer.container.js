import { connect } from 'react-redux';

import { selectors as documentsSelectors } from 'eoffice/store/documents/list';
import {
  actions as detailActions,
  selectors as detailSelectors,
} from 'eoffice/store/documents/detail';
import Footer from './Footer';

const mapStateToProps = state => ({
  document: detailSelectors.documentSelector(state),
  mode: documentsSelectors.modeSelector(state),
  isFocus: detailSelectors.focusCommentSelector(state),
  bccInfo: detailSelectors.bccInfoSelector(state),
  isAutoBccDuThao: detailSelectors.isAutoBccDuThaoSelector(state),
});

const mapDispatchToProps = {
  addComment: detailActions.addComment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
