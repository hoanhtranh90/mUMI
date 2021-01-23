import { connect } from 'react-redux';
import { actions } from 'eoffice/store/administrative/datXe/detail';
import { selectors } from 'eoffice/store/administrative/summary';
import DetailScreen from './DetailScreen';

const mapStateToProps = state => ({
  actionList: selectors.actionsSelector(state),
});

const mapDispatchToProps = {
  executeDatXe: actions.executeDatXe,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailScreen);
