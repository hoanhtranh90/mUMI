import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/tasks/detail';
import Info from './Info';

const mapStateToProps = state => ({
  canUpdateProgress: selectors.canUpdateProgressSelector(state),
  task: selectors.taskSelector(state),
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
