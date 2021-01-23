import { connect } from 'react-redux';

import { selectors as authSelectors } from 'eoffice/store/auth';
import { selectors as detailSelectors } from 'eoffice/store/documents/detail';
import { selectors as listSelectors } from 'eoffice/store/documents/list';
import Info from './Info';

const mapStateToProps = state => ({
  document: detailSelectors.documentSelector(state),
  process: detailSelectors.processSelector(state),
  mode: listSelectors.modeSelector(state),
  canTuChoi: detailSelectors.canTuChoiSelector(state),
  deptRole: authSelectors.deptRoleSelector(state),
  vbDocUserBcc: detailSelectors.vbDocUserBccSelector(state),
  bccInfo: detailSelectors.bccInfoSelector(state),
  isAutoBcc: detailSelectors.isAutoBccSelector(state),
  isAutoBccDuThao: detailSelectors.isAutoBccDuThaoSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
