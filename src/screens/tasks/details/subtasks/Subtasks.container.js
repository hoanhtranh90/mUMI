import { connect } from 'react-redux';
import { selectors as detailSelector, actions as detailActions } from 'eoffice/store/tasks/detail';
import { actions as listActions } from 'eoffice/store/tasks/list';
import NavigationService from 'eoffice/utils/NavigationService';
import Subtasks from './Subtasks';

const mapStateToProps = state => ({
  tasks: detailSelector.subtasksSelector(state),
});

const mapDispatchToProps = dispatch => ({
  listSubtasks: () => dispatch(detailActions.listSubtasks()),
  onTaskPress: task => {
    dispatch(listActions.viewDetail(task));
    NavigationService.navigate('Details', { taskId: task.id });
    NavigationService.navigate('Info');
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subtasks);
