import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Fsb from 'eoffice/components/Fsb';
import BottomNoteModal from 'eoffice/components/modals/BottomNoteModal';
import useModal from 'eoffice/utils/useModal';
import NavigationService from 'eoffice/utils/NavigationService';

const TaskAction = ({ action, actionName, icon, label, noteRequired, ...restProps }) => {
  const [loading, setLoading] = useState(false);
  const [isVisible, open, close] = useModal();
  const submit = async note => {
    setLoading(true);
    const result = await action({ note });
    if (result) {
      close();
      NavigationService.goBack();
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Fsb text={actionName} icon={icon} onPress={open} {...restProps} />
      <BottomNoteModal
        noteRequired={noteRequired}
        loading={loading}
        label={label}
        visible={isVisible}
        onClose={close}
        title={`${actionName} công việc`}
        onSubmit={submit}
      />
    </>
  );
};

TaskAction.propTypes = {
  action: PropTypes.func.isRequired,
  actionName: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,

  label: PropTypes.string,
  noteRequired: PropTypes.bool,
};
TaskAction.defaultProps = {
  label: undefined,
  noteRequired: false,
};

export default TaskAction;
