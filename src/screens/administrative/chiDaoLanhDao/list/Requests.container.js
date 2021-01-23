import { connect } from 'react-redux';
import { actions, selectors } from 'eoffice/store/administrative/chiDaoLanhDao';
import { actions as summaryActions } from 'eoffice/store/administrative/summary';
import Requests from './Requests';

export default connect(
  state => ({
    requests: selectors.requestsSelector(state),
    loading: selectors.isLoadingSelector(state),
    hasMore: selectors.hasMoreSelector(state),
  }),
  (dispatch, ownProps) => ({
    listRequests: isFirst => {
      if (!isFirst) {
        dispatch(actions.nextPage());
      }

      return dispatch(actions.listRequests());
    },
    reloadRequests: () => {
      dispatch(actions.reset());
      dispatch(actions.listRequests());
    },
    onRequestPressed: async request => {
      const { caseMasterId } = request.item;
      await Promise.all([
        dispatch(actions.getDetailChiDao({ caseMasterId })),
        dispatch(summaryActions.listAvailableActions({ caseMasterId })),
      ]);

      return ownProps.onRequestPressed(caseMasterId);
    },
  })
)(Requests);
