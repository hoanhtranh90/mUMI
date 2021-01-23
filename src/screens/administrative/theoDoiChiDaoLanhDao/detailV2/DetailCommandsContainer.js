import { connect } from 'react-redux';
import { actions, selectors } from '../../../../store/administrative/theoDoiChiDaoLanhDao';
import DetailCommands from "./DetailCommands";

const mapStateToProps = state => ({
  listLD: selectors.lanhDaoSelector(state),
  listChuTriPhoiHop: selectors.listChuTriPhoiHopSelector(state),
  listChuTri: selectors.listChuTriSelector(state),
  listPhoiHop: selectors.listPhoiHopSelector(state),
  hcCaseCommands: selectors.hcCaseCommandsSelector(state),
  userDeptRole: selectors.userDeptRoleSelector(state),
  donViThucHienDept: selectors.donViThucHienDeptSelector(state),
  itemDetail : selectors.itemDetailSelector(state),
  listSector: selectors.listSectorSelector(state),
});

const mapDispatchToProps = {
  findAllLanhDao: actions.findAllLanhDao,
  findChuTriPhoiHop: actions.findChuTriPhoiHop,
  findEachChuTriPhoiHop: actions.findEachChuTriPhoiHop,
  getHcCaseCommands: actions.getHcCaseCommands,
  findAllSector: actions.findAllSector,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailCommands);
