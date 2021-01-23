/* eslint-disable import/no-extraneous-dependencies */
import { connect } from 'react-redux';
import { actions } from 'eoffice/store/administrative/theoDoiChiDaoLanhDao';
import NavigationService from 'eoffice/utils/NavigationService';
import ListHeader from './ListHeader';

export default connect(
  () => ({}),
  dispatch => ({
    onSearchPressed: async () => {
      // await Promise.all([dispatch(actions.listLDDonVi()), dispatch(actions.listDVChuTri())]);
      NavigationService.navigate('Search');
    },
  }),
)(ListHeader);
