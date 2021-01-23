import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'native-base';

import colors from 'eoffice/utils/colors';
import filters from 'eoffice/utils/quick-filters';
import { TASK_TYPES } from 'eoffice/constants/tasks';
import QuickFilter from 'eoffice/components/Search/QuickFilter';
import AdvanceSearchForm from './AdvanceSearchForm';
import useAdvanceSearch from './useAdvancedSearch';

const styles = {
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 20,
  },
  searchBtn: {
    borderRadius: 4,
    flex: 0,
    marginBottom: 24,
    marginTop: 16,
    marginHorizontal: 100,
  },
  searchText: {
    fontSize: 18,
    fontWeight: '500',
  },
};

const AdvancedSearch = ({ updateQuery, onSearch, mode, query }) => {
  const [state, actions] = useAdvanceSearch(query);
  const submit = () => {
    updateQuery(state);
    onSearch();
  };

  const list = filters.filter(filter => filter.feature === 'tasks');

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <QuickFilter filters={list} onChange={actions.setValue} />
        <View style={styles.viewContainer}>
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
          <AdvanceSearchForm
            state={state}
            onSubmit={submit}
            isAssign={mode === TASK_TYPES.ASSIGNED}
            setValue={actions.setValue}
          />
        </View>
      </ScrollView>
      <Button block style={styles.searchBtn} onPress={submit}>
        <Text uppercase={false} style={styles.searchText}>
          Tìm kiếm
        </Text>
      </Button>
    </View>
  );
};

AdvancedSearch.propTypes = {
  mode: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  updateQuery: PropTypes.func.isRequired,
  query: PropTypes.shape({}),
};
AdvancedSearch.defaultProps = {
  query: {},
};

export default AdvancedSearch;
