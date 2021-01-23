import { connect } from 'react-redux';
import { actions, selectors } from 'eoffice/store/tasks/list';
import NavigationService from 'eoffice/utils/NavigationService';
import Tasks from './Tasks';

const mapStateToProps = state => ({
  loading: selectors.isLoadingSelector(state),
  tasks: selectors.tasksSelector(state),
  total: selectors.totalSelector(state),
});

const mapDispatchToProps = dispatch => ({
  listTasks: () => dispatch(actions.listTasks()),
  refreshTasks: () => dispatch(actions.refreshTasks()),
  onTaskPress: task => {
    dispatch(actions.viewDetail(task));
    NavigationService.navigate('Details');
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
