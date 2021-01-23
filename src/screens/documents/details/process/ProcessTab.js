/* eslint-disable global-require,import/no-unresolved, react/prop-types */

import React from 'react';
import { Image } from 'react-native';
import { Container, Content } from 'native-base';

import { tabStyles } from 'eoffice/utils/tabBarOptions';
import DocumentActions from '../common/DocumentActions';
import Header from '../common/Header';
import Process from './Process.container';

const ProcessTab = ({ navigation }) => (
  <Container>
    <Header navigation={navigation} />
    <DocumentActions />
    <Content contentContainerStyle={{ paddingTop: 16 }}>
      <Process />
    </Content>
  </Container>
);

ProcessTab.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Image
      style={tabStyles.icon}
      resizeMode="contain"
      source={
        focused ? require('eoffice/assets/shuffle.png') : require('eoffice/assets/shuffle-gray.png')
      }
    />
  ),
};

export default ProcessTab;
