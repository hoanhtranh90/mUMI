/* eslint-disable global-require,import/no-unresolved, react/prop-types */

import React from 'react';
import { Image } from 'react-native';
import { Container, Content } from 'native-base';

import { tabStyles } from 'eoffice/utils/tabBarOptions';
import Header from '../common/Header';
import Subtasks from './Subtasks.container';

const SubtasksTab = () => (
  <Container>
    <Header />
    <Content>
      <Subtasks />
    </Content>
  </Container>
);

SubtasksTab.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Image
      style={tabStyles.icon}
      resizeMode="contain"
      source={
        focused
          ? require('eoffice/assets/clipboard-list.png')
          : require('eoffice/assets/clipboard-list-gray.png')
      }
    />
  ),
};

export default SubtasksTab;
