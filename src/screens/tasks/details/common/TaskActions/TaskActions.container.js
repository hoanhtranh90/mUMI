import { connect } from 'react-redux';

import { actions, selectors } from 'eoffice/store/tasks/detail';
import TaskActions from './TaskActions';

const mapStateToProps = state => ({
  canCancel: selectors.canCancelSelector(state),
  canComplete: selectors.canCompleteSelector(state),
  canExtend: selectors.canExtendSelector(state),
  canPause: selectors.canPauseSelector(state),
  canProcessApply: selectors.canProcessApplySelector(state),
  canProcessComplete: selectors.canProcessCompleteSelector(state),
  canUpdateProgress: selectors.canUpdateProgressSelector(state),
});

const mapDispatchToProps = {
  approveTask: actions.approveTask,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskActions);
