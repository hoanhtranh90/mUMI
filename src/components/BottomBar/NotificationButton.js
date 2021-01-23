import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'native-base';

const styles = StyleSheet.create({
  relative: {
    position: 'relative',
  },
  icon: {
    color: 'white',
    fontSize: 24,
  },
  dot: {
    left: 30,
    top: 22,
    fontSize: 9,
    position: 'absolute',
    backgroundColor: '#e54d42',
    borderRadius: 6,
    paddingLeft: 4,
    paddingRight: 4,
    margin: 0,
    overflow: 'hidden',
    color: 'white',
  },
});

const NotificationButton = ({ hasNew, onPress, ...props }) => (
  <Button icon transparent {...props} onPress={onPress}>
    <View style={styles.relative}>
      <Icon name="bell" style={styles.icon} />
    </View>
    {hasNew > 0 && <Text style={styles.dot}>{hasNew}</Text>}
  </Button>
);

NotificationButton.propTypes = {
  hasNew: PropTypes.number,
  style: PropTypes.shape({}),
  onPress: PropTypes.func,
};
NotificationButton.defaultProps = {
  hasNew: 0,
  style: null,
  onPress() {},
};

export default NotificationButton;
