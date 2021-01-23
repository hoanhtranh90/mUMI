import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Alert, Text, View } from 'react-native';
import { FLOW_INFO } from 'eoffice/constants/administrative';
import UtilityItem from './UtilityItem';

const styles = StyleSheet.create({
  txtExt: {
    marginTop: 32,
    marginBottom: 12,
    marginLeft: 15,
    fontSize: 13,
    fontWeight: '600',
    color: '#abb4bd',
    textTransform: 'uppercase',
  },
});

const showAlert = msg => {
  Alert.alert('Thông báo', msg, [{ text: 'OK' }], {
    cancelable: false,
  });
};

const Utilities = ({ state, flowCode, onUtilityPress }) => {
  const [title, setTitle] = useState('');

  function getTitle() {
    let lblTitle = '';
    if (flowCode === FLOW_INFO.PHONG_HOP || flowCode === FLOW_INFO.PHONG_HOP_DX) {
      lblTitle = 'Lịch đặt phòng họp';
    } else if (flowCode === FLOW_INFO.DIEU_XE || flowCode === FLOW_INFO.DIEU_XE_DX) {
      lblTitle = 'Lịch đặt xe';
    }
    setTitle(lblTitle);
  }

  useEffect(() => {
    getTitle();
  }, []);

  function onUtilityPressed() {
    if (flowCode === FLOW_INFO.PHONG_HOP || flowCode === FLOW_INFO.PHONG_HOP_DX) {
      if (!state.startDate || !state.endDate) {
        showAlert('Phải nhập thời gian bắt đầu và thời gian kết thúc để xem lịch phòng họp');
        return;
      }
    } else if (flowCode === FLOW_INFO.DIEU_XE || flowCode === FLOW_INFO.DIEU_XE_DX) {
      if (!state.startTime || !state.endTime) {
        showAlert('Phải nhập thời gian đi và thời gian về để xem lịch đặt xe');
        return;
      }
    }
    onUtilityPress(state, flowCode);
  }

  return (
    <>
      {/* {flowCode !== FLOW_INFO.LICH_TUAN && ( */}
      <View style={{ marginLeft: 15 }}>
        {/* <Text style={styles.txtExt}>Tiện ích hỗ trợ</Text> */}
        <UtilityItem title={title} icon="calendar" onPress={() => onUtilityPressed()} />
      </View>
      {/* )} */}
    </>
  );
};

Utilities.propTypes = {
  onUtilityPress: PropTypes.func.isRequired,
  state: PropTypes.shape({}),
  flowCode: PropTypes.string.isRequired,
};
Utilities.defaultProps = {
  state: {},
};

export default Utilities;
