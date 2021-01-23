import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Button, Icon, Right, Text} from "native-base";
import { TASK_TYPES } from '../../../../constants/tasks';
const Row = ({item, currentMode, changeMode}) => {
  return (
      <TouchableOpacity onPress={changeMode}>
        <View style={currentMode === item.value ? styles.colorSelect : styles.colorNormal}>
          <Icon name={item.label} type="Feather"
                style={currentMode === item.value ?
                styles.iconSelect : styles.iconNormal} />
          <Text style={currentMode === item.value ?
            styles.txtSelect : styles.txtNormal}>{item.title}</Text>
        </View>
      </TouchableOpacity>
  )
}
const modes = [
  {
    title: 'Việc được giao',
    label: 'layers',
    value: TASK_TYPES.RECEIVED,
  },
  {
    title: 'Việc tôi giao',
    label: 'file-text',
    value: TASK_TYPES.ASSIGNED,
  },
]

const LeftBar = () => {
  const [mode, setMode] = useState(TASK_TYPES.RECEIVED)
  return (
    <View style={styles.container}>
      {modes.map(item => {
        return (
          <Row item={item} currentMode={mode} changeMode={()=> setMode(item.value)}></Row>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#efeff4',
  },
  iconNormal: {
    fontSize: 23,
    color: '#c9c7c6',
    padding: 4,
  },
  iconSelect: {
    fontSize: 23,
    color: '#fff',
    padding: 4,
  },

  txtNormal: {
    color: '#2b2d50',
    fontSize: 16,
    marginHorizontal: 8,
  },

  txtSelect: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 8,
  },

  colorSelect: {
    backgroundColor: '#007aff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  colorNormal: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  }

});

export default LeftBar;
