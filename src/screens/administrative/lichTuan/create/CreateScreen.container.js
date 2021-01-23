import { connect } from 'react-redux';
import { actions } from 'eoffice/store/administrative/lichTuan/create';
import CreateScreen from './CreateScreen';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  createSchedule: actions.createSchedule,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateScreen);
