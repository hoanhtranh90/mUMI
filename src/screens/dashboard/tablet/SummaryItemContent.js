import React from 'react';
import _ from 'lodash';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    flex: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007aff',
  },
  newWrapper: {
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: 6,
    width: 60,
  },
  empty: {
    backgroundColor: '#fff',
  },
  new: {
    fontSize: 12,
    color: colors.green,
    textAlign: 'center',
  },
});

const SummaryItemContent = ({ countSum, countOfUnread, onPress }) => (
  <View style={styles.wrapper}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.count}>{countSum}</Text>
        {_.isNumber(countOfUnread) && (
          <View style={[styles.newWrapper, _.isNumber(countOfUnread) ? null : styles.empty]}>
            <Text style={styles.new}>{`${countOfUnread || 0} mới`}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  </View>
);

SummaryItemContent.propTypes = {
  countSum: PropTypes.number,
  countOfUnread: PropTypes.number,
  onPress: PropTypes.func,
};

SummaryItemContent.defaultProps = {
  countSum: 0,
  countOfUnread: null,
  onPress() {},
};

export default SummaryItemContent;
