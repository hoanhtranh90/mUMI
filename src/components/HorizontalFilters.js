import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'native-base';
import colors from '../utils/colors';
import { DOC_USER_STATUS, OUTGOING_DOC_STATUS } from '../constants/documents';

const init = (filters, hasReset, resetValue) => ({
  filters: hasReset
    ? [
      {
        value: resetValue || [
          OUTGOING_DOC_STATUS.TAO_MOI,
          OUTGOING_DOC_STATUS.DANG_XU_LI,
          OUTGOING_DOC_STATUS.CHO_BAN_HANH,
          OUTGOING_DOC_STATUS.TU_CHOI,
          DOC_USER_STATUS.PHOI_HOP,
        ],
        label: 'Tất cả',
        selected: true,
      },
      ...filters,
    ]
    : [...filters],
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'select':
      return {
        ...state,
        filters: state.filters.map(filter => ({
          ...filter,
          selected: filter.value === action.payload,
        })),
      };

    case 'update':
      return init(action.payload.filters, action.payload.hasReset, action.payload.resetValue);

    default:
      return state;
  }
};

const styles = StyleSheet.create({
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    borderColor: '#dcdce6',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 15,
    marginRight: 6,
    color: colors.darkGray,
  },
  filterLabel: {
    color: colors.darkGray,
    fontSize: 15,
    fontWeight: '600',
  },
  separator: { width: 8 },
});

const HorizontalFilters = ({ filters, hasReset, onFilter, resetValue, query }) => {
  const [state, dispatch] = useReducer(reducer, init(filters, hasReset, resetValue));
  const [isFrist, setIsFrist] = useState(true);
  useEffect(
    () => {
      dispatch({ type: 'update', payload: { filters, hasReset, resetValue } });
      setIsFrist(false)
    },
    [filters]
  );

  useEffect(
    () => {
      if (isFrist) return
      const docStatus = query.docStatus || []
      if (docStatus.length >= 4) {
        this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
        dispatch({ type: 'select', payload: state.filters[0].value });
      } else {
        for (const i in state.filters) {
          if (state.filters[i].value === docStatus) {
            dispatch({ type: 'select', payload: state.filters[i].value });
          }
        }
      }
    },
    [query.docStatus]
  );

  const onPress = filter => {
    dispatch({ type: 'select', payload: filter.value });
    onFilter(filter.value);
  };
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={state.filters}
      horizontal
      ref={(ref) => { this.flatListRef = ref; }}
      keyExtractor={item => `${item.value}`}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onPress(item)}
          style={[styles.filterBtn, item.selected ? { backgroundColor: colors.lightGray } : null]}
        >
          {!!item.icon && (
            <Icon
              name={item.icon}
              style={[styles.filterIcon, item.color ? { color: item.color } : null]}
            />
          )}
          <Text style={[styles.filterLabel, item.selected ? { color: colors.blue } : null]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

HorizontalFilters.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,

      icon: PropTypes.string,
      color: PropTypes.string,
    }).isRequired
  ).isRequired,
  onFilter: PropTypes.func.isRequired,

  hasReset: PropTypes.bool,
  // eslint-disable-next-line
  resetValue: PropTypes.any,
  query: PropTypes.any,
};
HorizontalFilters.defaultProps = {
  hasReset: true,
  resetValue: null,
  query: {}
};

export default HorizontalFilters;
