import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import Assets from 'eoffice/assets';
import { DOCUMENT_TYPE } from 'eoffice/constants/documents';
import colors from 'eoffice/utils/colors';
import * as DocumentNavigation from 'eoffice/utils/DocumentNavigation';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import NavigationService from 'eoffice/utils/NavigationService';
import * as AppService from '../../../store/app/service';
import Card from './Card';
import DocumentRow from './DocumentRow';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 15,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 25,
    borderWidth: 2,
    borderColor: 'white',
    borderLeftColor: colors.lightGray,
    borderRightColor: colors.lightGray,
  },
  field: {
    backgroundColor: '#f8f9fd',
  },
});

const Cards = ({ changeDeptRole, deptRoles, resetDocuments, viewDocDetail }) => {
  const funcs = useRef({
    async onDocPress(item, mode) {
      const deptRole = deptRoles.find(
        userDeptRole =>
          userDeptRole.userId === item.userId &&
          userDeptRole.deptId === item.vbDocUserDeptId &&
          userDeptRole.roleId === item.vbDocUserRoleId
      );

      if (deptRole) {
        await changeDeptRole(deptRole);
        viewDocDetail(item);
        DocumentNavigation.goToSummary(mode);
        NavigationService.navigate('Details');
      }
    },
  });

  return (
    <View style={styles.field}>
      <View style={styles.container}>
        <Card
          stylesConfig={{
            marginTop: 0,
            marginBottom: 16,
            width: Math.floor(variables.deviceWidth / 2 - 50),
            height: variables.deviceHeight * 0.67,
            marginRight: 8,
          }}
          color={colors.blue}
          countPrefix="chờ xử lý"
          img={Assets.docIn}
          label="Văn bản đến"
          loadData={AppService.listDashboardIncomingDocs}
          onPress={() => {
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
            resetDocuments();
            DocumentNavigation.goToVbDenCxl();
          }}
          renderItem={item => (
            <DocumentRow
              {...item}
              onPress={() => funcs.current.onDocPress(item, DOCUMENT_TYPE.VB_DEN)}
            />
          )}
        />
        <Card
          stylesConfig={{
            marginTop: 0,
            marginBottom: 16,
            width: Math.floor(variables.deviceWidth / 2 - 50),
            height: variables.deviceHeight * 0.67,
            marginLeft: 8,
          }}
          color={colors.blue}
          countPrefix="văn bản"
          img={Assets.docOut}
          label="Văn bản dự thảo"
          loadData={AppService.listDashboardOutgoingDocs}
          onPress={() => {
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
            resetDocuments();
            DocumentNavigation.goToDuThaoCxl();
          }}
          renderItem={item => (
            <DocumentRow
              {...item}
              onPress={() => funcs.current.onDocPress(item, DOCUMENT_TYPE.VB_DI)}
            />
          )}
        />
        {/* <Card
        color={colors.yellow}
        img={Assets.work}
        label="Công việc"
        onPress={() => NavigationService.navigate('Tasks')}
      />
      <Card
        color={colors.green}
        img={Assets.service}
        label="Hành chính"
        onPress={() => NavigationService.navigate('HanhChinhModal')}
      /> */}
      </View>
    </View>
  );
};

Cards.propTypes = {
  changeDeptRole: PropTypes.func.isRequired,
  viewDocDetail: PropTypes.func.isRequired,
  resetDocuments: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
  deptRoles: PropTypes.arrayOf(PropTypes.shape({})),
};
Cards.defaultProps = {
  deptRoles: [],
};

export default Cards;
