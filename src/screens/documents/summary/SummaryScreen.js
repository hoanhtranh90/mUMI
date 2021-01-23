import React from 'react';
import { Container, Content } from 'native-base';

import Header from './SummaryHeader';

import Summary from './Summary.container';

const SummaryScreen = ({ navigation }) => (
  <Container>
    <Header navigation={navigation} />
    <Content>
      <Summary />
    </Content>
  </Container>
);

export default SummaryScreen;
