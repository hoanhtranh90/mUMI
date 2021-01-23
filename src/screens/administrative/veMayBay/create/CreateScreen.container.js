import { connect } from 'react-redux';
import { actions } from 'eoffice/store/administrative/veMayBay/create';
import CreateScreen from './CreateScreen';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  createVeMayBay: actions.createVeMayBay,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateScreen);
