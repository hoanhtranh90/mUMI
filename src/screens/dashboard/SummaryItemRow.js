import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Text } from 'native-base';

import colors from '../../utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 20,
    height: 20,
  },
  content: {
    marginLeft: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  labelWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 15,
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newWrapper: {
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: 6,
    width: 60,
  },
  new: {
    fontSize: 12,
    color: colors.green,
    textAlign: 'center',
  },
  icon: {
    fontSize: 16,
    color: colors.gray,
  },
  empty: {
    backgroundColor: '#fff',
  },
});

const SummaryItemRow = ({ count, countNew, imgSrc, label, onPress }) => (
  <>
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <Image resizeMode="contain" source={imgSrc} style={styles.img} />
      <View style={styles.content}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={styles.count}>{count}</Text>
        <View style={[styles.newWrapper, _.isNumber(countNew) ? null : styles.empty]}>
          {_.isNumber(countNew) && <Text style={styles.new}>{`${countNew || 0} mới`}</Text>}
        </View>
        <Icon name="chevron-right" style={styles.icon} />
      </View>
    </TouchableOpacity>
  </>
);

SummaryItemRow.propTypes = {
  count: PropTypes.number.isRequired,
  countNew: PropTypes.number,
  label: PropTypes.string.isRequired,

  imgSrc: PropTypes.number,
  onPress: PropTypes.func,
};
SummaryItemRow.defaultProps = {
  countNew: null,
  imgSrc: null,
  onPress() {},
};

export default SummaryItemRow;
