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

const ForwardsHeader = ({ navigation }) => (
  <CustomHeader
    Left={
      <IconButton
        icon="arrow-left"
        iconStyle={{ color: colors.gray }}
        onPress={() => navigation.goBack()}
      />
    }
    Content={<Title style={style.title}>Chuyển xử lý nhiều văn bản</Title>}
    hasBorder
    rightStyle={style.right}
    leftStyle={style.left}
    contentStyle={style.content}
  />
);

export default ForwardsHeader;
