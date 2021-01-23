import { StyleSheet } from 'react-native';
import colors from 'eoffice/utils/colors';

export default StyleSheet.create({
  // AdvancedSearch
  advancedSearchWrapper: {
    flex: 1,
  },

  // SearchForm
  form: {},
  input: {
    height: 20,
    marginTop: 12,
    fontSize: 17,
    color: '#2b2d50',
    fontWeight: 'bold',
  },
  picker: {
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 0,
    height: 20,
    marginTop: 12,
  },
  pickerPlaceholder: {
    color: colors.gray,
    paddingLeft: 0,
    fontWeight: 'bold',
  },
  pickerText: {
    color: '#2b2d50',
    paddingLeft: 0,
    flexShrink: 1,
    fontWeight: 'bold',
  },

  searchBtn: {
    backgroundColor: colors.blue,
    borderRadius: 4,
    flex: 0,
    marginBottom: 24,
    marginHorizontal: 100,
  },
  searchText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
