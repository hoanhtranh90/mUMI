/* eslint-disable global-require,import/no-unresolved, react/prop-types */

import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {Container, Content, Text} from 'native-base';

import { tabStyles } from 'eoffice/utils/tabBarOptions';
import Header from '../detail/DetailHeader';
import * as service from '../../../../store/administrative/theoDoiChiDaoLanhDao/service';
import colors from "../../../../utils/colors";
import IconField from "../../common/IconField";
import HistoryItem from "../historyAction/HistoryItem";
import {selectors} from "../../../../store/administrative/theoDoiChiDaoLanhDao";
import {connect} from "react-redux";

const HistoryScreen = ({ navigation, itemDetail, listSector }) => {
  const [history, setHistory] = useState([])
  useEffect(() => {
    const data = navigation.getParam('detail')
    if (data && data.item) {
      getHistory(data.item)
    }else {
      if (itemDetail) {
        getHistory(itemDetail)
      }
    }
  },[itemDetail])

  async function getHistory(item) {
    const historyAction = await service.getHistoryAction(item.id, item.hcCaseCommandsCommonId)
    setHistory(historyAction)
  }

  return (
    <Container>
      <Header navigation={navigation}/>
      <FlatList
        style={{flex: 1, margin: 16}}
        data={history}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <HistoryItem item={item} listSector={listSector}/>}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={
          <Text style={{ fontSize: 16, color: colors.gray, fontStyle: 'italic', textAlign: 'center' }}>
            Không có lịch sử tác động
          </Text>
        }
      />
    </Container>
  )
};

HistoryScreen.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Image
      style={tabStyles.icon}
      resizeMode="contain"
      source={
        focused ? require('eoffice/assets/comment.png') : require('eoffice/assets/comment-gray.png')
      }
    />
  ),
  tabBarOnPress: ({ navigation }) => navigation.navigate('HistoryScreen'),
};

const styles = StyleSheet.create({
  listWrapper: {
    paddingBottom: 15,
  },
  headerTxt: {
    fontSize: 19,
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 15,
    color: '#084386',
  },
});

const mapStateToProps = state => ({
  itemDetail : selectors.itemDetailSelector(state),
  listSector: selectors.listSectorSelector(state),
});


export default connect(
  mapStateToProps,
  null
)(HistoryScreen);

