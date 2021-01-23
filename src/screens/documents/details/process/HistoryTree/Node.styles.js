import { StyleSheet } from 'react-native';

import colors from 'eoffice/utils/colors';

export default StyleSheet.create({
  wrapper: {
    width: 150,
    borderColor: colors.lighterGray,
    borderWidth: 1,
    borderRadius: 4,
    flexWrap: 'nowrap',
  },
  shortWrapper: {
    width: 100,
  },
  highlight: {
    borderColor: colors.blue,
  },
  rounded: {
    borderRadius: 25,
  },
  cardItem: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    backgroundColor: colors.lighterGray,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  whiteBg: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkGray,
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 12,
    color: colors.gray,
    lineHeight: 14,
    paddingTop: 5,
  },
  tuChoiIcon: {
    fontSize: 14,
    color: colors.red,
    width: 20,
  },
  icon: {
    fontSize: 16,
    width: 16,
    lineHeight: 16,
  },
  minusIcon: {
    color: colors.blue,
  },
  checkIcon: {
    color: colors.green,
  },
  checkWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  badge: {
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
  },
  redText: {
    color: colors.red,
  },
});
