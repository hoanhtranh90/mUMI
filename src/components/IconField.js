import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View } from 'react-native';
import { Icon, Input, Text, Textarea } from 'native-base';

import colors from '../utils/colors';
import DateRangePicker from './DateRangePicker';
import Picker from './Picker';

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 14,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  iconWrapper: {
    flex: 0,
    paddingRight: 17,
  },
  icon: {
    fontSize: 24,
    color: colors.gray,
    top: -5,
  },
  iconHighlight: {
    color: colors.blue,
  },
  item: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingBottom: 8,
  },
  label: {
    color: '#7a848e',
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 0,
    marginBottom: 4,
  },
  require: {
    color: '#ff3b30',
  },
  input: {
    ...Platform.select({
      android: {
        paddingBottom: 0,
        paddingTop: 0,
        margin: 0,
      },
    }),

    color: '#2b2d50',
    fontSize: 17,
    fontWeight: 'bold',
    height: null,
    paddingLeft: 0,
    paddingRight: 0,
  },
  picker: {
    alignSelf: 'stretch',
    height: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  text: {
    color: '#2b2d50',
    fontSize: 17,
    fontWeight: 'bold',
  },
  textarea: {
    fontSize: 17,
    color: colors.darkGray,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    lineHeight: 17 * 1.29,
  },
});

const getChildrenType = wrappedName => {
  switch (wrappedName) {
    case DateRangePicker.name:
      return 'picker';

    case Input.displayName:
      return 'input';

    case Picker.name:
      return 'picker';

    case Text.displayName:
      return 'text';

    case Textarea.displayName:
      return 'textarea';

    default:
      return '';
  }
};

const renderChildren = children => {
  const childrenType = getChildrenType(children.type?.displayName || children.type?.name);

  if (!childrenType) {
    return children;
  }

  if (childrenType === 'textarea') {
    const height = (children.props.numberOfLines || 4) * styles.textarea.lineHeight;
    return React.cloneElement(children, {
      style: [styles[childrenType], { height }, children.props.style],
    });
  }

  return React.cloneElement(children, { style: [styles[childrenType], children.props.style] });
};

const IconField = ({ children, highlight, iconName, iconType, label, required, wrapperStyle }) => (
  <View style={[styles.wrapper, wrapperStyle]}>
    <View style={styles.iconWrapper}>
      <Icon
        name={iconName}
        type={iconType}
        style={[styles.icon, highlight ? styles.iconHighlight : null]}
      />
    </View>
    <View style={styles.item}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.require}> *</Text>}
      </Text>

      {renderChildren(children)}
    </View>
  </View>
);

IconField.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,

  iconType: PropTypes.string,
  highlight: PropTypes.bool,
  iconName: PropTypes.string,
  required: PropTypes.bool,
  wrapperStyle: PropTypes.shape({}),
};
IconField.defaultProps = {
  iconType: 'Feather',
  highlight: false,
  iconName: '',
  required: false,
  wrapperStyle: {},
};

export default IconField;
