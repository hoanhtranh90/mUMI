import React, { useEffect } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import styles from './VeMayBayForm.style';

const ChangBayFlatList = ({ flightUserList, onPress, visible }) => {
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
            HỌ TÊN
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
            GIỚI TÍNH
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
            SĐT
          </Text>
        </View>
      )}
      style={{ width: '100%', maxHeight: 300, marginVertical: 20 }}
      data={flightUserList}
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
          <Text style={styles.textItem}>{item?.item?.userName}</Text>
          <Text style={styles.textItem}>{item?.item?.gender?.gender}</Text>
          <Text style={styles.textItem}>{item?.item?.isdn}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

ChangBayFlatList.propTypes = {
  visible: PropTypes.bool,
  flightUserList: PropTypes.objectOf,
  onPress: PropTypes.func,
};
ChangBayFlatList.defaultProps = {
  visible: false,
  flightUserList: [],
  onPress() {},
};

export default ChangBayFlatList;
