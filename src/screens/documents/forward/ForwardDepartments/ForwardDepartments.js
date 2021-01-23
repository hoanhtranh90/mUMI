import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, View, StyleSheet, Platform } from 'react-native';
import { Button, Text, Textarea } from 'native-base';

import IconField from 'eoffice/components/IconField';
import colors from 'eoffice/utils/colors';
import useModal from 'eoffice/utils/useModal';
import NavigationService from 'eoffice/utils/NavigationService';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import useForwardDepartments from './useForwardDepartments';
import SelectedHandlers from './SelectedHandlers.container';
import IncomingHandlersModal from './IncomingHandlersDeptModal';

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    paddingBottom: variables.isIphoneX ? 58 : 24,
  },
  view: {
    flex: 1,
    paddingTop: 10,
  },
  button: {
    marginTop: 32,
    marginHorizontal: 15,
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

const ForwardDepartments = ({
  canChuyenXuLy,
  chuyenTiep,
  departments,
  loadDepartments,
  groupedHandlers,
}) => {
  const [state, actions] = useForwardDepartments();
  const [visible, open, close] = useModal(true);
  const submit = async () => {
    Keyboard.dismiss();
    const result = await chuyenTiep(state);
    if (result) {
      if (canChuyenXuLy) {
        NavigationService.goBack();
      } else {
        NavigationService.pop(2);
      }
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  return (
    <>
      <SelectedHandlers
        roleName="chủ trì"
        selected={state.chuTri}
        containerStyle={{ paddingBottom: 25 }}
        onRemove={id => actions.remove(id, 'chuTri')}
      />
      <SelectedHandlers
        roleName="phối hợp"
        selected={state.phoiHop}
        containerStyle={{ paddingBottom: 25 }}
        onRemove={id => actions.remove(id, 'phoiHop')}
      />
      <SelectedHandlers
        roleName="nhận để biết"
        selected={state.nhanDeBiet}
        onRemove={id => actions.remove(id, 'nhanDeBiet')}
      />
      <View>
        <Button rounded bordered info style={styles.button} onPress={open}>
          <Text uppercase={false} style={styles.text}>
            Thêm
          </Text>
        </Button>
      </View>
      <View>
        <IconField label="Ý kiến chỉ đạo/đề xuất" iconName="edit" highlight={false}>
          <Textarea
            numberOfLines={4}
            placeholder="-"
            placeholderTextColor={colors.gray}
            value={state.note}
            onChangeText={actions.setNote}
          />
        </IconField>
      </View>
      <View style={styles.viewButton}>
        <Button block onPress={submit} disabled={!state.valid}>
          <Text style={styles.btnText} uppercase={false}>
            Chuyển xử lý
          </Text>
        </Button>
      </View>

      <IncomingHandlersModal
        filteredIds={state.all}
        handlersByDept={groupedHandlers}
        departments={departments}
        isVisible={visible}
        onClose={close}
        onSubmit={actions.addHandlers}
      />
    </>
  );
};

ForwardDepartments.propTypes = {
  canChuyenXuLy: PropTypes.bool.isRequired,
  chuyenTiep: PropTypes.func.isRequired,
  loadDepartments: PropTypes.func.isRequired,
  groupedHandlers: PropTypes.arrayOf(PropTypes.shape()),
  departments: PropTypes.arrayOf(PropTypes.shape({})),
};
ForwardDepartments.defaultProps = {
  groupedHandlers: [],
  departments: [],
};

export default ForwardDepartments;
