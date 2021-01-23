import { connect } from 'react-redux';
import { actions } from 'eoffice/store/administrative/phongHop/detail';
import { selectors } from 'eoffice/store/administrative/summary';
import DetailScreen from './DetailScreen';

const mapStateToProps = state => ({
  actionList: selectors.actionsSelector(state),
});

const mapDispatchToProps = {
  executeMeeting: actions.executeMeeting,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailScreen);
