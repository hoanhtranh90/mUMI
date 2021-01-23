import { findIndex } from 'lodash';
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Platform, StyleSheet, View } from 'react-native';

import { Icon, Spinner, Text } from 'native-base';
import variables from '../../native-base-theme/variables/platform';
import colors from '../../utils/colors';
import SummaryItem from './SummaryItem.container';
import Swiper from 'react-native-swiper';
import store from '../../store';

const styles = StyleSheet.create({
  dotContainer: {
    ...Platform.select({
      ios: {
        bottom: 10,
      },
      android: {
        bottom: 0,
      },
    }),
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: '#007aff',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  position: {
    ...Platform.select({
      ios: {
        bottom: 30,
      },
      android: {
        bottom: 10,
      },
    }),
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#eef0f2',
    borderRadius: 15.5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  positionIcon: {
    fontSize: 16,
    color: colors.darkGray,
    marginRight: 10,
  },
  positionText: {
    textAlign: 'center',
    fontSize: 14,
  },
  selected: {
    color: colors.blue,
  },
});

const SwiperWrap = ({
  items,
  currentUserDeptRole,
  changeDeptRole,
  changeUserDeptRole,
  deptRoles,
}) => {
  const listDeptRoles = deptRoles;
  const [indexSwiper, setIndexSwiper] = useState(0);

  const onIndexChanged = index => {
    let deptRoleSelected = listDeptRoles[index];
    if (deptRoleSelected) changeUserDeptRole(deptRoleSelected);
  };

  const renderPagination = (index, total, context) => {
    return (
      <View>
        <View style={styles.position}>
          <Icon name="user" style={[styles.positionIcon]} />
          <Text numberOfLines={3} style={[styles.positionText]}>
            {currentUserDeptRole.positionName}
          </Text>
        </View>
        <View pointerEvents="none" style={styles.dotContainer}>
          {listDeptRoles.map((item, idx) => (
            <View style={idx === index ? styles.activeDot : styles.dot} />
          ))}
        </View>
      </View>
    );
  };

  useEffect(
    () => {
      if (currentUserDeptRole.id) {
        let index = listDeptRoles.findIndex(deptRole => deptRole.id === currentUserDeptRole.id);
        setIndexSwiper(index);
      }
    },
    [changeDeptRole]
  );

  useEffect(() => {
    if (currentUserDeptRole.id) {
      let index = listDeptRoles.findIndex(deptRole => deptRole.id === currentUserDeptRole.id);
      setIndexSwiper(index);
    }
  }, []);

  const renderSwiper = () => {
    if (items.length === 1) {
      let item = items[0];
      if (item.userDeptRole.id) {
        return (
          <Swiper loop={false} style={{ height: 200 }} renderPagination={renderPagination}>
            <SummaryItem {...item} width={variables.deviceWidth} selected={true} />
          </Swiper>
        );
      } else {
        return (
          <View>
            <>
              <Spinner />
            </>
          </View>
        );
      }
    } else if (items.length > 1) {
      return (
        <Swiper
          index={indexSwiper}
          loop={false}
          renderPagination={renderPagination}
          containerStyle={styles.containerStyle}
          onIndexChanged={onIndexChanged}
        >
          {listDeptRoles.map(deptRole => {
            let item = items.find(object => object.userDeptRole.id === deptRole.id);
            return <SummaryItem {...item} width={variables.deviceWidth} selected={true} />;
          })}
        </Swiper>
      );
    } else {
      return (
        <View>
          <>
            <Spinner />
          </>
        </View>
      );
    }
  };

  return <View style={{ backgroundColor: '#fff', height: 250 }}>{items && renderSwiper()}</View>;
};

SwiperWrap.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      userDeptRole: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};

export default SwiperWrap;
