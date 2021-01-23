import React, { useState } from 'react';
import { StatusBar, Platform, View, Dimensions, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Card, CardItem } from 'native-base';
import Filter from '../../screens/documents/common/DateFiltersDocument/Filter';

import DateRangeCalendar from '../DateRangeCalendar';
const widthS = Dimensions.get('window').width
const DateRangeCalendarModalTablet = ({ close, isVisible, onSuccess, range }) => {
  const [filters, setFilters] = useState([]);
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={close}
      onBackdropPress={close}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
    >
      {Platform.OS === 'android' ? <StatusBar backgroundColor="rgba(0,0,0,0.5)" /> : null}

      <Card style={{ flexDirection: 'row' }}>
        <CardItem style={{ width: 180, backgroundColor: 'red' }}>
          <FlatList
            data={filters}
            extraData={query}
            horizontal
            contentContainerStyle={[styles.listContainer, { paddingTop: DeviceInfo.isTablet() ? 8 : 0 }]}
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
        </CardItem>
        <CardItem style={{ width: widthS - 300 }}>
          <DateRangeCalendar initialRange={range} onSuccess={onSuccess} style={{ flex: 1 }} />
        </CardItem>
      </Card>
    </Modal>
  )
};

DateRangeCalendarModalTablet.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  range: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        dateString: PropTypes.string,
        timestamp: PropTypes.number,
      }),
      PropTypes.instanceOf(Date),
    ])
  ).isRequired,

  close: PropTypes.func,
  isVisible: PropTypes.bool,
};
DateRangeCalendarModalTablet.defaultProps = {
  close() { },
  isVisible: false,
};

export default DateRangeCalendarModalTablet;
