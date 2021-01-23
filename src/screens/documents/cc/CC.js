import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Text, Button, Textarea } from 'native-base';
import { View, Platform, StyleSheet, Keyboard, NavigatorIOS } from 'react-native';

import colors from 'eoffice/utils/colors';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import NavigationService from 'eoffice/utils/NavigationService';
import IconField from 'eoffice/components/IconField';
import useModal from 'eoffice/utils/useModal';
import SelectedHandlers from './SelectedHandlers';
import CCHandlersModal from './CCHandlersModal';
import useCCReducer from './useCCReducer';
import * as DocumentNavigation from '../../../utils/DocumentNavigation';
import { DOCUMENT_TYPE } from '../../../constants/documents';

const styles = StyleSheet.create({
  button: {
    borderColor: '#dcdce6',
    paddingLeft: 26,
    paddingRight: 26,
    height: 36,
    marginLeft: 73,
  },
  viewButton: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: variables.isIphoneX ? 58 : 24,
  },
  text: { fontSize: 15, fontWeight: '600' },
  btnText: {
    ...Platform.select({
      ios: { fontSize: 17 },
      android: { fontSize: 16 },
    }),
  },
});
const CC = ({ groupedHandlers, ccVanBan, loadHandlers }) => {
  useEffect(() => {
    loadHandlers();
  }, []);

  const [btnDisable, setBtnDisable] = useState(false);
  const [state, actions] = useCCReducer();
  const submit = async () => {
    Keyboard.dismiss();

    const result = await ccVanBan({ note: state.note, users: [...state.users] });
    if (result) {
      // NavigationService.pop(2);
      DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DI);
      DocumentNavigation.goToVbPhatHanh();
    } else {
      setBtnDisable(false);
    }
  };
  const [isVisible, open, close] = useModal(true);

  return (
    <>
      <View style={{ paddingVertical: 15 }}>
        <SelectedHandlers selected={state.users} onRemove={id => actions.remove(id, 'users')} />
        <Button rounded bordered info style={styles.button} onPress={open}>
          <Text uppercase={false} style={styles.text}>
            Thêm
          </Text>
        </Button>
      </View>
      <IconField label="Ý kiến chỉ đạo/đề xuất" iconName="edit" highlight={false}>
        <Textarea
          numberOfLines={4}
          placeholder="-"
          placeholderTextColor={colors.gray}
          value={state.note}
          onChangeText={actions.setNote}
        />
      </IconField>
      <View style={styles.viewButton}>
        <Button
          block
          onPress={() => {
            setBtnDisable(true);
            submit();
          }}
          disabled={!state.valid || btnDisable}
        >
          <Text style={styles.btnText} uppercase={false}>
            Xác Nhận
          </Text>
        </Button>
      </View>
      <CCHandlersModal
        filteredIds={state.users}
        handlersByDept={groupedHandlers}
        isVisible={isVisible}
        onClose={close}
        onSubmit={actions.addHandlers}
      />
    </>
  );
};

CC.propTypes = {
  ccVanBan: PropTypes.func.isRequired,
  groupedHandlers: PropTypes.arrayOf(PropTypes.shape({})),
  loadHandlers: PropTypes.func,
};

CC.defaultProps = {
  groupedHandlers: [],
  loadHandlers() {},
};

export default CC;
