import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { DOCUMENT_TYPE } from 'eoffice/constants/documents';
import * as DocumentNavigation from 'eoffice/utils/DocumentNavigation';
import { DOC_STATUS_DISPLAY, DOC_USER_STATUS, MENU_LIST } from '../../../../constants/documents';
import StatRow from './StatRow';
import SubStatRow from './SubStatRow';
import store from '../../../../store';
import MenuToTrinh from './MenuToTrinh';

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: '#efeff4',
  },
  touchableSidebar: {
    alignItems: 'flex-end',
    backgroundColor: '#f8f9fd',
  },
  iconCollapSideBar: {
    fontSize: 23,
    color: '#c9c7c6',
    paddingRight: 8,
    paddingVertical: 3,
  },
});

const LeftBar = ({
  getSummary,
  mode,
  resetDocuments,
  stats,
  onChangeMode,
  navigation,
  countToTrinh,
  menuConfig,
}) => {
  const [widthBar, setWidthBar] = useState(203);
  const [iconSideBar, setIconSideBar] = useState('chevron-left');
  const [typeOfActive, setTypeOfActive] = useState(mode === DOCUMENT_TYPE.VB_DEN ? 0 : 4);
  const checkHDTV = () => {
    let indexMenuTTrinh = menuConfig.findIndex(
      menu => menu.menuCode === MENU_LIST.TO_TRINH_QUA_HAN
    );
    return indexMenuTTrinh !== -1 && mode === DOCUMENT_TYPE.VB_DEN;
  };
  useEffect(
    () => {
      getSummary();
      const status = navigation.getParam('status');
      setTypeOfActive(status);
      onChangeMode(DOC_STATUS_DISPLAY[status]);
    },
    [navigation]
  );

  const currentModeStats = stats[mode] || {};

  const onClickTypeOfBtn = type => {
    // if (type === DOC_USER_STATUS.CHO_XU_LY) {
    //   setTypeOfActive(type);
    //   onChangeMode(DOC_STATUS_DISPLAY[DOC_USER_STATUS.CHO_XU_LY]);
    // } else if (type === DOC_USER_STATUS.DA_XU_LY) {
    //   setTypeOfActive(type);
    //   onChangeMode(DOC_STATUS_DISPLAY[DOC_USER_STATUS.DA_XU_LY]);
    // } else if (type === DOC_USER_STATUS.DA_PHAT_HANH) {
    //   setTypeOfActive(type);
    //   onChangeMode(DOC_STATUS_DISPLAY[DOC_USER_STATUS.DA_PHAT_HANH]);
    // } else if (type === DOC_USER_STATUS.DU_THAO) {
    //   setTypeOfActive(type);
    //   onChangeMode(DOC_STATUS_DISPLAY[DOC_USER_STATUS.DU_THAO]);
    // } else if (type === DOC_USER_STATUS.CHU_TRI) {
    //   setTypeOfActive(type);
    //   onChangeMode(DOC_STATUS_DISPLAY[DOC_USER_STATUS.CHU_TRI]);
    // } else if (type === DOC_USER_STATUS.NHAN_DE_BIET) {
    //   setTypeOfActive(type);
    //   onChangeMode(DOC_STATUS_DISPLAY[DOC_USER_STATUS.NHAN_DE_BIET]);
    // } else if (type === DOC_USER_STATUS.PHOI_HOP) {
    //   setTypeOfActive(type);
    //   onChangeMode(DOC_STATUS_DISPLAY[DOC_USER_STATUS.PHOI_HOP]);
    // } else if (type === DOC_USER_STATUS.DXL_CHU_TRI) {
    //   setTypeOfActive(type);
    //   onChangeMode(DOC_STATUS_DISPLAY[DOC_USER_STATUS.DXL_CHU_TRI]);
    // } else if (type === DOC_USER_STATUS.DXL_NHAN_DE_BIET) {
    //   setTypeOfActive(type);
    //   onChangeMode(DOC_STATUS_DISPLAY[DOC_USER_STATUS.DXL_NHAN_DE_BIET]);
    // } else if (type === DOC_USER_STATUS.DXL_PHOI_HOP) {
    //   setTypeOfActive(type);
    //   onChangeMode(DOC_STATUS_DISPLAY[DOC_USER_STATUS.DXL_PHOI_HOP]);
    // }
    setTypeOfActive(type);
    onChangeMode(DOC_STATUS_DISPLAY[type]);
  };
  const checkLanhDao = store.getState().auth.deptRole.roleCode === 'lanhdao';
  return (
    <View style={([styles.container], { width: widthBar })}>
      <TouchableOpacity
        onPress={() => {
          if (widthBar === 203) {
            setIconSideBar('chevron-right');
            setWidthBar(100);
          } else {
            setIconSideBar('chevron-left');
            setWidthBar(203);
          }
        }}
        style={styles.touchableSidebar}
      >
        <Icon name={iconSideBar} type="Feather" style={styles.iconCollapSideBar} />
      </TouchableOpacity>
      <ScrollView style={{ paddingVertical: 10, flex: 1 }}>
        {mode === DOCUMENT_TYPE.VB_DEN && (
          <View>
            <StatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.CHO_XU_LY]}
              widthBar={widthBar}
              onPress={() => {
                onClickTypeOfBtn(DOC_USER_STATUS.CHO_XU_LY);
                resetDocuments();
                DocumentNavigation.goToVbDenCxl();
              }}
              typeOfActive={typeOfActive}
              typeOfBtn={DOC_USER_STATUS.CHO_XU_LY}
            />
            <SubStatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.CHU_TRI]}
              widthBar={widthBar}
              onPress={() => {
                onClickTypeOfBtn(DOC_USER_STATUS.CHU_TRI);
                resetDocuments();
                DocumentNavigation.goToVbDenCxlWithType(0, DOC_USER_STATUS.CHU_TRI);
              }}
              typeOfActive={typeOfActive}
              typeOfBtn={DOC_USER_STATUS.CHU_TRI}
            />
            <SubStatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.PHOI_HOP]}
              widthBar={widthBar}
              onPress={() => {
                onClickTypeOfBtn(DOC_USER_STATUS.PHOI_HOP);
                resetDocuments();
                DocumentNavigation.goToVbDenCxlWithType(2, DOC_USER_STATUS.PHOI_HOP);
              }}
              typeOfActive={typeOfActive}
              typeOfBtn={DOC_USER_STATUS.PHOI_HOP}
            />
            <SubStatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.NHAN_DE_BIET]}
              widthBar={widthBar}
              onPress={() => {
                onClickTypeOfBtn(DOC_USER_STATUS.NHAN_DE_BIET);
                resetDocuments();
                DocumentNavigation.goToVbDenCxlWithType(1, DOC_USER_STATUS.NHAN_DE_BIET);
              }}
              typeOfActive={typeOfActive}
              typeOfBtn={DOC_USER_STATUS.NHAN_DE_BIET}
            />
            <StatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.DA_XU_LY]}
              widthBar={widthBar}
              onPress={() => {
                onClickTypeOfBtn(DOC_USER_STATUS.DA_XU_LY);
                resetDocuments();
                DocumentNavigation.goToVbDenDxl();
              }}
              typeOfActive={typeOfActive}
              typeOfBtn={DOC_USER_STATUS.DA_XU_LY}
            />
            <SubStatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.CHU_TRI]}
              widthBar={widthBar}
              onPress={() => {
                onClickTypeOfBtn(DOC_USER_STATUS.DXL_CHU_TRI);
                resetDocuments();
                DocumentNavigation.goToVbDenDxlWithType(0, DOC_USER_STATUS.DXL_CHU_TRI);
              }}
              typeOfActive={typeOfActive}
              typeOfBtn={DOC_USER_STATUS.DXL_CHU_TRI}
            />
            <SubStatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.PHOI_HOP]}
              widthBar={widthBar}
              onPress={() => {
                onClickTypeOfBtn(DOC_USER_STATUS.DXL_PHOI_HOP);
                resetDocuments();
                DocumentNavigation.goToVbDenDxlWithType(2, DOC_USER_STATUS.DXL_PHOI_HOP);
              }}
              typeOfActive={typeOfActive}
              typeOfBtn={DOC_USER_STATUS.DXL_PHOI_HOP}
            />
            <SubStatRow
              {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.NHAN_DE_BIET]}
              widthBar={widthBar}
              onPress={() => {
                onClickTypeOfBtn(DOC_USER_STATUS.DXL_NHAN_DE_BIET);
                resetDocuments();
                DocumentNavigation.goToVbDenDxlWithType(1, DOC_USER_STATUS.DXL_NHAN_DE_BIET);
              }}
              typeOfActive={typeOfActive}
              typeOfBtn={DOC_USER_STATUS.DXL_NHAN_DE_BIET}
            />
          </View>
        )}

        {mode === DOCUMENT_TYPE.VB_DEN && checkLanhDao && (
          <StatRow
            {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.UY_QUYEN]}
            widthBar={widthBar}
            onPress={() => {
              onClickTypeOfBtn(DOC_USER_STATUS.UY_QUYEN);
              resetDocuments();
              DocumentNavigation.goToVbDenUyQuyen();
            }}
            typeOfActive={typeOfActive}
            typeOfBtn={DOC_USER_STATUS.UY_QUYEN}
          />
        )}
        {checkHDTV() && (
          <MenuToTrinh
            countToTrinh={countToTrinh}
            onClickTypeOfBtn={onClickTypeOfBtn}
            stats={stats}
            typeOfActive={typeOfActive}
            widthBar={widthBar}
            resetDocuments={resetDocuments}
            mode={mode}
          />
        )}
        {mode === DOCUMENT_TYPE.VB_DI && (
          <StatRow
            {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.DU_THAO]}
            count={currentModeStats[DOC_USER_STATUS.DU_THAO] || 0}
            widthBar={widthBar}
            onPress={() => {
              onClickTypeOfBtn(DOC_USER_STATUS.DU_THAO);
              resetDocuments();
              DocumentNavigation.goToDuThaoCxl();
            }}
            typeOfActive={typeOfActive}
            typeOfBtn={DOC_USER_STATUS.DU_THAO}
          />
        )}
        {mode === DOCUMENT_TYPE.VB_DI && (
          <StatRow
            {...DOC_STATUS_DISPLAY[DOC_USER_STATUS.DA_PHAT_HANH]}
            widthBar={widthBar}
            count={currentModeStats[DOC_USER_STATUS.DA_PHAT_HANH] || 0}
            onPress={() => {
              onClickTypeOfBtn(DOC_USER_STATUS.DA_PHAT_HANH);
              resetDocuments();
              DocumentNavigation.goToVbPhatHanh(
                currentModeStats[DOC_USER_STATUS.DA_PHAT_HANH] || 0
              );
            }}
            typeOfActive={typeOfActive}
            typeOfBtn={DOC_USER_STATUS.DA_PHAT_HANH}
          />
        )}
      </ScrollView>
    </View>
  );
};

LeftBar.propTypes = {
  stats: PropTypes.shape({}).isRequired,
  getSummary: PropTypes.func.isRequired,
  resetDocuments: PropTypes.func.isRequired,
  mode: PropTypes.number.isRequired,
  onChangeMode: PropTypes.func.isRequired,
};

export default LeftBar;
