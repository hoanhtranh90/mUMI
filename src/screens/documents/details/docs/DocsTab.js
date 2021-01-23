/* eslint-disable global-require,import/no-unresolved, react/prop-types */

import React from 'react';
import { Image } from 'react-native';
import { Container, Content } from 'native-base';

import { tabStyles } from 'eoffice/utils/tabBarOptions';
import Header from '../common/Header';
import RelationDocsContainer from '../relationDocs/RelationDocs.container';
import PhieuYKienContainer from '../phieuYKien/PhieuYKiens.container';

import DocumentActions from '../common/DocumentActions';

const DocsTab = ({ navigation }) => (
  <Container>
    <Header navigation={navigation} />
    <DocumentActions />
    <Content>
      <RelationDocsContainer />
      <PhieuYKienContainer />
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
