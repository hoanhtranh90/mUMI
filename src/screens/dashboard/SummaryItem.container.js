import { connect } from 'react-redux';
import { actions } from 'eoffice/store/documents/list';
import { actions as authActions } from 'eoffice/store/auth';
import { selectors } from '../../store/auth';

import SummaryItem from './SummaryItem';

const mapStateToProps = state => ({
  roleId: selectors.getRoleId(state),
});

export default connect(
  mapStateToProps,
  {
    resetDocuments: actions.resetDocuments,
    getMenuConfig: authActions.getMenuConfig,
  }
)(SummaryItem);
