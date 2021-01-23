import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  getBookHotelDetail,
  getListRequest,
  nextPage, refreshPage, setHcFlowId,
  setStateForQuery
} from '../../../../store/administrative/bookHotel/reducer';
import { Icon, Spinner, Button } from 'native-base';
import { connect } from 'react-redux';
import colors from '../../../../utils/colors';
import MenuFilters from "../../veMayBay/tablet/MenuFilters";
import RequestItem from "../../summary/list/RequestItem";
import {selectors} from "eoffice/store/administrative/summary";
import NavigationService from "../../../../utils/NavigationService";

const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: '#efeff4',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2b2d50',
  },
  desc: {
    color: 'gray',
    marginTop: 4,
  },
  icon: {
    fontSize: 12,
    color: '#abb4bd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    flex: 1,
  },
  wrapperStatus: {
    height: 24,
    borderRadius: 4,
    backgroundColor: 'rgba(240, 195, 48, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginRight: 10,
    flexDirection: 'row',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowDate: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 4,
    flex: 1,
    marginRight: 10,
  },
  date: {
    color: '#2b2d50',
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  btnAdd: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.blue,
    position: 'absolute',
    right: 30,
    bottom: 50,
    shadowColor: '#5386ba',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
});

const BookHotelList = ({
  query,
  listRequest,
  hasMore,
  nextPage,
  refreshPage,
  getListRequest,
  setStateForQuery,
  hcFlow,
  setHcFlowId,
  getBookHotelDetail,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    () => {
      setIsLoading(true);
      loadData();
      setIsLoading(false)
    },
    [query]
  );

  useEffect(() => {
    if (hcFlow && hcFlow.id) {
      setHcFlowId(hcFlow.id)
    }
  }, [hcFlow]);



  const loadData = () => {
    getListRequest()
  };

  const onRefresh = () => {
    setIsLoading(true);
    refreshPage()
    setIsLoading(false)
  };


  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15, paddingTop: 20 }}>
      <MenuFilters setStateForQuery={setStateForQuery}></MenuFilters>
      <FlatList
        refreshing={isLoading}
        onRefresh={onRefresh}
        style={{ flexGrow: 1 }}
        data={listRequest}
        renderItem={item => (
          <RequestItem
            request={item}
            onPress={ () =>  {
              getBookHotelDetail(item.item.caseMasterId)
            }}
            key={item.item.caseMasterId}
          />
        )}
        ListFooterComponent={<>{isLoading && <Spinner color="#044987" />}</>}
        keyExtractor={(item, key) => key.toString()}
        onEndReached={() => {
          if (hasMore) {
            nextPage()
          }
        }}
        onEndReachedThreshold={0.3}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        ListEmptyComponent={
          <Text style={{ fontSize: 16, color: colors.gray, fontStyle: 'italic', textAlign: 'center' }}>
            Không có dữ liệu
          </Text>
        }
       >
      </FlatList>
      {hcFlow && hcFlow.id && <TouchableOpacity style={styles.btnAdd} onPress={() => {
        NavigationService.navigate('BookHotelCreateEdit', {hcFlow})
      }}>
        <Icon name="plus" type="Feather" style={{ color: 'white' }} />
      </TouchableOpacity>}
    </View>
  );
};

const mapDispatchToProps = {
  setStateForQuery: setStateForQuery,
  nextPage: nextPage,
  getListRequest: getListRequest,
  refreshPage: refreshPage,
  setHcFlowId: setHcFlowId,
  getBookHotelDetail: getBookHotelDetail
};

const mapStateToProps = (state) => ({
  listRequest: state.bookHotel.listRequest,
  hasMore: state.bookHotel.hasMore,
  query: state.bookHotel.query,
  hcFlow: selectors.hcFlowSelector(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookHotelList);
