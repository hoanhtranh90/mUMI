import {Text, TouchableOpacity, View} from "react-native";
import colors from "../../../../utils/colors";
import {Icon} from "native-base";
import format from "date-fns/format";
import React from "react";
import { styles } from './StylesDetail';

export const UserItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomColor: '#efeff4',
        borderBottomWidth: 1,
      }}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'column', alignItems : 'flex-start', marginTop: 5 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.darkGray }}>
          {item.name}
        </Text>
        <View style={styles.row}>
          <Icon type="AntDesign" name="phone" style={{ fontSize: 12, color: colors.blue }} />
          <Text style={{ fontSize: 14, color: colors.gray, marginLeft: 5 }}>{item.phone}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'column', alignItems : 'flex-end', marginTop: 5 }}>
        <Text>{format(item.birthday, 'dd/MM/yyyy')}</Text>
        <View style={styles.row}>
          <Icon type="AntDesign" name="idcard" style={{ fontSize: 12, color: colors.gray }} />
          <Text style={{ fontSize: 14, color: colors.gray, marginLeft: 5 }}>{item.cmt}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
