import { connect } from 'react-redux';
import { selectors } from 'eoffice/store/administrative/chiDaoLanhDao';

import SearchForm from './SearchForm';

const mapStateToProps = state => ({
  query: selectors.querySelector(state),
  ldDonVi: selectors.ldDonViSelector(state),
  dvChuTri: selectors.dvChutriSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm);
