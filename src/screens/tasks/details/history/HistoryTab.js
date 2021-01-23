/* eslint-disable global-require,import/no-unresolved, react/prop-types */

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Content, Text } from 'native-base';

import { TASK_ACTION_LOGS } from 'eoffice/constants/tasks';
import colors from 'eoffice/utils/colors';
import { tabStyles } from 'eoffice/utils/tabBarOptions';
import Header from '../common/Header';
import ActionHistory from './ActionHistory.container';
import Footer from './Footer.container';

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: colors.darkGray,
    flexWrap: 'wrap',
    flex: 1,
  },
  percent: {
    fontWeight: 'bold',
  },
});

const getActionLogHeader = item => {
  const headerInfo = TASK_ACTION_LOGS[item.actionName];
  if (item.actionName === 'TASK_UPDATE_TASK_PROGRESS') {
    const { extraData } = item;
    const newColor =
      extraData.completionPercent > extraData.oldCompletionPercent ? colors.green : colors.red;
    return {
      ...headerInfo,
      label: (
        <Text style={[styles.label, { color: headerInfo.color }]}>
          {`${headerInfo.label} từ `}
          <Text style={[styles.percent, { color: headerInfo.color }]}>
            {`${extraData.oldCompletionPercent}%`}
          </Text>
          {` đến `}
          <Text style={[styles.percent, { color: newColor }]}>
            {`${extraData.completionPercent}%`}
          </Text>
        </Text>
      ),
    };
  }

  return headerInfo || { label: item.actionName };
};

const HistoryTab = () => (
  <Container>
    <Header />
    <Content>
      <ActionHistory getActionLogHeader={getActionLogHeader} />
    </Content>
    <Footer />
  </Container>
);

HistoryTab.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Image
      style={tabStyles.icon}
      resizeMode="contain"
      source={
        focused ? require('eoffice/assets/comment.png') : require('eoffice/assets/comment-gray.png')
      }
    />
  ),
  tabBarOnPress: ({ navigation }) => navigation.navigate('History', { focusComment: false }),
};

export default HistoryTab;
