import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'native-base';

import Checkbox from 'eoffice/components/Checkbox';

const DepartmentRow = ({ deptName, id, headerSelect, onSelect, selected }) => {
  const deptSelected = selected[id] === id;
  const toggleDept = () => onSelect(id);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Button
          transparent
          onPress={toggleDept}
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}
        >
          <Text
            style={{
              flex: 1,
              color: '#333333',
              fontSize: 17,
              fontWeight: 'bold',
            }}
          >
            {deptName}
          </Text>
        </Button>
        {headerSelect && (
          <TouchableOpacity onPress={toggleDept}>
            <Checkbox checked={deptSelected} style={{ marginHorizontal: 12 }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

DepartmentRow.propTypes = {
  deptName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,

  headerSelect: PropTypes.bool,
  onSelect: PropTypes.func,
  selected: PropTypes.shape({}),
};
DepartmentRow.defaultProps = {
  headerSelect: false,
  onSelect() {},
  selected: {},
};

export default DepartmentRow;
