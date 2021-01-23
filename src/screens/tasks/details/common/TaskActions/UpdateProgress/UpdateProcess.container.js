import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/tasks/detail';
import UpdateProgress from './UpdateProcess';

const mapDispatchToProps = {
  updateProgress: actions.updateProgress,
};

const mapStateToProps = state => ({
  task: selectors.taskSelector(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProgress);
