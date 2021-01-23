import { connect } from 'react-redux';
import { actions, selectors } from 'eoffice/store/documents/detail';
import CC from './CC';

const mapStateToProps = state => ({
  groupedHandlers: selectors.handlersByDeptCCSelector(state),
});

const mapDispatchToProps = {
  ccVanBan: actions.ccVanBan,
  loadHandlers: actions.listCCHandlers,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CC);
