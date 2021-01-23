import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';
import { Icon, Text } from 'native-base';
import format from 'date-fns/format';
import colors from 'eoffice/utils/colors';
import Node from './Node';
import useTreeReducer from './useTreeReducer';

const styles = StyleSheet.create({
  grid: {
    paddingLeft: 14,
    paddingTop: 10,
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
    color: colors.gray,
  },
  text: {
    fontSize: 12,
    color: colors.gray,
  },
  listRow: {
    paddingLeft: 14,
    paddingBottom: 6,
    marginLeft: 8,
    marginTop: 6,
    borderLeftWidth: 1,
    borderLeftColor: colors.gray,
  },
  node: {
    marginRight: 8,
    width: 240,
  },
});

const HistoryTree = ({ currentUser, data }) => {
  if (!data?.id) {
    return null;
  }

  const [state, actions] = useTreeReducer(data);
  return (
    <Grid>
      {state.showIds.map((id, tier) => (
        <Row key={id}>
          <Grid style={styles.grid}>
            <Row>
              <Icon type="Feather" name="clock" style={styles.icon} />
              <Text style={styles.text}>
                {format(state.timestampByTier[tier], 'dd/MM/yyyy HH:mm')}
              </Text>
            </Row>
            <Row style={styles.listRow}>
              <FlatList
                horizontal
                data={Object.values(state.nodes[tier][id])}
                keyExtractor={item => item.id}
                renderItem={({ item: { children, ...node } }) => (
                  <Node
                    {...node}
                    loginId={currentUser?.id}
                    onPress={() => actions.toggle(tier, node)}
                    style={styles.node}
                  />
                )}
              />
            </Row>
          </Grid>
        </Row>
      ))}
    </Grid>
  );
};

HistoryTree.propTypes = {
  currentUser: PropTypes.shape({}),
  data: PropTypes.shape({
    id: PropTypes.string,
  }),
};
HistoryTree.defaultProps = {
  currentUser: null,
  data: {},
};

export default HistoryTree;
