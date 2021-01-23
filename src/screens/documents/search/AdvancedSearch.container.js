import { connect } from 'react-redux';

import {
  actions as documentActions,
  selectors as documentSelectors,
} from 'eoffice/store/documents/list';
import { actions as userActions, selectors as userSelectors } from 'eoffice/store/users';
import AdvancedSearch from './AdvancedSearch';

const mapStateToProps = state => ({
  departments: userSelectors.departmentsSelector(state),
  mode: documentSelectors.modeSelector(state),
  query: documentSelectors.querySelector(state),
  priorities: documentSelectors.prioritiesSelector(state),
  categories: documentSelectors.categoriesSelector(state),
});

const mapDispatchToProps = {
  listDepartments: userActions.listDepartments,
  updateQuery: documentActions.updateQuery,
  listPriorities: documentActions.listPriorities,
  listCategories: documentActions.listCategories,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearch);
