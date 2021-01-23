// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';
import { selectors as summarySelectors } from 'eoffice/store/administrative/summary';
import { actions ,selectors } from 'eoffice/store/administrative/theoDoiChiDaoLanhDao';
import DetailScreen from './DetailScreen';

const mapStateToProps = state => ({
  actionList: summarySelectors.actionsSelector(state),
  hcCaseCommand: selectors.hcCaseCommandsSelector(state),});

const mapDispatchToProps = {
  refreshPage: actions.refreshPage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailScreen);
