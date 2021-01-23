import { StyleSheet, Platform } from 'react-native';
import colors from 'eoffice/utils/colors';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  form: {
    marginVertical: 10,
  },
  loadingSpinner: { height: null },
  loadingText: { color: colors.gray, fontSize: 15, marginLeft: 10 },
  picker: {
    alignSelf: 'stretch',
    paddingTop: 0,
    paddingBottom: 0,
    height: 20,
    marginTop: 12,
    paddingLeft: 0,
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
  searchBtn: {
    marginHorizontal: 15,
    backgroundColor: colors.blue,
    borderRadius: 4,
  },
  searchText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  wrapBtn: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  rowCarDriver: {
    flex: 1,
  },
  wrapRowCarDriver: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
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
  textItem: {
    width: '33%',
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    textAlign: 'center'
  },
  uploadFileContainer: {
    flexDirection: 'row',
    margin: 10,
    flex: 1,
  },
  wrapperStatus: {
    height: 30,
    width: 140,
    borderRadius: 4,
    backgroundColor: 'rgba(240, 195, 48, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
