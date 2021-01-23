import { connect } from 'react-redux';
import { actions } from 'eoffice/store/administrative/datXe/create';
import CreateScreen from './CreateScreen';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  createDieuXe: actions.createDieuXe,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateScreen);
