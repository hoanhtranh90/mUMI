import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';

import IconField from 'eoffice/components/IconField';
import useNextProcesses from './useNextProcesses';
import ProcessOption from './ProcessOption';

const styles = StyleSheet.create({
  itemWrapper: { paddingRight: 0 },
  separator: {
    height: 6,
  },
});

const ThuHoiProcessSelect = ({ onChange, processId }) => {
  const [state, actions] = useNextProcesses();

  useEffect(() => {
    actions.loadData(processId);
  }, []);

  const toggle = pId => {
    actions.toggle(pId);
    onChange(state.processes.filter(process => process.selected));
  };

  return (
    <IconField
      label="Người/Đơn vị được chuyển"
      iconName="user-minus"
      highlight={false}
      required
      wrapperStyle={styles.itemWrapper}
    >
      {state.loading && <Spinner />}
      {!state.loading && (
        <FlatList
          data={state.processes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ProcessOption process={item} toggle={toggle} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </IconField>
  );
};

ThuHoiProcessSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  processId: PropTypes.string.isRequired,
};

export default ThuHoiProcessSelect;
