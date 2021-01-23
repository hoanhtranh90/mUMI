/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Icon, Spinner, Text} from 'native-base';
import {listChiDaoNew} from '../../../../store/administrative/theoDoiChiDaoLanhDao/service';
import RequestItem from './RequestItem';
import NavigationService from "../../../../utils/NavigationService";
import colors from 'eoffice/utils/colors';
import DeviceInfo from 'react-native-device-info';
const Requests = ({
  hasMore,
  loading,
  query,
  nextPage,
  refreshPage,
  listRequests,
  lstRequest,
  setItemDetail,
  setViewDetail
}) => {
  const [refresh, setRefresh] = useState(false);

  const onRefresh = async () => {
    setRefresh(true)
    refreshPage()
    setRefresh(false)
  };

  useEffect( () => {
    listRequests()
  }, [query]);

  return (
    <View style={{flex: DeviceInfo.isTablet() ? 2 : 1}}>
      <FlatList
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
        style={{ flexGrow: 1 }}
        data={lstRequest}
        renderItem={item => (
          <RequestItem
            request={item}
            onPress={ () =>  {
              if (DeviceInfo.isTablet()) {
                setItemDetail(item)
                setViewDetail(true)
              } else {
                NavigationService.navigate('DetailTabs', {detail : item})
              }
            }}
            key={item.item.caseMasterId}
          />
        )}
        ListFooterComponent={<>{loading && <Spinner color="#044987" />}</>}
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
      {/*Button add*/}
      {/*<TouchableOpacity*/}
      {/*  style={{*/}
      {/*    padding: 10,*/}
      {/*    borderRadius: 100,*/}
      {/*    backgroundColor: colors.blue,*/}
      {/*    position: 'absolute',*/}
      {/*    right: 30,*/}
      {/*    bottom: 70,*/}
      {/*    shadowColor: '#5386ba',*/}
      {/*    shadowOffset: {*/}
      {/*      width: 0,*/}
      {/*      height: 9,*/}
      {/*    },*/}
      {/*    shadowOpacity: 0.5,*/}
      {/*    shadowRadius: 12.35,*/}

      {/*    elevation: 19,*/}
      {/*  }}*/}
      {/*  onPress={() => NavigationService.navigate('DetailTabs')}*/}
      {/*  <Icon name="plus" type="Feather" style={{ color: 'white' }} />*/}
      {/*</TouchableOpacity>*/}
    </View>
  );
};


Requests.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.shape({})),
  listRequests: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onRequestPressed: PropTypes.func,
  hasMore: PropTypes.bool.isRequired,
  reloadRequests: PropTypes.func,
};

Requests.defaultProps = {
  requests: [],
  loading: false,
  // onRequestPressed() {},
  // reloadRequests() {},
};

export default Requests;
