import { StyleSheet, Platform } from 'react-native';
import colors from 'eoffice/utils/colors';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  form: {
    marginVertical: 10,
  },
  picker: {
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 0,
    height: 20,
    marginTop: 10,
    paddingLeft: 0,
    marginLeft: 0,
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

  input: {
    ...Platform.select({
      ios: {
        paddingVertical: null,
        height: 20,
        marginTop: 10,
      },
      android: {
        paddingBottom: 0,
        height: null,
        marginTop: 0,
        paddingTop: 7,
      },
    }),

    color: '#2b2d50',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 0,
    alignSelf: 'stretch',
  },
  textarea: {
    ...Platform.select({
      ios: {
        marginTop: 6,
      },
      android: {
        marginTop: 0,
      },
    }),
    fontSize: 16,
    color: colors.darkGray,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    paddingLeft: 0,
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
