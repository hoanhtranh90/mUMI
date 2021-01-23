// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';
import { actions, selectors } from '../../../../store/administrative/theoDoiChiDaoLanhDao';
import Requests from './Requests';

const mapStateToProps = state => ({
  query: selectors.querySelector(state),
  loading: selectors.isLoadingSelector(state),
  hasMore: selectors.hasMoreSelector(state),
  lstRequest : selectors.requestsSelector(state),
  itemDetail : selectors.itemDetailSelector(state),
});

const mapDispatchToProps = {
  nextPage: actions.nextPage,
  refreshPage: actions.refreshPage,
  listRequests: actions.listRequests,
  searchRequests: actions.searchRequests,
  setItemDetail: actions.setItemDetail,
  setViewDetail: actions.setViewDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Requests);
