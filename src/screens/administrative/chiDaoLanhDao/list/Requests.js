import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { Spinner } from 'native-base';

import RequestItem from './RequestItem';

const Requests = ({
  hasMore,
  requests,
  listRequests,
  loading,
  onRequestPressed,
  reloadRequests,
}) => {
  const [refresh, setRefresh] = useState(false);
  const onRefresh = async () => {
    setRefresh(true);
    await reloadRequests();
    setRefresh(false);
  };

  useEffect(() => {
    listRequests(true);
  }, []);

  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
      style={{ flexGrow: 1 }}
      data={requests}
      renderItem={item => (
        <RequestItem
          request={item}
          onPress={() => onRequestPressed(item)}
          key={item.item.caseMasterId}
        />
      )}
      ListFooterComponent={<>{loading && <Spinner color="#044987" />}</>}
      keyExtractor={(item, key) => key.toString()}
      onEndReached={() => {
        if (hasMore) {
          listRequests(false);
        }
      }}
      onEndReachedThreshold={0.3}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
    />
  );
};

Requests.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.shape({})),
  listRequests: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onRequestPressed: PropTypes.func,
  hasMore: PropTypes.bool.isRequired,
  reloadRequests: PropTypes.func,
};

Requests.defaultProps = {
  requests: [],
  loading: false,
  onRequestPressed() {},
  reloadRequests() {},
};

export default Requests;
