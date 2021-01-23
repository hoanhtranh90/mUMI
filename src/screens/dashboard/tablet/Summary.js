/* eslint-disable global-require,import/no-unresolved */
import { View, StyleSheet, Image } from 'react-native';
import { Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import React from 'react';
import { selectors } from 'eoffice/store/auth';
import PropTypes from 'prop-types';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import SummaryBox from './SummaryBox';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007aff',
    paddingTop: 13,
    flexDirection: 'row',
  },
  viewPaddingColum: {
    flex: 25,
    backgroundColor: '#f8f9fd',
  },
  paddingColum: {
    width: 50,
    height: 80,
    backgroundColor: '#007aff',
  },
  backgroundHeader: {
    width: '100%',
    height: 0.2 * variables.deviceHeight,
    position: 'absolute',
  },
  mainSummary: {
    flex: 1,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  txtToday: {
    fontSize: 21,
    height: 45,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  header: {
    justifyContent: 'center',
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

const Summary = ({ report, user, selectedDeptRole, setDeptRole }) => (
  <View style={styles.container}>
    <View style={styles.mainSummary}>
      <Image source={require('eoffice/assets/Rectangle.jpg')} style={styles.backgroundHeader} />
      <View style={styles.header}>
        <Text style={styles.txtToday}>Hôm nay của {user?.fullName || 'tôi'},</Text>
      </View>
      <View style={styles.summary}>
        <View style={styles.viewPaddingColum}>
          <View style={styles.paddingColum} />
        </View>
        <View style={{ flex: 975, borderColor: '#dddddd', borderWidth: 1 }}>
          <SummaryBox
            currentId={selectedDeptRole?.id}
            items={report.data}
            onItemPressed={item => setDeptRole(item.userDeptRole)}
          />
          {report.loading && (
            <View style={styles.overlay}>
              <Spinner color={colors.blue} />
            </View>
          )}
        </View>
        <View style={styles.viewPaddingColum}>
          <View style={styles.paddingColum} />
        </View>
      </View>
    </View>
  </View>
);

Summary.propTypes = {
  report: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}),
  selectedDeptRole: PropTypes.shape({}),
  setDeptRole: PropTypes.func.isRequired,
};

Summary.defaultProps = {
  user: null,
  selectedDeptRole: null,
};

const mapStateToProps = state => ({
  user: selectors.meSelector(state),
});

export default connect(
  mapStateToProps,
  null
)(Summary);
