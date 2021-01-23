import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import Avatar from '../Avatar';
import ActionLogItemContent from './ActionLogItemContent';
import CommentItemContent from './CommentItemContent';
import HistoryItemHeader from './HistoryItemHeader';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  content: {
    marginLeft: 12,
    flex: 1,
    borderColor: '#dee5ed',
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderWidth: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
});

const HistoryItem = ({ getActionLogHeader, item, pagesNumberOfDoc, mode }) => (
  <View style={styles.container}>
    <Avatar name={item.creatorName} />
    <View style={styles.content}>
      <HistoryItemHeader getActionLogHeader={getActionLogHeader} item={item} mode={mode} />
      {item.dataType === 'actionLog' && (
        <ActionLogItemContent pagesNumberOfDoc={pagesNumberOfDoc} item={item} />
      )}
      {item.dataType === 'comment' && <CommentItemContent item={item} />}
    </View>
  </View>
);

HistoryItem.propTypes = {
  getActionLogHeader: PropTypes.func.isRequired,
  item: PropTypes.shape({
    creatorName: PropTypes.string,
    actionName: PropTypes.string,
    dataType: PropTypes.oneOf(['actionLog', 'comment']),
  }),
  mode: PropTypes.number.isRequired,
  pagesNumberOfDoc: PropTypes.number,
};
HistoryItem.defaultProps = {
  item: {},
  pagesNumberOfDoc: null,
};

export default HistoryItem;
