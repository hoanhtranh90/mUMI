import React from 'react';
import { StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Card, CardItem } from 'native-base';

import DateRangeCalendar from '../DateRangeCalendar';

const DateRangeCalendarModal = ({ close, isVisible, onSuccess, range }) => (
  <Modal
    isVisible={isVisible}
    onBackButtonPress={close}
    onBackdropPress={close}
    animationIn="fadeInUp"
    animationOut="fadeOutDown"
  >
    {Platform.OS === 'android' ? <StatusBar backgroundColor="rgba(0,0,0,0.5)" /> : null}

    <Card>
      <CardItem>
        <DateRangeCalendar initialRange={range} onSuccess={onSuccess} style={{ flex: 1 }} />
      </CardItem>
    </Card>
  </Modal>
);

DateRangeCalendarModal.propTypes = {
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
DateRangeCalendarModal.defaultProps = {
  close() {},
  isVisible: false,
};

export default DateRangeCalendarModal;
