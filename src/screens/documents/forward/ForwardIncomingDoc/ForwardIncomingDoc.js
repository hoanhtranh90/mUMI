import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, StyleSheet, View, Platform } from 'react-native';
import { Button, Text, Textarea } from 'native-base';

import IconField from 'eoffice/components/IconField';
import colors from 'eoffice/utils/colors';
import useModal from 'eoffice/utils/useModal';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import * as DocumentNavigation from 'eoffice/utils/DocumentNavigation';
import SelectedHandlers from './SelectedHandlers.container';
import IncomingHandlersModal from './IncomingHandlersModal';
import useIncomingReducer from './useIncomingReducer';
import useForwardDepartments from '../ForwardDepartments/useForwardDepartments';
import { DOCUMENT_TYPE } from '../../../../constants/documents';

const styles = StyleSheet.create({
  button: {
    borderColor: '#dcdce6',
    paddingLeft: 26,
    paddingRight: 26,
    height: 36,
    marginTop: 10,
    marginBottom: 25,
    marginLeft: 73,
  },
  btnText: {
    ...Platform.select({
      ios: { fontSize: 17 },
      android: { fontSize: 16 },
    }),
  },
  text: { fontSize: 15, fontWeight: '600' },
  viewButton: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: variables.isIphoneX ? 58 : 24,
  },
});

const ForwardIncomingDoc = ({
  canChuyenXuLyDonvi,
  chuyenXuLy,
  chuyenTiep,
  groupedHandlers,
  resetDocuments,
  loadHandlers,
  loadGroups,
  groups,
  loadDepartments,
  canChuyenXuLy,
  departments,
}) => {
  const [btnDisable, setBtnDisable] = useState(false);
  const [state, actions] = useIncomingReducer();
  const [stateDepartments, actionsDepartments] = useForwardDepartments();
  const [visible, open, close] = useModal(true);
  useEffect(() => {
    loadDepartments();
    loadHandlers({});
    setTimeout(() => {
      loadGroups();
    }, 1000);
  }, []);

  const submit = async () => {
    Keyboard.dismiss();
    if (state.all.size > 0) {
      if (stateDepartments.all.size > 0) {
        await chuyenXuLy({ ...state, awaitCDV: true });
        const result = await chuyenTiep(stateDepartments);
        if (result) {
          DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
          resetDocuments();
          DocumentNavigation.goToVbDenCxl();
        } else {
          setBtnDisable(false);
        }
      } else {
        const result = await chuyenXuLy(state);
        if (result) {
          DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
          resetDocuments();
          DocumentNavigation.goToVbDenCxl();
        } else {
          setBtnDisable(false);
        }
      }
    } else {
      const result = await chuyenTiep(stateDepartments);
      if (result) {
        DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
        resetDocuments();
        DocumentNavigation.goToVbDenCxl();
      } else {
        setBtnDisable(false);
      }
    }
  };

  const checkStateAllValid = (stateValid, stateDepartmentsValid) => {
    if (stateValid === false) {
      return stateValid;
    }
    if (stateDepartmentsValid === false) {
      return stateDepartmentsValid;
    }
    return true;
  };

  return (
    <>
      <SelectedHandlers
        roleName="chủ trì"
        selected={state.chuTri}
        selectedDept={stateDepartments.chuTri}
        containerStyle={{ paddingBottom: 25 }}
        onRemove={id => actions.remove(id, 'chuTri')}
        onRemoveDept={id => actionsDepartments.remove(id, 'chuTri')}
      />
      <SelectedHandlers
        roleName="phối hợp"
        selected={state.phoiHop}
        selectedDept={stateDepartments.phoiHop}
        containerStyle={{ paddingBottom: 25 }}
        onRemove={id => actions.remove(id, 'phoiHop')}
        onRemoveDept={id => actionsDepartments.remove(id, 'phoiHop')}
      />
      <SelectedHandlers
        roleName="nhận để biết"
        selectedDept={stateDepartments.nhanDeBiet}
        selected={state.nhanDeBiet}
        onRemove={id => actions.remove(id, 'nhanDeBiet')}
        onRemoveDept={id => actionsDepartments.remove(id, 'nhanDeBiet')}
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
            onChangeText={txt => {
              actions.setNote(txt);
              actionsDepartments.setNote(txt);
            }}
          />
        </IconField>
      </View>
      <View style={styles.viewButton}>
        <Button
          block
          onPress={() => {
            setBtnDisable(true);
            submit();
          }}
          disabled={checkStateAllValid(!state.valid, !stateDepartments.valid) || btnDisable}
        >
          <Text style={styles.btnText} uppercase={false}>
            Chuyển xử lý
          </Text>
        </Button>
      </View>

      <IncomingHandlersModal
        groups={groups}
        filteredIds={state.all}
        handlersByDept={groupedHandlers}
        isVisible={visible}
        onClose={close}
        onSubmit={actions.addHandlers}
        onSubmitDept={actionsDepartments.addHandlers}
        filteredIdsDepartment={stateDepartments.all}
        departments={departments}
        canChuyenXuLy={canChuyenXuLy}
        canChuyenXuLyDonvi={canChuyenXuLyDonvi}
      />
    </>
  );
};

ForwardIncomingDoc.propTypes = {
  chuyenXuLy: PropTypes.func.isRequired,
  canChuyenXuLyDonvi: PropTypes.bool,
  canChuyenXuLy: PropTypes.bool,
  chuyenTiep: PropTypes.func.isRequired,
  groupedHandlers: PropTypes.arrayOf(PropTypes.shape()),
  loadHandlers: PropTypes.func,
  resetDocuments: PropTypes.func.isRequired,
  loadDepartments: PropTypes.func,
  departments: PropTypes.arrayOf(PropTypes.shape({})),
  loadGroups: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape()),
};
ForwardIncomingDoc.defaultProps = {
  groupedHandlers: [],
  departments: [],
  loadDepartments() {},
  loadHandlers() {},
  canChuyenXuLyDonvi: true,
  canChuyenXuLy: true,
  groups: [],
};

export default ForwardIncomingDoc;
