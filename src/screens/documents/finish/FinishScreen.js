import React from 'react';
import { Container } from 'native-base';

import { ScrollView } from 'react-native';
import Header from './FinishHeader';
import Finishes from './Finishes.container';

const FinishScreen = ({ navigation }) => {
  const docUserView = navigation.getParam('doc');
  return (
    <Container>
      <Header navigation={navigation} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <Finishes docUserView={docUserView} />
      </ScrollView>
    </Container>
  );
};

export default FinishScreen;
