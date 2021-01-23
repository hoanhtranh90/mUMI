import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';
import { NavigationEvents } from 'react-navigation';

import { DOCUMENT_TYPE, DOC_USER_STATUS, DOC_STATUS_DISPLAY } from 'eoffice/constants/documents';
import ModeSwitches from 'eoffice/components/ModeSwitches';
import * as DocumentNavigation from 'eoffice/utils/DocumentNavigation';
import StatRow from './StatRow';
import SubStatRow from './SubStatRow';
import store from '../../../store';
import MenuToTrinh from './MenuToTrinh';
import { MENU_LIST } from '../../../constants/documents';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});

const modes = [
  {
    label: 'Văn bản đến',
    value: DOCUMENT_TYPE.VB_DEN,
  },
  {
    label: 'Văn bản đi',
    value: DOCUMENT_TYPE.VB_DI,
  },
];

const Summary = ({
  getSummary,
  mode,
  resetDocuments,
  stats,
  setMode,
  totalCT,
  totalNDB,
  totalPH,
  countToTrinh,
  getCountToTrinh,
  menuConfig,
}) => {
  useEffect(() => {
    getSummary();
    getCountToTrinh({ a: 'a' });
  }, []);
  const checkLanhDao = store.getState().auth.deptRole.roleCode === 'lanhdao';
  const currentModeStats = stats[mode] || {};
  const checkHDTV = () => {
    let indexMenuTTrinh = menuConfig.findIndex(
      menu => menu.menuCode === MENU_LIST.TO_TRINH_QUA_HAN
    );
    return indexMenuTTrinh !== -1 && mode === DOCUMENT_TYPE.VB_DEN;
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={getSummary} />
      <ModeSwitches current={mode} modes={modes} onChange={setMode} />
      <Grid>
        {mode === DOCUMENT_TYPE.VB_DEN && (
          <Row style={styles.statRow}>
            <StatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.CHO_XU_LY]}
              count={currentModeStats[DOC_USER_STATUS.CHO_XU_LY] || 0}
              onPress={() => {
                DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
                resetDocuments();
                DocumentNavigation.goToVbDenCxl();
              }}
            />
          </Row>
        )}
        {mode === DOCUMENT_TYPE.VB_DEN && (
          <Row style={{ height: 50 }}>
            <SubStatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.CHU_TRI]}
              count={totalCT}
              onPress={() => {
                DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
                resetDocuments();
                DocumentNavigation.goToVbDenCxlWithType(0, 0);
              }}
            />
          </Row>
        )}
        {mode === DOCUMENT_TYPE.VB_DEN && (
          <Row style={{ height: 50 }}>
            <SubStatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.PHOI_HOP]}
              count={totalPH}
              onPress={() => {
                DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
                resetDocuments();
                DocumentNavigation.goToVbDenCxlWithType(2, 0);
              }}
            />
          </Row>
        )}
        {mode === DOCUMENT_TYPE.VB_DEN && (
          <Row style={{ height: 50 }}>
            <SubStatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.NHAN_DE_BIET]}
              count={totalNDB}
              onPress={() => {
                DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
                resetDocuments();
                DocumentNavigation.goToVbDenCxlWithType(1, 0);
              }}
            />
          </Row>
        )}
        {mode === DOCUMENT_TYPE.VB_DEN && (
          <Row style={styles.statRow}>
            <StatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.DA_XU_LY]}
              count={currentModeStats[DOC_USER_STATUS.DA_XU_LY] || 0}
              onPress={() => {
                DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
                resetDocuments();
                DocumentNavigation.goToVbDenDxl();
              }}
              hasCount={false}
            />
          </Row>
        )}
        {mode === DOCUMENT_TYPE.VB_DEN && (
          <Row style={{ height: 50 }}>
            <SubStatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.CHU_TRI]}
              count={currentModeStats[DOC_USER_STATUS.CHU_TRI] || 0}
              onPress={() => {
                DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
                resetDocuments();
                DocumentNavigation.goToVbDenDxlWithType(0, 1);
              }}
              hasCount={false}
            />
          </Row>
        )}
        {mode === DOCUMENT_TYPE.VB_DEN && (
          <Row style={{ height: 50 }}>
            <SubStatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.PHOI_HOP]}
              count={currentModeStats[DOC_USER_STATUS.PHOI_HOP] || 0}
              onPress={() => {
                DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
                resetDocuments();
                DocumentNavigation.goToVbDenDxlWithType(2, 1);
              }}
              hasCount={false}
            />
          </Row>
        )}
        {mode === DOCUMENT_TYPE.VB_DEN && (
          <Row style={{ height: 50 }}>
            <SubStatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.NHAN_DE_BIET]}
              count={currentModeStats[DOC_USER_STATUS.NHAN_DE_BIET] || 0}
              onPress={() => {
                DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
                resetDocuments();
                DocumentNavigation.goToVbDenDxlWithType(1, 1);
              }}
              hasCount={false}
            />
          </Row>
        )}

        {/* {mode === DOCUMENT_TYPE.VB_DEN && (
          <Row style={styles.statRow}>
            <StatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.DA_XU_LY]}
              count={currentModeStats[DOC_USER_STATUS.DA_XU_LY] || 0}
              onPress={() => {
                DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
                resetDocuments();
                DocumentNavigation.goToVbDenDxl();
              }}
              hasCount={false}
            />
          </Row>
        )} */}
        {mode === DOCUMENT_TYPE.VB_DEN && checkLanhDao && (
          <Row style={styles.statRow}>
            <StatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.UY_QUYEN]}
              count={currentModeStats[DOC_USER_STATUS.UY_QUYEN] || 0}
              onPress={() => {
                DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
                resetDocuments();
                DocumentNavigation.goToVbDenUyQuyen();
              }}
              hasCount={false}
            />
          </Row>
        )}
        {/*==============================================TỜ TRÌNH=================================================================*/}
        {checkHDTV() && (
          <MenuToTrinh countToTrinh={countToTrinh} resetDocuments={resetDocuments} mode={mode} />
        )}
        {mode === DOCUMENT_TYPE.VB_DI && (
          <Row>
            <StatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.DU_THAO]}
              count={currentModeStats[DOC_USER_STATUS.DU_THAO] || 0}
              onPress={() => {
                DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
                resetDocuments();
                DocumentNavigation.goToDuThaoCxl();
              }}
            />
          </Row>
        )}
        {mode === DOCUMENT_TYPE.VB_DI && (
          <Row>
            <StatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.DA_PHAT_HANH]}
              count={currentModeStats[DOC_USER_STATUS.DA_PHAT_HANH] || 0}
              onPress={() => {
                DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
                resetDocuments();
                DocumentNavigation.goToVbPhatHanh();
              }}
            />
          </Row>
        )}
      </Grid>
    </View>
  );
};

Summary.propTypes = {
  stats: PropTypes.shape({}).isRequired,
  getSummary: PropTypes.func.isRequired,
  resetDocuments: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,

  mode: PropTypes.number,
  totalCT: PropTypes.number,
  totalNDB: PropTypes.number,
  totalPH: PropTypes.number,
};
Summary.defaultProps = {
  mode: DOCUMENT_TYPE.VB_DEN,
};

export default Summary;
