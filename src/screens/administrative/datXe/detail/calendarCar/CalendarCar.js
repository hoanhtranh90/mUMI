import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import format from 'date-fns/format';
import { Agenda } from 'react-native-calendars';
import ListEmptyComponent from 'eoffice/components/ListEmptyComponent';
import _ from 'lodash';
import Header from './CalendarHeader';
import CalendarItem from './CalendarItem';

const CalendarCar = ({ navigation, listCarCalendar }) => {
  const [items, setItems] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  function buildListCalendar() {
    if (!_.isEmpty(listCarCalendar)) {
      const newItems = {};
      _.forEach(listCarCalendar, obj => {
        for (let loopTime = obj.startTime; loopTime < obj.endTime; loopTime += 86400000) {
          const strTime = format(new Date(loopTime), 'yyyy-MM-dd');

          if (!newItems[strTime]) {
            newItems[strTime] = [];
            newItems[strTime].push({
              carName: `${obj.manufacturer} - ${obj.licencePlate}`,
              driverName: obj.driverName,
              content: obj.content,
              fromPlace: obj.fromPlace,
              toPlace: obj.toPlace,
              startTime: format(new Date(obj.startTime), 'dd/MM/yyyy HH:mm'),
              endTime: format(new Date(obj.endTime), 'dd/MM/yyyy HH:mm'),
              startTimeTmp: format(new Date(obj.startTime), 'MM/dd/yyyy HH:mm'),
              endTimeTmp: format(new Date(obj.endTime), 'MM/dd/yyyy HH:mm'),
              scheduleId: obj.scheduleId,
              driverMobile: obj.driverMobile,
            });
          } else {
            newItems[strTime].push({
              carName: `${obj.manufacturer} - ${obj.licencePlate}`,
              driverName: obj.driverName,
              content: obj.content,
              fromPlace: obj.fromPlace,
              toPlace: obj.toPlace,
              startTime: format(new Date(obj.startTime), 'dd/MM/yyyy HH:mm'),
              endTime: format(new Date(obj.endTime), 'dd/MM/yyyy HH:mm'),
              startTimeTmp: format(new Date(obj.startTime), 'MM/dd/yyyy HH:mm'),
              endTimeTmp: format(new Date(obj.endTime), 'MM/dd/yyyy HH:mm'),
              scheduleId: obj.scheduleId,
              driverMobile: obj.driverMobile,
            });
          }
        }
      });

      _.forEach(newItems, objItem => {
        objItem = objItem.sort((a, b) => new Date(a.startTimeTmp) - new Date(b.startTimeTmp));
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

CalendarCar.propTypes = {
  listCarCalendar: PropTypes.arrayOf(PropTypes.shape({})),
};
CalendarCar.defaultProps = {
  listCarCalendar: [],
};

export default CalendarCar;
