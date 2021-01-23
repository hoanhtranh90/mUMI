import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import format from 'date-fns/format';
import { Agenda } from 'react-native-calendars';
import ListEmptyComponent from 'eoffice/components/ListEmptyComponent';
import _ from 'lodash';
import Header from './CalendarHeader';
import CalendarItem from './CalendarItem';

const CalendarMeeting = ({ navigation, listcalendarRoomDetail }) => {
  const [items, setItems] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  function buildListCalendar() {
    if (!_.isEmpty(listcalendarRoomDetail)) {
      const newItems = {};
      _.forEach(listcalendarRoomDetail, obj => {
        for (let loopTime = obj.startTime; loopTime < obj.endTime; loopTime += 86400000) {
          const strTime = format(new Date(loopTime), 'yyyy-MM-dd');

          if (!newItems[strTime]) {
            newItems[strTime] = [];
            newItems[strTime].push({
              roomName: obj.roomName,
              content: obj.content,
              startTime: format(new Date(obj.startTime), 'dd/MM/yyyy HH:mm'),
              endTime: format(new Date(obj.endTime), 'dd/MM/yyyy HH:mm'),
              scheduleId: obj.scheduleId,
            });
          } else {
            newItems[strTime].push({
              roomName: obj.roomName,
              content: obj.content,
              startTime: format(new Date(obj.startTime), 'dd/MM/yyyy HH:mm'),
              endTime: format(new Date(obj.endTime), 'dd/MM/yyyy HH:mm'),
              scheduleId: obj.scheduleId,
            });
          }
        }
      });
      setItems(newItems);
      setSelectedDate(Object.keys(newItems)[0]);
    }
  }

  useEffect(() => {
    buildListCalendar();
  }, []);

  function rowHasChanged(r1, r2) {
    return r1.scheduleId !== r2.scheduleId;
  }

  return (
    <Container>
      <Header navigation={navigation} />
      {items && (
        <Agenda
          items={items}
          selected={selectedDate}
          renderItem={item => <CalendarItem item={item} />}
          rowHasChanged={rowHasChanged}
          renderEmptyData={() => <ListEmptyComponent />}
        />
      )}
      {!items && <ListEmptyComponent />}
    </Container>
  );
};

CalendarMeeting.propTypes = {
  listcalendarRoomDetail: PropTypes.arrayOf(PropTypes.shape({})),
};
CalendarMeeting.defaultProps = {
  listcalendarRoomDetail: [],
};

export default CalendarMeeting;
