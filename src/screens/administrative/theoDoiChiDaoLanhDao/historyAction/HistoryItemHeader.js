import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from 'eoffice/utils/colors';
import { formatTimestamp } from 'eoffice/utils/utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  nameCreator: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  timestamp: {
    textAlign: 'right',
    fontSize: 13,
    color: colors.gray,
    fontStyle: 'italic',
  },
});

const HistoryItemHeader = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameCreator}>{item.creatorName}</Text>
      <Text style={styles.timestamp}>{formatTimestamp(item.createTime)}</Text>
    </View>
  );
}

export default HistoryItemHeader;
