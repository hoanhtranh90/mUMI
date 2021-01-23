import _ from 'lodash';
import { useReducer } from 'react';

const ROOT = 'root';

function getInitialState(data) {
  const nodes = {};
  const showIds = [ROOT];
  const timestampByTier = [];

  const processNodes = (nds, parentId, tier) => {
    if (!nodes[tier]) {
      nodes[tier] = {};
    }

    if (nds[0].children) {
      showIds.push(nds[0].id);
    }
    timestampByTier.push(nds[0].timestamp);

    nodes[tier][parentId] = _.map(nds, ({ children, ...node }) => ({
      ...node,
      expanded: node.id === _.last(showIds),
      hasChildren: _.isArray(children) && children.length > 0,
    }));

    _.forEach(nds, node => {
      if (node.children) {
        processNodes(node.children, node.id, tier + 1);
      }
    });
  };
  processNodes(data, ROOT, 0);

  return {
    nodes,
    showIds,
    timestampByTier,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'toggle': {
      const { node, tier } = action.payload;
      const nextTier = tier + 1;

      let newTimestamps = [...state.timestampByTier.slice(0, tier), node.timestamp];

      const newShowIds = state.showIds.slice(0, nextTier);
      if (
        state.showIds[nextTier] !== node.id &&
        state.nodes[nextTier] &&
        state.nodes[nextTier][node.id]
      ) {
        newShowIds.push(node.id);

        newTimestamps = [...newTimestamps, state.nodes[nextTier][node.id][0].timestamp];
      }

      const nodes = { ...state.nodes };
      const pId = state.showIds[tier];
      nodes[tier][pId] = _.map(nodes[tier][pId], nd => ({
        ...nd,
        expanded: nd.id === node.id ? !nd.expanded : false,
      }));

      let curTier = tier + 1;
      while (nodes[curTier]) {
        nodes[curTier] = _.mapValues(nodes[curTier], listByPId =>
          listByPId.map(n => ({ ...n, expanded: false }))
        );
        curTier += 1;
      }

      return {
        nodes,
        showIds: newShowIds,
        timestampByTier: newTimestamps,
      };
    }

    default:
      return state;
  }
}

export default data => {
  const [state, dispatch] = useReducer(reducer, getInitialState([data]));

  const actions = {
    toggle(tier, node) {
      dispatch({ type: 'toggle', payload: { tier, node } });
    },
  };

  return [state, actions];
};
