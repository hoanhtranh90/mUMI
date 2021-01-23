import React, { useState, useEffect } from 'react';
import {View, Image, StyleSheet, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {findById} from "../../../../store/hcCalendar/service";
import {format} from "date-fns";
import NavigationService from "../../../../utils/NavigationService";

const CalendarLinkView = ({ noteId, object }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true)
  const caseMasterId = object.value
  const imgDisplay = require('../../../../assets/calendar_link.png');

  const loadData = () => findById(caseMasterId)

  useEffect(() => {
    let isMounted = true;
    if (caseMasterId) {
      loadData().then(data => {
        if (isMounted) {
          if (data) {
            setData(data)
            setLoading(false)
          }
        }
      });
    }
    return () => {
      isMounted = false
      setLoading(false)
    };
  }, [caseMasterId]);

  return (
    <View>
      {data && data.hcCaseCalendar && (
        <TouchableOpacity onPress={() => {
          NavigationService.navigate('LichTuanScreen', { data });
        }}>
          <View style={styles.container}>

            <View style={styles.fileText}>
              <Text style={styles.title}>{data.hcCaseCalendar.meetingTitle}</Text>
              <Text style={styles.text}>{format(new Date(data.hcCaseCalendar.createTime), 'MM/dd/yyyy HH:mm')}</Text>
            </View>

            <Image
              style={styles.icon}
              source={imgDisplay}
            />
          </View>
        </TouchableOpacity>
      )}
      {loading && <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    color: 'black',
    fontSize: 15,
  },
  title: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  fileText: {
    justifyContent: 'space-between',
    marginRight: 20,
  },
  icon: {
    width: 64,
    height: 64,
  },
});

export default CalendarLinkView;
