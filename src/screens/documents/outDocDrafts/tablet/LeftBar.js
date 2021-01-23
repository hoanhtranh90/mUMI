import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import {
  DOC_STATUS_DISPLAY,
  DOC_USER_STATUS,
  RELATION_TYPE,
  OUTGOING_DOC_STATUS,
} from '../../../../constants/documents';
import StatRow from './StatRow';
import store from '../../../../store';

import filters from '../../../../utils/quick-filters';

const createTimeMonthFilter = filters.find(filter => filter.id === 'createTimeMonthAgo');

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

const LeftBar = ({ updateQuery, resetDocuments, onChangeMode, navigation, getSummary }) => {
  const [widthBar, setWidthBar] = useState(203);
  const [iconSideBar, setIconSideBar] = useState('chevron-left');
  const [typeOfActive, setTypeOfActive] = useState(1);
  const [modesList, setModes] = useState([]);
  const modesDuThao = [
    {
      label: 'Tất cả',
      type: 5,
      value: -1,
      icon: 'menu',
      relationType: null,
      filterStatus: 'all',
      isLanhDao: false,
    },
    {
      label: 'Chờ xử lý',
      type: 1,
      value: DOC_USER_STATUS.CHO_XU_LY,
      icon: 'clock',
      relationType: null,
      filterStatus: 'choXuLy',
      isLanhDao: false,
    },
    {
      label: 'Đã xử lý',
      type: 2,
      value: DOC_USER_STATUS.DA_XU_LY,
      icon: 'fast-forward',
      relationType: null,
      filterStatus: 'daXuLy',
      isLanhDao: false,
    },
    {
      label: 'Phối hợp',
      type: 3,
      value: -1,
      icon: 'users',
      relationType: RELATION_TYPE.NGUOI_PHOI_HOP,
      filterStatus: 'phoiHop',
      isLanhDao: false,
    },
    {
      label: 'Uỷ quyền',
      type: 4,
      value: -1,
      icon: 'user-check',
      relationType: RELATION_TYPE.NGUOI_UY_QUYEN,
      filterStatus: 'uyQuyen',
      isLanhDao: true,
    },
  ];

  const modesPhatHanh = [
    {
      label: 'Tất cả',
      type: 1,
      value: -1,
      icon: 'menu',
      relationType: null,
      filterStatus: 'all',
      isLanhDao: false,
    },
    {
      label: 'Uỷ quyền',
      type: 4,
      value: -1,
      icon: 'user-check',
      relationType: RELATION_TYPE.NGUOI_UY_QUYEN,
      filterStatus: 'uyQuyen',
      isLanhDao: true,
    },
  ];
  useEffect(
    () => {
      getSummary();
      const status = navigation.getParam('status');
      const arrayMenuPopup = status === 3 ? modesDuThao : modesPhatHanh;
      const checkLanhDao = store.getState().auth.deptRole.roleCode === 'lanhdao';
      setModes(arrayMenuPopup);
      setTypeOfActive(1);
      onChangeMode(arrayMenuPopup[status === 3 ? 1 : 0]);
    },
    [navigation]
  );

  const onClickTypeOfBtn = (type, index) => {
    setTypeOfActive(type);
    onChangeMode(modesList[index]);
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
      <View style={{ paddingVertical: 10, flex: 1 }}>
        {modesList.map(
          ({ label, value, icon, relationType, type, filterStatus, isLanhDao }, index) => {
            if (!checkLanhDao && isLanhDao) {
              return <View />;
            }
            return (
              <StatRow
                label={label}
                icon={icon}
                widthBar={widthBar}
                relationType={relationType}
                type={type}
                filterStatus={filterStatus}
                value={value}
                index={index}
                onPress={(value, relationType, type, filterStatus, index) => {
                  onClickTypeOfBtn(type, index);

                  if (type === 1 && index === 0) {
                    updateQuery({
                      docStatus: OUTGOING_DOC_STATUS.DA_BAN_HANH,
                      createTime: createTimeMonthFilter.getValue(),
                      filterLabel: createTimeMonthFilter.label,
                      sort: 'docDate',
                      typeDoc: 'phathanh',
                      filterStatus: 'all',
                      keyword: '',
                      relationType: null,
                      isRead: null,
                    });
                  } else if (type === 4 && index === 1) {
                    updateQuery({
                      docStatus: OUTGOING_DOC_STATUS.DA_BAN_HANH,
                      createTime: createTimeMonthFilter.getValue(),
                      filterLabel: createTimeMonthFilter.label,
                      sort: 'docDate',
                      typeDoc: 'phathanh',
                      filterStatus: 'uyQuyen',
                      relationType: 'nguoiUyQuyen',
                      keyword: '',
                      isRead: null,
                    });
                  } else {
                    updateQuery({
                      relationType: null,
                      isRead: null,
                      status: value,
                      sort: 'updateTime',
                      type,
                      filterStatus,
                      keyword: '',
                      createTime: createTimeMonthFilter.getValue(),
                      docStatus: [
                        OUTGOING_DOC_STATUS.TAO_MOI,
                        OUTGOING_DOC_STATUS.DANG_XU_LI,
                        OUTGOING_DOC_STATUS.CHO_BAN_HANH,
                        OUTGOING_DOC_STATUS.TU_CHOI,
                        OUTGOING_DOC_STATUS.TU_CHOI_BANHANH,
                      ],
                    });
                  }
                }}
                typeOfActive={typeOfActive}
                typeOfBtn={type}
              />
            );
          }
        )}
      </View>
    </View>
  );
};

LeftBar.propTypes = {
  updateQuery: PropTypes.func.isRequired,
  onChangeMode: PropTypes.func.isRequired,
  resetDocuments: PropTypes.func.isRequired,
  getSummary: PropTypes.func.isRequired,
};

export default LeftBar;
