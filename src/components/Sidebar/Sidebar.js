import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import { CHANGE_LOG } from 'eoffice/constants/common';
import { DOCUMENT_TYPE } from 'eoffice/constants/documents';
import colors from 'eoffice/utils/colors';
import { getItems } from './items';
import MenuItem from './MenuItem';
import variables from '../../native-base-theme/variables/commonColor';
import SidebarHeader from './SidebarHeader.container';

const itemHeight = variables.deviceHeight / 11;

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: 'white',
  },
  version: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    color: colors.gray,
  },
});

const Sidebar = ({
  logout,
  mode,
  navigation,
  setDocumentMode,
  getMenuConfig,
  routeToLichTuan,
  roleId,
  listMenu,
}) => {
  const [itemMenu, setItemMenu] = useState(
    getItems({ setDocumentMode, logout, navigation, getMenuConfig, routeToLichTuan, roleId })
  );
  const checkExist = item => {
    const index = listMenu.findIndex(menu => menu.menuCode === item);
    return index > -1;
  };

  function resetMenu() {
    const arr = [];
    _.forEach(itemMenu, obj => {
      const objClone = obj;
      objClone.focused = false;
      arr.push(objClone);
    });
    setItemMenu(arr);
  }

  function setItemFocus(nav) {
    if (!_.isEmpty(nav.state.routes)) {
      resetMenu();
      if (nav.state.routes[nav.state.index].routeName === 'Dashboard') {
        // todo route === home
      } else if (nav.state.routes[nav.state.index].routeName === 'Documents') {
        if (mode === DOCUMENT_TYPE.VB_DEN) {
          itemMenu[0].focused = true;
          setItemMenu(itemMenu);
        } else {
          itemMenu[1].focused = true;
          setItemMenu(itemMenu);
        }
      } else if (nav.state.routes[nav.state.index].routeName === 'Tasks') {
        itemMenu[2].focused = true;
        setItemMenu(itemMenu);
      } else if (nav.state.routes[nav.state.index].routeName === 'AdministrativeSummary') {
        itemMenu[4].focused = true;
        setItemMenu(itemMenu);
      } else {
        itemMenu[3].focused = true;
        setItemMenu(itemMenu);
      }
    }
  }

  return (
    <ScrollView style={styles.sidebar}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <NavigationEvents
          onDidFocus={payload => {
            setItemFocus(payload);
          }}
        />
        <Container>
          <SidebarHeader navigation={navigation} />
          <Content>
            {itemMenu.map(
              data =>
                (!data.code || checkExist(data.code)) && (
                  <MenuItem
                    itemHeight={itemHeight}
                    label={data.label}
                    img={data.img}
                    labelColor={data.labelColor}
                    onPress={() => {
                      navigation.closeDrawer();
                      data.onPress();
                    }}
                    key={data.id.toString()}
                    focused={data.focused}
                  />
                )
            )}
          </Content>
          <Text style={styles.version}>{CHANGE_LOG.VERSION}</Text>
        </Container>
      </SafeAreaView>
    </ScrollView>
  );
};
Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  setDocumentMode: PropTypes.func.isRequired,
  getMenuConfig: PropTypes.func.isRequired,
  roleId: PropTypes.string,
  mode: PropTypes.number,
};

Sidebar.defaultProps = {
  mode: DOCUMENT_TYPE.VB_DEN,
  roleId: '',
};

export default Sidebar;
