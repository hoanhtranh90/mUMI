/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { View, Text, Icon, Button } from 'native-base';
import useModal from 'eoffice/utils/useModal';
import DateRangeCalendarModal from 'eoffice/components/modals/DateRangeCalendarModal';
import colors from "../../../../utils/colors";
import format from "date-fns/format";
import { connect } from 'react-redux';
import { actions, selectors } from '../../../../store/administrative/theoDoiChiDaoLanhDao';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fd',
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  rowHeader: {
    flexDirection: 'row',
  },
  txtHeader: {
    flex: 2.5,
    color: '#2d3e4f',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 16,
    marginBottom: 8,
  },
  scopeCalendar: {
    flex: 1.7,
    marginRight: 10,
    marginTop: 2,
  },
  touchableCalendar: {
    backgroundColor: 'white',
    borderColor: 'rgba(0, 122, 255, 0.2)',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
  touchableSearch: {
    backgroundColor: 'white',
    borderColor: 'rgba(0, 122, 255, 0.2)',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowCalendar: {
    flexDirection: 'row',
  },
  rowSearch: {
    flexDirection: 'row',
  },
  iconCalendar: { color: colors.blue, fontSize: 18 } ,
  txtCalendar: { paddingLeft: 8, paddingTop: 5 },
  scopeSearch: {
    flex: 1.5,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  iconSeacrch: {
    color: '#007aff',
    fontSize: 24,
    paddingLeft: 8,
    flex: 1,
    alignSelf: 'center',
  },
  titleDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blue,
    marginLeft: 4,
  },
  txtInputSearch: { width: '54%', fontSize: 15, flex: 4 },
  btnMoreSearch: { paddingVertical: 5, height: 38, borderRadius: 8 },
});

const HeaderTablet = ({searchRequests}) => {
  const [isVisible, open, close] = useModal();
  const [keyword, setKeyword] = useState('');
  const [dateQuery, setDateQuery] = useState(null)

  useEffect(() => {
    const query = {
      page: 0,
      size: 10,
      sort: 'updateTime,desc',
      meeting : keyword
    }
    // keyword === '' ? query.meeting = null : query.meeting = keyword

    if (dateQuery) {
      query.startTimeCommand = dateQuery[0].timestamp
      query.endTimeCommand = dateQuery[1].timestamp
    }

    searchRequests(query)
  },[dateQuery,keyword])

  return (
    <View style={styles.container}>
      <View style={styles.rowHeader}>
        <Text style={styles.txtHeader}>Lãnh đạo chỉ đạo</Text>
        <View style={styles.scopeCalendar}>
          <TouchableOpacity
            style={styles.touchableCalendar}
            onPress={() => {
              open()
            }}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Icon name={'calendar'} type="Feather" style={styles.iconCalendar}/>
              <Text style={styles.titleDate}>
                {dateQuery ?
                  `${format(dateQuery[0].timestamp,'dd/MM/yyyy')} - ${format(dateQuery[1].timestamp,'dd/MM/yyyy')}`
                  : `${format(new Date(),'dd/MM/yyyy')} - ${format(new Date(),'dd/MM/yyyy')}`
                }
              </Text>
              <Icon name={'eye'} type="Feather" style={styles.iconCalendar}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.scopeSearch}>
          <View style={styles.touchableSearch}>
            <View style={styles.rowSearch}>
              <Icon name="search" type="Feather" style={styles.iconSeacrch} />
              <TextInput
                style={styles.txtInputSearch}
                placeholder="Nhập từ khoá"
                onChangeText={setKeyword}
                value={keyword}
              />
              {/*<View style={{ flex: 3, paddingVertical: 8 }}>*/}
              {/*  <Button style={styles.btnMoreSearch} onPress={() => {}}>*/}
              {/*    <Text>Nâng cao</Text>*/}
              {/*  </Button>*/}
              {/*</View>*/}
            </View>
          </View>
        </View>
      </View>

      {isVisible && (
        <DateRangeCalendarModal
          close={close}
          isVisible={isVisible}
          range={dateQuery}
          onSuccess={(from, to) => {
            setDateQuery([from, to])
            close();
          }}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  searchRequests: actions.searchRequests,
};

export default connect(
  null,
  mapDispatchToProps
)(HeaderTablet);
