/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardItem, Text, View } from 'native-base';
import { FlatList, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import UserItem from 'eoffice/components/UserItem';
import { PROCESS_TYPE_TEXTS } from '../../constants/documents';

const styles = StyleSheet.create({
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
});

const ToUsersModal = ({ onPress, isVisible, onClose, toUsers, dataJson }) => (
  <Modal isVisible={isVisible} onBackdropPress={onClose} onBackButtonPress={onClose}>
    <Card style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CardItem header>
          <Text>Danh sách</Text>
        </CardItem>
        <CardItem button onPress={onClose}>
          <Text style={{ textAlign: 'right', color: 'red' }}>Đóng</Text>
        </CardItem>
      </View>
      <FlatList
        data={toUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ index, item }) => (
          <CardItem style={styles.item} key={index.toString()}>
            {!!item.fullName && (
              <UserItem user={item} containerStyle={styles.user} data={dataJson[index]} />
            )}
            {!item.fullName && (
              <Text style={styles.dept}>
                {`${index + 1}. ${item.deptName} ${
                  dataJson[index] ? `(${PROCESS_TYPE_TEXTS[dataJson[index].processType]})` : ''
                }`}
              </Text>
            )}
          </CardItem>
        )}
      />
    </Card>
  </Modal>
);

ToUsersModal.propTypes = {
  isVisible: PropTypes.bool,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  toUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      deptName: PropTypes.string,
      fullName: PropTypes.string,
    })
  ),
  dataJson: PropTypes.arrayOf(PropTypes.shape({})),
};
ToUsersModal.defaultProps = {
  isVisible: false,
  onPress() {},
  onClose() {},
  toUsers: [],
  dataJson: [],
};

export default ToUsersModal;
