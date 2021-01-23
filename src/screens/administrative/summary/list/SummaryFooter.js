/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { FLOW_INFO } from 'eoffice/constants/administrative';
import RoundButton from '../../common/RoundButton';

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 15,
  },
});

const SummaryFooter = ({ navigation, hcFlow }) => {
  function navigate() {
    if (hcFlow.flowCode === FLOW_INFO.PHONG_HOP) {
      navigation.navigate('PhongHop');
    } else if (hcFlow.flowCode === FLOW_INFO.PHONG_HOP_DX) {
      navigation.navigate('PhongHopDotXuat');
    } else if (hcFlow.flowCode === FLOW_INFO.DIEU_XE) {
      navigation.navigate('DatXe');
    } else if (hcFlow.flowCode === FLOW_INFO.DIEU_XE_DX) {
      navigation.navigate('DatXeDotXuat');
    } else if (hcFlow.flowCode === FLOW_INFO.THEO_DOI_CHI_DAO_LANH_DAO) {
      navigation.navigate('TheoDoiChiDaoLanhDao');
    } else if (hcFlow.flowCode === FLOW_INFO.LICH_TUAN) {
      navigation.navigate('LichTuan');
    } else if (hcFlow.flowCode === FLOW_INFO.VE_MAY_BAY) {
      navigation.navigate('VeMayBay');
    } else if (hcFlow.flowCode === FLOW_INFO.GUI_YEU_CAU) {
      navigation.navigate('SendRequestStack');
    }
  }

  return (
    <View style={styles.wrapper}>
      <RoundButton
        icon="plus-circle"
        title="Thêm mới"
        color="#007aff"
        titleColor="white"
        onPress={() => navigate()}
      />
    </View>
  );
};
SummaryFooter.propTypes = {
  hcFlow: PropTypes.shape({}).isRequired,
};
SummaryFooter.defaultProps = {};

export default SummaryFooter;
