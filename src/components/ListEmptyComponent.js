import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

import colors from '../utils/colors';

const styles = StyleSheet.create({
  emptyView: {
    justifyContent: 'center',
    paddingTop: 20,
  },
  emptyText: {
    fontSize: 17,
    color: colors.gray,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

const ListEmptyComponent = () => (
  <View style={styles.emptyView}>
    <Text style={styles.emptyText}>Không có dữ liệu</Text>
  </View>
);

export default ListEmptyComponent;
