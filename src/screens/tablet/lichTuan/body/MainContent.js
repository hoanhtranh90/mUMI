import React, { useEffect } from 'react';
import DaBanHanhScreen from './DaBanHanhScreen';
import { changeMode } from '../../../../store/hcCalendar/reducer';
import { connect } from 'react-redux';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import DetailLichTuan from './DetailLichTuan';

const widthView = Dimensions.get('window').width / 2;
const moveAppear = new Animated.ValueXY({ x: Dimensions.get('window').width + widthView, y: 0 });
const MainContent = ({ isShowDetail, navigation }) => {
  const showView = () => {
    Animated.timing(moveAppear, {
      toValue: { x: Dimensions.get('window').width - widthView, y: 0 },
    }).start();
  };

  const hideView = () => {
    Animated.timing(moveAppear, {
      toValue: { x: Dimensions.get('window').width + widthView, y: 0 },
    }).start();
  };
  useEffect(
    () => {
      isShowDetail ? showView() : hideView();
    },
    [isShowDetail]
  );

  return (
    <>
      <View style={styles.container}>
        <DaBanHanhScreen style={styles.dabanhanh} navigation={navigation}/>
        <Animated.View style={[styles.detail, styles.border, moveAppear.getLayout()]}>
          <DetailLichTuan />
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  dabanhanh: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  detail: {
    backgroundColor: 'white',
    padding: 10,
    position: 'absolute',
    right: -widthView,
    width: widthView,
    flex: 1,
    bottom: 0,
    zIndex: 2,
  },
  border: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
});

const mapStateToProps = ({ hcCalendar }) => ({
  detail: hcCalendar.hcCalendarDetail,
  isShowDetail: hcCalendar.isShowDetail,
});

const mapDispatchToProps = {
  changeMode: changeMode,
};

export default connect(
  mapStateToProps,
  null
)(MainContent);
