import { connect } from 'react-redux';
import { selectors } from 'eoffice/store/administrative/summary';

import SearchForm from './SearchForm';

const mapStateToProps = state => ({
  query: selectors.querySelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm);
