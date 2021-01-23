import { connect } from 'react-redux';

import { actions, selectors } from '../../../store/tasks/list';
import ListHeading from './ListHeading';

const mapStateToProps = state => ({
  mode: selectors.modeSelector(state),
  query: selectors.querySelector(state),
});

const mapDispatchToProps = {
  setMode: actions.setMode,
  updateQuery: actions.updateQuery,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListHeading);
