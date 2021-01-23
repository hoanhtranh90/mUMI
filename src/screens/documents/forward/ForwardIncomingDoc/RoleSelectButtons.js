import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';

import colors from 'eoffice/utils/colors';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  btn: {
    backgroundColor: '#fff',
    shadowColor: 'rgb(0, 122, 255)',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  txt: {
    fontSize: 15,
    fontWeight: '600',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const RoleSelectButtons = ({ onPress, state, stateDept }) => (
  <View style={styles.wrapper}>
    <Button rounded style={styles.btn} onPress={() => onPress('chuTri')}>
      <Text style={[styles.txt, { color: colors.green }]} uppercase={false}>
        {`Chủ trì (+${state.chuTri.length + stateDept.chuTri.length})`}
      </Text>
    </Button>
    <Button rounded style={styles.btn} onPress={() => onPress('phoiHop')}>
      <Text style={[styles.txt, { color: colors.pink }]} uppercase={false}>
        {`Phối hợp (+${state.phoiHop.length + stateDept.phoiHop.length})`}
      </Text>
    </Button>
    <Button rounded style={styles.btn} onPress={() => onPress('nhanDeBiet')}>
      <Text style={[styles.txt, { color: colors.yellow }]} uppercase={false}>
        {`Nhận (+${state.nhanDeBiet.length + stateDept.nhanDeBiet.length})`}
      </Text>
    </Button>
  </View>
);

RoleSelectButtons.propTypes = {
  onPress: PropTypes.func.isRequired,

  state: PropTypes.shape({
    chuTri: PropTypes.arrayOf(PropTypes.string),
    phoiHop: PropTypes.arrayOf(PropTypes.string),
    nhanDeBiet: PropTypes.arrayOf(PropTypes.string),
  }),
  stateDept: PropTypes.shape({
    chuTri: PropTypes.arrayOf(PropTypes.string),
    phoiHop: PropTypes.arrayOf(PropTypes.string),
    nhanDeBiet: PropTypes.arrayOf(PropTypes.string),
  }),
};
RoleSelectButtons.defaultProps = {
  state: {
    chuTri: [],
    phoiHop: [],
    nhanDeBiet: [],
  },
  stateDept: {
    chuTri: [],
    phoiHop: [],
    nhanDeBiet: [],
  },
};

export default RoleSelectButtons;
