/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Title } from 'native-base';

import IconButton from 'eoffice/components/IconButton';
import CustomHeader from 'eoffice/components/CustomHeader';
import colors from 'eoffice/utils/colors';

import { connect } from 'react-redux';
import { actions ,selectors } from 'eoffice/store/administrative/theoDoiChiDaoLanhDao';

const styles = StyleSheet.create({
  grayBg: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },

  titleStyleContent: {
    fontSize: 20,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
});

const SearchHeader = ({ navigation, refreshPage }) => (
  <CustomHeader
    Left={
      <IconButton
        icon="arrow-left"
        iconStyle={{ color: colors.gray }}
        style={styles.grayBg}
        onPress={() => {
          refreshPage()
          navigation.goBack()
        }}
      />
    }
    hasBorder
    Content={<Title style={styles.titleStyleContent}>Lọc thời gian</Title>}
  />
);

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  refreshPage: actions.refreshPage,
};

export default connect(
  null,
  mapDispatchToProps
)(SearchHeader);
