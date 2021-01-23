/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import format from 'date-fns/format';
import { View, Text, Icon, Button } from 'native-base';
import useModal from 'eoffice/utils/useModal';
import DateRangeCalendarModal from 'eoffice/components/modals/DateRangeCalendarModal';
import DateFiltersDocument from '../../common/DateFiltersDocument';

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
    marginTop: 2
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
  },
  rowCalendar: {
    flexDirection: 'row',
  },
  rowSearch: {
    flexDirection: 'row',
  },
  iconCalendar: { color: '#007aff', fontSize: 24, paddingLeft: 8 },
  txtCalendar: { paddingLeft: 8, paddingTop: 5 },
  scopeSearch: {
    flex: 2,
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
  txtInputSearch: { width: '54%', fontSize: 15, flex: 4 },
  btnMoreSearch: { paddingVertical: 5, height: 38, borderRadius: 8 },
});

const ListHeader = ({ query, targetField, updateQuery, onAdvSearch, usingAdvanced }) => {
  const [isVisible, open, close] = useModal();
  const [keyword, setKeyword] = useState('');
  const docStatus = query.docStatus
  let label = ''
  if (docStatus === 3) {
    label = 'Đã phát hành'
  } else {
    label = 'Dự thảo'
  }
  useEffect(
    () => {
      setKeyword(query.keyword)
    },
    [query]
  );
  const clickToSearchAdv = type => {
    onAdvSearch();
    setKeyword('')
    const letQueryConvert = query
    delete letQueryConvert.usingAdvanceSearch
    // share
    delete letQueryConvert.fileContent
    delete letQueryConvert.docCode
    delete letQueryConvert.quote
    delete letQueryConvert.docTypeId
    delete letQueryConvert.publisherId
    // vb den
    delete letQueryConvert.outsidePublisherName
    delete letQueryConvert.incomingDate
    delete letQueryConvert.vbDocUserUpdateTime
    // vb di
    delete letQueryConvert.priorityId
    delete letQueryConvert.processTime
    delete letQueryConvert.receiveDeptId
    delete letQueryConvert.otherReceivePlaces
    updateQuery({ ...letQueryConvert, keyword: '' })
  };
  const initialState = {
    usingAdvanceSearch: 1,
    fileContent: undefined,
    docCode: undefined,
    quote: undefined,
    docTypeId: undefined,
    publisherId: undefined,
    outsidePublisherName: undefined,
    incomingDate: [],
    vbDocUserUpdateTime: [],
    priorityId: undefined,
    processTime: [],
    receiveDeptId: undefined,
    otherReceivePlaces: undefined,
  };
  return (
    <View style={styles.container}>
      <View style={styles.rowHeader}>
        <Text style={styles.txtHeader}>{label}</Text>
        <View style={styles.scopeCalendar}>
          <DateFiltersDocument targetField="createTime" />
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
                editable={!usingAdvanced}
                onSubmitEditing={() => updateQuery({ keyword, ...initialState, usingAdvanceSearch: 0 })}
              />
              <View style={{ flex: 3, paddingVertical: 8 }}>
                <Button style={styles.btnMoreSearch} onPress={() => clickToSearchAdv()}>
                  <Text>Nâng cao</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>

      {query[targetField] && (
        <DateRangeCalendarModal
          close={close}
          isVisible={isVisible}
          range={query[targetField]}
          onSuccess={(from, to) => {
            updateQuery({
              [targetField]: [new Date(from.timestamp), new Date(to.timestamp)],
              filterLabel: 'Tuỳ chọn',
            });
            close();
          }}
        />
      )}
    </View>
  );
};

ListHeader.propTypes = {
  query: PropTypes.shape({}).isRequired,
  targetField: PropTypes.string,
  updateQuery: PropTypes.func.isRequired,
  onAdvSearch: PropTypes.func,
};

ListHeader.defaultProps = {
  onAdvSearch() { },
  targetField: '',
  usingAdvanced: false
};

export default withNavigation(ListHeader);
