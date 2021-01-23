import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import colors from '../../../../utils/colors';
import { LICHTUAN_TYPE } from '../../../../constants/administrative';
import { changeMode } from '../../../../store/hcCalendar/reducer';
import { connect } from 'react-redux';


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

const ModeSwitches = ({mode, changeMode}) => (
  <View style={styles.container}>
      <React.Fragment>
        <Button
          onPress={() => changeMode(LICHTUAN_TYPE.CAN_XU_LY)}
          style={styles.btn}
        >
          <Text
            uppercase={false}
            style={[styles.text, mode === LICHTUAN_TYPE.CAN_XU_LY ? styles.selectedText : null]}
          >
            Đã gửi yêu cầu
          </Text>
        </Button>
         <View style={styles.separator} />
      </React.Fragment>
      <React.Fragment>
        <Button
          onPress={() => changeMode(LICHTUAN_TYPE.DA_XU_LY)}
          style={styles.btn}
        >
          <Text
            uppercase={false}
            style={[styles.text, mode === LICHTUAN_TYPE.DA_XU_LY ? styles.selectedText : null]}
          >
            Lịch tuần
          </Text>
        </Button>
      </React.Fragment>
  </View>
);


const mapStateToProps = ({hcCalendar}) => ({
  mode: hcCalendar.mode,
});

const mapDispatchToProps = {
  changeMode: changeMode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModeSwitches);
