import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Icon, Text } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import colors from 'eoffice/utils/colors';
import useModal from 'eoffice/utils/useModal';
import { formatTimestamp } from 'eoffice/utils/utils';
import { DOCUMENT_TYPE } from 'eoffice/constants/documents';
import { PROCESS_TYPE_TEXTS } from '../../constants/documents';
import { ACTION_LOGS } from 'eoffice/constants/documents';
import ToUsersModal from './ToUsersModal';
import BanHanhV2 from './ActionItemNew/BanHanhV2';
import HistoryTltvb from './ActionItemNew/HistoryTltvb';

const styles = StyleSheet.create({
  viewContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  leftCol: {
    flex: 1,
  },
  rightCol: {
    flex: 0,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  view: {
    marginTop: 4,
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    flex: 1,
  },
  icon: {
    fontSize: 16,
    paddingRight: 6,
  },
  textView: {
    fontSize: 15,
    color: colors.darkGray,
    flexWrap: 'wrap',
    flex: 1,
  },
  timestamp: {
    textAlign: 'right',
    fontSize: 13,
    color: colors.gray,
    fontStyle: 'italic',
  },
});

const HEADERS = {
  attachment: {
    icon: 'file-plus',
    label: 'Thêm văn bản liên quan',
    color: colors.yellow,
  },
  comment: {
    icon: 'feather',
    label: 'Bình luận',
    color: colors.yellow,
  },
};

const getHeader = (item, getActionLogHeader) => {
  if (item.dataType === 'actionLog') {
    return getActionLogHeader(item);
  }
  if (item.attachment) {
    return HEADERS.attachment;
  }

  return HEADERS.comment;
};

const getToUsersName = (toUsers, dataJson) => {
  if (toUsers) {
    if (Array.isArray(dataJson)) {
      if (dataJson[0]?.processType !== undefined) {
        if (toUsers.length === 1) {
          return `${toUsers[0].fullName || toUsers[0].deptName} (${
            PROCESS_TYPE_TEXTS[(dataJson[0]?.processType)]
          })`;
        }
        if (toUsers.length > 1) {
          const counter = toUsers[0].fullName ? 'người' : 'đơn vị';
          return `${toUsers[0].fullName || toUsers[0].deptName} (${
            PROCESS_TYPE_TEXTS[(dataJson[0]?.processType)]
          }) và ${toUsers.length - 1} ${counter} khác`;
        }
      } else {
        if (toUsers.length === 1) {
          return `${toUsers[0].fullName || toUsers[0].deptName}`;
        }
        if (toUsers.length > 1) {
          const counter = toUsers[0].fullName ? 'người' : 'đơn vị';
          return `${toUsers[0].fullName || toUsers[0].deptName} và ${toUsers.length -
            1} ${counter} khác`;
        }
      }
    } else {
      if (toUsers.length === 1) {
        return `${toUsers[0].fullName || toUsers[0].deptName}`;
      }
      if (toUsers.length > 1) {
        const counter = toUsers[0].fullName ? 'người' : 'đơn vị';
        return `${toUsers[0].fullName || toUsers[0].deptName} và ${toUsers.length -
          1} ${counter} khác`;
      }
    }
  }
  return '';
};

const HistoryItemHeader = ({ getActionLogHeader, item, mode }) => {
  const { icon, iconType, label, color, labelSuffix } = getHeader(item, getActionLogHeader);
  const [isVisible, open, close] = useModal();
  const hasToUsers =
    item.dataType === 'actionLog' && item.toUsers && item.toUsers?.length > 0 && item.toUsers[0].id;
  const hasHieuChinhToUser =
    item.actionName === 'hieuChinhBanHanhCaNhan' && item.dataJson[0].receivedName;
  const lstBanHanh = () => {
    let lstObjBanHanh = item.dataJson.departments;
    if (lstObjBanHanh !== null && lstObjBanHanh.length > 0) {
      return lstObjBanHanh.map(each => each.deptNameShort).join(',');
    } else {
      return [];
    }
  };

  return (
    <Grid style={styles.viewContainer}>
      <Row>
        <Col style={styles.leftCol}>
          <Text style={styles.text}>
            {ACTION_LOGS.ACTION_NAMES.BAN_HANH_TOI === item.actionName
              ? item.dataJson.vbOutgoingDoc.publisherName
              : item.creatorName}
          </Text>
        </Col>
        <Col style={styles.rightCol}>
          <Text style={styles.timestamp}>{formatTimestamp(item.createTime)}</Text>
        </Col>
      </Row>
      {ACTION_LOGS.ACTION_NAMES.BAN_HANH_V2 === item.actionName && <BanHanhV2 item={item} />}
      {ACTION_LOGS.ACTION_NAMES.HE_THONG_BAN_HANH === item.actionName && (
        <HistoryTltvb item={item} />
      )}
      {ACTION_LOGS.ACTION_NAMES.BAN_HANH_V2 !== item.actionName &&
        ACTION_LOGS.ACTION_NAMES.HE_THONG_BAN_HANH !== item.actionName &&
        (ACTION_LOGS.ACTION_NAMES.BAN_HANH_TOI === item.actionName ? (
          <Row style={styles.view} onPress={hasToUsers ? open : undefined}>
            {!!icon && <Icon name={icon} type={iconType} style={[styles.icon, { color }]} />}
            <Text style={[styles.textView, { color }]}>
              <Text style={[styles.textView, { color: '#007aff' }]}>Ban hành văn bản đến</Text>
              <Text style={[styles.textView, { color: '#000000', fontWeight: 'bold' }]}>
                {' '}
                {lstBanHanh()}
              </Text>
            </Text>
          </Row>
        ) : (
          <Row style={styles.view} onPress={hasToUsers ? open : undefined}>
            {!!icon && <Icon name={icon} type={iconType} style={[styles.icon, { color }]} />}
            <Text style={[styles.textView, { color }]}>
              {label}
              {hasToUsers && (
                <Text style={[styles.textView, { color }]}>
                  {` ${labelSuffix} ${getToUsersName(item.toUsers, item.dataJson)}`}
                </Text>
              )}
              {hasHieuChinhToUser && (
                <Text style={[styles.textView, { color }]}>
                  {` ${labelSuffix} ${item.dataJson[0].receivedName}`}
                </Text>
              )}
            </Text>
          </Row>
        ))}
      {hasToUsers && (
        <ToUsersModal
          isVisible={isVisible}
          onClose={close}
          toUsers={item.toUsers}
          dataJson={
            mode === DOCUMENT_TYPE.VB_DEN && Array.isArray(item.dataJson) ? item.dataJson : []
          }
        />
      )}
    </Grid>
  );
};

HistoryItemHeader.propTypes = {
  getActionLogHeader: PropTypes.func.isRequired,
  mode: PropTypes.number.isRequired,
  item: PropTypes.shape({}),
};
HistoryItemHeader.defaultProps = {
  item: {},
};

export default HistoryItemHeader;
