import React, { useState } from 'react';
import { Container } from 'native-base';
import { StyleSheet, View } from 'react-native';

import FloatButton from 'eoffice/components/FloatButton';
import Documents from '../common/Documents';
import AdvancedSearch from './AdvancedSearch.container';
import Header from './SearchHeader.container';
import colors from '../../../utils/colors';

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

const SearchScreen = ({ navigation }) => {
  const [usingAdvanced, setUsingAdvanced] = useState(false);
  const status = navigation.getParam('status');
  return (
    <Container>
      <Header navigation={navigation} usingAdvanced={usingAdvanced} status={status} />
      <View style={styles.container}>
        {!usingAdvanced && (
          <Documents
            onDocumentPressed={documentId =>
              navigation.navigate('Details', {
                documentId,
              })
            }
          />
        )}
        {!usingAdvanced && (
          <FloatButton onPress={() => setUsingAdvanced(true)} text="Tìm kiếm nâng cao" />
        )}
        {usingAdvanced && (
          <AdvancedSearch status={status} onSearch={() => setUsingAdvanced(false)} />
        )}
      </View>
    </Container>
  );
};

export default SearchScreen;
