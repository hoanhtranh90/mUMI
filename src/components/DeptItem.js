import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import colors from '../utils/colors';

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
});

const DeptItem = ({
  ActionComponent,
  idx,
  avatarSize,
  containerStyle,
  disabled,
  onPress,
  dept,
}) => {
  if (!dept) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.wrap}>
      <Grid style={[styles.grid, containerStyle]}>
        <Col style={{ width: avatarSize }} />
        <Col style={styles.mid}>
          <Row>
            <Text style={styles.name}>
              {idx + 1}. {dept.deptName}
            </Text>
          </Row>
        </Col>
        {ActionComponent && <Col style={styles.right}>{ActionComponent}</Col>}
      </Grid>
    </TouchableOpacity>
  );
};

DeptItem.propTypes = {
  ActionComponent: PropTypes.node,
  avatarSize: PropTypes.number,
  containerStyle: PropTypes.shape({}),
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  dept: PropTypes.shape({
    deptName: PropTypes.string,
  }),
  idx: PropTypes.number.isRequired,
};
DeptItem.defaultProps = {
  ActionComponent: null,
  avatarSize: 32,
  containerStyle: null,
  disabled: false,
  onPress() {},
  dept: null,
};

export default DeptItem;
