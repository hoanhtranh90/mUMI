import { connect } from 'react-redux';

import { actions } from 'eoffice/store/tasks/detail';
import Footer from './Footer';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  addComment: actions.addComment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
