import {Platform, StyleSheet} from "react-native";
import colors from "../../../../utils/colors";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
  },
  form: {
    marginVertical: 10,
  },
  pickerText: {
    color: colors.darkGray,
    paddingLeft : 0,
    fontWeight: 'bold',
  },
  pickerPlaceholder: {
    color: colors.gray,
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
    paddingVertical: 8,
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
  input: {
    height: null,
    paddingTop: 8,
    color: '#2b2d50',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 0,
    alignSelf: 'stretch',
  },
  headerTxt: {
    fontSize: 20,
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#007aff',
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
  wrapperStatus: {
    height: 24,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    fontSize: 13,
    textAlign: 'center',
  }
});
