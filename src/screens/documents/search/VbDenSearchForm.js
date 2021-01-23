import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'native-base';

import { ADVANCE_SEARCH_LABELS, DOC_USER_STATUS } from 'eoffice/constants/documents';
import DateRangePicker from 'eoffice/components/DateRangePicker';
import IconField from 'eoffice/components/IconField';
import Picker from 'eoffice/components/Picker';
import styles from './AdvancedSearch.styles';
import colors from '../../../utils/colors';

const VbDenSearchForm = ({ departments, setValue, state, status }) => (
  <Form style={styles.form}>
    <IconField label={ADVANCE_SEARCH_LABELS.docCode} iconName="book" highlight={!!state.docCode}>
      <Input
        placeholder="-"
        placeholderTextColor={colors.gray}
        value={state.docCode}
        onChangeText={txt => setValue('docCode', txt)}
      />
    </IconField>
    <IconField label={ADVANCE_SEARCH_LABELS.quote} iconName="type" highlight={!!state.quote}>
      <Input
        placeholder="-"
        placeholderTextColor={colors.gray}
        value={state.quote}
        onChangeText={txt => setValue('quote', txt)}
      />
    </IconField>
    <IconField
      label={ADVANCE_SEARCH_LABELS.fileContent}
      iconName="file-text"
      highlight={!!state.fileContent}
    >
      <Input
        placeholder="-"
        placeholderTextColor={colors.gray}
        value={state.fileContent}
        onChangeText={txt => setValue('fileContent', txt)}
      />
    </IconField>
    <IconField
      label={ADVANCE_SEARCH_LABELS.docDate}
      iconName="calendar"
      highlight={!!state.docDate[0]}
    >
      <DateRangePicker value={state.docDate} onChange={range => setValue('docDate', range)} />
    </IconField>
    <IconField
      label={ADVANCE_SEARCH_LABELS.publisherIdDen}
      iconName="edit-2"
      highlight={!!state.publisherId}
    >
      <Picker
        mode="dropdown"
        placeholder="-"
        selectedValue={state.publisherId}
        onValueChange={val => setValue('publisherId', val === state.publisherId ? undefined : val)}
        items={departments.map(({ id, deptName }) => ({
          label: deptName,
          value: id,
        }))}
      />
    </IconField>
    <IconField
      label={ADVANCE_SEARCH_LABELS.outsidePublisherName}
      iconName="edit-2"
      highlight={!!state.outsidePublisherName}
    >
      <Input
        placeholder="-"
        placeholderTextColor={colors.gray}
        value={state.outsidePublisherName}
        onChangeText={txt => setValue('outsidePublisherName', txt)}
      />
    </IconField>
  </Form>
);

VbDenSearchForm.propTypes = {
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      deptName: PropTypes.string.isRequired,
    })
  ).isRequired,

  setValue: PropTypes.func,
  state: PropTypes.shape({}),
  status: PropTypes.number,
};
VbDenSearchForm.defaultProps = {
  setValue() { },
  state: {},
  status: null,
};

export default VbDenSearchForm;
