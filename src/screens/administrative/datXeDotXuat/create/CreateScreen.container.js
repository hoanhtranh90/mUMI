import { connect } from 'react-redux';
import { actions } from 'eoffice/store/administrative/datXeDotXuat/create';
import CreateScreen from './CreateScreen';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  createDieuXeDX: actions.createDieuXeDX,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateScreen);
