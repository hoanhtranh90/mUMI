import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import format from 'date-fns/format';
import { View, Text, Icon, Button } from 'native-base';
import useModal from 'eoffice/utils/useModal';
import DateRangeCalendarModal from 'eoffice/components/modals/DateRangeCalendarModal';
import { DOCUMENT_TYPE } from '../../../../constants/documents';
import DateFiltersDocument from '../../common/DateFiltersDocument';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fd',
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
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
    marginTop: 2,
    marginRight: 10,
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
  rowFlex: {
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

const ListHeader = ({ query, mode, targetField, updateQuery, onAdvSearch, usingAdvanced }) => {
  const [isVisible, open, close] = useModal();
  const [keyword, setKeyword] = useState('');
  useEffect(
    () => {
      setKeyword(query.keyword);
    },
    [query]
  );
  const clickToSearchAdv = type => {
    onAdvSearch();
    setKeyword('');
    const letQueryConvert = query;
    delete letQueryConvert.usingAdvanceSearch;
    delete letQueryConvert.fileContent;
    delete letQueryConvert.docCode;
    delete letQueryConvert.quote;
    delete letQueryConvert.docTypeId;
    delete letQueryConvert.publisherId;
    delete letQueryConvert.outsidePublisherName;
    delete letQueryConvert.incomingDate;
    delete letQueryConvert.vbDocUserUpdateTime;
    delete letQueryConvert.priorityId;
    delete letQueryConvert.processTime;
    delete letQueryConvert.receiveDeptId;
    delete letQueryConvert.otherReceivePlaces;
    updateQuery({ ...letQueryConvert, keyword: '' });
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
      <View style={styles.rowFlex}>
        {mode === DOCUMENT_TYPE.VB_DEN && <Text style={styles.txtHeader}>Văn bản đến</Text>}
        {mode === DOCUMENT_TYPE.VB_DI && <Text style={styles.txtHeader}>Văn bản đi</Text>}
        <View style={styles.scopeCalendar}>
          <DateFiltersDocument targetField="docDate" />
        </View>
        <View style={styles.scopeSearch}>
          <View style={styles.touchableSearch}>
            <View style={styles.rowFlex}>
              <Icon name="search" type="Feather" style={styles.iconSeacrch} />
              <TextInput
                style={styles.txtInputSearch}
                placeholder="Nhập từ khoá"
                onChangeText={setKeyword}
                value={keyword}
                editable={!usingAdvanced}
                onSubmitEditing={() => {
                  console.log('onSubmitEditing')
                  updateQuery({ keyword, ...initialState, usingAdvanceSearch: 0 })
                }

                }
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

    </View>
  );
};

ListHeader.propTypes = {
  query: PropTypes.shape({}).isRequired,
  targetField: PropTypes.string.isRequired,
  updateQuery: PropTypes.func,
  onAdvSearch: PropTypes.func,
  mode: PropTypes.number.isRequired,
  usingAdvanced: PropTypes.bool,
};

ListHeader.defaultProps = {
  onAdvSearch() { },
  updateQuery() { },
};

export default ListHeader;
