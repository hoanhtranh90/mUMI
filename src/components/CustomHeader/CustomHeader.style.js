import { StyleSheet } from 'react-native';

import colors from 'eoffice/utils/colors';

export default StyleSheet.create({
  hasBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  headerStyle: {
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 0,
    elevation: 0,
  },
  leftStyle: {
    flex: 0,
    paddingRight: 12,
  },
  contentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rightStyle: {
    flex: 0,
  },
});
