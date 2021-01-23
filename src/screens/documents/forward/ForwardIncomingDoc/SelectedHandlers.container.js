import { connect } from 'react-redux';

import { selectors } from 'eoffice/store/documents/detail';
import SelectedHandlers from './SelectedHandlers';

const mapStateToProps = (state, props) => ({
  handlers: selectors.handlersByIdsSelector(state, { ids: [...props.selected] }),
  handlerDepts: selectors.handlerDeptsByIdsSelector(state, { ids: [...props.selectedDept] }),
});

export default connect(mapStateToProps)(SelectedHandlers);
