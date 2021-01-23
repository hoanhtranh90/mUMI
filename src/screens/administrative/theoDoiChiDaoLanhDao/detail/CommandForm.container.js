// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';
import { selectors, actions } from 'eoffice/store/administrative/theoDoiChiDaoLanhDao';
import { selectors as summarySelectors } from 'eoffice/store/administrative/summary';
import CommandForm from './CommandForm';

const mapStateToProps = state => ({
  hcCaseCommand: selectors.detailStateSelector(state),
  actionList: summarySelectors.actionsSelector(state),
  listUserLDDV: selectors.UserLDDVSelector(state),
  listUserCVDV: selectors.UserCVDVSelector(state),
  caseMasterIdState: selectors.caseMasterIdStateSelector(state),
});
const mapDispatchToProps = {
  ldDonViList: actions.listLDDonVi,
  listDVChuTri: actions.listDVChuTri,
  updateChiDao: actions.updateChiDao,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandForm);
