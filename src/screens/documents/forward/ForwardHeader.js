import PropTypes from 'prop-types';
import React from 'react';
import { Title } from 'native-base';

import IconButton from 'eoffice/components/IconButton';
import CustomHeader from 'eoffice/components/CustomHeader';
import colors from '../../../utils/colors';

const style = {
  right: {
    width: 54,
  },
  content: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 17,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
};

const ForwardHeader = ({ canChuyenXuLyDonvi, onBack }) => (
  <CustomHeader
    Left={<IconButton icon="arrow-left" iconStyle={{ color: colors.gray }} onPress={onBack} />}
    Content={
      <Title style={style.title}>
        {canChuyenXuLyDonvi ? 'Chuyển tiếp đơn vị xử lý' : 'Chuyển xử lý'}
      </Title>
    }
    hasBorder
    rightStyle={style.right}
    leftStyle={style.left}
    contentStyle={style.content}
  />
);

ForwardHeader.propTypes = {
  canChuyenXuLyDonvi: PropTypes.bool,
  onBack: PropTypes.func,
};
ForwardHeader.defaultProps = {
  canChuyenXuLyDonvi: false,
  onBack() {},
};

export default ForwardHeader;
