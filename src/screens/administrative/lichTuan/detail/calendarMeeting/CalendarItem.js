import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 15,
  },
  roomName: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#007aff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  content: {
    fontSize: 15,
    color: '#424242',
    flex: 1,
    marginTop: 5,
  },
});

const CalendarItem = ({ item }) => (
  <View style={styles.item}>
    <View style={{ flex: 1 }}>
      <Text style={styles.roomName}>{item.roomName}</Text>
      <Text style={styles.title}>Nội dung:</Text>
      <Text style={styles.content}>{item.meetingContent}</Text>
      <Text style={styles.title}>Thời gian bắt đầu:</Text>
      <Text style={styles.content}>{item.startTime}</Text>
      <Text style={styles.title}>Thời gian kết thúc:</Text>
      <Text style={styles.content}>{item.endTime}</Text>
    </View>
  </View>
);
CalendarItem.propTypes = {
  item: PropTypes.shape({}),
};
CalendarItem.defaultProps = {
  item: {},
};

export default CalendarItem;
