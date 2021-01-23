import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from 'native-base';

import colors from '../../utils/colors';

const styles = StyleSheet.create({
  titleWrapper: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
    marginBottom: 20,
  },
  title: {
    color: colors.darkGray,
    fontSize: 17,
    fontWeight: 'bold',
  },
});

const ModalTitle = ({ title, wrapperStyle, iconName, highlight, iconType, titleStyle }) => {
  if (!title) {
    return null;
  }

  return (
    <View style={[styles.titleWrapper, wrapperStyle]}>
      {!!iconName && (
        <Icon
          name={iconName}
          type={iconType}
          style={[styles.icon, highlight ? styles.iconHighlight : null]}
        />
      )}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </View>
  );
};

ModalTitle.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.shape({}),
  wrapperStyle: PropTypes.shape({}),
  iconType: PropTypes.string,
  highlight: PropTypes.bool,
  iconName: PropTypes.string,
};
ModalTitle.defaultProps = {
  iconType: 'Feather',
  highlight: false,
  iconName: '',
  title: '',
  titleStyle: null,
  wrapperStyle: null,
};

export default ModalTitle;
