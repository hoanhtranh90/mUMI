import React from 'react';
import { Container } from 'native-base';

import { ScrollView } from 'react-native';
import Header from './ForwardsHeader';
import Forwards from './Forwards.container';

const ForwardsScreen = ({ navigation }) => {
  const docUserView = navigation.getParam('doc');
  return (
    <Container>
      <Header navigation={navigation} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <Forwards docUserView={docUserView} />
      </ScrollView>
    </Container>
  );
};

export default ForwardsScreen;
