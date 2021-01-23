import {Platform, StyleSheet} from "react-native";
import colors from "../../../../utils/colors";

export const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 50
  },
  input: {
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
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: colors.blue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#5386ba',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  btnCancel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: colors.red,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: colors.red,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  btnText: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnIcon: {
    color: 'white',
    fontSize: 14,
    marginRight: 5,
  },
  row: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 },
  flatView: {
    backgroundColor: '#eee',
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btmActions: { justifyContent: 'space-around', alignItems: 'center', marginVertical: 10 },
  headerFlat: { flexDirection: 'row', alignItems: 'center', margin: 20 },
  roundButton: {
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 15,
    width: 30,
    height: 30,
    marginLeft: 30
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
