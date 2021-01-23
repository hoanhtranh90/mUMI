import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/tasks/detail';
import ExtendTask from './ExtendTask';

const mapStateToProps = state => ({
  task: selectors.taskSelector(state),
});

const mapDispatchToProps = {
  extendTask: actions.extendTask,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtendTask);
