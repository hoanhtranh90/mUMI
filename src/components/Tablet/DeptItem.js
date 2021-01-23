import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import CheckBox from '../Checkbox';
import colors from '../../utils/colors';
import IconButton from '../IconButton';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  grid: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  mid: {
    left: -58,
    paddingLeft: 18,
    flex: 1,
  },
  right: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    color: colors.darkGray,
    fontWeight: '600',
  },
  role: {
    fontSize: 12,
    color: 'rgba(43, 45, 80, 0.5)',
  },
  icon: {
    fontSize: 12,
    color: '#fff',
  },
  btn: {
    backgroundColor: colors.darkGray,
    borderColor: colors.darkGray,
    height: 24,
    width: 24,
    marginLeft: 10,
    paddingLeft: 5.5,
    paddingRight: 6,
    paddingTop: 5.5,
    paddingBottom: 6,
  },
});

const DeptItem = ({
  avatarSize,
  containerStyle,
  disabled,
  roleRow,
  onPress,
  dept,
  onRemove,
  roleAll,
}) => {
  if (!dept) {
    return null;
  }
  const [role, setRole] = useState('chuTri');
  useEffect(
    () => {
      if (roleAll !== null) {
        setRole(roleAll);
        roleRow(dept.id, roleAll);
      }
    },
    [roleAll]
  );

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.wrap}>
      <Grid style={[styles.grid, containerStyle]}>
        <Col style={{ width: avatarSize + 6, paddingLeft: 6 }} />
        <Col style={styles.mid}>
          <Row>
            <Text style={styles.name}>{`${dept.deptName}`}</Text>
          </Row>
        </Col>
        <Col style={{ flex: 1.5, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 2.5, alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  setRole('chuTri');
                  roleRow(dept.id, 'chuTri');
                }}
              >
                <CheckBox checked={!!(role === 'chuTri')} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2.5, alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  setRole('phoiHop');
                  roleRow(dept.id, 'phoiHop');
                }}
              >
                <CheckBox checked={!!(role === 'phoiHop')} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2.5, alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  setRole('nhanDeBiet');
                  roleRow(dept.id, 'nhanDeBiet');
                }}
              >
                <CheckBox checked={!!(role === 'nhanDeBiet')} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ position: 'absolute', right: 8 }}>
              <Col>
                <IconButton
                  icon="x"
                  iconStyle={styles.icon}
                  style={styles.btn}
                  onPress={() => {
                    onRemove(dept.id, role);
                  }}
                />
              </Col>
            </View>
          </View>
        </Col>
      </Grid>
    </TouchableOpacity>
  );
};

DeptItem.propTypes = {
  avatarSize: PropTypes.number,
  containerStyle: PropTypes.shape({}),
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  dept: PropTypes.shape({
    deptName: PropTypes.string,
  }),
  roleRow: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  roleAll: PropTypes.string,
};
DeptItem.defaultProps = {
  avatarSize: 32,
  containerStyle: null,
  disabled: false,
  onPress() {},
  roleAll: null,
  dept: null,
};

export default DeptItem;
