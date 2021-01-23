import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import filters from '../../../../utils/quick-filters';

const styles = StyleSheet.create({
  txtHeader: {
    color: '#2d3e4f',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingTop: 10,
  },
});

const createTimeMonthFilter = filters.find(filter => filter.id === 'createTimeMonthAgo');

const UnRead = ({ query, updateQuery, from }) => {
  return (
    <TouchableOpacity
      style={{ alignSelf: 'center', width: 120 }}
      onPress={(status, relationType, type, filterStatus) => {
        if (from === 'fromCXL') {
          updateQuery({
            // type: type,
            // processType: type === 1 ? 0 : type == 2 ? 2 : type === 3 ? 1 : null,
            // status: query.status,
            // docDate: createTimeMonthFilter.getValue(),
            // filterLabel: createTimeMonthFilter.label,
            // keyword: '',
            // isRead: 0,
            ...query,
            isRead: 0,
          });
        } else if (from === 'fromPH') {
          updateQuery({
            // type: type,
            // processType: type === 1 ? 0 : type == 2 ? 2 : type === 3 ? 1 : null,
            // status: query.status,
            // docDate: createTimeMonthFilter.getValue(),
            // filterLabel: createTimeMonthFilter.label,
            // keyword: '',
            // isRead: 0,
            ...query,
            isRead: 0,
          });
        }
      }}
    >
      <Text style={{ ...styles.txtHeader, marginLeft: 30 }}>Chưa đọc</Text>
    </TouchableOpacity>
  );
};

UnRead.propTypes = {
  query: PropTypes.shape({}).isRequired,
  updateQuery: PropTypes.func.isRequired,
  from: PropTypes.string,
};

export default UnRead;
