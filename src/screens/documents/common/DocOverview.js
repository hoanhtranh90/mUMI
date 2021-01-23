import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'native-base';
import format from 'date-fns/format';

import colors from 'eoffice/utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.blue,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 16,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quote: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  sub: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const DocOverview = ({ containerStyle, document, isForwards }) => (
  <View
    style={[
      styles.wrapper,
      containerStyle,
      { marginBottom: isForwards ? 0 : 20, marginTop: isForwards ? 10 : 16 },
    ]}
  >
    <Text style={styles.quote}>{document?.quote}</Text>
    {(document?.docCode || document?.docDate) && (
      <View style={styles.row}>
        <Text style={styles.sub}>{document?.docCode}</Text>
        {!!document?.docDate && (
          <View style={styles.time}>
            <Icon name="clock" type="MaterialCommunityIcons" style={[styles.sub, { width: 19 }]} />
            <Text style={styles.sub}>{format(new Date(document?.docDate), 'dd/MM/yyyy')}</Text>
          </View>
        )}
      </View>
    )}
  </View>
);

DocOverview.propTypes = {
  document: PropTypes.shape({
    docCode: PropTypes.string,
    docDate: PropTypes.number,
    quote: PropTypes.string,
  }),
  containerStyle: PropTypes.shape({}),
  isForwards: PropTypes.bool,
};
DocOverview.defaultProps = {
  document: {},
  containerStyle: {},
  isForwards: false,
};

export default DocOverview;
