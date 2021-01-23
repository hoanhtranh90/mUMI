import { connect } from 'react-redux';

import { selectors as authSelectors } from 'eoffice/store/auth';
import { selectors as detailSelectors, actions } from 'eoffice/store/documents/detail';
import {
  selectors as listSelectors,
  actions as actionsSelectors,
} from 'eoffice/store/documents/list';
import Header from './Header';

const mapStateToProps = state => ({
  document: detailSelectors.documentSelector(state),
  mode: listSelectors.modeSelector(state),
  pagesNumberOfDoc: detailSelectors.pagesNumberOfDocSelector(state),
  canCCVanBan: detailSelectors.canCCVanBan(state),
  canChuyenXuLy: detailSelectors.canChuyenXuLySelector(state),
  canChuyenXuLyDonvi: detailSelectors.canChuyenXuLyDonviSelector(state),
  canKetThuc: detailSelectors.canKetThucSelector(state),
  canTuChoi: detailSelectors.canTuChoiSelector(state),
  canThuHoi: detailSelectors.canThuHoiSelector(state),
  deptRole: authSelectors.deptRoleSelector(state),
  user: authSelectors.meSelector(state),
});

const mapDispatchToProps = {
  action: actions.tuChoi,
  resetDocuments: actionsSelectors.resetDocuments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
