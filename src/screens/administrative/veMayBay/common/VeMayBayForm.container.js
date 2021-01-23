import { connect } from 'react-redux';
import { selectors, actions } from 'eoffice/store/administrative/veMayBay/detail';
import { selectors as summarySelectors } from 'eoffice/store/administrative/summary';
import VeMayBayForm from './VeMayBayForm';

const mapStateToProps = state => ({
  hcCaseFlight: selectors.hcCaseFlightSelector(state),
  hcCaseFlightRouteUser: selectors.hcCaseFlightRouteUserSelector(state),
  hcCaseFileTickets: selectors.hcCaseFileTicketsSelector(state),
  hcCaseFlightFiles: selectors.hcCaseFlightFilesSelector(state),
  positionsUser: selectors.positionsSelector(state),
  currentListCarAndDriver: selectors.currentListCarAndDriverSelector(state),
  actionList: summarySelectors.actionsSelector(state),
  currentState: summarySelectors.currentStateSelector(state),
  mode: summarySelectors.modeSelector(state),
});
const mapDispatchToProps = {
  listFreeCars: actions.listFreeCars,
  listDrivers: actions.listDrivers,
  getPositionsUser: actions.getPositionsUser,
  getAirportsUser: actions.getAirportsUser,
  getDepartmentsUser: actions.getDepartmentsUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VeMayBayForm);
