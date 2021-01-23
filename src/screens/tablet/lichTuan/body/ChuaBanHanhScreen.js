import { StyleSheet, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import React from 'react';
import HcCalendarDetail from '../HcCalendarDetail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  left: {
    flex: 5,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  right: {
    flex: 3,
  },
  timeTitle: {
    color: 'gray',
    fontSize: 15,
    width: 70,
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  timeLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 80,
    paddingLeft: 10,
  },
  cell: {
    backgroundColor: 'rgb(90, 200, 250)',
    position: 'absolute',
    width: '100%',
    padding: 10,
  },
  cellTitle: {
    color: 'black',
    fontSize: 13,
  }
});

const TimeLine = ({ time }) => {
  return (
    <View style={styles.timeLine}>
      <Text style={styles.timeTitle}>{time}</Text>
      <View style={styles.line} />
    </View>
  );
};

const Cell = ({item}) => {
  let timeLength =  item.timeEnd - item.timeStart ;
  let height = 80 * timeLength
  let top = item.timeStart * 80 + 40
  let left = 85
  console.log(top)
  return (
    <View style={[styles.cell,{top: top, left: left, height: height}]}>
      <Text style={styles.cellTitle}>{item.title}</Text>
    </View>
  );
}

const ChuaBanHanhScreen = ({}) => {
  const time = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];
  const data = [
    {
      timeStart: 1.5,
      timeEnd: 2.5,
      title: "Họp lãnh đạo TCT"
    },
    {
      timeStart: 3.5,
      timeEnd: 5,
      title: "Họp phòng PTPM & GPNB"
    }
    ,
    {
      timeStart: 5.5,
      timeEnd: 7.5,
      title: "Họp phòng PTPM & GPKH"
    }
    ,
    {
      timeStart: 7.5,
      timeEnd: 9,
      title: "Họp phòng Kế toán"
    }
    ,
    {
      timeStart: 9.5,
      timeEnd: 11,
      title: "Họp phòng Big Data"
    }
    ,
    {
      timeStart: 12,
      timeEnd: 15.5,
      title: "Họp kinh doanh"
    }
  ];
  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={styles.left}>
            <ScrollView>
              {time.map(item => (
                <TimeLine time={item} />
              ))}
              {data.map(item => (
                <Cell item={item} />
              ))}
            </ScrollView>
          </View>
          <View style={styles.right}>
            <HcCalendarDetail />
          </View>
        </View>
      </View>
    </>
  );
};

export default ChuaBanHanhScreen;
