import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

import colors from 'eoffice/utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    flexDirection: 'column',
    alignItems: 'center',
    width: 52,
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.blue,
    fontSize: 14,
  },
  bar: {
    height: 2,
    backgroundColor: '#cce4ff',
    alignSelf: 'flex-start',
  },
  emptyBar: {
    height: 2,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
  },
});

const CompletionLabel = ({ percent }) => (
  <View style={styles.wrapper}>
    <View style={styles.textWrapper}>
      <Text style={styles.text}>{`${percent}%`}</Text>
    </View>
    {percent > 0 && <View style={[styles.bar, { width: (percent * 52) / 100 }]} />}
    {percent === 0 && <View style={styles.emptyBar} />}
  </View>
);

CompletionLabel.propTypes = {
  percent: PropTypes.number,
};
CompletionLabel.defaultProps = {
  percent: 0,
};

export default CompletionLabel;
