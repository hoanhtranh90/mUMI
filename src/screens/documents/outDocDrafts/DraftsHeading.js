import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import DeviceInfo from 'react-native-device-info';

import HorizontalFilters from 'eoffice/components/HorizontalFilters';
import ModeSwitches from 'eoffice/components/ModeSwitches';
import MenuPopupDocument from 'eoffice/components/MenuPopupDocument';
import { DOC_USER_STATUS, DRAFT_FILTERS, RELATION_TYPE } from 'eoffice/constants/documents';
import colors from 'eoffice/utils/colors';
import DateFilters from '../common/DateFilters';
import DateFiltersDocument from '../common/DateFiltersDocument';
import filters from '../../../utils/quick-filters';

const createTimeMonthFilter = filters.find(filter => filter.id === 'createTimeMonthAgo');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 6,
  },
  labelWrapper: {
    paddingTop: 20,
    paddingBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.gray,
    marginRight: 10,
  },
});

const modes = [
  {
    label: 'Chờ xử lý',
    type: 1,
    value: DOC_USER_STATUS.CHO_XU_LY,
    icon: 'clock',
    relationType: null,
  },
  {
    label: 'Đã xử lý',
    type: 2,
    value: DOC_USER_STATUS.DA_XU_LY,
    icon: 'fast-forward',
    relationType: null,
  },
  {
    label: 'Phối hợp',
    type: 3,
    value: -1,
    icon: 'users',
    relationType: RELATION_TYPE.NGUOI_PHOI_HOP,
  },
  {
    label: 'Uỷ quyền',
    type: 4,
    value: -1,
    icon: 'user-check',
    relationType: RELATION_TYPE.NGUOI_UY_QUYEN,
  },
];

const DraftsHeading = ({ query, updateQuery, fromPH }) => {
  const { typeDoc } = query;
  return (
    <View style={styles.container}>
      {!DeviceInfo.isTablet() && <DateFiltersDocument targetField="createTime" />}
      {fromPH === 1 && (
        <TouchableOpacity
          style={{ width: 120 }}
          onPress={(status, relationType, type, filterStatus) => {
            updateQuery({
              // type: type,
              // processType: type === 1 ? 0 : type == 2 ? 2 : type === 3 ? 1 : null,
              // status: query.status,
              // docDate: createTimeMonthFilter.getValue(),
              // filterLabel: createTimeMonthFilter.label,
              // keyword: '',
              // isRead: 0,
              ...query,
              isRead: 0,
            });
          }}
        >
          <Text style={styles.title}>CHƯA ĐỌC</Text>
        </TouchableOpacity>
      )}
      {typeDoc === 'duthao' ? (
        <View style={{ marginTop: 6 }}>
          <HorizontalFilters
            query={query}
            filters={DRAFT_FILTERS}
            onFilter={filter => {
              updateQuery({ docStatus: filter });
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

DraftsHeading.propTypes = {
  query: PropTypes.shape({}).isRequired,
  updateQuery: PropTypes.func.isRequired,
};

export default DraftsHeading;
