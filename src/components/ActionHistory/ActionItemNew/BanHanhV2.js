import { Row } from 'react-native-easy-grid';
import { Icon, Text } from 'native-base';
import ToUsersModalV2 from './ToUsersModalV2';
import React from 'react';
import colors from 'eoffice/utils/colors';
import useModal from 'eoffice/utils/useModal';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  icon: {
    fontSize: 16,
    paddingRight: 6,
  },
});

const BanHanhV2 = ({ item }) => {
  const [isVisible, open, close] = useModal();

  let dataJson = item.dataJson;
  let departments = dataJson.departments;
  let handlers = dataJson.handlers;
  let receiverHandlers = dataJson.receiverHandlers;
  let receiverDepts = dataJson.receiverDepts;
  let tltvbAgencies = dataJson.tltvbAgencies;
  let outsideDepartments = dataJson.outsideDepartments;

  let receivers = [
    ...receiverHandlers.map(receiverForm => {
      let handler = handlers.find(hanlder => receiverForm.id === hanlder.id);
      return {
        type: 'caNhan',
        receiverForm,
        handler,
      };
    }),
    ...receiverDepts.map(receiverForm => {
      let department = departments.find(department => receiverForm.id === department.id);
      return {
        department,
        type: 'donVi',
        receiverForm,
      };
    }),
    ...tltvbAgencies.map(agency => {
      return {
        type: 'donViTrenTruc',
        agency,
      };
    }),
    ...outsideDepartments.map(outsideDepartment => {
      return {
        type: 'donViBenNgoai',
        outsideDepartment,
      };
    }),
  ];

  const getLabel = () => {
    if (receivers.length === 0) {
      return '-';
    }
    let banHanhInfoFirstItem = receivers[0];
    return receivers.length === 1
      ? getShortReceiverName(banHanhInfoFirstItem)
      : `${getShortReceiverName(banHanhInfoFirstItem)} và ${receivers.length - 1} đơn vị khác`;
  };

  const getReceiverName = banHanhInfoItem => {
    let type = banHanhInfoItem.type;
    switch (type) {
      case 'donVi':
        return banHanhInfoItem.department.deptName;
      case 'donViBenNgoai':
        return banHanhInfoItem.outsideDepartment;
      case 'caNhan':
        return `${banHanhInfoItem.handler.fullName} (${banHanhInfoItem.handler.positionName} - ${
          banHanhInfoItem.handler.deptName
        })`;
      case 'donViTrenTruc':
        return `${banHanhInfoItem.agency.name} (${banHanhInfoItem.agency.code} - ${
          banHanhInfoItem.agency.mail
        })`;
      default:
        return '';
    }
  };

  const getShortReceiverName = banHanhInfoItem => {
    let type = banHanhInfoItem.type;
    switch (type) {
      case 'donVi':
        return banHanhInfoItem.department.deptName;
      case 'donViBenNgoai':
        return banHanhInfoItem.outsideDepartment;
      case 'caNhan':
        return banHanhInfoItem.handler.fullName;
      case 'donViTrenTruc':
        return banHanhInfoItem.agency.name;
      default:
        return '';
    }
  };

  return (
    <Row style={styles.view} onPress={receivers.length > 1 ? open : undefined}>
      <Icon
        name="check-circle"
        type="FontAwesome5"
        style={[styles.icon, { color: colors.green }]}
      />
      <Text style={[styles.textView, { color: colors.green }]}>
        <Text style={[styles.textView, { color: '#007aff' }]}>Ban hành văn bản đến </Text>
        <Text style={[styles.textView, { color: '#000000', fontWeight: 'bold' }]}>
          {getLabel()}
        </Text>
      </Text>
      {receivers.length > 1 && (
        <ToUsersModalV2 isVisible={isVisible} onClose={close} toUsers={receivers} />
      )}
    </Row>
  );
};

export default BanHanhV2;
