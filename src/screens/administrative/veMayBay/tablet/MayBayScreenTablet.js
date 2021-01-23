import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderTablet from "./HeaderTablet";
import ListScreen from "../list/ListScreen";
import { actions, selectors } from '../../../../store/administrative/summary';
import { actions as actionMB } from '../../../../store/administrative/veMayBay/detail';
import { selectors as selectorsMB } from '../../../../store/administrative/veMayBay/detail';
import { actions as createMB } from 'eoffice/store/administrative/veMayBay/create';
import { connect } from 'react-redux';
import CreateScreen from "./CreateScreen";
import DetailScreen from "./DetailScreen";
import ListScreenContainer from "../list/ListScreenContainer";

const MayBayScreenTablet = ({
  navigation,
  isCreate,
  setIsCreate,
  getPositionsUser,
  getAirportsUser,
  getDepartmentsUser,
  hcFlow,
  createVeMayBay,
  isDetail,
  setIsDetail,
  detail,
  actionList,
  executeVeMayBay,
  setSearchKey,
  display,
  reloadData
}) => {
  const [positionsUser, setPositionsUser] = useState({});
  const [departmentsUser, setDepartmentsUser] = useState({});
  const [airportsUser, setAirportsUser] = useState({});

  useEffect(() => {
    getPositionsList();
    getDepartmentsList();
    getAirportsList();
  },[])

  async function getPositionsList() {
    const positionsUserTmp = await getPositionsUser();
    setPositionsUser(positionsUserTmp?.positons);
  }
  async function getDepartmentsList() {
    const departmentsUserTmp = await getDepartmentsUser();
    setDepartmentsUser(departmentsUserTmp?.departments);
  }
  async function getAirportsList() {
    const airportsUserTmp = await getAirportsUser();
    setAirportsUser(airportsUserTmp?.airports);
  }

  return (
    <View style={styles.safeAreaView}>
      <HeaderTablet setIsCreate={setIsCreate} hcFlow={hcFlow} setSearchKey={setSearchKey}/>
      <View style={styles.container}>
        <View style={styles.listView}>
          <ListScreenContainer></ListScreenContainer>
        </View>
        {isCreate && <View style={styles.detailView}>
          <CreateScreen
            setIsCreate={setIsCreate}
            positionsUser={positionsUser}
            airportsUser={airportsUser}
            departmentsUser={departmentsUser}
            createVeMayBay={createVeMayBay}
            reloadData={reloadData}
          />
        </View>}
        {isDetail && <View style={styles.detailView}>
          <DetailScreen setIsDetail={setIsDetail}
                        detail={detail}
                        actionList={actionList}
                        display={display}
                        executeVeMayBay={executeVeMayBay}
          />
        </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    flexDirection: 'column',
  },
  container : {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  listView: {
    flex: 2,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  detailView: {
    flex: 5,
    borderLeftWidth: 0.5,
    borderLeftColor: '#ccc',
  },
  headerTxt: {
    fontSize: 20,
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#007aff',
  }
});


const mapStateToProps = state => ({
  hcFlow: selectors.hcFlowSelector(state),
  isCreate: selectorsMB.isCreateSelector(state),
  isDetail: selectorsMB.isDetailSelector(state),
  detail: selectorsMB.detailNewSelector(state),
  display: selectorsMB.displaySelector(state),
  reloadData: selectorsMB.reloadDataSelector(state),
  actionList: selectors.actionsSelector(state),
});

const mapDispatchToProps = {
  listRequests: actionMB.listRequests,
  setIsCreate: actionMB.setIsCreate,
  setIsDetail: actionMB.setIsDetail,
  getPositionsUser: actionMB.getPositionsUser,
  getAirportsUser: actionMB.getAirportsUser,
  getDepartmentsUser: actionMB.getDepartmentsUser,
  createVeMayBay: createMB.createVeMayBay,
  executeVeMayBay: actionMB.executeVeMayBay,
  setHcFlowId: actionMB.setHcFlowId,
  setSearchKey: actionMB.setSearchKey,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MayBayScreenTablet);
