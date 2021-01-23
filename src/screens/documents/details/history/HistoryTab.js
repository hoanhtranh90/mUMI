/* eslint-disable global-require,import/no-unresolved, react/prop-types */

import React from 'react';
import { Image } from 'react-native';
import { Container, Content } from 'native-base';

import { tabStyles } from 'eoffice/utils/tabBarOptions';
import { ACTION_HISTORY_LABELS } from 'eoffice/constants/documents';
import DocumentActions from '../common/DocumentActions';
import Header from '../common/Header';
import ActionHistory from './ActionHistory.container';
import Footer from './Footer.container';

const getActionLogHeader = item =>
  ACTION_HISTORY_LABELS[item.actionName] || { label: item.actionName };

const HistoryTab = ({ navigation }) => (
  <Container>
    <Header navigation={navigation} />
    <DocumentActions />
    <Content contentContainerStyle={{ flex: 1 }}>
      <ActionHistory getActionLogHeader={getActionLogHeader} />
    </Content>
    <Footer />
  </Container>
);

HistoryTab.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Image
      style={tabStyles.icon}
      resizeMode="contain"
      source={
        focused ? require('eoffice/assets/comment.png') : require('eoffice/assets/comment-gray.png')
      }
    />
  ),
  tabBarOnPress: ({ navigation }) => navigation.navigate('History', { focusComment: false }),
};
export default HistoryTab;
