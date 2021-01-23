/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import { Card, CardItem, Text, View } from 'native-base';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import {getChangeLog} from "./GetChangeLog";
import colors from "../../../../utils/colors";
import ReactNativeModal from "react-native-modal";
import DeviceInfo from "react-native-device-info";
import variables from 'eoffice/native-base-theme/variables/commonColor';
import {CHI_DAO, PROCESS_TYPE_TEXTS} from "../../../../constants/documents";
import {getChangeLogReportSuccess} from "./GetChangeLogReportSuccess";


const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: DeviceInfo.isTablet() ? variables.deviceWidth / 2 : variables.deviceWidth * 2/3,
    height: variables.deviceHeight / 2,
  },
  card: {
    marginTop: 50,
    paddingBottom: 15,
  },
  item: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  user: {
    paddingHorizontal: 8,
  },
  dept: {
    marginVertical: 8,
  },
  //Item Styles
  containerItem: {
    flexDirection: 'column'
  },
  text: { fontSize: 13, color: colors.gray, fontStyle: 'italic', marginTop: 5  },
  textBold: { fontSize: 13, fontWeight: 'bold'},
  textOld: { fontSize: 13 }
});

const ChangeLogItem = ({item}) => {
  return (
    <View style={styles.containerItem}>
      <Text style={styles.text}>Thuộc tính: <Text style={[styles.textBold,{color: '#000'}]}>{item.propertyLabel}</Text></Text>
      <Text style={styles.text}>Từ: <Text style={[styles.textOld,{color: colors.blue}]}>{item.oldValue}</Text></Text>
      <Text style={styles.text}>Đến: <Text style={[styles.textBold,{color: colors.blue}]}>{item.newValue}</Text></Text>
    </View>
  )
}

const ChangeLogModal = ({ isVisible, onClose, dataJson, actionName, listSector }) =>{
  const [data, setData] = useState([])
  useEffect(() => {
    populateValueChangeLogs()
  }, [dataJson])

  async function populateValueChangeLogs() {
    let changeLogs = [];
    switch (actionName) {
      case CHI_DAO.BAO_CAO_TIEN_DO:
      case CHI_DAO.BAO_CAO_HOAN_THANH:
      case CHI_DAO.BAO_TRUNG_CHI_DAO:
        changeLogs = await getChangeLogReportSuccess(dataJson)
        break
      default:
        changeLogs = await getChangeLog(dataJson, listSector)
        break
    }
    if (changeLogs.length > 0) {
      setData(changeLogs)
    }
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} onBackButtonPress={onClose}>
      <Card style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CardItem header>
            <Text>Danh sách thay đổi</Text>
          </CardItem>
          <CardItem button onPress={onClose}>
            <Text style={{ textAlign: 'right', color: 'red' }}>Đóng</Text>
          </CardItem>
        </View>
        <View style={{ height: 1, backgroundColor: colors.lighterGray, margin: 10 }}/>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: colors.lighterGray, margin: 10}} />
          )}
          renderItem={({ index, item }) => (
            <CardItem style={styles.item} key={index.toString()}>
              <ChangeLogItem item={item}></ChangeLogItem>
            </CardItem>
          )}
          ListEmptyComponent={
            <Text style={{ fontSize: 16, color: colors.gray, fontStyle: 'italic', textAlign: 'center' }}>
              Không có dữ liệu
            </Text>
          }
        />
      </Card>
    </Modal>
  );
}

export default ChangeLogModal;
