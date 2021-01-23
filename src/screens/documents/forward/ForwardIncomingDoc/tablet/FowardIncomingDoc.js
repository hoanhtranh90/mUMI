import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { Button, Text, Textarea, Icon } from 'native-base';
import colors from 'eoffice/utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import * as DocumentNavigation from 'eoffice/utils/DocumentNavigation';
import { DOCUMENT_TYPE } from 'eoffice/constants/documents';
import IncomingHandlersTab from './IncomingHandlersTab';
import SelectedHandlers from './SelectedHandlers.container';
import SelectedHandlerDepts from '../../ForwardDepartments/tablet/SelectedHandlers.container';
import useIncomingReducer from '../useIncomingReducer';
import Checkbox from '../../../../../components/Checkbox';
import useForwardDepartments from '../../ForwardDepartments/useForwardDepartments';

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
  btnTxtCancle: {
    fontSize: 17,
    color: 'red',
  },
  text: { fontSize: 15, fontWeight: '600' },
  viewButton: {
    flex: 1,
    justifyContent: 'center',
  },
  leftField: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  rightField: { flex: 2, backgroundColor: '#f8f9fd', paddingHorizontal: 8 },
  field: { backgroundColor: 'white', flex: 1, flexDirection: 'row' },
  headerRightField: {
    flex: 1,
    justifyContent: 'center',
  },
  bodyRightField: { flex: 7 },
  noteField: {
    flex: 2,
    paddingTop: 8,
    paddingRight: 8,
    borderTopColor: colors.lightGray,
    borderTopWidth: 1,
    marginHorizontal: 10,
  },
  txtHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b2d50',
    paddingLeft: 10,
  },
  labelNote: {
    color: '#7a848e',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingTop: 3,
  },
  icon: {
    fontSize: 20,
    color: colors.gray,
    paddingLeft: 15,
  },
  txtAreaNote: {
    backgroundColor: '#f8f9fd',
    marginTop: 14,
    marginLeft: 45,
    marginRight: 10,
    borderBottomWidth: 2,
    borderColor: '#efeff4',
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
  },
  mid: {
    paddingLeft: 18,
    flex: 1,
  },
  txtHeadSelect: {
    fontSize: 13,
    color: '#abb4bd',
    paddingBottom: 10,
  },
});

const ForwardIncomingDoc = ({
  departments,
  loadDepartments,
  chuyenXuLy,
  chuyenTiep,
  groupedHandlers,
  loadHandlers,
  resetDocuments,
  onClose,
  groups,
  loadGroups,
  canChuyenXuLyDonvi,
  canChuyenXuLy,
}) => {
  useEffect(() => {
    loadDepartments();
    loadHandlers({});
    setTimeout(() => {
      loadGroups();
    }, 1500);
  }, []);

  const [btnDisable, setBtnDisable] = useState(false);
  const [state, actions] = useIncomingReducer();
  const [stateDepartments, actionsDepartments] = useForwardDepartments();
  const [roleAll, setRoleAll] = useState(null);
  const departmentRef = useRef({});

  const submit = async () => {
    Keyboard.dismiss();
    if (state.all.size > 0) {
      if (stateDepartments.all.size > 0) {
        await chuyenXuLy({ ...state, awaitCDV: true });
        const result = await chuyenTiep(stateDepartments);
        if (result) {
          if (DeviceInfo.isTablet()) {
            onClose();
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
            resetDocuments();
            DocumentNavigation.goToVbDenCxl();
          }
        } else {
          setBtnDisable(false);
        }
      } else {
        const result = await chuyenXuLy(state);
        if (result) {
          if (DeviceInfo.isTablet()) {
            onClose();
            DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
            resetDocuments();
            DocumentNavigation.goToVbDenCxl();
          }
        } else {
          setBtnDisable(false);
        }
      }
    } else {
      const result = await chuyenTiep(stateDepartments);
      if (result) {
        if (DeviceInfo.isTablet()) {
          onClose();
          DocumentNavigation.goToSummary(DOCUMENT_TYPE.VB_DEN);
          resetDocuments();
          DocumentNavigation.goToVbDenCxl();
        }
      } else {
        setBtnDisable(false);
      }
    }
    //
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
  useEffect(
    () => {
      departmentRef.current = departments.reduce(
        (hash, dept) => ({ ...hash, [dept.id]: dept }),
        {}
      );
    },
    [departments]
  );
  stateDepartments.departmentIds = [];

  return (
    <View style={styles.field}>
      <View style={styles.leftField}>
        {/* {canChuyenXuLy && ( */}
        <IncomingHandlersTab
          groups={groups}
          filteredIds={state.all}
          handlersByDept={groupedHandlers}
          onSubmit={actions.addHandlers}
          onSubmitDept={actionsDepartments.addHandlers}
          filteredIdsDepartment={stateDepartments.all}
          departments={departments}
          canChuyenXuLy={canChuyenXuLy}
          canChuyenXuLyDonvi={canChuyenXuLyDonvi}
        />
      </View>
      <View style={styles.rightField}>
        <View style={styles.headerRightField}>
          <Text style={styles.txtHeader}>Danh sách chuyển xử lý</Text>
        </View>
        <View style={styles.wrap}>
          <View style={{ width: 52 }} />
          <View style={styles.mid} />
          <View style={{ flex: 1.5, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 2.5, alignItems: 'center' }}>
                <Text style={styles.txtHeadSelect}>CHỦ TRÌ</Text>
                <TouchableOpacity
                  onPress={() => {
                    setRoleAll('chuTri');
                  }}
                >
                  <Checkbox checked={!!(roleAll === 'chuTri')} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 2.5, alignItems: 'center' }}>
                <Text style={styles.txtHeadSelect}>PHỐI HỢP</Text>
                <TouchableOpacity
                  onPress={() => {
                    setRoleAll('phoiHop');
                  }}
                >
                  <Checkbox checked={!!(roleAll === 'phoiHop')} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 2.5, alignItems: 'center' }}>
                <Text style={styles.txtHeadSelect}>NHẬN ĐỂ BIẾT</Text>
                <TouchableOpacity
                  onPress={() => {
                    setRoleAll('nhanDeBiet');
                  }}
                >
                  <Checkbox checked={!!(roleAll === 'nhanDeBiet')} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }} />
            </View>
          </View>
        </View>
        <View style={styles.bodyRightField}>
          <ScrollView>
            <SelectedHandlers
              selected={state.all}
              containerStyle={{ paddingBottom: 25 }}
              onChange={(id, role) => {
                if (role !== roleAll) {
                  setRoleAll(null);
                }
                actions.changeRole(id, role);
              }}
              roleAll={roleAll}
              onRemove={(id, role) => actions.remove(id, role)}
            />
            {canChuyenXuLyDonvi && (
              <SelectedHandlerDepts
                selected={stateDepartments.all}
                containerStyle={{ paddingBottom: 25 }}
                onChange={(id, role) => {
                  if (role !== roleAll) {
                    setRoleAll(null);
                  }
                  actionsDepartments.changeRole(id, role);
                }}
                roleAll={roleAll}
                onRemove={(id, role) => actionsDepartments.remove(id, role)}
              />
            )}
          </ScrollView>
        </View>
        <View style={styles.noteField}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="edit" type="Feather" style={styles.icon} />
            <Text style={styles.labelNote}>Ghi chú</Text>
          </View>
          <Textarea
            numberOfLines={6}
            placeholder="-"
            placeholderTextColor={colors.gray}
            value={state.note}
            style={styles.txtAreaNote}
            onChangeText={note => {
              actions.setNote(note);
              actionsDepartments.setNote(note);
            }}
          />
        </View>
        <View style={styles.viewButton}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 3, paddingHorizontal: 8 }}>
              <Button
                block
                onPress={() => {
                  setBtnDisable(true);
                  submit();
                }}
                disabled={checkStateAllValid(!state.valid, !stateDepartments.valid) || btnDisable}
              >
                <Text style={styles.btnText} uppercase={false}>
                  {checkStateAllValid(!state.valid, !stateDepartments.valid)
                    ? 'Chuyển xử lý'
                    : 'Hoàn thành'}
                </Text>
              </Button>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 8 }}>
              <Button block onPress={onClose} style={{ backgroundColor: 'white' }}>
                <Text style={styles.btnTxtCancle} uppercase={false}>
                  Huỷ
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

ForwardIncomingDoc.propTypes = {
  loadDepartments: PropTypes.func.isRequired,
  chuyenXuLy: PropTypes.func.isRequired,
  chuyenTiep: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  resetDocuments: PropTypes.func.isRequired,
  groupedHandlers: PropTypes.arrayOf(PropTypes.shape()),
  loadHandlers: PropTypes.func,
  departments: PropTypes.arrayOf(PropTypes.shape({})),
  canChuyenXuLyDonvi: PropTypes.bool,
  canChuyenXuLy: PropTypes.bool,
  loadGroups: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape()),
};
ForwardIncomingDoc.defaultProps = {
  groupedHandlers: [],
  departments: [],
  loadHandlers() {},
  onClose() {},
  canChuyenXuLyDonvi: true,
  canChuyenXuLy: true,
  groups: [],
};

export default ForwardIncomingDoc;
