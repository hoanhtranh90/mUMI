import React from 'react';
import { Container, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Tasks from '../common/Tasks';
import ListHeader from './ListHeader';
import ListHeading from './ListHeading.container';
import colors from 'eoffice/utils/colors';

const ListScreen = ({ navigation }) => (
  <Container>
    <ListHeader navigation={navigation} />
    <ListHeading />
    <Tasks />
    <TouchableOpacity
      style={{
        padding: 10,
        borderRadius: 100,
        backgroundColor: colors.blue,
        position: 'absolute',
        right: 30,
        bottom: 70,
        shadowColor: '#5386ba',
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,

        elevation: 19,
      }}
      onPress={() => navigation.navigate('Create')}
    >
      <Icon name="plus" type="Feather" style={{ color: 'white' }} />
    </TouchableOpacity>
  </Container>
);

export default ListScreen;
