import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import RequestsContainer from '../list/Requests.container'
import DetailTabs from "../DetailTabs";
import {selectors, actions} from "../../../../store/administrative/theoDoiChiDaoLanhDao";
import {connect} from "react-redux";
import HeaderTablet from "./HeaderTablet";
const ChiDaoScreenTablet = ({ navigation, viewDetail,
                              setItemDetail, setViewDetail,
                              itemDetail, findAllSector }) => {

  useEffect(() => {
    const data = navigation.getParam('detail')
    if (data && data.item) {
      setItemDetail(data.item)
      setViewDetail(true)
    }
    if (itemDetail) {
      setViewDetail(true)
    }
  },[])

  return (
    <View style={styles.safeAreaView}>
      <HeaderTablet/>
      <View style={styles.container}>
        <View style={styles.listView}>
          <RequestsContainer></RequestsContainer>
        </View>
        {viewDetail && <View style={styles.detailView}>
          <DetailTabs/>
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
    paddingHorizontal: 16
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
  itemDetail : selectors.itemDetailSelector(state),
  viewDetail: selectors.viewDetailSelector(state),
});

const mapDispatchToProps = {
  setItemDetail: actions.setItemDetail,
  setViewDetail: actions.setViewDetail,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChiDaoScreenTablet);
