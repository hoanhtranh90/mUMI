import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';

import colors from 'eoffice/utils/colors';
import Task from '../../common/Task';
import Section from '../common/Section';

const styles = {
  title: {
    paddingHorizontal: 15,
  },
  list: { paddingTop: 20 },
  separator: {
    height: 1,
    backgroundColor: colors.lighterGray,
    marginLeft: 60,
    marginRight: 15,
  },
};

const Subtasks = ({ tasks, listSubtasks, onTaskPress }) => {
  useEffect(() => {
    listSubtasks();
  }, []);

  return (
    <>
      <Section title={`${tasks.length} việc phụ`} titleStyle={styles.title}>
        <FlatList
          contentContainerStyle={styles.list}
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Task {...item} onPress={() => onTaskPress(item)} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
        />
      </Section>
    </>
  );
};

Subtasks.propTypes = {
  listSubtasks: PropTypes.func.isRequired,
  onTaskPress: PropTypes.func.isRequired,

  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(PropTypes.shape({})),
};
Subtasks.defaultProps = {
  loading: false,
  tasks: [],
};

export default Subtasks;
