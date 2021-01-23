import React from 'react';
import { View } from 'react-native';
import ListNote from './list/ListNote';
import DetailNote from './detail/DetailNote';

const GhiChuV2Screen = ({ navigation }) => {

  return (
    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#fff' }}>
      <ListNote navigation={navigation}  />
      <DetailNote navigation={navigation} />
    </View>
  );
};

export default GhiChuV2Screen;
