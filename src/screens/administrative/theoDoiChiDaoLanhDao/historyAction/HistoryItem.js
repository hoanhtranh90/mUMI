import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Avatar from 'eoffice/components/Avatar';
import colors from 'eoffice/utils/colors';
import HistoryItemHeader from "./HistoryItemHeader";
import { CHI_DAO } from "../../../../constants/documents";
import ReportAndUpdateAction from "./ReportAndUpdateAction";
import ExtendAction from "./ExtendAction";
import DeadlineAction from "./DeadlineAction";
import CreateAction from "./CreateAction";
import {Text} from "native-base";
import ChangeLogModal from "./ChangeLogModal";
import CommandsAction from "./CommandsAction";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  content: {
    marginLeft: 12,
    flex: 1,
    borderColor: '#dee5ed',
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderWidth: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  textComment: { fontSize: 14, lineHeight: 14 * 1.43 },
  view: {
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    backgroundColor: colors.lightGray,
    marginTop: 10,
  },
});

const Action = ({item}) => {
  const actionName = item.actionName
  switch (actionName) {
    case CHI_DAO.BAO_CAO_TIEN_DO:
    case CHI_DAO.CAP_NHAT:
    case CHI_DAO.BAO_TRUNG_CHI_DAO:
    case CHI_DAO.PHE_DUYET:
    case CHI_DAO.BAO_CAO_HOAN_THANH:
    case CHI_DAO.YEU_CAU_BO_SUNG:
    case CHI_DAO.HUY_YEU_CAU:
      return <ReportAndUpdateAction action={actionName}/>;
    case CHI_DAO.GIA_HAN:
      return <ExtendAction item={item}/>
    case CHI_DAO.DANG_KY_DEADLINE:
      return <DeadlineAction item={item}/>
    case CHI_DAO.TAO_MOI:
      return <CreateAction item={item}/>
    case CHI_DAO.CHO_Y_KIEN:
      return <CommandsAction item={item}/>
    default:
      return <View></View>
  }
}

const HistoryItem = ({ item, listSector }) => {
  const [isOpen, setOpenModal] = useState(false)

  const closeModal = () => {
    setOpenModal(false)
  }
  return (
    <View style={styles.container}>
      <Avatar name={item.creatorName} />
      <TouchableOpacity style={styles.content} onPress={() => {
        if (item.actionName === CHI_DAO.CAP_NHAT
          || item.actionName === CHI_DAO.BAO_CAO_TIEN_DO
          || item.actionName === CHI_DAO.BAO_CAO_HOAN_THANH
          || item.actionName === CHI_DAO.BAO_TRUNG_CHI_DAO) {
          setOpenModal(true)
        }
      }}>
        <HistoryItemHeader item={item}></HistoryItemHeader>
        <Action item={item}></Action>
        {item.comment && <View style={styles.view}>
          <Text style={styles.textComment}>
            {item.comment}
          </Text>
        </View>}
      </TouchableOpacity>
      {isOpen &&
        <ChangeLogModal dataJson={item.dataJson} isVisible={isOpen} onClose={closeModal}
                        listSector={listSector}
                        actionName={item.actionName}/>
      }
    </View>
  );
}


export default HistoryItem;
