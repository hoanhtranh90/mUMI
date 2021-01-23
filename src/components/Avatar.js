import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text, Thumbnail } from 'native-base';

import colors from '../utils/colors';
import { getInitial } from '../utils/utils';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  text: {
    color: colors.darkGray,
  },
  empty: {
    borderWidth: 1,
    borderColor: '#979797',
    borderStyle: 'dashed',
  },
});

const Avatar = ({ name, size, uri }) => {
  const sizeStyle = { width: size, height: size, borderRadius: size / 2 };

  if (uri) {
    return <Thumbnail source={{ uri }} style={sizeStyle} />;
  }

  if (name) {
    return (
      <View style={[styles.wrapper, sizeStyle]}>
        <Text style={[styles.text, { fontSize: size / 3 }]}>{getInitial(name)}</Text>
      </View>
    );
  }

  return <View style={[styles.empty, sizeStyle]} />;
};

Avatar.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  uri: PropTypes.string,
};
Avatar.defaultProps = {
  name: '',
  size: 32,
  uri: '',
};

export default Avatar;
