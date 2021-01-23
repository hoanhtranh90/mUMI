import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, StyleSheet, View, Platform } from 'react-native';
import { Button, Spinner, Text, Textarea } from 'native-base';

import IconField from 'eoffice/components/IconField';
import colors from 'eoffice/utils/colors';
import NavigationService from 'eoffice/utils/NavigationService';
import DeviceInfo from 'react-native-device-info';
import * as DocumentNavigation from 'eoffice/utils/DocumentNavigation';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import HandlerSelectField from './HandlerSelectField';
import { DOCUMENT_TYPE, FLOW_TYPE } from '../../../constants/documents';
import vbFlowService from '../../../service/flowService';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingBottom: variables.isIphoneX ? 58 : 24,
  },
  view: {
    flex: 1,
    paddingTop: 10,
  },
  btn: {
    marginTop: 32,
    marginHorizontal: 15,
  },
  loadingBtn: {
    backgroundColor: colors.blue,
  },
  text: {
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
      android: {
        fontSize: 16,
      },
    }),
  },
});

const initialState = {
  handlerId: null,
  note: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initialState;

    case 'setHandler':
      return { ...state, handlerId: action.payload };

    case 'setNote':
      return { ...state, note: action.payload };

    default:
      return state;
  }
}

const ForwardOutgoingDoc = ({
  chuyenXuLy,
  handlers,
  loadHandlers,
  step,
  onClose,
  resetDocuments,
}) => {
  useEffect(() => {
    loadHandlers();
    loadFlow();
  }, []);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  const loadFlow = () => {
    return vbFlowService.findById(step.flowId).then(({ data: flow }) => {
      if (flow.flowType !== FLOW_TYPE.DONG_TRINH) {
        dispatch({ type: 'setNote', payload: 'Kính trình' });
      }
    });
  };

  const submit = async () => {
    Keyboard.dismiss();
    setLoading(true);
    const result = await chuyenXuLy(state);
    setLoading(false);
    if (result) {
      if (DeviceInfo.isTablet()) {
        onClose();
        DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
        resetDocuments();
        DocumentNavigation.goToDuThaoCxl();
      } else {
        NavigationService.pop(2);
      }
    }
  };

  return (
    <View style={styles.viewContainer}>
      <View style={styles.view}>
        <IconField label="Người xử lý" iconName="user" highlight={!!state.handlerId}>
          <HandlerSelectField
            handlers={handlers}
            placeholder="Người xử lý"
            value={state.handlerId}
            onChange={id => dispatch({ type: 'setHandler', payload: id })}
            disabled={loading}
          />
        </IconField>
        <IconField
          wrapperStyle={{ paddingTop: 20 }}
          label="Ý kiến/đề xuất"
          iconName="edit"
          highlight={!!state.note}
        >
          <Textarea
            numberOfLines={4}
            placeholder="-"
            placeholderTextColor={colors.gray}
            value={state.note}
            onChangeText={txt => dispatch({ type: 'setNote', payload: txt })}
            disabled={loading}
          />
        </IconField>
        <Button
          style={[styles.btn, loading ? styles.loadingBtn : null]}
          block
          disabled={!state.handlerId || loading}
          onPress={submit}
        >
          <Text style={styles.text} uppercase={false}>
            {step?.signType === 2 ? 'Ký số và Chuyển xử lý' : 'Chuyển phê duyệt'}
          </Text>
          {loading && <Spinner size="small" color="#fff" />}
        </Button>
      </View>
    </View>
  );
};

ForwardOutgoingDoc.propTypes = {
  chuyenXuLy: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  resetDocuments: PropTypes.func.isRequired,
  handlers: PropTypes.arrayOf(PropTypes.shape()),
  loadHandlers: PropTypes.func,
  step: PropTypes.shape({}),
};
ForwardOutgoingDoc.defaultProps = {
  handlers: [],
  loadHandlers() {},
  step: null,
  onClose() {},
};

export default ForwardOutgoingDoc;
