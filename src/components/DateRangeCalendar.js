import React from 'react';
import PropTypes from 'prop-types';
import { Calendar } from 'react-native-calendars';

import colors from 'eoffice/utils/colors';
import useDateMarker from './useDateMarker';

const DateRangeCalendar = ({ initialRange, onSuccess, ...restProps }) => {
  const [state, onDayPressed] = useDateMarker({
    initialRange,
    onSuccess,
    mark: {
      color: colors.blue,
      textColor: '#fff',
    },
  });

  return (
    <Calendar
      {...restProps}
      markingType="period"
      current={state.fromDate}
      markedDates={state.markedDates}
      onDayPress={onDayPressed}
    />
  );
};

DateRangeCalendar.propTypes = {
  onSuccess: PropTypes.func.isRequired,

  initialRange: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        dateString: PropTypes.string,
        timestamp: PropTypes.number,
      }),
      PropTypes.instanceOf(Date),
    ])
  ),
};
DateRangeCalendar.defaultProps = {
  initialRange: null,
};

export default DateRangeCalendar;
