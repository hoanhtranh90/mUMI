import { connect } from 'react-redux';

import { selectors } from 'eoffice/store/documents/detail';
import SelectedHandlers from './SelectedHandlers';

const mapStateToProps = (state, props) => ({
  handlers: selectors.handlerDeptsByIdsSelector(state, { ids: [...props.selected] }),
  handlerDepts: selectors.handlerDeptsByIdsSelector(state, { ids: [...props.selected] }),
});

export default connect(mapStateToProps)(SelectedHandlers);
