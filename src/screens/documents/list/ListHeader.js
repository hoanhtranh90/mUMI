import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Title } from 'native-base';

import {
  DOC_STATUS_DISPLAY,
  DOC_USER_STATUS,
  PROCESS_TYPE_TEXTS,
} from 'eoffice/constants/documents';
import IconButton from 'eoffice/components/IconButton';
import colors from 'eoffice/utils/colors';
import CustomHeader from 'eoffice/components/CustomHeader';
import CountBadge from '../common/CountBadge';

const window = Dimensions.get('window');

const style = StyleSheet.create({
  titleStyleContent: {
    fontSize: 22,
    color: colors.darkGray,
    fontWeight: 'bold',
    // width: window.width * 0.5,
    // textAlign: 'left',
  },
});

const ListHeader = ({ navigation, status, total, unreadReleased, type, countToTrinh }) => {
  const label = DOC_STATUS_DISPLAY[status].label;

  const labelCT = label + ' (' + PROCESS_TYPE_TEXTS[0] + ')';
  const labelNDB = label + ' (' + PROCESS_TYPE_TEXTS[1] + ')';
  const labelPH = label + ' (' + PROCESS_TYPE_TEXTS[2] + ')';

  const isToTrinh = () =>
    [
      DOC_USER_STATUS.TO_TRINH_CHUA_YK,
      DOC_USER_STATUS.TO_TRINH_DCXL,
      DOC_USER_STATUS.TO_TRINH_DBL,
      DOC_USER_STATUS.TO_TRINH_CXL,
    ].includes(status);

  // console.log('status ' + status);
  // console.log('type ' + type);

  return (
    <CustomHeader
      Left={
        <IconButton
          icon="arrow-left"
          iconStyle={{ color: colors.gray }}
          onPress={() => navigation.goBack()}
        />
      }
      Content={
        <>
          <Title style={style.titleStyleContent}>
            {/* {type == 0 ? labelCT : type == 1 ? labelNDB : type == 2 ? labelPH : label} */}
            {label}
          </Title>
          <CountBadge
            bgColor={DOC_STATUS_DISPLAY[status].bgColor}
            color={DOC_STATUS_DISPLAY[status].color}
            count={
              isToTrinh()
                ? countToTrinh[status]
                : status === DOC_USER_STATUS.DA_PHAT_HANH
                ? unreadReleased
                : total
            }
          />
        </>
      }
      Right={
        <IconButton
          icon="search"
          iconStyle={{ color: colors.blue }}
          style={{ borderColor: colors.lightBlue }}
          onPress={() => navigation.navigate('Search', { status })}
        />
      }
      hasBorder
    />
  );
};

ListHeader.propTypes = {
  status: PropTypes.number,
  total: PropTypes.number,
  unreadReleased: PropTypes.number,
  type: PropTypes.number,
};
ListHeader.defaultProps = {
  status: 0,
  total: 0,
  unreadReleased: 0,
};

export default ListHeader;
