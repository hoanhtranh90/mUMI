import { StyleSheet } from 'react-native';

import colors from 'eoffice/utils/colors';

export default StyleSheet.create({
  card: {
    width: '95%',
  },
  cardItem: {
    paddingBottom: 0,
    paddingTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastRow: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: colors.lighterGray,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  badge: {
    borderColor: '#e0e5eb',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingBottom: 4,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    color: '#2b2d50',
    fontSize: 14,
  },
  badgeIcon: {
    color: '#e54d42',
    fontSize: 15,
    width: 19,
  },
  documentId: {
    color: colors.gray,
    fontSize: 14,
    marginRight: 10,
  },
  titleWrapper: {
    paddingVertical: 4,
  },
  title: {
    color: '#2b2d50',
    fontSize: 17,
  },
  unread: {
    fontWeight: 'bold',
  },
  noBorder: {
    borderWidth: 0,
    paddingHorizontal: 0,
    flex: 1,
    justifyContent: 'space-between',
  },
  timeIcon: {
    color: colors.gray,
  },
  shrink: {
    flexShrink: 1,
  },
  bccWrap : {
    borderRadius : 4,
    borderWidth : 1,
    borderColor: colors.yellow,
    backgroundColor : colors.lightYellow,
    paddingHorizontal : 5,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems: 'center'
  },
  bccIcon : {
    color: colors.yellow,
    fontSize : 12,
    width : 15
  },
  bccText : {
    color: colors.yellow,
    fontSize : 12
  }
});
