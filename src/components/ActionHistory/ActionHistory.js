import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, StyleSheet, Platform, RefreshControl } from 'react-native';
import { actions, selectors } from 'eoffice/store/documents/detail';
import HistoryItem from './HistoryItem';

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        paddingVertical: 20,
      },
      android: {
        paddingBottom: 70,
        paddingTop: 10,
      },
    }),
  },
});
const ActionHistory = ({
  getActionLogHeader,
  history,
  loadHistory,
  reloadHistory,
  pagesNumberOfDoc,
  mode,
}) => {
  useEffect(() => {
    loadHistory();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  return (
    <FlatList
      data={history}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            reloadHistory();
          }}
        />
      }
      renderItem={({ item }) => (
        <HistoryItem
          getActionLogHeader={getActionLogHeader}
          item={item}
          pagesNumberOfDoc={pagesNumberOfDoc}
          mode={mode}
        />
      )}
      contentContainerStyle={styles.flatList}
    />
  );
};

ActionHistory.propTypes = {
  getActionLogHeader: PropTypes.func.isRequired,
  loadHistory: PropTypes.func.isRequired,
  reloadHistory: PropTypes.func,
  pagesNumberOfDoc: PropTypes.number,
  history: PropTypes.arrayOf(PropTypes.shape({})),
  mode: PropTypes.number.isRequired,
};
ActionHistory.defaultProps = {
  history: [],
  pagesNumberOfDoc: null,
};

export default ActionHistory;
