import React from 'react';
import PropTypes from 'prop-types';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, CardItem, Icon, Text } from 'native-base';
import format from 'date-fns/format';

import colors from 'eoffice/utils/colors';
import useModal from 'eoffice/utils/useModal';
import { formatDate } from 'eoffice/utils/utils';

const calendarFormat = date => format(date, 'yyyy-MM-dd');

const getMinDate = current => calendarFormat(Math.min(current, new Date().getTime()));

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentTxt: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  icon: {
    marginTop: 0,
    paddingRight: 12,
    paddingLeft: 12,
    color: colors.darkGray,
  },
  newDate: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.gray,
  },
  hasValue: {
    color: colors.blue,
  },
});

const DeadlineField = ({ current, onChange, value }) => {
  const [isVisible, open, close] = useModal();
  const selected = calendarFormat(value || current);

  return (
    <>
      <TouchableOpacity onPress={open} style={styles.btn}>
        <Text style={styles.currentTxt}>{formatDate(current)}</Text>
        <Icon name="arrow-right" style={styles.icon} />
        <Text style={[styles.newDate, value ? styles.hasValue : null]}>
          {value ? formatDate(value) : 'dd/mm/yyyy'}
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={close}
        onBackdropPress={close}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
      >
        <Card>
          <CardItem>
            <Calendar
              current={calendarFormat(current)}
              minDate={getMinDate(current)}
              onDayPress={day => {
                onChange(day.timestamp);
                close();
              }}
              style={{ flex: 1 }}
              markedDates={{ [selected]: { selected: true } }}
            />
          </CardItem>
        </Card>
      </Modal>
    </>
  );
};

DeadlineField.propTypes = {
  onChange: PropTypes.func.isRequired,

  current: PropTypes.number,
  value: PropTypes.number,
};
DeadlineField.defaultProps = {
  current: null,
  value: null,
};

export default DeadlineField;
