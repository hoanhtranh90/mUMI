import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'native-base';

import CustomHeader from 'eoffice/components/CustomHeader';
import IconButton from 'eoffice/components/IconButton';
import colors from 'eoffice/utils/colors';
import NavigationService from 'eoffice/utils/NavigationService';
import TaskStatus from './TaskStatus';
import CompletionLabel from '../../../common/CompletionLabel';
import Deadline from '../../../common/Deadline';
import TaskActions from '../TaskActions';

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 6,
  },
  completion: {
    flex: 1,
    paddingLeft: 8,
    flexDirection: 'row',
  },
});

const Header = ({ task }) => (
  <View style={{ paddingBottom: 8, borderBottomColor: colors.lighterGray, borderBottomWidth: 1 }}>
    <CustomHeader
      Left={
        <IconButton
          icon="arrow-left"
          iconStyle={{ color: colors.gray }}
          style={{
            backgroundColor: 'transparent',
          }}
          onPress={() => NavigationService.goBack()}
        />
      }
      Content={
        <Title style={styles.title} numberOfLines={2}>
          {task?.taskTitle}
        </Title>
      }
    />
    <View style={styles.row}>
      <TaskStatus status={task?.taskStatus} />
      <View style={styles.completion}>
        <CompletionLabel percent={task?.completionPercent} />
      </View>
      {task?.deadline && <Deadline deadline={new Date(task.deadline)} />}
    </View>
    <TaskActions />
  </View>
);

Header.propTypes = {
  task: PropTypes.shape({
    completionPercent: PropTypes.number,
    deadline: PropTypes.number,
    taskStatus: PropTypes.number,
    taskTitle: PropTypes.string,
  }),
};
Header.defaultProps = {
  task: {},
};

export default Header;
