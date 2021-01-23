import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Title, Text } from 'native-base';

import format from 'date-fns/format';
import CustomHeader from 'eoffice/components/CustomHeader';
import IconButton from 'eoffice/components/IconButton';
import colors from 'eoffice/utils/colors';
import NavigationService from 'eoffice/utils/NavigationService';

const style = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    color: colors.gray,
    fontSize: 14,
    flex: 1,
  },
  text: {
    color: colors.gray,
    fontSize: 14,
  },
  title: {
    fontSize: 17,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  icon: {
    color: colors.gray,
    fontSize: 14,
    width: 18,
  },
});

const HistoryHeader = ({ document }) => (
  <>
    <CustomHeader
      Left={
        <IconButton
          icon="arrow-left"
          iconStyle={{ color: colors.gray }}
          onPress={() => NavigationService.goBack()}
        />
      }
      Content={
        <Title style={style.title} numberOfLines={2}>
          {document?.quote}
        </Title>
      }
    />
    <View style={style.viewContainer}>
      <Text style={style.textContainer}>{document?.docCode}</Text>
      {document?.docDate && (
        <View style={style.view}>
          <Icon name="clock" type="MaterialCommunityIcons" style={style.icon} />
          <Text style={style.text}>{format(new Date(document?.docDate), 'dd/MM/yyyy')}</Text>
        </View>
      )}
    </View>
  </>
);

HistoryHeader.propTypes = {
  document: PropTypes.shape({
    docCode: PropTypes.string,
    quote: PropTypes.string,
    docDate: PropTypes.number,
  }),
};
HistoryHeader.defaultProps = {
  document: {},
};

export default HistoryHeader;
