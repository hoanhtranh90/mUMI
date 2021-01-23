import React from 'react';
import { Container, Content } from 'native-base';
import { StyleSheet } from 'react-native';
import colors from 'eoffice/utils/colors';

import Header from './SearchHeader';
import AdvancedSearch from './AdvancedSearch.container';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  btn: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    shadowColor: 'rgb(0, 122, 255)',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  txt: {
    fontSize: 15,
    color: colors.blue,
    fontWeight: '600',
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
