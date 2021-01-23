import {Text, TouchableOpacity, View} from "react-native";
import colors from "../../../../utils/colors";
import {Icon} from "native-base";
import format from "date-fns/format";
import React from "react";
import { styles } from './StylesDetail';
export const PlaceItem = ({ item, onPress }) => {
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
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.darkGray }}>
          {item.hotelName}
        </Text>
        <View style={{alignItems : 'flex-start', marginTop: 5 }}>
          <View style={styles.row}>
            <Icon type="AntDesign" name="doubleright" style={{ fontSize: 12, color: colors.blue }} />
            <Text style={{ fontSize: 14, color: colors.gray, marginLeft: 5 }}>
              {format(item.checkin, 'dd/MM/yyyy HH:mm')}
            </Text>
          </View>
        </View>
        <View style={{alignItems : 'flex-start', marginTop: 5 }}>
          <View style={styles.row}>
            <Icon type="AntDesign" name="doubleleft" style={{ fontSize: 12, color: colors.red }} />
            <Text style={{ fontSize: 14, color: colors.gray, marginLeft: 5 }}>
              {format(item.checkout, 'dd/MM/yyyy HH:mm')}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.locationName}</Text>
      </View>
    </TouchableOpacity>
  );
};
