import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import colors from '../utils/colors';
import { convertLableModeDocument } from '../utils/utils';

import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    height: 44,
    width: 120,
    flex: 1,
    // marginTop: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.gray,
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

const MenuPopupDocument = ({ current, modes, onChange, checkLanhDao, type, isIn }) => (
  <View style={styles.container}>
    <Menu style={{ height: 40, alignItems: 'flex-start', justifyContent: 'center', flex: 1 }}>
      <MenuTrigger>
        <View style={{ height: 40, flexDirection: 'row', alignItems: 'center' }}>
          {isIn && (
            <Text style={styles.title}>
              {current.type == undefined && isNaN(type)
                ? modes[0]?.label.toUpperCase()
                : current.type == undefined && !isNaN(type)
                ? modes[type == 0 ? 1 : type == 1 ? 3 : type == 2 ? 2 : 0]?.label.toUpperCase()
                : current.type != undefined && !isNaN(type)
                ? modes[current.type]?.label.toUpperCase()
                : current.type != undefined && isNaN(type)
                ? modes[current.type]?.label.toUpperCase()
                : ''}
            </Text>
          )}
          {!isIn && (
            <Text style={styles.title}>{convertLableModeDocument(current.type, modes)}</Text>
          )}
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
        {modes.map(({ label, value, icon, relationType, type, filterStatus, isLanhDao }, index) => {
          if (!checkLanhDao && isLanhDao) {
            return <View />;
          }
          return (
            <MenuOption onSelect={() => onChange(value, relationType, type, filterStatus)}>
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
                <Icon name={icon} type="Feather" style={{ color: colors.blue, fontSize: 20 }} />
                <Text style={{ color: 'black', marginLeft: 8 }}>{label}</Text>
                {/* <View style={{ position: 'absolute', bottom: 0, flex: 1, width: '150%', height: 1, backgroundColor: 'blue' }}></View> */}
              </View>
            </MenuOption>
          );
        })}
      </MenuOptions>
    </Menu>
    {/* <View style={{ alignSelf: 'flex-end', backgroundColor: 'red', width: 200, height: 40 }}></View> */}
  </View>
);

MenuPopupDocument.propTypes = {
  current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  modes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  checkLanhDao: PropTypes.bool,
};

export default MenuPopupDocument;
