import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'native-base';

import Checkbox from 'eoffice/components/Checkbox';
import colors from 'eoffice/utils/colors';
import HandlersList from './HandlersList';

const DepartmentRow = ({ name, children, headerSelect, onSelect, selected }) => {
  const [showSub, setShowSub] = useState(true);
  const toggleSub = () => setShowSub(!showSub);
  const deptSelected = _.every(children, handler => selected[handler.id]);
  const toggleDept = () => onSelect(_.map(children, 'id'));

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          backgroundColor: showSub ? colors.lightYellow : colors.lightGray,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Button
          transparent
          onPress={toggleSub}
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}
        >
          <Text
            style={{
              flex: 1,
              color: showSub ? colors.yellow : colors.gray,
              fontSize: 17,
              fontWeight: 'bold',
            }}
          >
            {name}
          </Text>
        </Button>
        {headerSelect && (
          <TouchableOpacity onPress={toggleDept}>
            <Checkbox checked={deptSelected} style={{ marginHorizontal: 12 }} />
          </TouchableOpacity>
        )}
      </View>

      {showSub && <HandlersList handlers={children} selected={selected} onSelect={onSelect} />}
    </View>
  );
};

DepartmentRow.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

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
