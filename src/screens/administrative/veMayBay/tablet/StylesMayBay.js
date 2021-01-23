import {Platform, StyleSheet} from "react-native";
import colors from "../../../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titleStyleContent: {
    fontSize: 20,
    color: colors.darkGray,
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
  uploadFileContainer: {
    flexDirection: 'row',
    margin: 10,
    flex: 1,
  },
  btnAdd: { width: 300, marginTop: 20 },
  wrapBtn: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginBottom: 20,
    marginTop: 10
  },
  flatList: {
    paddingTop: 11,
    flex: 1,
  },
  btmBtn: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  touchableSearch: {
    backgroundColor: 'white',
    borderColor: 'rgba(0, 122, 255, 0.2)',
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scopeSearch: {
    flex: 0.3,
    justifyContent: 'center',
  },
  iconSearch: {
    color: '#007aff',
    fontSize: 24,
    paddingLeft: 8,
    flex: 1,
    alignSelf: 'center',
  },
  txtInputSearch: { width: '54%', fontSize: 15, flex: 4 },
  icon: {
    fontSize: 16,
    color: colors.gray,
  },
  row: {
    flexDirection: 'row',
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dcdce6',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 120,
  },
  txtTime: {
    flex : 1,
    fontSize: 15,
    fontWeight: '600',
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
