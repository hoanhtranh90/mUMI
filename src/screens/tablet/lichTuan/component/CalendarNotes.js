import { Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as notesService from '../../../../service/notesService';
import NavigationService from '../../../../utils/NavigationService';

const CalendarNotes = ({ hcCaseCalendar, isShowLabel }) => {
  const [calendarNotes, setCalendarNotes] = useState([]);

  useEffect(() => {
    let isMounted = true;
    loadCalendarNotes().then(data => {
      if (isMounted) setCalendarNotes(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const getSubData = item => {
    let dataJson = typeof item.dataJson === 'string' ? JSON.parse(item.dataJson) : item.dataJson;
    return dataJson[0].value;
  };

  const Note = ({ note }) => {
    return (
      <TouchableOpacity
        key={note.id}
        style={{
          width: '100%',
          backgroundColor: '#fff',
          height: 30,
        }}
        onPress={() => {
          NavigationService.navigate('GhiChuLichTuan', { id: note.id });
        }}
      >
        <Text numberOfLines={1} style={{ textDecorationLine: 'underline', color: '#0088ff' }}>
          {note.title || getSubData(note) || 'Không có tiêu đề'}
        </Text>
      </TouchableOpacity>
    );
  };

  const loadCalendarNotes = () => {
    return notesService.findByHcCalendar(hcCaseCalendar.caseMasterId);
  };

  if (calendarNotes && calendarNotes.length > 0) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isShowLabel && (
          <Text
            style={{
              fontWeight: 'bold',
              lineHeight: 25,
              fontSize: 16,
            }}
          >
            Ghi chú:{' '}
          </Text>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
          }}
          onPress={() => {
            NavigationService.navigate('GhiChuLichTuan', { id: calendarNotes[0].id });
          }}
        >
          <Text numberOfLines={1} style={{ textDecorationLine: 'underline', color: '#0088ff' }}>
            Xem ghi chú
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <></>;
  }
};

CalendarNotes.defaultProps = {
  isShowLabel: true,
};

export default CalendarNotes;
