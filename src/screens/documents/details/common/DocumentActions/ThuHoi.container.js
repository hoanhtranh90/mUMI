import { connect } from 'react-redux';
import { selectors as documentsSelectors } from 'eoffice/store/documents/list';
import { actions, selectors } from 'eoffice/store/documents/detail';
import ThuHoi from './ThuHoi';
import { selectors as detailSelectors } from 'eoffice/store/documents/detail';
import { actions as actionsSelectors } from 'eoffice/store/documents/list';

const mapStateToProps = state => ({
  canThuHoiProcess: selectors.canThuHoiProcessSelector(state),
  mode: documentsSelectors.modeSelector(state),
  vbProcess: selectors.processSelector(state),
  document: detailSelectors.documentSelector(state),
});

const mapDispatchToProps = {
  thuHoi: actions.thuHoi,
  resetDocuments: actionsSelectors.resetDocuments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThuHoi);
