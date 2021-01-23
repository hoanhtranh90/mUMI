import { connect } from 'react-redux';

import {
  actions as detailActions,
  selectors as detailSelectors,
} from 'eoffice/store/documents/detail';
import { actions as docsActions } from 'eoffice/store/documents/list';
import { actions, selectors } from 'eoffice/store/users';
import ForwardOutgoingDoc from './ForwardOutgoingDoc';

const mapStateToProps = state => ({
  handlers: selectors.userDeptRoleViewSelector(state),
  step: detailSelectors.stepSelector(state),
});

const mapDispatchToProps = {
  loadHandlers: actions.loadUserDeptRoleView,
  chuyenXuLy: detailActions.chuyenXuLyVbDi,
  resetDocuments: docsActions.resetDocuments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForwardOutgoingDoc);
