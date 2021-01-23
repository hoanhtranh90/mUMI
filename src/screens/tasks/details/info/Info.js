import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import TaskFields from './TaskFields';

const Info = ({ task}) => {
  if (!task) {
    return null;
  }
  return (
    <>
      <View style={{ paddingBottom: 32, paddingTop: 12 }}>
        <TaskFields task={task} />
      </View>
    </>
  );
};

Info.propTypes = {
  coordinators: PropTypes.arrayOf(PropTypes.shape({})),
  listCoordinators: PropTypes.func.isRequired,
  task: PropTypes.shape({}),
};
Info.defaultProps = {
  coordinators: [],
  task: null,
};

export default Info;
