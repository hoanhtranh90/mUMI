import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Item, Input, Title } from 'native-base';
import { DOC_USER_STATUS, OUTGOING_DOC_STATUS } from '../../../constants/documents';
import { selectors as documentSelectors } from 'eoffice/store/documents/list';
import IconButton from 'eoffice/components/IconButton';
import CustomHeader from 'eoffice/components/CustomHeader';
import colors from 'eoffice/utils/colors';

import filters from '../../../utils/quick-filters';

const docDateYearFilter = filters.find(filter => filter.id === 'docDateThisYear');
const createTimeMonthFilter = filters.find(filter => filter.id === 'createTimeMonthAgo');

const styles = StyleSheet.create({
  left: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  grayBg: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },
  grayBgAdv: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    flex: 1
  },
  input: {
    color: colors.darkGray,
    height: 40,
    paddingLeft: 0,
  },
  titleStyleContent: {
    fontSize: 22,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

const SearchHeader = ({ resetDocuments, navigation, query, updateQuery, usingAdvanced, mode }) => {
  const [keyword, setKeyword] = useState('');
  const goBack = () => {
    const { createTime, docDate, docStatus, filterLabel, status } = query;
    resetDocuments();
    let queryBack = {}
    if (query.typeDoc === 'duthao') {
      queryBack = {
        docStatus: [
          OUTGOING_DOC_STATUS.TAO_MOI,
          OUTGOING_DOC_STATUS.DANG_XU_LI,
          OUTGOING_DOC_STATUS.CHO_BAN_HANH,
          OUTGOING_DOC_STATUS.TU_CHOI,
          OUTGOING_DOC_STATUS.TU_CHOI_BANHANH,
        ],
        createTime: createTimeMonthFilter.getValue(),
        docDate: createTimeMonthFilter.getValue(),
        filterLabel: createTimeMonthFilter.label,
        status: DOC_USER_STATUS.CHO_XU_LY,
        filterStatus: 'choXuLy',
        sort: 'processTime',
        typeDoc: 'duthao',
        keyword: ''
      }
    } else if (query.typeDoc === 'phathanh') {
      queryBack = {
        docStatus: OUTGOING_DOC_STATUS.DA_BAN_HANH,
        createTime: createTimeMonthFilter.getValue(),
        filterLabel: createTimeMonthFilter.label,
        sort: 'processTime',
        typeDoc: 'phathanh',
        filterStatus: 'all',
        keyword: ''
      }
    } else {
      if (query.status === 0) {
        queryBack = {
          status: DOC_USER_STATUS.CHO_XU_LY,
          docDate: createTimeMonthFilter.getValue(),
          filterLabel: createTimeMonthFilter.label,
          keyword: ''
        }
      } else if (query.status === 1) {
        queryBack = {
          status: DOC_USER_STATUS.DA_XU_LY,
          docDate: createTimeMonthFilter.getValue(),
          filterLabel: createTimeMonthFilter.label,
          keyword: ''
        }
      } else {
        queryBack = {
          status: DOC_USER_STATUS.UY_QUYEN,
          docDate: createTimeMonthFilter.getValue(),
          filterLabel: createTimeMonthFilter.label,
          relationType: 'nguoiUyQuyen',
          keyword: ''
        }
      }

    }
    updateQuery(queryBack);

    navigation.goBack();
  };

  const updateSearch = text => {
    setKeyword(text);
  };

  useEffect(
    () => {
      setKeyword('')
      updateQuery({ keyword: '' });
    },
    [usingAdvanced]
  );

  const initialState = {
    usingAdvanceSearch: 1,
    fileContent: undefined,
    docCode: undefined,
    quote: undefined,
    docTypeId: undefined,
    publisherId: undefined,
    outsidePublisherName: undefined,
    incomingDate: [],
    vbDocUserUpdateTime: [],
    priorityId: undefined,
    processTime: [],
    receiveDeptId: undefined,
    otherReceivePlaces: undefined,
  };

  return (
    <CustomHeader
      Left={
        <IconButton
          icon="arrow-left"
          iconStyle={{ color: colors.gray }}
          style={styles.grayBg}
          onPress={goBack}
        />
      }

      Content={
        <Item rounded style={usingAdvanced ? styles.grayBgAdv : styles.grayBg}>
          {!usingAdvanced ?
            <Icon name="search" type="Feather" style={{ color: colors.darkGray }} />
            : null}
          {!usingAdvanced ?
            <Input
              placeholder="Mời nhập từ khoá"
              placeholderTextColor={colors.gray}
              style={styles.input}
              value={usingAdvanced ? '' : keyword}
              returnKeyType="search"
              onChangeText={text => updateSearch(text)}
              onSubmitEditing={() => {
                updateQuery({ keyword, ...initialState, usingAdvanceSearch: 0 });
              }}
            /> : null}
          {usingAdvanced ?
            <Title style={styles.titleStyleContent}>Tìm kiếm nâng cao</Title>
            : null}

        </Item>
      }
      Right={<></>}
      rightStyle={styles.right}
      leftStyle={styles.left}
      contentStyle={styles.body}
      hasBorder
    />
  );
};
SearchHeader.propTypes = {
  resetDocuments: PropTypes.func.isRequired,
  updateQuery: PropTypes.func.isRequired,
  usingAdvanced: PropTypes.bool,
  query: PropTypes.shape({}),
  mode: PropTypes.number
};
SearchHeader.defaultProps = {
  query: {},
  usingAdvanced: false
};

const mapStateToProps = state => ({
  mode: documentSelectors.modeSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHeader);

