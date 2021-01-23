import { connect } from 'react-redux';
import { selectors, actions } from 'eoffice/store/administrative/chiDaoLanhDao';

import CommandScreen from './CommandScreen';

const mapStateToProps = state => ({
  caseMasterId: selectors.caseMasterIdStateSelector(state),
});

const mapDispatchToProps = {
  updateChiDao: actions.updateChiDao,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandScreen);
