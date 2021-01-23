import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, StyleSheet, View, Platform } from 'react-native';
import { Button, Text, Textarea } from 'native-base';

import IconField from 'eoffice/components/IconField';
import colors from 'eoffice/utils/colors';
import useModal from 'eoffice/utils/useModal';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import SelectedHandlers from '../common/SelectedHandlers';
import ForwardsHandlersModal from './ForwardsHandlersModal';
import useForwardsReducer from './useForwardsReducer';
import ForwardsResultModal from './ForwardResultModal';
import useResultModal from './useResultModal';
import DocOverview from '../common/DocOverview';
import useForwardsDepReducer from './useForwardsDepReducer';

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

const getSelected = selected => Object.keys(selected).filter(k => selected[k]);

const Forwards = ({
  groupedHandlers,
  loadHandlers,
  docUserView,
  departments,
  chuyenXuLyNhieuVbDen,
  loadDepartments,
}) => {
  // get document visible[0] in listdocument toggle out side list screen
  useEffect(() => {
    const listDoc = getSelected(docUserView);
    loadHandlers({ listDoc });
    loadDepartments({ listDoc });
  }, []);
  const [btnDisable, setBtnDisable] = useState(false);
  const [visibleModalHandlers, openModalHandlers, closeModalHandlers] = useModal(true);
  const [visibleModalResult, openModalResult, closeModalResult] = useModal(false);
  const [state, actions] = useForwardsReducer();
  const [stateDepartments, actionsDepartments] = useForwardsDepReducer();
  const [docStatus, docActions] = useResultModal();
  const submit = async () => {
    await Promise.all(
      Object.keys(docUserView).map(async doc => {
        docActions.addStatus(doc, 'docForward');
        const result = await chuyenXuLyNhieuVbDen({
          data: state,
          doc: JSON.parse(doc),
          dataDept: stateDepartments,
        });
        // const result = true;
        if (result) {
          docActions.addStatus(doc, 'docForwarded');
        } else {
          setBtnDisable(false);
        }
      })
    );
    Keyboard.dismiss();
    openModalResult();
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
      {getSelected(docUserView).map(document => (
        <DocOverview
          key={JSON.parse(document).vbDocUserVbDocProcessId}
          document={JSON.parse(document)}
          isForwards
        />
      ))}
      <View style={{ height: 15 }} />
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
        <Button rounded bordered info style={styles.button} onPress={openModalHandlers}>
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

      <ForwardsResultModal
        state={docStatus}
        chuyenXuLyNhieuVbDen={chuyenXuLyNhieuVbDen}
        dataForwards={state}
        isVisible={visibleModalResult}
        onClose={closeModalResult}
        docUserView={getSelected(docUserView)}
      />

      <ForwardsHandlersModal
        filteredIds={state.all}
        handlersByDept={groupedHandlers}
        isVisible={visibleModalHandlers}
        onClose={closeModalHandlers}
        onSubmit={actions.addHandlers}
        onSubmitDept={actionsDepartments.addHandlers}
        departments={departments}
      />
    </>
  );
};

Forwards.propTypes = {
  chuyenXuLyNhieuVbDen: PropTypes.func.isRequired,

  docUserView: PropTypes.shape({}),
  groupedHandlers: PropTypes.arrayOf(PropTypes.shape({})),
  loadHandlers: PropTypes.func,
  loadDepartments: PropTypes.func,
  departments: PropTypes.arrayOf(PropTypes.shape({})),
};

Forwards.defaultProps = {
  docUserView: [],
  groupedHandlers: [],
  departments: [],
  loadHandlers() {},
  loadDepartments() {},
};

export default Forwards;
