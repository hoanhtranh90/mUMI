/* eslint-disable global-require,import/no-unresolved, react/prop-types */

import React, {useEffect} from 'react';
import { Image } from 'react-native';
import { Container, Content } from 'native-base';

import { tabStyles } from 'eoffice/utils/tabBarOptions';
import Header from '../detail/DetailHeader';
import DetailCommandsContainer from "./DetailCommandsContainer";

const DetailScreen = ({
    navigation,
}) => {

  return (
    <Container>
      <Header navigation={navigation}/>
      <Content contentContainerStyle={{ flex: 1 }}>
        <DetailCommandsContainer navigation={navigation}/>
      </Content>
    </Container>
  )
};

DetailScreen.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Image
      style={tabStyles.icon}
      resizeMode="contain"
      source={
        focused ? require('eoffice/assets/info.png') : require('eoffice/assets/info-gray.png')
      }
    />
  ),
};

export default DetailScreen;
