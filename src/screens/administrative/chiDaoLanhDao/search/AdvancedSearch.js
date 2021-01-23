import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button, Text, Footer, Container, Content } from 'native-base';
import colors from 'eoffice/utils/colors';
import styles from './AdvancedSearch.styles';
import useSearchForm from './useSearchForm';
import SearchForm from './SearchForm.container';

const AdvancedSearch = ({ navigation, searchRequests }) => {
  const [state, actions] = useSearchForm();

  const submit = () => {
    searchRequests(state);
    navigation.goBack();
  };
  return (
    <Container style={styles.advancedSearchWrapper}>
      <Content>
        <View style={{ flex: 1, flexDirection: 'column', paddingVertical: 20 }}>
          <Text
            uppercase
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: colors.gray,
              marginBottom: 12,
              paddingLeft: 15,
            }}
          >
            Bộ lọc
          </Text>
          <SearchForm state={state} setValue={actions.setValue} />
        </View>
      </Content>
      <Footer style={{ borderTopWidth: 0, borderTopColor: 'white', backgroundColor: 'white' }}>
        <Button block style={styles.searchBtn} onPress={submit}>
          <Text uppercase={false} style={styles.searchText}>
            Tìm kiếm
          </Text>
        </Button>
      </Footer>
    </Container>
  );
};

AdvancedSearch.propTypes = {
  searchRequests: PropTypes.func.isRequired,
};
AdvancedSearch.defaultProps = {};

export default AdvancedSearch;
