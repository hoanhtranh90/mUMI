import { connect } from 'react-redux';

import { selectors } from 'eoffice/store/tasks/detail';
import Header from './Header';

const mapStateToProps = state => ({
  task: selectors.taskSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
