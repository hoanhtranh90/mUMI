import React from 'react';
import { Header, Left as BaseLeft, Body, Right as BaseRight } from 'native-base';
import PropTypes from 'prop-types';

import style from './CustomHeader.style';

const CustomHeader = ({ Left, Right, Content, leftStyle, rightStyle, contentStyle, hasBorder }) => (
  <Header
    iosBarStyle="dark-content"
    backgroundColor="white"
    androidStatusBarColor="white"
    style={[style.headerStyle, hasBorder === true ? style.hasBorder : null]}
  >
    <BaseLeft style={[style.leftStyle, leftStyle]}>{Left}</BaseLeft>
    <Body style={[style.contentStyle, contentStyle]}>{Content}</Body>
    <BaseRight style={[style.rightStyle, rightStyle]}>{Right}</BaseRight>
  </Header>
);

CustomHeader.propTypes = {
  hasBorder: PropTypes.bool,
  leftStyle: PropTypes.shape({}),
  rightStyle: PropTypes.shape({}),
  contentStyle: PropTypes.shape({}),
  Left: PropTypes.node,
  Right: PropTypes.node,
  Content: PropTypes.node,
};

CustomHeader.defaultProps = {
  hasBorder: false,
  leftStyle: {},
  rightStyle: {},
  contentStyle: {},
  Left: null,
  Right: null,
  Content: null,
};
export default CustomHeader;
