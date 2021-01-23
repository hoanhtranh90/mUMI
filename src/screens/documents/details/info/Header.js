import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import { NavigationActions } from 'react-navigation';
import {Icon, Title} from 'native-base';

import IconButton from 'eoffice/components/IconButton';
import CustomHeader from 'eoffice/components/CustomHeader';
import colors from 'eoffice/utils/colors';

const styles = {
  title: {
    fontSize: 17,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
};

const InfoHeader = ({ document, navigation }) => {
  return (
    <CustomHeader
      Left={
        <IconButton
          icon="arrow-left"
          iconStyle={{ color: colors.gray }}
          onPress={() => {
            global.hasDeeplink = false
            navigation.dispatch(NavigationActions.back())
          }}
        />
      }
      Content={<Title style={styles.title}>{document ?.quote}</Title>}
    />
  );
}

InfoHeader.propTypes = {
  document: PropTypes.shape({
    quote: PropTypes.string,
  }),
};
InfoHeader.defaultProps = {
  document: {},
};

export default InfoHeader;
