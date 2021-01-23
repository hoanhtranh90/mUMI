import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import RoundButton from '../../common/RoundButton';

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 15,
  },
});

const CreateFooter = ({ onPress }) => (
  <View style={styles.wrapper}>
    <RoundButton title="Đặt phòng" color="white" titleColor="#007aff" onPress={onPress} />
  </View>
);

CreateFooter.propTypes = {
  onPress: PropTypes.func,
};
CreateFooter.defaultProps = {
  onPress: null,
};

export default CreateFooter;
