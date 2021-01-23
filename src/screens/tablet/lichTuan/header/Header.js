import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Icon, Text, View } from 'native-base';
import { changeHcFlow, loadAcceptedRequests } from '../../../../store/hcCalendar/reducer';
import ModeSwitches from './ModeSwitches';
import SelectBox from './SelectBox';
import ModalSearch from '../component/ModalSearch';
import NavigationService from 'eoffice/utils/NavigationService';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fd',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  txtHeader: {
    color: '#2d3e4f',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 16,
    marginBottom: 8,
  },
  scopeCalendar: {
    // width: 400,
    marginTop: 2,
    marginRight: 10,
    height: 40,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconCalendar: { color: '#007aff', fontSize: 24, paddingLeft: 8 },
  txtCalendar: { paddingLeft: 8, paddingTop: 5 },
  iconSearch: {
    color: '#007aff',
    fontSize: 24,
    paddingLeft: 8,
  },
  txtInputSearch: { width: '54%', fontSize: 15, flex: 4 },
  btnMoreSearch: { paddingVertical: 5, height: 38, borderRadius: 8 },
});

const Header = ({ hcFlows, currentHcFlow, changeHcFlow, loadAcceptedRequests, query }) => {
  const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);

  const onSelect = itemId => {
    changeHcFlow(itemId);
  };

  const search = options => {
    let queryState = Object.assign({}, query);
    queryState.keyword = options.keyword;
    loadAcceptedRequests(queryState);
    setIsOpenModalSearch(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.rowFlex}>
          <Text style={styles.txtHeader}>Lịch tuần</Text>
          <View style={styles.scopeCalendar}>
            <SelectBox hcFlows={hcFlows} currentHcFlow={currentHcFlow} onSelect={onSelect} />
          </View>
          <View style={styles.rowFlex}>
            <TouchableOpacity onPress={() => setIsOpenModalSearch(val => !val)}>
              <Icon name="search" type="Feather" style={styles.iconSearch} />
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={() => NavigationService.navigate('LichTuanChiaseScreen')}>*/}
            {/*  <Icon name="share-2" type="Feather" style={styles.iconSearch} />*/}
            {/*</TouchableOpacity>*/}
          </View>
        </View>
      </View>
      <ModalSearch
        isOpen={isOpenModalSearch}
        toggleIsOpen={flag => setIsOpenModalSearch(flag)}
        search={search}
      />
    </>
  );
};

const mapStateToProps = ({ hcCalendar }) => ({
  hcFlows: hcCalendar.hcFlows,
  currentHcFlow: hcCalendar.currentHcFlow,
  query: hcCalendar.query,
});

const mapDispatchToProps = {
  changeHcFlow: changeHcFlow,
  loadAcceptedRequests: loadAcceptedRequests,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
