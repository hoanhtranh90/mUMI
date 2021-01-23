import React from 'react';
import { Container, Footer } from 'native-base';
import Header from './tablet/Header.container';
import Detail from './tablet/Detail';
import DocumentActionsContainer from './common/DocumentActions/DocumentActions.container';

const DetailScreen = () => (
  <Container>
    <Header />
    <Detail />
    <Footer style={{ height: 80, backgroundColor: '#2d3e4f' }}>
      <DocumentActionsContainer />
    </Footer>
  </Container>
);

export default DetailScreen;
