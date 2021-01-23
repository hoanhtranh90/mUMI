/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
// import styles from './CommandForm.style';
import RoundButton from '../../common/RoundButton';
import useCommandModal from './useCommandModal';
import UpdateForm from './UpdateForm';

const CommandModal = ({ caseMasterId, onUpdate, updateChiDao, actionList, hcCaseCommand }) => {
  const [state, actions] = useCommandModal();

  const submit = actionCode => {
    updateChiDao({
      actionCode,
      caseMasterId,
      directionContent: state.directionContent,
      note: state.note,
    });
    onUpdate();
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <UpdateForm state={state} setValue={actions.setValue} hcCaseCommand={hcCaseCommand} />
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ marginBottom: 10 }}>
          {actionList.map((data, index) => (
            <RoundButton
              title={data.actionName}
              color="#fff"
              titleColor="#007aff"
              onPress={() => submit(data.actionCode)}
              key={index.toString()}
            />
          ))}
        </View>
        <View style={{ marginBottom: 10 }}>
          <RoundButton
            title="Huỷ bỏ"
            color="#fff"
            titleColor="#ff3b30"
            onPress={() => onUpdate()}
          />
        </View>
      </View>
    </View>
  );
};

CommandModal.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  updateChiDao: PropTypes.func.isRequired,
  hcCaseCommand: PropTypes.shape({}),
  actionList: PropTypes.arrayOf(PropTypes.shape({})),
  caseMasterId: PropTypes.string,
};
CommandModal.defaultProps = {
  hcCaseCommand: {},
  actionList: [],
  caseMasterId: null,
};

export default CommandModal;
