import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from 'eoffice/utils/colors';
import {Icon} from "native-base";
import { CHI_DAO } from "../../../../constants/documents";

const styles = StyleSheet.create({
  icon: { fontSize: 15, color: '#007aff' },
  textTouchable: { fontSize: 15, color: '#007aff' },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginTop: 8,
    alignItems: 'center',
    marginBottom : 8
  }
})

const ReportAndUpdateAction = ( { action } ) => {
  let title = ''
  switch (action) {
    case CHI_DAO.BAO_CAO_TIEN_DO:
      title = 'Báo cáo tiến độ'
      break;
    case CHI_DAO.CAP_NHAT:
      title = 'Cập nhật chỉ đạo'
      break;
    case CHI_DAO.PHE_DUYET:
      title = 'Phê duyệt'
      break;
    case CHI_DAO.BAO_CAO_HOAN_THANH:
      title = 'Báo cáo hoàn thành'
      break;
    case CHI_DAO.YEU_CAU_BO_SUNG:
      title = 'Yêu cầu bổ sung'
      break;
    case CHI_DAO.HUY_YEU_CAU:
      title = 'Huỷ báo cáo'
      break;
    case CHI_DAO.BAO_TRUNG_CHI_DAO:
      title = 'Báo trùng chỉ đạo'
      break;
    default:
      title = ''
      break;
  }

  return (
    <View style={styles.container}>
      <Icon type="Feather" name="check-circle" style={styles.icon} />
      <View style={{marginHorizontal: 6}}>
        <Text style={styles.textTouchable}>
          {title}
        </Text>
      </View>
    </View>
  );
}

export default ReportAndUpdateAction;
