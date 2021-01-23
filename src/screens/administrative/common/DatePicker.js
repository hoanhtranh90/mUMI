import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import { Button, Text } from 'native-base';
import format from 'date-fns/format';
import DateTimePicker from 'react-native-modal-datetime-picker';
import _ from 'lodash';

const DatePicker = ({ textStyle, placeholderStyle, style, value, onChange, disabled, mode, placeholder }) => {
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const formatStr = mode === 'date' ? 'dd/MM/yyyy' : 'dd/MM/yyyy HH:mm';

  const getDate = day => {
    if (!day) {
      return placeholder ? placeholder : formatStr;
    }
    return format(day, formatStr);
  };

  return (
    <>
      <TouchableOpacity onPress={() => (!disabled ? setVisible(true) : null)} transparent style={style}>
        <Text style={value ? textStyle : placeholderStyle}>{`${getDate(value)}`}</Text>
      </TouchableOpacity>

      <DateTimePicker
        date={!_.isNull(value) ? value : new Date()}
        isVisible={visible}
        mode={mode ? mode : 'datetime'}
        onConfirm={date => {
          setVisible(false);
          onChange(date);
        }}
        onCancel={close}
      />
    </>
  );
};

DatePicker.propTypes = {
  placeholderStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
  textStyle: PropTypes.shape({}),
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Date),
  disabled: PropTypes.bool,
};
DatePicker.defaultProps = {
  placeholderStyle: {},
  style: {},
  textStyle: {},
  value: null,
  disabled: false,
  onChange() {},
};

export default DatePicker;
