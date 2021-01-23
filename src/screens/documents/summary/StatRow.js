import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { Card, CardItem, Icon, Text } from 'native-base';

import CountBadge from '../common/CountBadge';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  card: {
    width: '100%',
    elevation: 0,
    shadowColor: '#fff',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  cardItem: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 0,
    paddingBottom: 0,
  },
  icon: {
    fontSize: 24,
    color: colors.gray,
  },
  label: {
    color: '#2b2d50',
    fontSize: 17,
    fontWeight: 'bold',
  },
  iconWrapper: {
    padding: 10,
    width: 44,
    justifyContent: 'center',
  },
  labelWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingLeft: 6,
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  countWrapper: {
    width: 75,
    justifyContent: 'center',
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
});

const StatRow = ({ hasCount, count, icon, onPress, label, color, bgColor }) => (
  <Card style={styles.card}>
    <CardItem button onPress={onPress} style={styles.cardItem}>
      <Grid>
        <Col style={styles.iconWrapper}>
          <Icon name={icon} type="Feather" style={styles.icon} />
        </Col>
        <Col style={styles.labelWrapper}>
          <Text style={styles.label}>{label}</Text>
        </Col>
        {hasCount && (
          <Col style={styles.countWrapper}>
            <CountBadge count={count} color={color} bgColor={bgColor} />
          </Col>
        )}
      </Grid>
    </CardItem>
  </Card>
);

StatRow.propTypes = {
  count: PropTypes.number,
  hasCount: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,

  bgColor: PropTypes.string,
  color: PropTypes.string,
};
StatRow.defaultProps = {
  count: 0,
  hasCount: true,
  bgColor: undefined,
  color: undefined,
};

export default StatRow;
