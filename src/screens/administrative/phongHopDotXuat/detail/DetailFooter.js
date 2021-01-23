import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { ACTION_CODE } from 'eoffice/constants/administrative';
import RoundButton from '../../common/RoundButton';

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 15,
    marginBottom: 15,
  },
});

const DetailFooter = ({ onPress, actionName, actionCode }) => (
  <View style={styles.wrapper}>
    <RoundButton
      title={actionName}
      color="#fff"
      titleColor={
        actionCode === ACTION_CODE.TU_CHOI || actionCode === ACTION_CODE.HUY_YEU_CAU
          ? '#ff3b30'
          : '#007aff'
      }
      onPress={onPress}
    />
  </View>
);

DetailFooter.propTypes = {
  onPress: PropTypes.func,
  actionName: PropTypes.string,
  actionCode: PropTypes.string,
};
DetailFooter.defaultProps = {
  onPress: null,
  actionName: '',
  actionCode: '',
};

export default DetailFooter;
