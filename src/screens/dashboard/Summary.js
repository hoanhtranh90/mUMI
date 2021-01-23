import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Spinner } from 'native-base';

import colors from '../../utils/colors';
import SwiperWrap from './SwiperWrap.container';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  title: {
    color: colors.darkGray,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 30,
    marginBottom: 9,
  },
  swiperWrapper: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Summary = ({ report}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Hôm nay của tôi</Text>

      <View style={styles.swiperWrapper}>
        {report.menuConfigLoading === true && (
          <>
            <Spinner />
          </>
        )}
        {report.menuConfigLoading === false && <SwiperWrap items={report.data} />}
      </View>
    </View>
  );
};

Summary.propTypes = {
  report: PropTypes.shape({
    data: PropTypes.any,
    loading: PropTypes.bool,
  }).isRequired,
};
export default Summary;
