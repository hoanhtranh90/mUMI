import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import format from 'date-fns/format';

import DateRangeCalendarModal from 'eoffice/components/modals/DateRangeCalendarModal';
import colors from 'eoffice/utils/colors';
import listFilters from 'eoffice/utils/quick-filters';
import useModal from 'eoffice/utils/useModal';
import Filter from './Filter';
import filters from '../../../../utils/quick-filters';
import MenuPopupDocument from 'eoffice/components/MenuPopupDocument';
import { DOC_USER_STATUS, DRAFT_FILTERS, RELATION_TYPE } from 'eoffice/constants/documents';
import DeviceInfo from 'react-native-device-info';
import { convertQueryToTrinhQuaHan } from '../../../../utils/utils';

const createTimeMonthFilter = filters.find(filter => filter.id === 'createTimeMonthAgo');
const styles = StyleSheet.create({
  container: {
    // paddingVertical: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 25,
    // paddingTop: 10,
    // paddingLeft: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.gray,
    marginRight: 10,
  },
  titleDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  listContainer: {
    paddingTop: 12,
    paddingLeft: 15,
  },
});

const modes = [
  {
    label: 'Tất cả',
    type: 0,
    icon: 'menu',
  },
  {
    label: 'Chủ trì',
    type: 1,
    value: 0,
    icon: 'users',
  },
  {
    label: 'Phối hợp',
    type: 2,
    value: 2,
    icon: 'fast-forward',
  },
  {
    label: 'Nhận để biết',
    type: 3,
    value: 1,
    icon: 'clock',
  },
];

const modesToTrinh = [
  {
    label: 'Tất cả',
    type: DOC_USER_STATUS.TO_TRINH_CHUA_YK,
    icon: 'menu',
  },
  {
    label: 'Chưa xử lý',
    type: DOC_USER_STATUS.TO_TRINH_CXL,
    icon: 'users',
  },
  {
    label: 'Đã bình luận',
    type: DOC_USER_STATUS.TO_TRINH_DBL,
    icon: 'fast-forward',
  },
  {
    label: 'Đã xử lý',
    type: DOC_USER_STATUS.TO_TRINH_DCXL,
    icon: 'clock',
  },
];

const Separator = () => <View style={{ width: 12 }} />;

const DateFilter = ({ query, targetField, targetLabel, updateQuery, type, isIn, fromCXL }) => {
  const [filters, setFilters] = useState([]);
  const [isVisible, open, close] = useModal();

  const onMenuPress = (status, relationType, type, filterStatus) => {
    let queryNew = {
      type: type,
      processType: type === 1 ? 0 : type == 2 ? 2 : type === 3 ? 1 : null,
      status: query.status,
      docDate: createTimeMonthFilter.getValue(),
      filterLabel: createTimeMonthFilter.label,
      keyword: '',
      isRead: null,
    };
    if (query.toTrinhQuaHan) {
      const { toTrinhQuaHan, isCommented, status } = convertQueryToTrinhQuaHan(type);
      queryNew = {
        ...query,
        status: status,
        keyword: '',
        isRead: null,
        toTrinhQuaHan,
        isCommented,
      };
    }
    updateQuery(queryNew);
  };

  useEffect(() => {
    const list = listFilters.filter(filter => filter.target === targetField);
    setFilters([...list, { id: 'custom', label: 'Tuỳ chọn' }]);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginLeft: 25 }}>
        <MenuPopupDocument
          type={type}
          modes={query.toTrinhQuaHan ? modesToTrinh : modes}
          current={query}
          isIn={isIn}
          onChange={onMenuPress}
        />
        {fromCXL === 1 && (
          <TouchableOpacity
            style={{ alignSelf: 'center', width: 120 }}
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
      </View>
      <TouchableOpacity style={styles.titleContainer} onPress={open}>
        <Text style={styles.title}>{`${targetLabel}:`}</Text>
        {!!query[targetField] && (
          <Text style={styles.titleDate}>
            {`${format(query[targetField][0], 'dd/MM/yyyy')} - ${format(
              query[targetField][1],
              'dd/MM/yyyy'
            )}`}
          </Text>
        )}
      </TouchableOpacity>

      <FlatList
        data={filters}
        extraData={query}
        horizontal
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        keyExtractor={({ label, target }) => `${label}-${target}`}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <Filter
            {...item}
            onPress={value =>
              updateQuery({
                [targetField]: Array.isArray(value) ? value : item.getValue(),
                filterLabel: item.label,
              })
            }
            selected={item.label === query.filterLabel}
            current={query[targetField]}
          />
        )}
      />
      <DateRangeCalendarModal
        close={close}
        isVisible={isVisible}
        range={query[targetField]}
        onSuccess={(from, to) => {
          updateQuery({
            [targetField]: [
              new Date(from.year, from.month - 1, from.day),
              new Date(to.year, to.month - 1, to.day),
            ],
            filterLabel: 'Tuỳ chọn',
          });
          close();
        }}
      />
    </View>
  );
};

DateFilter.propTypes = {
  query: PropTypes.shape({}).isRequired,
  targetField: PropTypes.string.isRequired,
  targetLabel: PropTypes.string.isRequired,
  updateQuery: PropTypes.func.isRequired,
  fromCXL: PropTypes.number,
};

export default DateFilter;
