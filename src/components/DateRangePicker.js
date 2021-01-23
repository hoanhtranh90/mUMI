import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import format from 'date-fns/format';

import DateRangeCalendarModal from './modals/DateRangeCalendarModal';
import colors from '../utils/colors';

const styles = StyleSheet.create({
  placeholder: {
    color: colors.gray,
    paddingLeft: 0,
    fontWeight: 'bold',
    fontSize: 17,
  },
  text: {
    color: colors.darkGray,
    paddingLeft: 0,
    paddingRight: 0,
    flexShrink: 1,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

const getDate = day => {
  if (!day) {
    return 'dd/mm/yyyy';
  }
  return format(day, 'dd/MM/yyyy');
};
const convertDate = date => {
  if (!date) {
    return undefined;
  }
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    timestamp: date.getTime(),
    dateString: format(date, 'yyyy-MM-dd'),
  };
};

const DateRangePicker = ({ label, onChange, style, value }) => {
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const [fromDate, toDate] = value;
  const [range, setRange] = useState([]);

  useEffect(
    () => {
      const [from, to] = value;
      const convertedFrom = convertDate(from);
      if (convertedFrom?.dateString !== range[0]?.dateString) {
        setRange([convertedFrom, convertDate(to)]);
      }
    },
    [value]
  );

  return (
    <>
      <Button onPress={() => setVisible(true)} transparent style={style}>
        {label || (
          <Text uppercase={false} style={fromDate ? styles.text : styles.placeholder}>
            {`${getDate(fromDate)} - ${getDate(toDate)}`}
          </Text>
        )}
      </Button>
      <DateRangeCalendarModal
        close={close}
        isVisible={visible}
        range={range}
        onSuccess={(from, to) => {
          setRange([from, to]);
          setVisible(false);
          onChange([
            new Date(from.year, from.month - 1, from.day),
            new Date(to.year, to.month - 1, to.day),
          ]);
        }}
      />
    </>
  );
};

DateRangePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,

  label: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({})), PropTypes.shape({})]),
};
DateRangePicker.defaultProps = {
  label: null,
  style: {},
};

export default DateRangePicker;
