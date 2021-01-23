import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'native-base';

import IconButton from 'eoffice/components/IconButton';
import colors from 'eoffice/utils/colors';
import useModal from 'eoffice/utils/useModal';
import DepartmentSelectModal from './DepartmentSelectModal';

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  placeholder: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 17,
    color: colors.gray,
  },
  list: {
    flexGrow: 0,
    paddingTop: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    flex: 1,
  },
  btn: {
    backgroundColor: colors.darkGray,
    borderColor: colors.darkGray,
    height: 24,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 6,
    paddingBottom: 6,
  },
  icon: {
    fontSize: 12,
    color: '#fff',
  },
  separator: {
    height: 8,
  },
});

const Separator = () => <View style={styles.separator} />;

const DepartmentsField = ({ departments, onChange, value }) => {
  const departmentRef = useRef({});
  const [isVisible, open, close] = useModal(true);

  useEffect(
    () => {
      departmentRef.current = departments.reduce(
        (hash, dept) => ({ ...hash, [dept.id]: dept }),
        {}
      );
    },
    [departments]
  );

  return (
    <>
      <TouchableOpacity onPress={open} style={{ width: '100%' }}>
        {(!value || !value.length) && <Text style={styles.placeholder}>-</Text>}
        {value.length > 0 && (
          <FlatList
            style={styles.list}
            data={value}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.text}>{departmentRef.current[item]?.deptName}</Text>
                <IconButton
                  icon="x"
                  iconStyle={styles.icon}
                  style={styles.btn}
                  onPress={() => onChange(_.without(value, item))}
                />
              </View>
            )}
            ItemSeparatorComponent={Separator}
          />
        )}
      </TouchableOpacity>
      <DepartmentSelectModal
        departments={departments}
        isVisible={isVisible}
        onClose={close}
        onSubmit={onChange}
      />
    </>
  );
};

DepartmentsField.propTypes = {
  departments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string),
};
DepartmentsField.defaultProps = {
  onChange() {},
  value: [],
};

export default DepartmentsField;
