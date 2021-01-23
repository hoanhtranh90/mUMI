import React, { useEffect } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import styles from './VeMayBayForm.style';
import {format} from "date-fns";

const ChangBayFlatList = ({ flightRouteList, onPress, visible }) => {
  useEffect(() => {}, [visible]);

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 2,
            borderBottomColor: '#9EBFDC',
            marginTop: 20,
          }}
        >
          <Text
            style={{
              width: '33%',
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              marginRight: 5,
            }}
          >
            XUẤT PHÁT
          </Text>
          <Text
            style={{
              width: '33%',
              fontSize: 16,
              fontWeight: 'bold',
              marginRight: 5,
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            ĐIỂM ĐẾN
          </Text>
          <Text
            style={{
              width: '33%',
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              marginRight: 5,
            }}
          >
            THỜI GIAN BAY YÊU CẦU
          </Text>
        </View>
      )}
      style={{ width: '100%', maxHeight: 300, marginVertical: 20 }}
      data={flightRouteList}
      keyExtractor={item => item.id}
      renderItem={(item, index) => (
        <TouchableOpacity
          onPress={() => {
            onPress(item, index);
          }}
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 6,
          }}
        >
          <Text style={styles.textItem}>{item?.item?.airportFromId?.placeName}</Text>
          <Text style={styles.textItem}>{item?.item?.airportToId?.placeName}</Text>
          <Text style={styles.textItem}>{format(item?.item?.flightTimeEstimate,"dd/MM/yyyy HH:mm")}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

ChangBayFlatList.propTypes = {
  visible: PropTypes.bool,
  flightRouteList: PropTypes.objectOf,
  onPress: PropTypes.func,
};
ChangBayFlatList.defaultProps = {
  visible: false,
  flightRouteList: [],
  onPress() {},
};

export default ChangBayFlatList;
