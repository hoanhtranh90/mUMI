import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import differenceInDays from 'date-fns/differenceInDays';

import { TASK_TYPES } from 'eoffice/constants/tasks';
import Avatar from 'eoffice/components/Avatar';
import colors from 'eoffice/utils/colors';
import CompletionLabel from './CompletionLabel';
import Deadline from './Deadline';

const Task = ({
  assignerName,
  completionPercent,
  deadline,
  onPress,
  receiverName,
  taskTitle,
  type,
}) => {
  const isAssigned = type === TASK_TYPES.ASSIGNED;
  const deadlineDate = new Date(deadline);
  const remain = differenceInDays(new Date(), deadlineDate);
  let bgColor = 'transparent';

  if (remain > 0) {
    bgColor = colors.red;
  } else if (remain > -10) {
    bgColor = colors.yellow;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Grid>
        <Col style={{ width: 4, backgroundColor: bgColor }} />
        <Col style={{ paddingLeft: 11, paddingRight: 12, width: 71, justifyContent: 'center' }}>
          <Avatar size={48} name={isAssigned ? receiverName : assignerName} />
        </Col>
        <Col style={{ paddingRight: 15, paddingVertical: 10 }}>
          <Row>
            <Text style={{ color: colors.darkGray, fontSize: 17, fontWeight: 'bold' }}>
              {taskTitle}
            </Text>
          </Row>
          <Row style={{ paddingTop: 5 }}>
            <CompletionLabel percent={completionPercent} />
            <View style={{ width: 8 }} />
            <Deadline deadline={deadlineDate} />
          </Row>
        </Col>
      </Grid>
    </TouchableOpacity>
  );
};

Task.propTypes = {
  deadline: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  taskTitle: PropTypes.string.isRequired,
  type: PropTypes.oneOf([TASK_TYPES.ASSIGNED, TASK_TYPES.RECEIVED]).isRequired,

  assignerName: PropTypes.string,
  completionPercent: PropTypes.number,
  receiverName: PropTypes.string,
};
Task.defaultProps = {
  assignerName: null,
  completionPercent: 0,
  receiverName: null,
};

export default Task;
