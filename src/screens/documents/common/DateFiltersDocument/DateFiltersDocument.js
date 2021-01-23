import React, { useEffect, useState } from 'react';
import PropTypes, { number } from 'prop-types';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import format from 'date-fns/format';
import Modal from 'react-native-modal';
import { Card, CardItem, Icon } from 'native-base';
import DateRangeCalendarModal from 'eoffice/components/modals/DateRangeCalendarModal';
import DateRangeCalendarModalTablet from 'eoffice/components/modals/DateRangeCalendarModalTablet';
import colors from 'eoffice/utils/colors';
import listFilters from 'eoffice/utils/quick-filters';
import useModal from 'eoffice/utils/useModal';
import Filter from './Filter';
import MenuPopupDocument from 'eoffice/components/MenuPopupDocument';
import { DOC_USER_STATUS, DRAFT_FILTERS, RELATION_TYPE } from 'eoffice/constants/documents';
import DeviceInfo from 'react-native-device-info';
import store from '../../../../store';
import DateRangeCalendar from '../../../../components/DateRangeCalendar';
import filters from '../../../../utils/quick-filters';

const createTimeMonthFilter = filters.find(filter => filter.id === 'createTimeMonthAgo');
const widthS = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    // borderWidth: 0.5,
    // backgroundColor: '#87CEFF',
    // borderColor: colors.blue,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 10,
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
    color: colors.blue,
    marginLeft: 4,
  },
  listContainer: {
    paddingTop: 0,
  },
  touchableCalendar: {
    backgroundColor: 'white',
    borderColor: 'rgba(0, 122, 255, 0.2)',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 50,
    width: 270,
    justifyContent: 'center',
  },
});

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
  {
    label: 'CC',
    type: null,
    value: null,
    icon: 'link',
    relationType: 'nguoiDcCC',
    filterStatus: 'cc',
    isLanhDao: true,
  },
];

const Separator = () => <View style={{ width: 12 }} />;

const DateFilter = ({ query, targetField, targetLabel, updateQuery, mode, fromPH }) => {
  const [filters, setFilters] = useState([]);
  const [isVisibleListDate, showHideListData] = useState(false);
  const [isVisible, open, close] = useModal();
  const targetDate = mode === 1 ? 'docDate' : 'createTime';
  useEffect(() => {
    const list = listFilters.filter(filter => filter.target === targetDate);
    setFilters([...list, { id: 'custom', label: 'Tuỳ chọn' }]);
  }, []);
  let arrayMenuPopup = query.typeDoc === 'duthao' ? modesDuThao : modesPhatHanh;
  const checkLanhDao = store.getState().auth.deptRole.roleCode === 'lanhdao';
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        {!DeviceInfo.isTablet() && (
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <MenuPopupDocument
              checkLanhDao={checkLanhDao}
              modes={arrayMenuPopup}
              current={query}
              onChange={(status, relationType, type, filterStatus) => {
                updateQuery({
                  status,
                  relationType,
                  sort: 'updateTime',
                  type,
                  filterStatus,
                  createTime: createTimeMonthFilter.getValue(),
                  filterLabel: createTimeMonthFilter.label,
                  isRead: null,
                });
              }}
            />
          </View>
        )}
        <TouchableOpacity
          style={[
            DeviceInfo.isTablet() ? styles.touchableCalendar : styles.titleContainer,
            { paddingLeft: DeviceInfo.isTablet() ? 0 : 10 },
          ]}
          onPress={() => (DeviceInfo.isTablet() ? open() : showHideListData(!isVisibleListDate))}
        >
          {!!query[targetDate] && (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: DeviceInfo.isTablet() ? '#ffffff' : '#E9F3FF',
                padding: 4,
                borderRadius: 8,
              }}
            >
              <Icon
                name={'calendar'}
                type="Feather"
                style={{ color: colors.blue, fontSize: 18, marginLeft: 6 }}
              />
              <Text style={styles.titleDate}>
                {`${format(query[targetDate][0], 'dd/MM/yyyy')} - ${format(
                  query[targetDate][1],
                  'dd/MM/yyyy'
                )}`}
              </Text>
              <Icon
                name={isVisibleListDate ? 'eye-off' : 'eye'}
                type="Feather"
                style={{ color: colors.blue, fontSize: 18, marginLeft: 6 }}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {isVisibleListDate && (
        <FlatList
          data={filters}
          extraData={query}
          horizontal
          contentContainerStyle={[
            styles.listContainer,
            { paddingTop: DeviceInfo.isTablet() ? 8 : 0 },
          ]}
          showsHorizontalScrollIndicator={false}
          keyExtractor={({ label, target }) => `${label}-${target}`}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <Filter
              {...item}
              onPress={value => {
                updateQuery({
                  [targetDate]: Array.isArray(value) ? value : item.getValue(),
                  filterLabel: item.label,
                });
                showHideListData(!isVisibleListDate);
              }}
              selected={item.label === query.filterLabel}
              current={query[targetDate]}
            />
          )}
        />
      )}
      {!DeviceInfo.isTablet() && (
        <DateRangeCalendarModal
          close={close}
          isVisible={isVisible}
          range={query[targetDate]}
          onSuccess={(from, to) => {
            updateQuery({
              [targetDate]: [
                new Date(from.year, from.month - 1, from.day),
                new Date(to.year, to.month - 1, to.day),
              ],
              filterLabel: 'Tuỳ chọn',
            });
            close();
          }}
        />
      )}
      {/* <DateRangeCalendarModalTablet
        close={close}
        isVisible={isVisible}
        range={query[targetDate]}
        onSuccess={(from, to) => {
          updateQuery({
            [targetDate]: [
              new Date(from.year, from.month - 1, from.day),
              new Date(to.year, to.month - 1, to.day),
            ],
            filterLabel: 'Tuỳ chọn',
          });
          close();
        }}
      /> */}
      {DeviceInfo.isTablet() && (
        <Modal
          isVisible={isVisible}
          onBackButtonPress={close}
          onBackdropPress={close}
          animationIn="fadeInUp"
          animationOut="fadeOutDown"
        >
          <Card style={{ flexDirection: 'row' }}>
            <CardItem style={{ width: 180 }}>
              <FlatList
                data={filters}
                extraData={query}
                contentContainerStyle={[
                  styles.listContainer,
                  { paddingTop: DeviceInfo.isTablet() ? 8 : 0 },
                ]}
                showsHorizontalScrollIndicator={false}
                keyExtractor={({ label, target }) => `${label}-${target}`}
                ItemSeparatorComponent={Separator}
                renderItem={({ item }) => {
                  if (item.id === 'custom') return <View />;
                  return (
                    <View style={{ marginTop: 10 }}>
                      <Filter
                        {...item}
                        onPress={value => {
                          close();
                          updateQuery({
                            [targetDate]: Array.isArray(value) ? value : item.getValue(),
                            filterLabel: item.label,
                          });
                        }}
                        selected={item.label === query.filterLabel}
                        current={query[targetDate]}
                      />
                    </View>
                  );
                }}
              />
            </CardItem>
            <CardItem style={{ width: widthS - 300 }}>
              <DateRangeCalendar
                initialRange={query[targetDate]}
                onSuccess={(from, to) => {
                  updateQuery({
                    [targetDate]: [
                      new Date(from.year, from.month - 1, from.day),
                      new Date(to.year, to.month - 1, to.day),
                    ],
                    filterLabel: 'Tuỳ chọn',
                  });
                  close();
                }}
                style={{ width: widthS - 320 }}
              />
            </CardItem>
          </Card>
        </Modal>
      )}
    </View>
  );
};

DateFilter.propTypes = {
  query: PropTypes.shape({}).isRequired,
  targetDate: PropTypes.string.isRequired,
  targetLabel: PropTypes.string.isRequired,
  updateQuery: PropTypes.func.isRequired,
  mode: number,
};

export default DateFilter;
