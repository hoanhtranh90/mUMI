// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';
import { actions ,selectors } from 'eoffice/store/administrative/theoDoiChiDaoLanhDao';

import SearchForm from './SearchForm';

const mapStateToProps = state => ({
  query: selectors.querySelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm);
