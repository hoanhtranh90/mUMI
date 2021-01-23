import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

import colors from 'eoffice/utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray,
  },
});

const Section = ({ children, title, titleStyle, wrapperStyle }) => (
  <View style={[styles.wrapper, wrapperStyle]}>
    <Text uppercase style={[styles.title, titleStyle]}>
      {title}
    </Text>
    {children}
  </View>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,

  titleStyle: PropTypes.shape({}),
  wrapperStyle: PropTypes.shape({}),
};
Section.defaultProps = {
  titleStyle: null,
  wrapperStyle: null,
};

export default Section;
