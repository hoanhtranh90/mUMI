/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import {
  FlatList, RefreshControl, StyleSheet,
  TouchableOpacity, View, SafeAreaView, TextInput
} from 'react-native';
import {Icon, Spinner, Text, Container, Title, Content, Footer} from 'native-base';
import RequestItem from '../../summary/list/RequestItem';
import colors from 'eoffice/utils/colors';
import {ADMINISTRATIVE_TYPE, modes, STATE_CODE} from "../../../../constants/administrative";
import MenuFilters from "../tablet/MenuFilters";
import {getListRequest} from '../../../../store/administrative/veMayBay/detail/service'
import {styles} from "../tablet/StylesMayBay";
import IconButton from "eoffice/components/IconButton";
import CustomHeader from 'eoffice/components/CustomHeader';
import NavigationService from "../../../../utils/NavigationService";
import HomeButton from "../../../../components/HomeButton";
import RoundButton from "../../common/RoundButton";
import DeviceInfo from 'react-native-device-info'

const ListScreen = (
{
  getDetailRequest,
  listAvailableActions,
  getCurrentState,
  hcFlow,
  setIsDetail,
  searchKey,
  setDisplay,
  reloadData
}
) => {
  const [data, setData] = useState([])
  const [state, setState] = useState(modes[0].state)

  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [searchMobile, setSearchMobile] = useState('')
  const onRefresh = async () => {
    setRefresh(true)
    await refreshPage()
    setRefresh(false)
  };

  useEffect( () => {
    getListData()
  }, [state, page, searchKey, searchMobile]);

  function refreshPage() {
    if (page === 0) {
      getListData()
    } else {
      setPage(0)
    }
    setSearchMobile('')
  }

  useState(() => {
    refreshPage()
  },[reloadData])

  async function getListData() {
    setLoading(true)
    const query = {
      startTime: 1572022800000,
      endTime: new Date().getTime(),
      flowCode: 'VEMAYBAY',
      size: 10,
      sort: 'updateTime,desc',
      page: page,
      state: state,
      hcFlowId: hcFlow.id ? hcFlow.id : null,
      key: DeviceInfo.isTablet() ? searchKey : searchMobile
    }
    const response = await getListRequest(query)
    setLoading(false)
    response.length < 10 ? setHasMore(false) : setHasMore(true)
    if (page === 0) {
      setData(response)
    } else {
      setData(val => {
        return [
          ...val,
          ...response
        ]
      })
    }
  }

  function nextPage() {
    setPage(page + 1)
  }

  async function onPressItem(item) {
    const caseMasterId = item.caseMasterId
    const display = {
      state: item.state,
      status: item.status
    }
    const result = await Promise.all([
      getDetailRequest({ caseMasterId }),
      listAvailableActions({ caseMasterId }),
      getCurrentState({ caseMasterId }),
    ])
    if (result) {
      NavigationService.navigate('DetailVeMayBay', {
        caseMasterId, display
      })
    }
    setDisplay(display)
    setIsDetail(true)
  }

  function setStateForQuery(state) {
    setState(state)
    setPage(0)
  }

  return (
    <View style={{padding: 10, flex: 1, backgroundColor: 'white'}}>
      {DeviceInfo.isTablet() ? null : <CustomHeader
        Left={<HomeButton />}
        Content={<Title style={styles.titleStyleContent}>Đặt vé máy bay</Title>}
        Right={
            <View style={styles.row}>
              <TextInput
                style={styles.txtTime}
                placeholder="Tìm kiếm"
                onChangeText={ key => {
                  setPage(0)
                  setSearchMobile(key)
                }}
                value={searchMobile}
              />
              <Icon name="search" style={styles.icon} />
            </View>
        }
        hasBorder
      />}
          <MenuFilters setStateForQuery={setStateForQuery}></MenuFilters>
          <FlatList
            refreshing={refresh}
            onRefresh={onRefresh}
            style={{ flexGrow: 1 }}
            data={data}
            renderItem={item => (
              <RequestItem
                request={item}
                onPress={ () =>  {
                  onPressItem(item.item)
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
      {!DeviceInfo.isTablet() && hcFlow && hcFlow.id && <TouchableOpacity style={styles.btmBtn}>
        <RoundButton
          icon="plus-circle"
          title="Thêm mới"
          color="#007aff"
          titleColor="white"
          onPress={() => NavigationService.navigate('Create')}
        />
      </TouchableOpacity>}
    </View>
  );
};

export default ListScreen;
