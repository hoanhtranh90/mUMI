import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Platform, TouchableOpacity, ScrollView, Alert} from 'react-native';
import PropTypes from 'prop-types';
import { Text, Input } from 'native-base';
import Modal from 'react-native-modal';
import { CREATE_LABELS_VE_MAY_BAY } from 'eoffice/constants/administrative';
import colors from 'eoffice/utils/colors';
import IconField from '../../common/IconField';
import DatePicker from '../../common/DatePicker';

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
    borderRadius: 4,
    paddingHorizontal: 40,
  },
  picker: {
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 0,
    height: 20,
    marginTop: 12,
    paddingLeft: 0,
    width: '100%',
  },
  pickerText: {
    color: '#2b2d50',
    paddingLeft: 0,
    flexShrink: 1,
    fontWeight: 'bold',
  },
  pickerPlaceholder: {
    color: colors.gray,
    paddingLeft: 0,
    fontWeight: 'bold',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'white',
    marginHorizontal: 8,
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btmButton: {
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: colors.blue,
    width: 90,
    height: 40,
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  btmText: {
    alignSelf: 'center',
    color: 'white',
    justifyContent: 'center',
  },
  input: {
    height: null,
    paddingTop: 8,
    color: '#2b2d50',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 0,
    alignSelf: 'stretch',
  }
});

// eslint-disable-next-line react/prop-types
const ChangBayPopup = ({ itemChangBay, onClose, visible, updateChangBay, actionList, display }) => {
  const [timeReal, setTimeReal] = useState(null);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [show, setShow] = useState(false)
  useEffect(
    () => {
      if (itemChangBay?.item?.flightTimeRealistic) {
        setTimeReal(itemChangBay?.item?.flightTimeRealistic);
      } else {
        setTimeReal(null);
      }
      setTicketNumber(itemChangBay?.item?.ticketNumber);
      setShow(checkDisplay())
    },
    [visible]
  );

  function checkDisplay() {
    if (display && display.state) {
      if (actionList.length === 0) {
        if (display.state === 'Đã phê duyệt') {
          return true
        }
        if (display.state === 'Không phê duyệt' || display.state === 'Hủy yêu cầu') {
          return false
        }
      } else if (actionList.length === 1) {
        return false
      } else if (actionList.length === 2) {
        if (display.state === 'Đã phê duyệt' || display.state === 'Chờ phê duyệt') {
          return true
        }
        if (display.state === 'Không phê duyệt' || display.state === 'Hủy yêu cầu') {
          return false
        }
      }
    }
    return true
  }

  const updateInfoChangBay = item => {
    if (!timeReal) {
      Alert.alert('Thông báo', 'Chưa cập nhật thời gian bay thực tế', [{ text: 'OK' }], {
        cancelable: false,
      });
      return
    }
    if (!ticketNumber) {
      Alert.alert('Thông báo', 'Chưa cập số vé máy bay', [{ text: 'OK' }], {
        cancelable: false,
      });
      return
    }
    if (timeReal && ticketNumber) {
      updateChangBay(item, timeReal, ticketNumber);
    }
  };
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6990BF', margin: 10 }}>
            CẬP NHẬT
          </Text>
          <IconField label={CREATE_LABELS_VE_MAY_BAY.name} iconName="user" required>
            <Input
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={itemChangBay?.item?.userName}
              style={styles.input}
              disabled
            />
          </IconField>
          <IconField label={CREATE_LABELS_VE_MAY_BAY.fromPlace} iconName="chevrons-right" required>
            <Input
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={itemChangBay?.item?.airportFromName}
              style={styles.input}
              disabled
            />
          </IconField>
          <IconField label={CREATE_LABELS_VE_MAY_BAY.toPlace} iconName="target" required>
            <Input
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={itemChangBay?.item?.airportToName}
              style={styles.input}
              disabled
            />
          </IconField>
          <IconField label={CREATE_LABELS_VE_MAY_BAY.timeRequired} iconName="calendar" required>
            <DatePicker
              placeholderStyle={styles.pickerPlaceholder}
              style={styles.picker}
              textStyle={styles.pickerText}
              value={itemChangBay?.item?.flightTimeEstimate ?
                new Date(itemChangBay?.item?.flightTimeEstimate) : null}
              disabled
            />
          </IconField>
          {show && <IconField label={CREATE_LABELS_VE_MAY_BAY.timeReal} iconName="calendar" required>
            <DatePicker
              placeholderStyle={styles.pickerPlaceholder}
              style={styles.picker}
              textStyle={styles.pickerText}
              value={timeReal ? new Date(timeReal) : null}
              onChange={date => setTimeReal(date.getTime())}
            />
          </IconField>}
          {show &&
          <IconField label={CREATE_LABELS_VE_MAY_BAY.ticketNumber} iconName="credit-card" required>
            <Input
              placeholder="-"
              placeholderTextColor={colors.gray}
              value={ticketNumber}
              onChangeText={txt => setTicketNumber(txt)}
              style={styles.input}
            />
          </IconField>}
          <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-end' }}>
            {actionList.length === 2 && <TouchableOpacity
              onPress={() => {
                updateInfoChangBay(itemChangBay);
              }}
              style={styles.btmButton}>
              <Text style={[styles.btmText,{marginTop: 8}]}>Cập nhật</Text>
            </TouchableOpacity>}
            <TouchableOpacity onPress={onClose}
                              style={[styles.btmButton, {alignContent: 'center', backgroundColor: '#fff'}]}>
              <Text style={[styles.btmText,{marginTop: 8, color: 'black'}]}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

ChangBayPopup.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool,
};
ChangBayPopup.defaultProps = {
  onClose() {},
  visible: false,
};

export default ChangBayPopup;
