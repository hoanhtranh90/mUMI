import { connect } from 'react-redux';

import { actions } from 'eoffice/store/tasks/detail';
import TaskAction from './TaskAction';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  action: actions.pauseTask,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskAction);
