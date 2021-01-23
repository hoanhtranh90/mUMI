import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Col } from 'react-native-easy-grid';
import { Text } from 'native-base';

import Avatar from '../../../../components/Avatar';
import colors from '../../../../utils/colors';

const UserCard = ({ fullName, roleName }) => (
  <Grid
    style={{
      borderWidth: 1,
      borderColor: '#dcdce6',
      borderRadius: 8,
      paddingVertical: 8,
      overflow: 'hidden',
    }}
  >
    <Col style={{ justifyContent: 'center', width: 50, marginLeft: -11 }}>
      <Avatar name={fullName} size={50} />
    </Col>
    <Col style={{ justifyContent: 'space-around', paddingHorizontal: 6 }}>
      <Text style={{ fontSize: 15, color: '#7a848e' }}>{roleName}</Text>
      <Text style={{ fontSize: 17, color: colors.darkGray, fontWeight: 'bold' }}>{fullName}</Text>
    </Col>
  </Grid>
);

UserCard.propTypes = {
  fullName: PropTypes.string.isRequired,
  roleName: PropTypes.string.isRequired,
};

export default UserCard;
