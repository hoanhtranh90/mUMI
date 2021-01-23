import { connect } from 'react-redux';
import { selectors, actions } from 'eoffice/store/administrative/phongHop/detail';
import { selectors as summarySelectors } from 'eoffice/store/administrative/summary';
import MeetingForm from './MeetingForm';

const mapStateToProps = state => ({
  detail: selectors.detailPHSelector(state),
  roomSelected: selectors.selectedPHSelector(state),
  actionList: summarySelectors.actionsSelector(state),
  currentState: summarySelectors.currentStateSelector(state),
  mode: summarySelectors.modeSelector(state),
});

const mapDispatchToProps = {
  listFreeRooms: actions.listFreeRooms,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeetingForm);
