import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Text } from 'native-base';
//
import { selectors, actions as authActions } from 'eoffice/store/auth';
import { getMenuConfig } from '../../store/auth/service';
import colors from '../../utils/colors';
import * as DocumentNavigation from '../../utils/DocumentNavigation';
import Assets from './assets';
import { DOCUMENT_TYPE, MENU_LIST } from '../../constants/documents';
import store from '../../store';
import NavigationService from '../../utils/NavigationService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  routeBtn: {
    width: 87,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 32,
    width: 32,
    marginBottom: 8,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  currentRoute: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  currentLabel: {
    color: 'white',
  },
  banHanhImg: { position: 'relative' },
  checkView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: -6,
    bottom: 3,
    backgroundColor: colors.blue,
    padding: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  checkIcon: {
    color: 'white',
    fontSize: 8,
  },
});

const getCurrentKey = (navigation, documentMode) => {
  const {
    state: { index, routes },
  } = navigation;

  const route = routes[index];
  if (!route) {
    return '';
  }

  if (route.key === 'Documents') {
    if (documentMode === DOCUMENT_TYPE.VB_DEN) {
      return 'vbDen';
    } else {
      const docStatus = store.getState().documents.list.query.docStatus;
      if (docStatus === 3) {
        return 'banHanh';
      }
      return 'drafts';
    }
  }
  return route.key;
};

const RouteButtons = ({ documentMode, navigation, resetDocuments, deptRole, setMenuConfigRdx }) => {
  const [menuConfig, setMenuConfig] = useState([]);

  const getConfig = async () => {
    const menuConfigResult = await getMenuConfig();
    setMenuConfig(menuConfigResult?.data);
    setMenuConfigRdx(menuConfigResult?.data);
  };
  useEffect(
    () => {
      getConfig();
    },
    [deptRole]
  );
  const currentKey = getCurrentKey(navigation, documentMode);

  let hasVBDen = false;
  let hasVBDuThao = false;
  let hasVBPhatHanh = false;
  let hasLichTuan = false;
  if (menuConfig && menuConfig.length > 0) {
    for (let i = 0; i < menuConfig.length; i += 1) {
      if (menuConfig[i]?.menuCode === MENU_LIST.VB_DEN) {
        hasVBDen = true;
      }
      if (menuConfig[i]?.menuCode === MENU_LIST.VB_DI_DUTHAO) {
        hasVBDuThao = true;
      }
      if (menuConfig[i]?.menuCode === MENU_LIST.VB_DI_DAPHATHANH) {
        hasVBPhatHanh = true;
      }
      if (menuConfig[i]?.menuCode === MENU_LIST.HANHCHINH_LICHTUAN) {
        hasLichTuan = true;
      }
    }
  }
  return (
    <View style={styles.container}>
      {hasVBDen && (
        <TouchableOpacity
          style={[styles.routeBtn, currentKey === 'vbDen' ? styles.currentRoute : null]}
          onPress={() => {
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
            resetDocuments();
            DocumentNavigation.goToVbDenCxl();
          }}
        >
          <Image style={styles.img} resizeMode="contain" source={Assets.docIn} />
          <Text style={[styles.label, currentKey === 'vbDen' ? styles.currentLabel : null]}>
            Văn bản đến
          </Text>
        </TouchableOpacity>
      )}
      {hasVBDuThao && (
        <TouchableOpacity
          style={[styles.routeBtn, currentKey === 'drafts' ? styles.currentRoute : null]}
          onPress={() => {
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
            resetDocuments();
            DocumentNavigation.goToDuThaoCxl();
          }}
        >
          <Image style={styles.img} resizeMode="contain" source={Assets.docOut} />
          <Text style={[styles.label, currentKey === 'drafts' ? styles.currentLabel : null]}>
            VB dự thảo
          </Text>
        </TouchableOpacity>
      )}
      {hasVBPhatHanh && (
        <TouchableOpacity
          style={[styles.routeBtn, currentKey === 'banHanh' ? styles.currentRoute : null]}
          onPress={() => {
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
            resetDocuments();
            DocumentNavigation.goToVbPhatHanh();
          }}
        >
          <View style={styles.banHanhImg}>
            <Image style={styles.img} resizeMode="contain" source={Assets.docOut} />
            <View style={styles.checkView}>
              <Icon name="check" style={styles.checkIcon} />
            </View>
          </View>
          <Text style={[styles.label, currentKey === 'banHanh' ? styles.currentLabel : null]}>
            VB phát hành
          </Text>
        </TouchableOpacity>
      )}
      {hasLichTuan && (
        <TouchableOpacity
          style={[styles.routeBtn, currentKey === 'LichTuan' ? styles.currentRoute : null]}
          onPress={() => {
            NavigationService.navigate('LichTuanScreen');
          }}
        >
          <View style={styles.banHanhImg}>
            <Image style={styles.img} resizeMode="contain" source={Assets.calendar} />
          </View>
          <Text style={[styles.label, currentKey === 'LichTuan' ? styles.currentLabel : null]}>
            Lịch tuần
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.routeBtn, currentKey === 'GhiChuStack' ? styles.currentRoute : null]}
        onPress={() => {
          NavigationService.navigate('GhiChuStack');
        }}
      >
        <View style={styles.banHanhImg}>
          <Image style={styles.img} resizeMode="contain" source={Assets.note} />
          {/*<Icon type="Feather" name="note" style={{color : colors.white}}/>*/}
        </View>
        <Text style={[styles.label, currentKey === 'GhiChuStack' ? styles.currentLabel : null]}>
          Ghi Chú
        </Text>
      </TouchableOpacity>
      {/*<TouchableOpacity*/}
      {/*  style={[styles.routeBtn, currentKey === 'Tasks' ? styles.currentRoute : null]}*/}
      {/*  onPress={() => NavigationService.navigate('Tasks')}*/}
      {/*>*/}
      {/*  <Image style={styles.img} resizeMode="contain" source={Assets.work} />*/}
      {/*  <Text style={[styles.label, currentKey === 'Tasks' ? styles.currentLabel : null]}>*/}
      {/*    Công việc*/}
      {/*  </Text>*/}
      {/*</TouchableOpacity>*/}
      {
      <TouchableOpacity
        style={[styles.routeBtn, currentKey === 'Administrative' ? styles.currentRoute : null]}
        onPress={() => navigation.navigate('HanhChinhModal')}
      >
        <Image style={styles.img} resizeMode="contain" source={Assets.service} />
        <Text style={[styles.label, currentKey === 'Administrative' ? styles.currentLabel : null]}>
          Hành chính
        </Text>
      </TouchableOpacity> }
    </View>
  );
};

RouteButtons.propTypes = {
  documentMode: PropTypes.number.isRequired,
  resetDocuments: PropTypes.func.isRequired,
  deptRole: PropTypes.shape({}).isRequired,
  setMenuConfigRdx: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  deptRole: selectors.deptRoleSelector(state),
  deptRoles: selectors.deptRolesSelector(state),
});
const mapDispatchToProps = {
  setDeptRole: authActions.changeDeptRole,
  setMenuConfigRdx: authActions.setMenuConfig,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteButtons);
