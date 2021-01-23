/* eslint-disable global-require,import/no-unresolved */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ModeSwitches from 'eoffice/components/ModeSwitches';
import { ADMINISTRATIVE_TYPE, FLOW_INFO, ROLE_CODE } from 'eoffice/constants/administrative';
import ModeSwitchesLT from '../../component/ModeSwitchesLT';
import Requests from './Requests.container';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 10,
    flex: 1,
  },
});

const modes = [
  {
    label: 'Cần xử lý',
    value: ADMINISTRATIVE_TYPE.PENDING,
  },
  {
    label: 'Đã xử lý',
    value: ADMINISTRATIVE_TYPE.COMPLETE,
  },
];

const Summary = ({ navigation, mode, changeMode, changeModeLT, hcFlow, userDeptRole }) => {
  function navigate(caseMasterId) {
    let route = '';
    if (hcFlow.flowCode === FLOW_INFO.PHONG_HOP) {
      route = 'Detail';
    } else if (hcFlow.flowCode === FLOW_INFO.PHONG_HOP_DX) {
      route = 'DetailDX';
    } else if (hcFlow.flowCode === FLOW_INFO.DIEU_XE) {
      route = 'DetailDatXe';
    } else if (hcFlow.flowCode === FLOW_INFO.DIEU_XE_DX) {
      route = 'DetailDatXeDX';
    } else if (hcFlow.flowCode === FLOW_INFO.LICH_TUAN) {
      route = 'DetailLT';
    } else if (hcFlow.flowCode === FLOW_INFO.VE_MAY_BAY) {
      route = 'DetailVeMayBay';
    }
    if (global.hasDeepLink) {
    } else {
      navigation.navigate(route, {
        caseMasterId,
      });
    }
  }

  const modesLT = [
    {
      label: hcFlow.flowName ? 'Đã gửi yêu cầu' : 'Cần phê duyệt',
      value: ADMINISTRATIVE_TYPE.PENDING,
    },
    {
      label: 'Đã phê duyệt',
      value: ADMINISTRATIVE_TYPE.COMPLETE,
    },
  ];

  function getModesLT(modesLT) {
    if (userDeptRole.roleCode === ROLE_CODE.TONG_HOP_LICH_TUAN) {
      return [modesLT[1]]
    } else {
      return modesLT
    }
  }

  return (
    <View style={styles.container}>
      {hcFlow.flowCode === FLOW_INFO.LICH_TUAN ? (
        <ModeSwitchesLT
          modes={hcFlow.flowCode === FLOW_INFO.LICH_TUAN ? getModesLT(modesLT) : modes}
          current={mode}
          onChange={changeModeLT}
          hcFlow={hcFlow}
        />
      ) : (
        <ModeSwitches modes={modes} current={mode} onChange={changeMode} />
      )}

      <Requests onRequestPressed={caseMasterId => navigate(caseMasterId)} hcFlow={hcFlow} />
    </View>
  );
};

Summary.propTypes = {
  changeMode: PropTypes.func.isRequired,
  changeModeLT: PropTypes.func.isRequired,
  mode: PropTypes.number,
  hcFlow: PropTypes.shape({}).isRequired,
};
Summary.defaultProps = {
  mode: ADMINISTRATIVE_TYPE.PENDING,
};

export default Summary;
