import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { DOCUMENT_TYPE } from '../../constants/documents';
import colors from '../../utils/colors';
import * as DocumentNavigation from '../../utils/DocumentNavigation';
import NavigationService from '../../utils/NavigationService';
import resources from './resources';
import SummaryItemRow from './SummaryItemRow';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  position: {
    marginTop: 7,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#eef0f2',
    borderRadius: 15.5,
  },
  positionIcon: {
    fontSize: 16,
    color: colors.darkGray,
    marginRight: 12,
  },
  positionText: {
    textAlign: 'center',
    fontSize: 14,
  },
  selected: {
    color: colors.blue,
  },
});

const SummaryItem = ({
  countOfIncomingDoc,
  countOfOutGoingDoc,
  countOfUnreadBanHanhOutGoingDoc,
  countOfUnreadIncomingDoc,
  countOfUnreadOutGoingDoc,
  width,
  resetDocuments,
  getMenuConfig,
  roleId,
}) => (
  <View style={[styles.wrapper, { width }]}>
    {countOfIncomingDoc !== null && (
      <SummaryItemRow
        count={countOfIncomingDoc}
        countNew={countOfUnreadIncomingDoc}
        label="Văn bản đến"
        imgSrc={resources.vbDen}
        onPress={() => {
          DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
          resetDocuments();
          DocumentNavigation.goToVbDenCxl();
        }}
      />
    )}
    {countOfOutGoingDoc !== null && (
      <SummaryItemRow
        count={countOfOutGoingDoc}
        countNew={countOfUnreadOutGoingDoc}
        label="Văn bản dự thảo"
        imgSrc={resources.vbDi}
        onPress={() => {
          DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
          resetDocuments();
          DocumentNavigation.goToDuThaoCxl();
        }}
      />
    )}
    {countOfUnreadBanHanhOutGoingDoc !== null && (
      <SummaryItemRow
        count={countOfUnreadBanHanhOutGoingDoc}
        label="Đã phát hành"
        imgSrc={resources.banHanh}
        onPress={() => {
          DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
          resetDocuments();
          DocumentNavigation.goToVbPhatHanh();
        }}
      />
    )}

    {countOfUnreadIncomingDoc !== null && (
      <SummaryItemRow
        count={0}
        countNew={0}
        label="Công việc"
        imgSrc={resources.congViec}
        onPress={() => NavigationService.navigate('Tasks')}
      />
    )}

    {/* {countOfUnreadOutGoingDoc != null && (
      <SummaryItemRow
        count={0}
        countNew={0}
        label="Hành chính"~
        imgSrc={resources.hanhChinh}
        onPress={() => NavigationService.navigate('HanhChinhModal')}
      />
    )} */}

    {/* <View style={styles.position}>
      <Icon name="user" style={[styles.positionIcon, selected === true ? styles.selected : null]} />
      <Text
        numberOfLines={3}
        style={[styles.positionText, selected === true ? styles.selected : null]}
      >
        {userDeptRole.positionName}
        {userDeptRole.deptName ? ` - ${userDeptRole.deptName}` : ''}
      </Text>
    </View> */}
  </View>
);

SummaryItem.propTypes = {
  width: PropTypes.number.isRequired,
  userDeptRole: PropTypes.shape({
    id: PropTypes.string.isRequired,
    positionName: PropTypes.string.isRequired,
  }).isRequired,

  countOfIncomingDoc: PropTypes.number,
  countOfOutGoingDoc: PropTypes.number,
  countOfUnreadBanHanhOutGoingDoc: PropTypes.number,
  countOfUnreadIncomingDoc: PropTypes.number,
  countOfUnreadOutGoingDoc: PropTypes.number,
  deptRole: PropTypes.string,
  selected: PropTypes.bool,
  resetDocuments: PropTypes.func.isRequired,
  getMenuConfig: PropTypes.func.isRequired,
};
SummaryItem.defaultProps = {
  countOfIncomingDoc: 0,
  countOfOutGoingDoc: 0,
  countOfUnreadBanHanhOutGoingDoc: 0,
  countOfUnreadIncomingDoc: 0,
  countOfUnreadOutGoingDoc: 0,
  roleId: null,
};

export default SummaryItem;
