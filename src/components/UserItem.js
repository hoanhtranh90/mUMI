import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import Avatar from './Avatar';
import { PROCESS_TYPE_TEXTS } from '../constants/documents';
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
    paddingLeft: 10,
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

const UserItem = ({
  ActionComponent,
  avatarSize,
  containerStyle,
  disabled,
  onPress,
  data,
  user,
}) => {
  if (!user) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.wrap}>
      <Grid style={[styles.grid, containerStyle]}>
        <Col style={{ width: avatarSize }}>
          <Avatar name={user.fullName} size={avatarSize} />
        </Col>
        <Col style={styles.mid}>
          <Row>
            <Text style={styles.name}>
              {user.fullName}
              {data ? ` (${PROCESS_TYPE_TEXTS[data.processType]})` : ''}
            </Text>
          </Row>
          <Row>
            <Text style={styles.role}>
              {`${user.positionName}`} {user.deptName ? ` -  ${user.deptName}` : null}
            </Text>
          </Row>
        </Col>
        {ActionComponent && <Col style={styles.right}>{ActionComponent}</Col>}
      </Grid>
    </TouchableOpacity>
  );
};

UserItem.propTypes = {
  ActionComponent: PropTypes.node,
  avatarSize: PropTypes.number,
  containerStyle: PropTypes.shape({}),
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  user: PropTypes.shape({
    deptName: PropTypes.string,
    fullName: PropTypes.string,
    positionName: PropTypes.string,
  }),
  data: PropTypes.shape({}),
};
UserItem.defaultProps = {
  ActionComponent: null,
  avatarSize: 32,
  containerStyle: null,
  disabled: false,
  onPress() {},
  user: null,
  data: undefined,
};

export default UserItem;
