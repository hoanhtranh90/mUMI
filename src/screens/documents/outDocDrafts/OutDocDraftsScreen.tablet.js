import React, { useState, useEffect } from 'react';
import { Container } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';
import { View } from 'react-native-animatable';
import { DOC_USER_STATUS } from 'eoffice/constants/documents';
import Header from './tablet/ListHeader.container';
import BoxContent from './tablet/BoxContent';
import AdvancedSearchContainer from '../search/AdvancedSearch.container';
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
  search: {
    position: 'absolute',
    backgroundColor: 'white',
    marginTop: 82,
    borderWidth: 1,
    borderColor: '#e4e7ed',
    borderRadius: 12,
    shadowColor: '#e4e7ed',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    marginLeft: '60%',
    marginRight: 24,
    paddingRight: 8,
    height: height - 150
  },
});

const DraftsScreen = ({ navigation }) => {
  const [usingAdvanced, setUsingAdvanced] = useState(false);
  useEffect(
    () => {
      setUsingAdvanced(false)
    },
    [navigation]
  );
  const status = navigation.getParam('status', '');
  return (
    <Container style={{ flex: 1, backgroundColor: '#f8f9fd' }}>
      <Header
        status={status.DU_THAO}
        usingAdvanced={usingAdvanced}
        onAdvSearch={() => {
          if (!usingAdvanced) {
            setUsingAdvanced(true);
          } else {
            setUsingAdvanced(false);
          }
        }}
      />
      <BoxContent navigation={navigation} />
      {usingAdvanced && (
        <View style={styles.search}>
          <AdvancedSearchContainer
            status={DOC_USER_STATUS.DU_THAO}
            onSearch={() => {
              setUsingAdvanced(false);
            }}
          />
        </View>
      )}
    </Container>
  );
};

export default DraftsScreen;
