import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import colors from 'eoffice/utils/colors';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import {modes} from "../../../../constants/administrative";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    height: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blue,
    marginRight: 10,
  },
  separator: {
    width: 1,
    backgroundColor: '#b6bdc6',
    marginVertical: 9,
  },
  btn: {
    flex: 1,
    backgroundColor: colors.lighterGray,
    borderColor: colors.lighterGray,
    elevation: 0,
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(45, 62, 79, 0.5)',
    fontSize: 17,
    fontWeight: 'bold',
  },
  selectedText: {
    color: colors.blue,
  },
  menuOptions: {
    shadowColor: '#EFEFF4',
    shadowOpacity: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    borderWidth: 0.15,
    borderRadius: 8,
  },
});

const MenuFilters = ({setStateForQuery}) => {
  const [current, setCurrent] = useState(modes[0])
  return (
    <View style={styles.container}>
      <Menu style={{ height: 40, alignItems: 'flex-start', justifyContent: 'center', flex: 1 }}>
        <MenuTrigger>
          <View style={{ height: 40, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.title}>{current.label}</Text>
            <Icon
              name={'filter'}
              type="Feather"
              style={{ color: colors.blue, fontSize: 18, marginLeft: 0 }}
            />
          </View>
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={styles.menuOptions}
          customStyles={{ optionsContainer: { marginTop: 40 } }}
        >
          {modes.map((item, index) => {
            return (
              <MenuOption onSelect={() => {
                setCurrent(item)
                setStateForQuery(item.state)
              }}>
                <View
                  style={{
                    paddingLeft: 4,
                    height: 40,
                    flexDirection: 'row',
                    paddingTop: 14,
                    borderTopColor: '#EFEFF4',
                    borderTopWidth: index === 0 ? 0 : 0.5,
                  }}
                >
                  <Icon name={item.icon} type="Feather" style={{ color: colors.blue, fontSize: 20 }} />
                  <Text style={{ color: 'black', marginLeft: 8 }}>{item.label}</Text>
                </View>
              </MenuOption>
            );
          })}
        </MenuOptions>
      </Menu>
      {/* <View style={{ alignSelf: 'flex-end', backgroundColor: 'red', width: 200, height: 40 }}></View> */}
    </View>
  )
};

export default MenuFilters;
