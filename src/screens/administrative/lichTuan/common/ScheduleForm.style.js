import { StyleSheet, Platform, Dimensions } from 'react-native';
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
  pickerLt: {
    color: '#2b2d50',
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

  input: {
    // ...Platform.select({
    //   ios: {
    //     paddingVertical: null,
    //     height: 20,
    //     marginTop: 10,
    //   },
    //   android: {
    //     paddingBottom: 0,
    //     height: null,
    //     marginTop: 0,
    //     paddingTop: 7,
    //   },
    // }),

    paddingBottom: 0,
    height: null,
    marginTop: 0,
    paddingTop: 7,

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
  rqMore: {
    marginLeft: 15.5,
    color: '#7a848e',
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 0,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: colors.blue,
    textDecorationLine: 'underline',
  },
  btnIcon: {
    color: colors.blue,
    fontSize: 14,
    marginRight: 5,
  },
  badge: {
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: colors.gray,
    marginTop: 5,
    marginRight: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    alignItems: 'center',
  },
  btnAdd: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.blue,
    position: 'absolute',
    right: 30,
    bottom: 70,
    shadowColor: '#5386ba',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
});
