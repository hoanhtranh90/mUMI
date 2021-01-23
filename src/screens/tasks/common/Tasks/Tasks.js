import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, RefreshControl } from 'react-native';
import { Spinner } from 'native-base';

import ListEmptyComponent from 'eoffice/components/ListEmptyComponent';
import colors from 'eoffice/utils/colors';
import Task from '../Task';

const style = {
  view: {
    height: 1,
    backgroundColor: colors.lighterGray,
    marginLeft: 60,
    marginRight: 15,
  },
};
const Tasks = ({ refreshTasks, tasks, listTasks, loading, onTaskPress, total }) => {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          colors={[colors.blue]}
          tintColor={colors.blue}
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            refreshTasks();
            await listTasks();
            setRefreshing(false);
          }}
        />
      }
      data={tasks}
      ListFooterComponent={<>{!refreshing && loading && <Spinner color={colors.yellow} />}</>}
      ListEmptyComponent={<>{!refreshing && !loading && <ListEmptyComponent />}</>}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Task {...item} onPress={() => onTaskPress(item)} />}
      ItemSeparatorComponent={() => <View style={style.view} />}
      onEndReached={() => {
        if (!refreshing && tasks.length < total) {
          listTasks();
        }
      }}
      onEndReachedThreshold={0.3}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
    />
  );
};

Tasks.propTypes = {
  listTasks: PropTypes.func.isRequired,
  onTaskPress: PropTypes.func.isRequired,
  refreshTasks: PropTypes.func.isRequired,

  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(PropTypes.shape({})),
  total: PropTypes.number,
};
Tasks.defaultProps = {
  loading: false,
  tasks: [],
  total: 0,
};

export default Tasks;
