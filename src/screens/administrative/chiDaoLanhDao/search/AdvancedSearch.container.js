import { connect } from 'react-redux';

import { actions } from 'eoffice/store/administrative/chiDaoLanhDao';
import AdvancedSearch from './AdvancedSearch';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  searchRequests: actions.searchRequests,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearch);
