import { StyleSheet } from 'react-native';
import colors from 'eoffice/utils/colors';
import variables from 'eoffice/native-base-theme/variables/commonColor';

export default StyleSheet.create({
  viewContainerTitle: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    maxHeight: variables.deviceHeight * 0.062 * 0.5,
    borderBottomColor: colors.lighterGray,
    borderBottomWidth: 2,
    width: variables.deviceWidth * 0.9,
  },

  btn: {
    borderRadius: 4,
  },
  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingBtn: {
    backgroundColor: colors.blue,
  },
  modalTitle: {
    borderBottomColor: 'transparent',
    alignItems: 'center',
    paddingBottom: 0,
  },

  // Tittle
  receiverName: {
    color: '#2d3e4f',
    fontSize: 14,
    paddingTop: variables.deviceHeight * 0.01,
  },
  defaultTitle: {
    fontSize: 12,
    paddingTop: variables.deviceHeight * 0.01,
  },
  taskTitle: {
    fontSize: 16,
    paddingHorizontal: 30,
    textAlign: 'center',
    color: colors.blue,
    fontWeight: 'bold',
    paddingTop: variables.deviceHeight * 0.005,
  },

  viewContainerRating: {
    paddingTop: variables.deviceHeight * 0.035,
    paddingBottom: variables.deviceHeight * 0.023,
  },

  // Button
  viewContainerButton: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonComplete: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.2)',
    width: variables.deviceWidth * 0.32,
  },
  viewAvatar: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
});
