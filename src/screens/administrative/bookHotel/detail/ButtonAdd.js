import { styles } from './StylesDetail';
import {Text, TouchableOpacity, View} from "react-native";
import {Icon} from "native-base";
import colors from "../../../../utils/colors";
import React from "react";

export const ButtonAdd = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.roundButton} onPress={onPress}>
      <Icon name="plus" type="Feather" style={{ color: '#fff', fontSize: 20, marginLeft: 5 }} />
    </TouchableOpacity>
  )
}
