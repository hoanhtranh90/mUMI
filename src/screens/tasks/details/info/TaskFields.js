/* eslint-disable */
import format from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Text, Spinner } from 'native-base';
import { FlatList, View, StyleSheet } from 'react-native';

import IconField from 'eoffice/components/IconField';
import colors from 'eoffice/utils/colors';
import { formatTimestamp } from 'eoffice/utils/utils';
import { TASK_PRIORITIES } from 'eoffice/constants/tasks';
import Attachments from './Attachments';
import {listCoordinators} from '../../../../store/tasks/detail/service'
const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
});

const TaskFields = ({ task }) => {
  const [coordinators, setListCoordinators] = useState([])
  useEffect(() => {
    getListCoordinators()
  }, []);

  async function getListCoordinators() {
    const list = await listCoordinators(task.id)
    const temp = list.filter(item => item.receiverFullName != task.receiverName).map(item => item.receiverFullName)
    setListCoordinators(temp)
  }

  return (
    <>
      <IconField iconName="calendar" label="Ngày bắt đầu">
        <Input value={format(task.createTime ?? new Date(), 'dd/MM/yyyy')} />
      </IconField>
      <IconField iconName="calendar" label="Hạn hoàn thành">
        <Input value={format(new Date(task.deadline), 'dd/MM/yyyy')} />
      </IconField>
      <IconField iconName="user" label="Người Giao">
        <Input value={task.assignerName} disabled />
      </IconField>
      <IconField iconName="user" label="Người thực hiện">
        <Input value={task.receiverName} disabled />
      </IconField>
      <IconField iconName="user-plus" label="Phối hợp">
        <FlatList
          data={coordinators}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
          ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
          ListEmptyComponent={
            <Text style={{ fontSize: 16, color: colors.gray, fontStyle: 'italic' }}>
              Không có người phối hợp
            </Text>
          }
        />
      </IconField>
      <IconField iconName="users" label="Nhân công">
        <Input value={`${task.manday || 0} ngày`} disabled />
      </IconField>
      <IconField iconName="alert-circle" label="Ưu tiên">
        <Input
          value={TASK_PRIORITIES[task.priority]?.label}
          disabled
          style={TASK_PRIORITIES[task.priority]?.style}
        />
      </IconField>

      <IconField iconName="edit" label="Mô tả">
        <Text>{task.taskDetail}</Text>
      </IconField>
      <IconField iconName="file" label="File đính kèm">
        <Attachments />
      </IconField>
    </>
  );
};

TaskFields.propTypes = {
  task: PropTypes.shape({}).isRequired,
};

export default TaskFields;
