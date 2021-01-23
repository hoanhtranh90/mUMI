import React from 'react';
import { Container, Content } from 'native-base';
import { StyleSheet } from 'react-native';

import Header from './SearchHeader';
import AdvancedSearch from './AdvancedSearch.container';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
});
const SearchScreen = ({ navigation }) => (
  <Container>
    <Header navigation={navigation} />
    <Content contentContainerStyle={styles.container}>
      <AdvancedSearch navigation={navigation} />
    </Content>
  </Container>
);

export default SearchScreen;
