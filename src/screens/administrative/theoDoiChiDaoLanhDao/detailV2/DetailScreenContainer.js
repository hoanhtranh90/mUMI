import { connect } from 'react-redux';
import { actions, selectors } from '../../../../store/administrative/theoDoiChiDaoLanhDao';
import DetailScreen from "./DetailScreen";

const mapStateToProps = state => ({
  listLD: selectors.lanhDaoSelector(state),
  listChuTriPhoiHop: selectors.listChuTriPhoiHopSelector(state),
  listChuTri: selectors.listChuTriSelector(state),
  listPhoiHop: selectors.listPhoiHopSelector(state),
  hcCaseCommands: selectors.hcCaseCommandsSelector(state),
  userDeptRole: selectors.userDeptRoleSelector(state),
  donViThucHienDept: selectors.donViThucHienDeptSelector(state),
});

const mapDispatchToProps = {
  findAllLanhDao: actions.findAllLanhDao,
  findChuTriPhoiHop: actions.findChuTriPhoiHop,
  findEachChuTriPhoiHop: actions.findEachChuTriPhoiHop,
  getHcCaseCommands: actions.getHcCaseCommands,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailScreen);
