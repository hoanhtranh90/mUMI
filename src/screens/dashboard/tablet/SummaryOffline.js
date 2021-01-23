/* eslint-disable global-require,import/no-unresolved */
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Right, Icon, Left, Body } from 'native-base';
import { connect } from 'react-redux';
import React from 'react';
import { selectors } from 'eoffice/store/auth';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import * as authService from '../../../store/auth/service';
import SummaryBox from './SummaryBox';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a75178',
    paddingTop: 13,
    flexDirection: 'row',
  },
  paddingColum: {
    flex: 25,
    height: 80,
  },
  backgroundHeader: {
    width: '100%',
    height: 0.3 * variables.deviceHeight,
    position: 'absolute',
  },
  mainSummary: {
    flex: 1,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  notiBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 80,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
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
    height: 50,
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

const Summary = ({ navigation, report, selectedDeptRole, setDeptRole }) => (
  <View style={styles.container}>
    <View style={styles.mainSummary}>
      <Image source={require('eoffice/assets/RectangleOff.jpg')} style={styles.backgroundHeader} />
      <View style={styles.header} />
      <View
        style={{
          width: variables.deviceWidth,
          marginBottom: 10,
          flexDirection: 'row',
        }}
      >
        <Left />
        <Body>
          <TouchableOpacity
            style={styles.notiBtn}
            onPress={async () => {
              const token = await AsyncStorage.getItem('userToken');
              await authService.getMe1(token).then(async res => {
                if (res.status === 200) {
                  navigation.navigate('AuthLoading');
                }
              });
            }}
          >
            <Text style={styles.notiText}>Tải lại</Text>
          </TouchableOpacity>
        </Body>
        <Right style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 40 }}>
          <Text style={{ color: 'white', paddingBottom: 8, paddingRight: 10 }}>
            Mất kết nối mạng
          </Text>
          <Icon name="wifi-off" type="Feather" style={{ color: 'white', paddingBottom: 8 }} />
        </Right>
      </View>
      <View style={styles.summary}>
        <View style={styles.paddingColum} />
        <View style={{ flex: 975, borderColor: '#dddddd', borderWidth: 1 }}>
          <SummaryBox
            currentId={selectedDeptRole?.id}
            items={report.data}
            onItemPressed={item => setDeptRole(item.userDeptRole)}
          />
        </View>
        <View style={styles.paddingColum} />
      </View>
    </View>
  </View>
);

Summary.propTypes = {
  report: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  selectedDeptRole: PropTypes.shape({}).isRequired,
  setDeptRole: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: selectors.meSelector(state),
});

export default connect(
  mapStateToProps,
  null
)(withNavigation(Summary));
