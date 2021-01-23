import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from 'native-base';
import Modal from 'react-native-modal';
import ReadMore from 'react-native-read-more-text';
import BottomModal from '../../components/modals/BottomModal';
import PropTypes from 'prop-types';

const heightS = Dimensions.get('window').height;
const widthS = Dimensions.get('window').width;

const styles = StyleSheet.create({
  txtTitle: {
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContainer: {
    backgroundColor: '#fff',
    height: heightS * 0.6,
    width: widthS * 0.9,
    top: heightS * 0.4 - (heightS * 0.6) / 2,
    position: 'absolute',
  },
  modalTitle: {
    backgroundColor: '#0091ff',
  },
  modalBody: {
    paddingHorizontal: 15,
  },
  textVersion: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444444',
    marginTop: 5,
    marginBottom: 5,
  },
  modalFooter: {
    padding: 10,
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
  },
  btnTextCancel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff7373',
    alignSelf: 'center',
  },
  br: {
    width: '100%',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});

const ModalChangeLog = ({ showModal, changeLogs, onCancel, onUpdate }) => {
  const needUpdate = changeLogs.find(changeLog => changeLog.forceUpdate);
  const _renderTruncatedFooter = handlePress => {
    return (
      <Text style={{ color: '#2c92ff', marginTop: 5, alignSelf: 'flex-end' }} onPress={handlePress}>
        Chi tiết
      </Text>
    );
  };
  const _renderRevealedFooter = handlePress => {
    return (
      <Text style={{ color: '#2c92ff', marginTop: 5, alignSelf: 'flex-end' }} onPress={handlePress}>
        Rút gọn
      </Text>
    );
  };
  const ListItem = ({ item }) => {
    return (
      <View style={styles.modalBody}>
        <Text style={styles.textVersion}>{item.versionCode}</Text>
        <ReadMore
          numberOfLines={4}
          renderTruncatedFooter={_renderTruncatedFooter}
          renderRevealedFooter={_renderRevealedFooter}
          // onReady={this._handleTextReady}
        >
          <Text style={{ lineHeight: 20 }}>{item.description}</Text>
        </ReadMore>
        <View style={styles.br} />
      </View>
    );
  };

  return (
    <Modal
      style={styles.modalContainer}
      isVisible={showModal}
      onBackButtonPress={() => {}}
      onBackdropPress={() => {}}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
    >
      <View style={styles.modalTitle}>
        <Text style={styles.txtTitle}>Lịch sử phiên bản</Text>
      </View>
      <FlatList
        data={changeLogs}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={item => item.id}
      />
      <View style={styles.modalFooter}>
        <Button style={styles.btn} onPress={() => onCancel()}>
          <Text style={styles.btnText}>Cập nhật</Text>
        </Button>
        {!needUpdate && (
          <Button style={styles.btnCancel} onPress={() => onCancel()}>
            <Text style={styles.btnTextCancel}>Bỏ qua</Text>
          </Button>
        )}
      </View>
    </Modal>
  );
};

BottomModal.propTypes = {
  changeLogs: PropTypes.node.isRequired,
  showModal: PropTypes.bool,
  onCancel: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default ModalChangeLog;
