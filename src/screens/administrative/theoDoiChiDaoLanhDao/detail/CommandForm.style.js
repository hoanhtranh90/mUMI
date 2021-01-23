// eslint-disable-next-line import/no-extraneous-dependencies
import { StyleSheet, Platform } from 'react-native';
import colors from 'eoffice/utils/colors';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  form: {
    marginVertical: 10,
  },
  btn: { backgroundColor: colors.blue, borderRadius: 4, height: 64, marginVertical: 10 },
  btnText: { fontSize: 17, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  btnIcon: {
    position: 'absolute',
    right: 0,
    fontSize: 24,
    marginHorizontal: 16,
    paddingTop: 0,
  },
  headerTxt: {
    fontSize: 19,
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 15,
    color: '#084386',
  },
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
    paddingHorizontal: 15,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
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
});
