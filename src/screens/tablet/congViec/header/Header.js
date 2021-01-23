import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import {Button, Icon, Text} from "native-base";
import DateFiltersDocument from "../../../documents/common/DateFiltersDocument";

const Header = () => {
  const [keyword, setKeyword] = useState('');

  const clickToSearch = () => {
    setKeyword('');
    //const letQueryConvert = query;
    //updateQuery({ ...letQueryConvert, keyword: '' });
  };
  return (
    <View style={styles.rowFlex}>
      <Text style={styles.txtHeader}>Công việc</Text>

      <View style={styles.scopeCalendar}>
        <DateFiltersDocument/>
      </View>
      <View style={styles.scopeSearch}>
        <View style={styles.touchableSearch}>
          <View style={styles.rowFlex}>
            <Icon name="search" type="Feather" style={styles.iconSearch} />
            <TextInput
              style={styles.txtInputSearch}
              placeholder="Nhập từ khoá"
              onChangeText={setKeyword}
              value={keyword}
              onSubmitEditing={() =>{}
                // updateQuery({ keyword, ...initialState, usingAdvanceSearch: 0 })
              }
            />
            <View style={{ flex: 3, paddingVertical: 8 }}>
              <Button style={styles.btnMoreSearch} onPress={() => clickToSearch()}>
                <Text>Nâng cao</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  scopeSearch: {
    flex: 2,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  iconSearch: {
    color: '#007aff',
    fontSize: 24,
    padding: 8,
    flex: 1,
    alignSelf: 'center',
  },
  txtInputSearch: { width: '54%', fontSize: 15, flex: 4 },
  btnMoreSearch: { paddingVertical: 5, height: 38, borderRadius: 8 },
});
export default Header;
