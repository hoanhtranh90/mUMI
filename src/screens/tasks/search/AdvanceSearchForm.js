import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'native-base';

import { ADVANCE_SEARCH_LABELS } from 'eoffice/constants/tasks';
import DateRangePicker from 'eoffice/components/DateRangePicker';
import IconField from 'eoffice/components/IconField';
import UserSelectBtn from './UserSelectField';
import colors from '../../../utils/colors';

const AdvanceSearchForm = ({ setValue, state, isAssign }) => {
  const [users, setUsers] = useState(null);
  return (
    <Form>
      <IconField
        label={ADVANCE_SEARCH_LABELS.taskTitle}
        iconName="type"
        highlight={!!state.taskTitle}
      >
        <Input
          placeholder="-"
          placeholderTextColor={colors.gray}
          value={state.taskTitle}
          onChangeText={txt => setValue('taskTitle', txt)}
        />
      </IconField>
      <IconField
        label={ADVANCE_SEARCH_LABELS.taskDetail}
        iconName="file-text"
        highlight={!!state.taskDetail}
      >
        <Input
          placeholder="-"
          placeholderTextColor={colors.gray}
          value={state.taskDetail}
          onChangeText={txt => setValue('taskDetail', txt)}
        />
      </IconField>
      <IconField
        label={ADVANCE_SEARCH_LABELS.deadLine}
        highlight={!!state.deadline[0]}
        iconType="MaterialIcons"
        iconName="description"
      >
        <DateRangePicker value={state.deadline} onChange={range => setValue('deadline', range)} />
      </IconField>
      {isAssign ? (
        <IconField
          iconName="user"
          highlight={!!users}
          label={ADVANCE_SEARCH_LABELS.assignerUserDeptRole}
        >
          <UserSelectBtn
            setUsers={setUsers}
            users={users}
            textDefault={ADVANCE_SEARCH_LABELS.assignerUserDeptRole}
          />
        </IconField>
      ) : (
        <IconField
          iconName="user"
          highlight={!!users}
          label={ADVANCE_SEARCH_LABELS.receiverUserDeptRole}
        >
          <UserSelectBtn
            setUsers={setUsers}
            users={users}
            textDefault={ADVANCE_SEARCH_LABELS.receiverUserDeptRole}
          />
        </IconField>
      )}
    </Form>
  );
};

AdvanceSearchForm.propTypes = {
  isAssign: PropTypes.bool,
  setValue: PropTypes.func,
  state: PropTypes.shape({}),
};

AdvanceSearchForm.defaultProps = {
  isAssign: true,
  setValue() {},
  state: {},
};
export default AdvanceSearchForm;
