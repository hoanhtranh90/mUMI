/* eslint-disable global-require,import/no-unresolved, react/prop-types */

import React from 'react';
import { Image } from 'react-native';
import { Container, Content } from 'native-base';

import { tabStyles } from 'eoffice/utils/tabBarOptions';
import Header from '../common/Header';
import RelatedDocs from './RelatedDocs.container';

const DocsTab = () => (
  <Container>
    <Header />
    <Content>
      <RelatedDocs />
    </Content>
  </Container>
);

DocsTab.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Image
      style={tabStyles.icon}
      resizeMode="contain"
      source={
        focused
          ? require('eoffice/assets/document.png')
          : require('eoffice/assets/document-gray.png')
      }
    />
  ),
};

export default DocsTab;
