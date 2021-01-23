import { StyleSheet, Platform, Dimensions } from 'react-native';
import colors from '../../../utils/colors';

const heightS = Dimensions.get('window').height;

export default StyleSheet.create({
  // AdvancedSearch
  advancedSearchWrapper: {
    flex: 1,
  },

  // SearchForm
  form: {},
  picker: {
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 0,
    height: 20,
    marginTop: 12,
    width: '100%',
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
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
  },
  scrollView: {
    height: heightS - 220,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray,
    marginBottom: 12,
    paddingLeft: 15,
  },
  searchBtn: {
    borderRadius: 4,
    marginBottom: Platform.OS === 'ios' ? 24 : 10,
    marginTop: 10,
    flex: 1,
    marginHorizontal: 20,
  },
  resetBtn: {
    borderRadius: 4,
    marginBottom: Platform.OS === 'ios' ? 24 : 10,
    marginTop: 10,
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.lightRed,
  },
  searchText: {
    fontSize: 18,
    fontWeight: '500',
  },
  resetText: {
    color: colors.red,
    fontSize: 18,
    fontWeight: '500',
  },
});
