/* eslint-disable global-require,import/no-unresolved, react/prop-types */

import React from 'react';
import { Image } from 'react-native';
import { Container, Content } from 'native-base';

import { tabStyles } from 'eoffice/utils/tabBarOptions';
import DocumentActions from '../common/DocumentActions';
import Header from './Header.container';
import Info from './Info.container';

const InfoTab = ({ navigation }) => (
  <Container>
    <Header navigation={navigation} />
    <DocumentActions />
    <Content contentContainerStyle={{ flex: 1 }}>
      <Info />
    </Content>
  </Container>
);

InfoTab.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Image
      style={tabStyles.icon}
      resizeMode="contain"
      source={
        focused ? require('eoffice/assets/info.png') : require('eoffice/assets/info-gray.png')
      }
    />
  ),
};

export default InfoTab;
