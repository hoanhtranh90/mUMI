import { Icon } from 'native-base';
import React from 'react';
import colors from '../../../../utils/colors';

const CustomIcon = ({ name, margin }) => {
  return <Icon name={name} type="Feather" style={[{ fontSize: 22 , color : colors.blue }, { marginRight: margin }]} />;
};
export default CustomIcon;
