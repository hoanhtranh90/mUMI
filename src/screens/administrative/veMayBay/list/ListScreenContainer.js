import {actions as actionMB} from "eoffice/store/administrative/veMayBay/detail";
import {selectors as selectorsMB} from "eoffice/store/administrative/veMayBay/detail";

import {actions, selectors} from "eoffice/store/administrative/summary";
import {connect} from "react-redux";
import ListScreen from "./ListScreen";

const mapStateToProps = state => ({
  hcFlow: selectors.hcFlowSelector(state),
  searchKey: selectorsMB.searchKeySelector(state),
  reloadData: selectorsMB.reloadDataSelector(state),
});

const mapDispatchToProps = {
  getDetailRequest: actionMB.getDetailRequest,
  listAvailableActions: actions.listAvailableActions,
  getCurrentState: actions.getCurrentState,
  setIsDetail: actionMB.setIsDetail,
  setDisplay: actionMB.setDisplay,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListScreen);
