import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';

import colors from 'eoffice/utils/colors';
import useModal from 'eoffice/utils/useModal';
import Fsb from 'eoffice/components/Fsb';
import UpdateProgressModal from './UpdateProgressModal';

const UpdateProgress = ({ task, updateProgress }) => {
  const [isVisible, open, close] = useModal();

  return (
    <>
      <Fsb
        borderColor={colors.lightBlue}
        text="Tiến độ"
        icon={<Icon name="trending-up" style={{ color: colors.blue }} />}
        onPress={open}
      />
      <UpdateProgressModal
        isVisible={isVisible}
        onClose={close}
        updateProgress={updateProgress}
        progress={task.completionPercent}
      />
    </>
  );
};

UpdateProgress.propTypes = {
  updateProgress: PropTypes.func.isRequired,
  task: PropTypes.shape({}).isRequired,
};

export default UpdateProgress;
