import { connect } from 'react-redux';
import { selectors } from 'eoffice/store/administrative/chiDaoLanhDao';
import { selectors as summarySelectors } from 'eoffice/store/administrative/summary';
import CommandForm from './CommandForm';

const mapStateToProps = state => ({
  hcCaseCommand: selectors.detailStateSelector(state),
  actionList: summarySelectors.actionsSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandForm);
