import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import SummaryItem from './SummaryItem';
import { POSITION_NAME } from '../../../constants/documents';

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: '#dddddd',
    paddingTop: 16,
    paddingLeft: 12,
    paddingRight: 20,
    backgroundColor: '#ffffff',
  },
  txtSummary: {
    fontSize: 15,
    color: '#2b2d50',
    fontWeight: 'bold',
    paddingLeft: 8,
  },
  headerTable: {
    flex: 1.5,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  headerColum1: {
    flex: 2.5,
    alignSelf: 'stretch',
  },
  table: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  txtHeader: {
    fontSize: 15,
    color: '#2d3e4f',
    fontWeight: 'bold',
  },
});

const SummaryBox = ({ currentId, items }) => (
  <View style={styles.container}>
    <Text style={styles.txtSummary}>Tổng quan</Text>
    <View style={styles.table}>
      <View style={styles.headerColum1} />
      <View style={styles.headerTable}>
        <Text style={styles.txtHeader}>VB Đến</Text>
      </View>
      <View style={styles.headerTable}>
        <Text style={styles.txtHeader}>VB Dự thảo</Text>
      </View>
      <View style={styles.headerTable}>
        <Text style={styles.txtHeader}>Đã phát hành</Text>
      </View>
      {/* <View style={styles.headerTable}>
        <Text style={styles.txtHeader}>Công việc</Text>
      </View>
      <View style={styles.headerTable}>
        <Text style={styles.txtHeader}>Hành chính</Text>
      </View> */}
    </View>
    <FlatList
      data={items}
      scrollEnabled
      keyExtractor={item => item.userDeptRole.id}
      renderItem={({ item }) => (
        <>
          {item.userDeptRole.positionName !== POSITION_NAME.VAN_THU &&
            item.userDeptRole.positionName !== POSITION_NAME.ADMIN && (
              <SummaryItem {...item} selected={item.userDeptRole.id === currentId} />
            )}
        </>
      )}
    />
  </View>
);

SummaryBox.propTypes = {
  currentId: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape()),
};

SummaryBox.defaultProps = {
  currentId: null,
  items: [],
};

export default SummaryBox;
