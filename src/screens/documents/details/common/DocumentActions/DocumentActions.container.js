import { connect } from 'react-redux';

import { selectors as detailSelectors } from 'eoffice/store/documents/detail';
import { selectors as documentSelectors } from 'eoffice/store/documents/list';
import { actions as detailActions } from 'eoffice/store/documents/detail';
import DocumentActions from './DocumentActions';
import { actions as actionsSelectors } from 'eoffice/store/documents/list';
import { canChoYKien } from '../../../../../store/documents/detail/selectors';

const mapStateToProps = state => ({
  canCCVanBan: detailSelectors.canCCVanBan(state),
  canChuyenXuLy: detailSelectors.canChuyenXuLySelector(state),
  canChuyenXuLyDonvi: detailSelectors.canChuyenXuLyDonviSelector(state),
  canKetThuc: detailSelectors.canKetThucSelector(state),
  canTuChoi: detailSelectors.canTuChoiSelector(state),
  canThuHoi: detailSelectors.canThuHoiSelector(state),
  canChoYKien: detailSelectors.canChoYKien(state),
  mode: documentSelectors.modeSelector(state),
  document: detailSelectors.documentSelector(state),
  process: detailSelectors.processSelector(state),
  step: detailSelectors.stepSelector(state),
  isViewAsUyQuyen: detailSelectors.processSelectorDelegateInfo(state),
});
const mapDispatchToProps = {
  focusCommentInput: detailActions.focusCommentInput,
  resetDocuments: actionsSelectors.resetDocuments,
};

export default connect(
  mapStateToProps,
  null
)(DocumentActions);
