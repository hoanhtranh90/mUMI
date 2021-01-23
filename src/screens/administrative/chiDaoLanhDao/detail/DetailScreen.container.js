import { connect } from 'react-redux';
import { selectors as summarySelectors } from 'eoffice/store/administrative/summary';
import { selectors } from 'eoffice/store/administrative/chiDaoLanhDao';
import DetailScreen from './DetailScreen';

const mapStateToProps = state => ({
  actionList: summarySelectors.actionsSelector(state),
  hcCaseCommand: selectors.detailStateSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailScreen);
