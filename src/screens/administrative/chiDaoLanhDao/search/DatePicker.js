import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Button, Card, CardItem, Text } from 'native-base';
import format from 'date-fns/format';
import { Calendar } from 'react-native-calendars';
import _ from 'lodash';

const getDate = day => {
  if (!day) {
    return 'dd/mm/yyyy';
  }
  return format(day, 'dd/MM/yyyy');
};

const convertDate = date => {
  if (!date) {
    return null;
  }
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    timestamp: date.getTime(),
    dateString: format(date, 'yyyy-MM-dd'),
  };
};

const DatePicker = ({ textStyle, placeholderStyle, style, value, isStarTime, onChange }) => {
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const [dateSelected, setDateSelected] = useState(convertDate(value));
  return (
    <>
      <Button onPress={() => setVisible(true)} transparent style={style}>
        <Text style={value ? textStyle : placeholderStyle}>{`${getDate(value)}`}</Text>
      </Button>
      <Modal
        isVisible={visible}
        onBackButtonPress={close}
        onBackdropPress={close}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
      >
        <Card>
          <CardItem>
            <Calendar
              markingType="custom"
              current={value}
              markedDates={{
                [!_.isNull(dateSelected) ? dateSelected.dateString : '']: {
                  startingDay: true,
                  customStyles: {
                    container: {
                      backgroundColor: '#025aaa',
                    },
                    text: {
                      color: '#fff',
                    },
                  },
                },
              }}
              onDayPress={day => {
                setDateSelected(day);
                setVisible(false);
                if (isStarTime) {
                  onChange(new Date(`${day.dateString.replace(/-/g, '/')} 00:00`));
                } else {
                  onChange(new Date(`${day.dateString.replace(/-/g, '/')} 23:59`));
                }
              }}
              style={{ flex: 1 }}
            />
          </CardItem>
        </Card>
      </Modal>
    </>
  );
};

DatePicker.propTypes = {
  placeholderStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
  isStarTime: PropTypes.bool,
  textStyle: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
};
DatePicker.defaultProps = {
  placeholderStyle: {},
  style: {},
  isStarTime: false,
  textStyle: {},
  value: null,
};

export default DatePicker;
