import { connect } from 'react-redux';

import { selectors } from 'eoffice/store/documents/detail';
import Header from './Header';

const mapStateToProps = state => ({
  document: selectors.documentSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
