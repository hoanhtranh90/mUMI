import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Cell, Table, TableWrapper } from 'react-native-table-component';
import { Text, View } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  text: { margin: 6 },
  row: { flexDirection: 'row' },
  days: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  textBlack: {
    color: 'black',
    fontSize: 14,
  },
  textWhite: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textGray: {
    color: '#bbb',
    fontSize: 14,
  },
  dayText: {
    fontSize: 12,
  },
  bgBlue: {
    backgroundColor: '#0091ff',
  },
});

const CalendarMini = forwardRef(({}, ref) => {
  const today = new Date();
  const thead = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const [data, setData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(today);
  const [crrDate, setCrrDate] = useState(null);
  const [crrMonth, setCrrMonth] = useState(null);
  const [crrYear, setCrrYear] = useState(null);

  const handlerSelectDay = (cell, rowIndex) => {
    if (isPreMonth(cell, rowIndex)) {
      let date = new Date(
        crrMonth === 0 ? crrYear - 1 : crrYear,
        crrMonth === 0 ? 11 : crrMonth - 1,
        cell
      );
      setSelectedDay(date);
    } else if (isNextMonth(cell, rowIndex)) {
      let date = new Date(
        crrMonth === 11 ? crrYear + 1 : crrYear,
        crrMonth === 11 ? 0 : crrMonth + 1,
        cell
      );
      setSelectedDay(date);
    } else {
      let date = new Date(crrYear, crrMonth, cell);
      setSelectedDay(date);
    }
  };

  const isPreMonth = (cell, rowIndex) => {
    return rowIndex <= 1 && cell > 15;
  };
  const isNextMonth = (cell, rowIndex) => {
    return rowIndex >= 4 && cell < 15;
  };

  const element = (cell, rowIndex) => (
    <TouchableOpacity onPress={() => handlerSelectDay(cell, rowIndex)}>
      <View
        style={[
          styles.days,
          isPreMonth(cell, rowIndex) || isNextMonth(cell, rowIndex)
            ? {}
            : cell === crrDate
            ? styles.bgBlue
            : {},
        ]}
      >
        <Text
          style={[
            isPreMonth(cell, rowIndex) || isNextMonth(cell, rowIndex)
              ? styles.textGray
              : cell === crrDate
              ? styles.textWhite
              : styles.textBlack,
          ]}
        >
          {cell}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const elementHead = cell => (
    <View style={styles.days}>
      <Text style={styles.textBlack}>{cell}</Text>
    </View>
  );

  const populateResult = selectedDay => {
    let preMonth = new Date(
      selectedDay.getMonth() === 0 ? selectedDay.getFullYear() - 1 : selectedDay.getFullYear(),
      selectedDay.getMonth() === 0 ? 11 : selectedDay.getMonth() - 1,
      1
    );
    let dayInPreMonth = daysIn(preMonth.getMonth() + 1, preMonth.getFullYear());
    let dayInNextMonth = 1;
    let result = calendar(selectedDay.getMonth() + 1, selectedDay.getFullYear());
    let indexFirstDay = result.indexOf(1);
    let indexLastDay = result.indexOf(
      daysIn(selectedDay.getMonth() + 1, selectedDay.getFullYear())
    );
    for (let i = indexFirstDay - 1; i >= 0; i--) {
      result[i] = dayInPreMonth--;
    }
    for (let i = indexLastDay + 1; i <= 41; i++) {
      result[i] = dayInNextMonth++;
    }

    return result;
  };

  useEffect(
    () => {
      if (selectedDay) {
        setCrrDate(selectedDay.getDate());
        setCrrMonth(selectedDay.getMonth());
        setCrrYear(selectedDay.getFullYear());
        if (selectedDay.getMonth() !== crrMonth) {
          let result = populateResult(selectedDay);
          let resultNew = chunk(result, 7);
          setData(resultNew);
        }
      }
    },
    [selectedDay]
  );

  useImperativeHandle(ref, () => ({
    preDay: () => {},

    nextDay: () => {},
  }));

  const chunk = (arr: any[], size) => {
    let R = [];
    for (let i = 0; i < arr.length; i += size) R.push(arr.slice(i, i + size));
    return R;
  };

  const isLeap = year => {
    if (year % 4 || (year % 100 === 0 && year % 400)) return 0;
    else return 1;
  };

  const daysIn = (month, year) => {
    return month === 2 ? 28 + isLeap(year) : 31 - (((month - 1) % 7) % 2);
  };

  function Zeller(D, M, Y) {
    if (M < 3) {
      M = M + 12;
      Y = Y - 1;
    }

    const C = Math.floor(Y / 100);
    const K = Y - 100 * C;

    const S = Math.floor(2.6 * M - 5.39) + Math.floor(K / 4) + Math.floor(C / 4) + D + K - 2 * C;

    return S - 7 * Math.floor(S / 7);
  }

  const calendar = (month, year) => {
    let startIndex = Math.trunc(Zeller(1, month, year));
    if (startIndex === 0) startIndex = startIndex + 7;
    let endIndex = daysIn(month, year);
    let result = Array.apply(0, Array(42)).map(() => {
      return 0;
    });
    for (let i = startIndex; i < endIndex + startIndex; i++) {
      result[i] = i - startIndex + 1;
    }
    return result;
  };

  return (
    <>
      <View style={styles.container}>
        <Text>
          Tháng {selectedDay.getMonth() + 1} Năm {selectedDay.getFullYear()}
        </Text>
        <Table borderStyle={{ borderWidth: 0 }}>
          <TableWrapper style={styles.row}>
            {thead.map((cellData, cellIndex) => (
              <Cell key={cellIndex} data={elementHead(cellData)} style={{ marginRight: 10 }} />
            ))}
          </TableWrapper>
          {data.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell key={cellIndex} data={element(cellData, index)} style={{ marginRight: 10 }} />
              ))}
            </TableWrapper>
          ))}
          {/*<Rows data={data} textStyle={styles.text}/>*/}
        </Table>
      </View>
    </>
  );
});

export default CalendarMini;
