import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/tasks/detail';
import ApproveCompletedTask from './ApproveCompletedTask';

const mapStateToProps = state => ({
  task: selectors.taskSelector(state),
});

const mapDispatchToProps = {
  approveCompletedTask: actions.approveCompletedTask,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApproveCompletedTask);
