import { connect } from 'react-redux';

import { actions as authActions, selectors as authSelectors } from 'eoffice/store/auth';
import { actions as docsActions } from 'eoffice/store/documents/list';
import Cards from './Cards';

const mapStateToProps = state => ({
  deptRoles: authSelectors.deptRolesSelector(state),
});

const mapDispatchToProps = {
  changeDeptRole: authActions.changeDeptRole,
  viewDocDetail: docsActions.viewDetail,
  resetDocuments: docsActions.resetDocuments,
  setMode: docsActions.setMode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards);
