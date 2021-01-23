import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from 'eoffice/utils/colors';
import {Icon} from "native-base";
import { CHI_DAO } from "../../../../constants/documents";
import {formatDate} from "../../../../utils/h";

const styles = StyleSheet.create({
  icon: { fontSize: 15, color: '#007aff' },
  textTouchable: { fontSize: 15, color: '#007aff' },
  normalText: { fontSize: 15, color: colors.darkGray },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginTop: 8,
    alignItems: 'center',
    marginBottom : 8
  }
})

const ExtendAction = ({ item }) => {
  const dataJson = JSON.parse(item.dataJson);
  const previousDeadline = dataJson.previousDeadline;
  const nextDeadline = dataJson.nextDeadline
  return (
    <View style={styles.container}>
      <Icon type="Feather" name="check-circle" style={styles.icon} />
      <View style={{marginHorizontal: 6}}>
        <Text style={styles.textTouchable}>
          Xin gia hạn chỉ đạo
          {previousDeadline && <Text style={styles.normalText}> từ ngày </Text>}
          {previousDeadline ? formatDate(new Date(previousDeadline)) : ''}
          {nextDeadline && <Text style={styles.normalText}> đến ngày </Text>}
          {nextDeadline ? formatDate(new Date(nextDeadline)) : ''}</Text>
      </View>
    </View>
  );
}

export default ExtendAction;
