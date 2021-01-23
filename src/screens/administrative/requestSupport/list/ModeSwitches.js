import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import colors from '../../../../utils/colors';
import { KHACH_SAN_TYPE } from '../../../../constants/administrative';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.lighterGray,
    borderRadius: 4,
  },
  separator: {
    width: 1,
    backgroundColor: '#b6bdc6',
    marginVertical: 9,
  },
  btn: {
    flex: 1,
    backgroundColor: colors.lighterGray,
    borderColor: colors.lighterGray,
    elevation: 0,
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(45, 62, 79, 0.5)',
    fontSize: 17,
    fontWeight: 'bold',
  },
  selectedText: {
    color: colors.blue,
  },
});

const ModeSwitches = ({ mode, changeMode }) => {
  return (
    <View style={styles.container}>
      <React.Fragment>
        <Button onPress={() => changeMode(KHACH_SAN_TYPE.CHO_XU_LY)} style={styles.btn}>
          <Text
            uppercase={false}
            style={[styles.text, mode === KHACH_SAN_TYPE.CHO_XU_LY ? styles.selectedText : null]}
          >
            Chờ xử lý
          </Text>
        </Button>
        <View style={styles.separator} />
      </React.Fragment>
      <React.Fragment>
        <Button onPress={() => changeMode(KHACH_SAN_TYPE.DA_XU_LY)} style={styles.btn}>
          <Text
            uppercase={false}
            style={[styles.text, mode === KHACH_SAN_TYPE.DA_XU_LY ? styles.selectedText : null]}
          >
            Đã xử lý
          </Text>
        </Button>
      </React.Fragment>
    </View>
  );
};

export default ModeSwitches;
