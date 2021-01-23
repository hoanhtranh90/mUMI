import { StyleSheet } from 'react-native';

import colors from 'eoffice/utils/colors';

export default StyleSheet.create({
  listWrapper: {
    flex: 1,
    paddingVertical: 20,
  },
  userContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  checkbox: {
    marginHorizontal: 12,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lighterGray,
    marginLeft: 50,
  },
});
