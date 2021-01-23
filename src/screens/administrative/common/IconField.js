import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'native-base';
import colors from 'eoffice/utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  iconWrapper: {
    flex: 0,
    paddingRight: 17,
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: colors.gray,
  },
  iconHighlight: {
    color: colors.blue,
  },
  item: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
    marginLeft: 0,
    paddingVertical: 6,
    alignItems: 'flex-start',
  },
  label: {
    color: '#7a848e',
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 0,
  },
  input: {
    ...Platform.select({
      ios: {
        paddingVertical: null,
        height: 20,
        marginTop: 10,
      },
      android: {
        paddingBottom: 0,
        height: null,
        marginTop: 0,
        paddingTop: 7,
      },
    }),

    color: '#2b2d50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    ...Platform.select({
      ios: {
        marginTop: 10,
      },
      android: {
        marginTop: 0,
        paddingTop: 7,
      },
    }),
    fontSize: 16,
    fontWeight: 'bold',
  },
  textarea: {
    ...Platform.select({
      ios: {
        marginTop: 6,
      },
      android: {
        marginTop: 0,
      },
    }),
    fontSize: 16,
    color: colors.darkGray,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    paddingLeft: 0,
  },
  require: {
    color: '#ff3b30',
  },
});

const IconField = ({
  children,
  highlight,
  iconName,
  iconType,
  itemStyle,
  label,
  wrapperStyle,
  required,
  ...itemProps
}) => (
    <View style={[styles.wrapper, wrapperStyle]}>
      <View style={styles.iconWrapper}>
        {!!iconName && (
          <Icon
            name={iconName}
            type={iconType}
            style={[styles.icon, highlight ? styles.iconHighlight : null]}
          />
        )}
      </View>
      <View {...itemProps} style={[styles.item, itemStyle]}>
        <Text style={styles.label}>
          {label}
          {required ? <Text style={styles.require}> *</Text> : ''}
        </Text>
        {children}
      </View>
    </View>
  );

IconField.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,

  iconType: PropTypes.string,
  highlight: PropTypes.bool,
  iconName: PropTypes.string,
  itemStyle: PropTypes.shape({}),
  required: PropTypes.bool,
  wrapperStyle: PropTypes.shape({}),
};
IconField.defaultProps = {
  iconType: 'Feather',
  highlight: false,
  iconName: '',
  itemStyle: {},
  required: false,
  wrapperStyle: {},
};

export default IconField;
