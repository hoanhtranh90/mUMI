import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Keyboard } from 'react-native';
import { Button, Text } from 'native-base';
import DeviceInfo from 'react-native-device-info';
import filters from 'eoffice/utils/quick-filters';
import { DOCUMENT_TYPE } from 'eoffice/constants/documents';
import QuickFilter from 'eoffice/components/Search/QuickFilter';
import VbDenSearchForm from './VbDenSearchForm';
import VbDiSearchForm from './VbDiSearchForm';
import styles from './AdvancedSearch.styles';
import useAdvanceSearch from './useAdvanceSearch';

const AdvancedSearch = ({
  departments,
  listDepartments,
  listPriorities,
  listCategories,
  mode,
  onSearch,
  query,
  status,
  updateQuery,
  priorities,
  categories,
}) => {
  useEffect(() => {
    listDepartments();
    listPriorities();
    listCategories();
  }, []);
  const [state, actions] = useAdvanceSearch(query);
  const submit = () => {
    updateQuery({ ...state, keyword: '' });
    onSearch();
    Keyboard.dismiss();
  };
  const list = filters.filter(
    filter => filter.feature === 'documents' && filter.validate?.({ type: mode })
  );
  // console.log();
  return (
    <View style={styles.viewContainer}>
      <ScrollView style={DeviceInfo.isTablet() ? styles.scrollView : {}}>
        <QuickFilter filters={list} onChange={actions.setValue} />
        <View style={styles.viewContainer}>
          <Text uppercase style={styles.text}>
            Bộ lọc
          </Text>
          {mode === DOCUMENT_TYPE.VB_DEN && (
            <VbDenSearchForm
              departments={departments}
              state={state}
              status={status}
              setValue={actions.setValue}
              onSubmit={submit}
            />
          )}
          {mode === DOCUMENT_TYPE.VB_DI && (
            <VbDiSearchForm
              query={query}
              departments={departments}
              priorities={priorities}
              categories={categories}
              state={state}
              status={status}
              setValue={actions.setValue}
              onSubmit={submit}
            />
          )}
        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <Button block style={styles.searchBtn} onPress={submit}>
          <Text style={styles.searchText} uppercase={false}>
            Tìm kiếm
          </Text>
        </Button>
        <Button
          bordered
          danger
          style={styles.resetBtn}
          onPress={() => {
            actions.reset(status);
          }}
        >
          <Text style={styles.resetText} uppercase={false}>
            Khởi tạo
          </Text>
        </Button>
      </View>
    </View>
  );
};

AdvancedSearch.propTypes = {
  listDepartments: PropTypes.func.isRequired,
  listPriorities: PropTypes.func.isRequired,
  listCategories: PropTypes.func.isRequired,
  mode: PropTypes.number.isRequired,
  onSearch: PropTypes.func.isRequired,
  updateQuery: PropTypes.func.isRequired,

  departments: PropTypes.arrayOf(PropTypes.shape({})),
  query: PropTypes.shape({}),
  priorities: PropTypes.arrayOf(PropTypes.shape({})),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  status: PropTypes.number,
};
AdvancedSearch.defaultProps = {
  departments: [],
  query: {},
  status: null,
  priorities: [],
  categories: [],
};

export default AdvancedSearch;
