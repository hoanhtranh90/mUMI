import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

import { DOCUMENT_TYPE, MENU_LIST } from '../../constants/documents';
import colors from '../../utils/colors';
import * as DocumentNavigation from '../../utils/DocumentNavigation';
import NavigationService from '../../utils/NavigationService';
import Card from './Card';
import resources from './resources';
import store from '../../store';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  docCount: {
    fontSize: 15,
    color: colors.gray,
  },
  newWrapper: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.lighterGray,
    borderRadius: 4,
    marginLeft: 6,
  },
  newCount: {
    fontSize: 13,
    color: colors.green,
    fontWeight: '600',
  },
  taskCount: {
    fontSize: 24,
    fontWeight: '600',
  },
});

const Cards = ({ loading, report, resetDocuments, menuConfig, getMenuConfig,routeToLichTuan, roleId }) => {
  const checkExist = (data, item) => {
    if (data.length > 0) {
      for (let i = 0; i < data.length; i += 1) {
        if (data[i]?.menuCode === item) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <View
      style={{
        paddingHorizontal: 9,
        paddingVertical: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {checkExist(menuConfig, MENU_LIST.VB_DEN) && (
        <Card
          borderColor={colors.lightBlue}
          color={colors.blue}
          img={resources.vbDen}
          label="Văn bản đến"
          onPress={() => {
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
            resetDocuments();
            DocumentNavigation.goToVbDenCxl();
          }}
          sub={
            !loading && (
              <View style={styles.wrapper}>
                <Text style={styles.docCount}>{`${report?.countOfIncomingDoc} chờ xử lý`}</Text>
                <View style={styles.newWrapper}>
                  <Text style={styles.newCount}>{`${report?.countOfUnreadIncomingDoc} mới`}</Text>
                </View>
              </View>
            )
          }
        />
      )}
      {checkExist(menuConfig, MENU_LIST.VB_DI_DUTHAO) && (
        <Card
          borderColor={colors.lightBlue}
          color={colors.blue}
          img={resources.vbDi}
          label="Văn bản dự thảo"
          onPress={() => {
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
            resetDocuments();
            DocumentNavigation.goToDuThaoCxl();
          }}
          sub={
            !loading && (
              <View style={styles.wrapper}>
                <Text style={styles.docCount}>{`${report?.countOfOutGoingDoc} chờ xử lý`}</Text>
                <View style={styles.newWrapper}>
                  <Text style={styles.newCount}>{`${report?.countOfUnreadOutGoingDoc} mới`}</Text>
                </View>
              </View>
            )
          }
        />
      )}
      {checkExist(menuConfig, MENU_LIST.HANHCHINH_LICHTUAN) && (
        <Card
          borderColor={colors.lightBrown}
          color={colors.brown}
          img={resources.lichTuan}
          label="Lịch tuần"
          onPress={() => routeToLichTuan()}
        />
      )}
      {checkExist(menuConfig, MENU_LIST.CONGVIEC) && (
        <Card
          borderColor={colors.lightYellow}
          color={colors.yellow}
          img={resources.congViec}
          label="Công việc"
          onPress={() => NavigationService.navigate('Tasks')}
          sub={
            !loading && (
              <View style={styles.wrapper}>
                <Text style={styles.taskCount}>0</Text>
                <View style={styles.newWrapper}>
                  <Text style={styles.newCount}>0 mới</Text>
                </View>
              </View>
            )
          }
        />
      )}

    </View>
  );
};

Cards.propTypes = {
  loading: PropTypes.bool,
  report: PropTypes.shape({}),
  resetDocuments: PropTypes.func.isRequired,
  getMenuConfig: PropTypes.func.isRequired,
  roleId: PropTypes.string,
  menuConfig: PropTypes.arrayOf(PropTypes.shape({})),
};
Cards.defaultProps = {
  loading: true,
  report: null,
  roleId: '',
  menuConfig: [],
};

export default Cards;
