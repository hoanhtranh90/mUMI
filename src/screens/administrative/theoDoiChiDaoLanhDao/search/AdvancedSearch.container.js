// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';

import { actions } from 'eoffice/store/administrative/theoDoiChiDaoLanhDao';
import AdvancedSearch from './AdvancedSearch';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  searchRequests: actions.searchRequests,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearch);
