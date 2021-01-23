import { connect } from 'react-redux';
import { selectors, actions } from 'eoffice/store/administrative/datXeDotXuat/detail';
import { selectors as summarySelectors } from 'eoffice/store/administrative/summary';
import CarForm from './CarForm';

const mapStateToProps = state => ({
  hcCaseDieuXe: selectors.hcCaseDieuXeSelector(state),
  currentListCarAndDriver: selectors.currentListCarAndDriverSelector(state),
  actionList: summarySelectors.actionsSelector(state),
});

const mapDispatchToProps = {
  listFreeCars: actions.listFreeCars,
  listDrivers: actions.listDrivers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarForm);
