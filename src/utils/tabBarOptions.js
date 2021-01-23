import { Platform, StyleSheet } from 'react-native';
import colors from './colors';

export default {
  showLabel: false,
  activeBackgroundColor: '#fff',
  tabStyle: {
    marginHorizontal: 5,
    marginVertical: 1,
    width: 48,
    height: 50,
    flex: 0,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  style: {
    height: 60,
    backgroundColor: colors.lighterGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export const tabStyles = StyleSheet.create({
  ...Platform.select({
    android: {
      icon: {
        marginVertical: 2,
      },
    },
  }),
  icon: {
    height: 30,
    width: 30,
  },
});
