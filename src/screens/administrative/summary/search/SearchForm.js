import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'native-base';
import { ADVANCE_SEARCH_LABELS } from 'eoffice/constants/administrative';
import IconField from 'eoffice/components/IconField';
import styles from './AdvancedSearch.styles';
import DatePicker from './DatePicker';

const SearchForm = ({ query, state, setValue }) => {
  useEffect(() => {
    if (query.startTime) {
      setValue('startDate', new Date(query.startTime));
    }

    if (query.endTime) {
      setValue('endDate', new Date(query.endTime));
    }
  }, []);
  return (
    <Form style={styles.form}>
      <IconField label={ADVANCE_SEARCH_LABELS.startDate} iconName="calendar">
        <DatePicker
          placeholderStyle={styles.pickerPlaceholder}
          style={styles.picker}
          textStyle={styles.pickerText}
          value={state.startDate}
          onChange={date => setValue('startDate', date)}
          isStarTime
        />
      </IconField>
      <IconField label={ADVANCE_SEARCH_LABELS.endDate} iconName="calendar">
        <DatePicker
          placeholderStyle={styles.pickerPlaceholder}
          style={styles.picker}
          textStyle={styles.pickerText}
          value={state.endDate}
          onChange={date => setValue('endDate', date)}
        />
      </IconField>
    </Form>
  );
};

SearchForm.propTypes = {
  setValue: PropTypes.func,
  state: PropTypes.shape({}),
  query: PropTypes.shape({}).isRequired,
};
SearchForm.defaultProps = {
  setValue() {},
  state: {},
};

export default SearchForm;
