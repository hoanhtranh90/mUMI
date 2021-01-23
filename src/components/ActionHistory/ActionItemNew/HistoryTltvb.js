import { Row } from 'react-native-easy-grid';
import { Icon, Text } from 'native-base';
import ToUsersModalV2 from './ToUsersModalV2';
import React from 'react';
import colors from 'eoffice/utils/colors';
import useModal from 'eoffice/utils/useModal';
import { StyleSheet } from 'react-native';
import { ACTION_LOGS } from 'eoffice/constants/documents';

const styles = StyleSheet.create({
  icon: {
    fontSize: 16,
    paddingRight: 6,
  },
});

const HistoryTltvb = ({ item }) => {
  const [isVisible, open, close] = useModal();

  const dataJson = item.dataJson;
  const receiveAgency = dataJson.receiveAgency;
  const updator = dataJson.updator;

  const filterActionNameToContent = () => {
    switch (item.actionName) {
      case ACTION_LOGS.ACTION_NAMES.DA_DEN: {
        return 'Văn bản đã được lấy về';
      }
      case ACTION_LOGS.ACTION_NAMES.DA_NHAN: {
        return 'Văn bản đã được nhận';
      }
      case ACTION_LOGS.ACTION_NAMES.TU_CHOI_TIEP_NHAN: {
        return 'Văn bản đã bị từ chối tiếp nhận';
      }
      case ACTION_LOGS.ACTION_NAMES.PHAN_CONG: {
        return 'Văn bản đã được phân công xử lý';
      }
      case ACTION_LOGS.ACTION_NAMES.DANG_XU_LY: {
        return 'Văn bản đang được xử lý';
      }
      case ACTION_LOGS.ACTION_NAMES.HOAN_THANH: {
        return 'Văn bản đã được hoàn thành';
      }
      case ACTION_LOGS.ACTION_NAMES.DONG_Y: {
        return 'Văn bản đã được đồng ý thu hồi';
      }
      case ACTION_LOGS.ACTION_NAMES.TU_CHOI: {
        return 'Văn bản đã bị từ chối thu hồi';
      }
      case ACTION_LOGS.ACTION_NAMES.THUHOI: {
        return 'Văn bản đã được gửi yêu cầu thu hồi';
      }
      case ACTION_LOGS.ACTION_NAMES.HE_THONG_BAN_HANH: {
        return 'Văn bản được ban hành từ trục';
      }
      case ACTION_LOGS.ACTION_NAMES.TRA_LAI: {
        return 'Đồng ý trả lại văn bản';
      }
      case ACTION_LOGS.ACTION_NAMES.TU_CHOI_TRA_LAI: {
        return 'Văn bản bị từ chối trả lại';
      }
      case ACTION_LOGS.ACTION_NAMES.GUI_YEU_CAU_THUHOI_BANHANH: {
        return 'Văn bản đã gửi yêu cầu thu hồi';
      }
      default: {
        return 'Hành động chưa được xác nhận';
      }
    }
  };

  const IconByActionName = () => {
    switch (item.actionName) {
      case ACTION_LOGS.ACTION_NAMES.TU_CHOI_TIEP_NHAN:
        return (
          <Icon
            name="ban"
            type="FontAwesome5"
            style={[styles.icon, { color: colors.red }]}
          />
        );
      default:
        return (
          <Icon
            name="check-circle"
            type="FontAwesome5"
            style={[styles.icon, { color: colors.green }]}
          />
        );
    }
  };

  const getUpdatorInfo = () => {
    return updator
      ? `${updator.staff} (${updator.department} - ${updator.mobile || ''} - ${updator.email ||
          ''})`
      : `${receiveAgency.name} (${receiveAgency.code} - ${receiveAgency.mail})`;
  };

  return (
    <Row style={styles.view} >
      <IconByActionName/>
      <Text style={[styles.textView, { color: colors.green }]}>
        <Text style={[styles.textView, { color: '#007aff' }]}>{filterActionNameToContent()} </Text>
        <Text style={[styles.textView, { color: '#000000', fontWeight: 'bold' }]}>
          {receiveAgency.name}
        </Text>
      </Text>
    </Row>
  );
};

export default HistoryTltvb;
