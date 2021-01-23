import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Alert } from 'react-native';
import { Button, Text } from 'native-base';
import _ from 'lodash';
import colors from 'eoffice/utils/colors';
import { FLOW_INFO } from 'eoffice/constants/administrative';
import QuickFilter from './QuickFilter';
import styles from './AdvancedSearch.styles';
import SearchForm from './SearchForm.container';
import useSearchForm from './useSearchForm';

const AdvancedSearch = ({ searchRequests, navigation, hcFlow }) => {
  const [state, actions] = useSearchForm();
  const formInvalid = !(state.startDate && state.endDate);

  const submit = () => {
    let msg = '';
    if (!formInvalid) {
      if (state.startDate && state.endDate) {
        if (state.startDate > state.endDate) {
          msg = 'Thời gian kết thúc không được nhỏ hơn thời gian bắt đầu.';
        }
      }
      if (_.isEmpty(msg)) {
        if (hcFlow.flowCode === FLOW_INFO.LICH_TUAN) {
          const stateTmp = state;
          stateTmp.isSearch = true;
          searchRequests(state);
          global.startDate = state.startDate;
          if (!_.isNull(global.agenda) && !_.isUndefined(global.agenda)) {
            global.agenda.onDayChange(state.startDate);
          }
        } else {
          searchRequests(state);
        }
        searchRequests(state);

        navigation.goBack();
      } else {
        Alert.alert('Thông báo', msg, [{ text: 'OK' }], {
          cancelable: false,
        });
      }
    } else {
      if (!state.startDate) {
        msg = 'Chưa nhập thời gian bắt đầu.';
      }

      if (!state.endDate) {
        msg = 'Chưa nhập thời gian kết thúc.';
      }

      if (state.startDate && state.endDate) {
        if (state.startDate > state.endDate) {
          msg = 'Thời gian kết thúc không được nhỏ hơn thời gian bắt đầu.';
        }
      }

      Alert.alert('Thông báo', msg, [{ text: 'OK' }], {
        cancelable: false,
      });
    }
  };
  return (
    <View style={styles.advancedSearchWrapper}>
      <ScrollView>
        <QuickFilter setValue={actions.setValue} />
        <View style={{ flex: 1, flexDirection: 'column', paddingVertical: 20 }}>
          <Text
            uppercase
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: colors.gray,
              marginBottom: 12,
              paddingLeft: 15,
            }}
          >
            Chọn khoảng thời gian
          </Text>
          <SearchForm state={state} setValue={actions.setValue} />
        </View>
      </ScrollView>
      <Button block style={styles.searchBtn} onPress={submit}>
        <Text uppercase={false} style={styles.searchText}>
          Tìm kiếm
        </Text>
      </Button>
    </View>
  );
};

AdvancedSearch.propTypes = {
  searchRequests: PropTypes.func.isRequired,
  hcFlow: PropTypes.objectOf.isRequired,
};
AdvancedSearch.defaultProps = {};

export default AdvancedSearch;
