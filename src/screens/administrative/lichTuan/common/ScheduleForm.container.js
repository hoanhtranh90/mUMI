import { connect } from 'react-redux';
import { selectors, actions } from 'eoffice/store/administrative/lichTuan/detail';
import { selectors as summarySelectors } from 'eoffice/store/administrative/summary';
import { selectors as authSelectors } from 'eoffice/store/auth';
import ScheduleForm from './ScheduleForm';

const mapStateToProps = state => ({
  detail: selectors.detailLTSelector(state),
  attachments: selectors.attachmentsSelector(state),
  detailLTLanhDao: selectors.detailLTLanhDao(state),
  roomSelected: selectors.selectedLTSelector(state),
  actionList: summarySelectors.actionsSelector(state),
  currentState: summarySelectors.currentStateSelector(state),
  mode: summarySelectors.modeSelector(state),
  detailDVPH: selectors.detailDVPHSelector(state),
  hcFlowsCanstart: summarySelectors.hcFlowsCanStartSelector(state),
  hcFlowsAvailable: summarySelectors.hcFlowsAvailableSelector(state),
  actorsGroup: summarySelectors.actorsGroupSelector(state),
  currentUserDeptRole: authSelectors.deptRoleSelector(state),
});

const mapDispatchToProps = {
  listFreeRooms: actions.listFreeRooms,
  listLanhDao: actions.listLanhDao,
  listDVPH: actions.listDVPH,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleForm);
