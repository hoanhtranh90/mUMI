import React, { useEffect } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import styles from './VeMayBayForm.style';
// import BottomModal from './BottomModal';
// import ModalTitle from './ModalTitle';
// import IconField from '../IconField';
// import colors from '../../utils/colors';

// eslint-disable-next-line react/prop-types
const ChangBayFlatList = ({ flightRoute, onPress, visible }) => {
  useEffect(() => {}, [visible]);
  const Header = () => {
    return (
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
            fontSize: 18,
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
            fontSize: 18,
            fontWeight: 'bold',
            marginRight: 5,
          }}
        >
          ĐIỂM ĐẾN
        </Text>
        <Text
          style={{
            width: '33%',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            marginRight: 5,
          }}
        >
          ĐIỂM ĐI
        </Text>
      </View>
    )
  }
  return (
    <View style={{flex: 1}}>
      <FlatList
        ListHeaderComponent={() => <Header></Header>}
        style={{ width: '100%', marginVertical: 20 }}
        data={flightRoute}
        keyExtractor={item => item.id}
        renderItem={item => (
          <TouchableOpacity
            onPress={() => onPress(item)}
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: 6,
            }}
          >
            <Text style={styles.textItem}>{item?.item?.userName}</Text>
            <Text style={styles.textItem}>{item?.item?.airportFromName}</Text>
            <Text style={styles.textItem}>{item?.item?.airportToName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

ChangBayFlatList.propTypes = {
  visible: PropTypes.bool,
};
ChangBayFlatList.defaultProps = {
  visible: false,
};

export default ChangBayFlatList;
