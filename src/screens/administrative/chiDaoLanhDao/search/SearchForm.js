import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Textarea } from 'native-base';
import {
  ADVANCE_SEARCH_LABELS,
  SECTOR,
  PROGRESS,
  COMMAND_STATUS,
} from 'eoffice/constants/administrative';
import IconField from 'eoffice/components/IconField';
import colors from 'eoffice/utils/colors';
import _ from 'lodash';
import Picker from 'eoffice/components/Picker';
import styles from './AdvancedSearch.styles';
import DatePicker from './DatePicker';

const SearchForm = ({ state, setValue, ldDonVi, dvChuTri, query }) => {
  const initSearch = () => {
    if (query.meeting) {
      setValue('meeting', query.meeting);
    }

    if (query.sector) {
      _.forEach(SECTOR, obj => {
        if (obj.value === query.sector) {
          setValue('sector', obj);
        }
      });
    }

    if (query.conclusion) {
      setValue('conclusion', query.conclusion);
    }

    if (query.directiveId) {
      _.forEach(ldDonVi, obj => {
        if (obj.id === query.directiveId) {
          setValue('directiveId', obj);
        }
      });
    }

    if (query.performId) {
      _.forEach(ldDonVi, obj => {
        if (obj.id === query.performId) {
          setValue('performId', obj);
        }
      });
    }

    if (query.deptId) {
      _.forEach(dvChuTri, obj => {
        if (obj.id === query.deptId) {
          setValue('deptId', obj);
        }
      });
    }

    if (query.progress) {
      _.forEach(PROGRESS, obj => {
        if (obj.value === query.progress) {
          setValue('progress', obj);
        }
      });
    }

    if (query.commandsStatus) {
      _.forEach(COMMAND_STATUS, obj => {
        if (obj.value === query.commandsStatus) {
          setValue('commandsStatus', obj);
        }
      });
    }

    if (query.startTimeCommand) {
      setValue('startTimeCommand', new Date(query.startTimeCommand));
    }

    if (query.endTimeCommand) {
      setValue('endTimeCommand', new Date(query.endTimeCommand));
    }

    if (query.startTimeDeadline) {
      setValue('startTimeDeadline', new Date(query.startTimeDeadline));
    }

    if (query.endTimeDeadline) {
      setValue('endTimeDeadline', new Date(query.endTimeDeadline));
    }

    if (query.startTimeFinish) {
      setValue('startTimeFinish', new Date(query.startTimeFinish));
    }

    if (query.endTimeFinish) {
      setValue('endTimeFinish', new Date(query.endTimeFinish));
    }
  };

  useEffect(() => {
    // initSearch();
  }, []);

  const selectIcon = (
    <Icon
      name="chevron-down"
      type="Feather"
      style={{ fontSize: 16, color: '#fff', marginRight: 0 }}
    />
  );
  return (
    <Form style={styles.form}>
      <IconField label={ADVANCE_SEARCH_LABELS.meeting} iconName="info">
        <Input
          placeholder="-"
          placeholderTextColor={colors.gray}
          value={state.meeting}
          onChangeText={txt => setValue('meeting', txt)}
          style={styles.input}
        />
      </IconField>
      <IconField label={ADVANCE_SEARCH_LABELS.sector} iconName="layers">
        <Picker
          mode="dropdown"
          iosIcon={selectIcon}
          style={styles.picker}
          placeholder="-"
          placeholderStyle={styles.pickerPlaceholder}
          textStyle={styles.pickerText}
          selectedValue={state.sector}
          onValueChange={val => setValue('sector', val)}
          items={SECTOR.map(data => ({
            label: data.text,
            value: data,
          }))}
          isPickAll
        />
      </IconField>
      <IconField label={ADVANCE_SEARCH_LABELS.conclusion} iconName="edit">
        <Textarea
          rowSpan={4}
          placeholder="-"
          placeholderTextColor={colors.gray}
          value={state.conclusion}
          onChangeText={txt => setValue('conclusion', txt)}
          style={styles.textarea}
        />
      </IconField>

      <IconField label={ADVANCE_SEARCH_LABELS.directiveId} iconName="user">
        <Picker
          mode="dropdown"
          iosIcon={selectIcon}
          style={styles.picker}
          placeholder="-"
          placeholderStyle={styles.pickerPlaceholder}
          textStyle={styles.pickerText}
          selectedValue={state.directiveId}
          onValueChange={val => setValue('directiveId', val)}
          items={ldDonVi.map(data => ({
            label: data.fullName,
            value: data,
          }))}
          isPickAll
        />
      </IconField>

      <IconField label={ADVANCE_SEARCH_LABELS.performId} iconName="user-check">
        <Picker
          mode="dropdown"
          iosIcon={selectIcon}
          style={styles.picker}
          placeholder="-"
          placeholderStyle={styles.pickerPlaceholder}
          textStyle={styles.pickerText}
          selectedValue={state.performId}
          onValueChange={val => setValue('performId', val)}
          items={ldDonVi.map(data => ({
            label: data.fullName,
            value: data,
          }))}
          isPickAll
        />
      </IconField>

      <IconField label={ADVANCE_SEARCH_LABELS.deptId} iconName="users">
        <Picker
          mode="dropdown"
          iosIcon={selectIcon}
          style={styles.picker}
          placeholder="-"
          placeholderStyle={styles.pickerPlaceholder}
          textStyle={styles.pickerText}
          selectedValue={state.deptId}
          onValueChange={val => setValue('deptId', val)}
          items={dvChuTri.map(data => ({
            label: data.deptName,
            value: data,
          }))}
          isPickAll
        />
      </IconField>

      <IconField label={ADVANCE_SEARCH_LABELS.progress} iconName="activity">
        <Picker
          mode="dropdown"
          iosIcon={selectIcon}
          style={styles.picker}
          placeholder="-"
          placeholderStyle={styles.pickerPlaceholder}
          textStyle={styles.pickerText}
          selectedValue={state.progress}
          onValueChange={val => setValue('progress', val)}
          items={PROGRESS.map(data => ({
            label: data.text,
            value: data,
          }))}
          isPickAll
        />
      </IconField>

      <IconField label={ADVANCE_SEARCH_LABELS.commandsStatus} iconName="bar-chart">
        <Picker
          mode="dropdown"
          iosIcon={selectIcon}
          style={styles.picker}
          placeholder="-"
          placeholderStyle={styles.pickerPlaceholder}
          textStyle={styles.pickerText}
          selectedValue={state.commandsStatus}
          onValueChange={val => setValue('commandsStatus', val)}
          items={COMMAND_STATUS.map(data => ({
            label: data.text,
            value: data,
          }))}
          isPickAll
        />
      </IconField>

      <IconField label={ADVANCE_SEARCH_LABELS.startTimeCommand} iconName="calendar">
        <DatePicker
          placeholderStyle={styles.pickerPlaceholder}
          style={styles.picker}
          textStyle={styles.pickerText}
          value={state.startTimeCommand}
          onChange={date => setValue('startTimeCommand', date)}
          isStarTime
        />
      </IconField>
      <IconField label={ADVANCE_SEARCH_LABELS.endTimeCommand} iconName="calendar">
        <DatePicker
          placeholderStyle={styles.pickerPlaceholder}
          style={styles.picker}
          textStyle={styles.pickerText}
          value={state.endTimeCommand}
          onChange={date => setValue('endTimeCommand', date)}
        />
      </IconField>

      <IconField label={ADVANCE_SEARCH_LABELS.startTimeDeadline} iconName="calendar">
        <DatePicker
          placeholderStyle={styles.pickerPlaceholder}
          style={styles.picker}
          textStyle={styles.pickerText}
          value={state.startTimeDeadline}
          onChange={date => setValue('startTimeDeadline', date)}
          isStarTime
        />
      </IconField>
      <IconField label={ADVANCE_SEARCH_LABELS.endTimeDeadline} iconName="calendar">
        <DatePicker
          placeholderStyle={styles.pickerPlaceholder}
          style={styles.picker}
          textStyle={styles.pickerText}
          value={state.endTimeDeadline}
          onChange={date => setValue('endTimeDeadline', date)}
        />
      </IconField>

      <IconField label={ADVANCE_SEARCH_LABELS.startTimeFinish} iconName="calendar">
        <DatePicker
          placeholderStyle={styles.pickerPlaceholder}
          style={styles.picker}
          textStyle={styles.pickerText}
          value={state.startTimeFinish}
          onChange={date => setValue('startTimeFinish', date)}
          isStarTime
        />
      </IconField>
      <IconField label={ADVANCE_SEARCH_LABELS.endTimeFinish} iconName="calendar">
        <DatePicker
          placeholderStyle={styles.pickerPlaceholder}
          style={styles.picker}
          textStyle={styles.pickerText}
          value={state.endTimeFinish}
          onChange={date => setValue('endTimeFinish', date)}
        />
      </IconField>
    </Form>
  );
};

SearchForm.propTypes = {
  setValue: PropTypes.func,
  state: PropTypes.shape({}),
  ldDonVi: PropTypes.arrayOf(PropTypes.shape({})),
  dvChuTri: PropTypes.arrayOf(PropTypes.shape({})),
  query: PropTypes.shape({}).isRequired,
};
SearchForm.defaultProps = {
  setValue() {},
  state: {},
  ldDonVi: [],
  dvChuTri: [],
};

export default SearchForm;
