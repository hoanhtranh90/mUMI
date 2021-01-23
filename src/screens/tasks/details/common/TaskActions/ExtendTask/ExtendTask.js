import PropTypes from 'prop-types';
import React from 'react';
import { Icon } from 'native-base';

import Fsb from 'eoffice/components/Fsb';
import colors from 'eoffice/utils/colors';
import useModal from 'eoffice/utils/useModal';
import ExtendTaskModal from './ExtendTaskModal';

const ExtendTask = ({ extendTask, task }) => {
  const [isVisible, open, close] = useModal();
  const submit = data => {
    close();
    extendTask(data);
  };

  return (
    <>
      <Fsb
        text="Gia hạn"
        borderColor={colors.lightBlue}
        icon={
          <Icon name="arrow-alt-circle-up" type="FontAwesome5" style={{ color: colors.blue }} />
        }
        onPress={open}
      />
      <ExtendTaskModal visible={isVisible} onClose={close} onSubmit={submit} task={task} />
    </>
  );
};

ExtendTask.propTypes = {
  extendTask: PropTypes.func.isRequired,
  task: PropTypes.shape({}),
};
ExtendTask.defaultProps = {
  task: null,
};

export default ExtendTask;
