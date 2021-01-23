import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import colors from 'eoffice/utils/colors';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import Point from './Point';
import useRatingField from './useRaitingField';

const styles = StyleSheet.create({
  flatList: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    color: colors.red,
    fontSize: 14,
    textAlign: 'center',
    paddingTop: variables.deviceHeight * 0.023,
  },
});

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const RatingField = ({ score, setScore, wrapperStyle }) => {
  const [state, actions] = useRatingField();

  const onSeleted = id => {
    if (id < 5) {
      actions.setValue('status', 'Yếu kém');
      actions.setValue('textColor', colors.red);
    } else if (id === 5) {
      actions.setValue('status', 'Chưa Đạt yêu cầu');
      actions.setValue('textColor', colors.gray);
    } else if (id < 8 && id > 5) {
      actions.setValue('status', 'Đạt yêu cầu');
      actions.setValue('textColor', colors.blue);
    } else if (id < 10 && id > 7) {
      actions.setValue('status', 'Tốt');
      actions.setValue('textColor', colors.yellow);
    } else if (id === 10) {
      actions.setValue('status', 'Xuất sắc');
      actions.setValue('textColor', colors.green);
    }
    setScore(id);
  };
  return (
    <View style={wrapperStyle}>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={items}
        extraData={score}
        keyExtractor={item => item.toString()}
        renderItem={({ item }) => (
          <Point id={item} selected={score === item} pressButton={() => onSeleted(item)} />
        )}
      />
      <Text style={[styles.text, { color: state.textColor }]}>{state.status}</Text>
    </View>
  );
};
RatingField.propTypes = {
  setScore: PropTypes.func,
  score: PropTypes.number,
  wrapperStyle: PropTypes.shape({}),
};
RatingField.defaultProps = {
  score: null,
  setScore() {},
  wrapperStyle: null,
};
export default RatingField;
