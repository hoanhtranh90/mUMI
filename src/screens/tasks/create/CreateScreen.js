import React, { useEffect, useState } from 'react';
import { Button, Container, Content, Form, Icon, Input, Text, Title } from 'native-base';
import {
  Alert,
  BackHandler,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity, FlatList,
} from 'react-native';

import { connect } from 'react-redux';

import { actions, selectors } from '../../../store/tasks/detail';
import { selectors as authSelector } from '../../../store/auth';
import { selectors as listSelector } from '../../../store/tasks/list';
import IconButton from 'eoffice/components/IconButton';
import CustomHeader from 'eoffice/components/CustomHeader';
import colors from 'eoffice/utils/colors';
import NavigationService from 'eoffice/utils/NavigationService';
import IconField from '../../administrative/common/IconField';
import DatePicker from '../../administrative/common/DatePicker';
import Picker from 'eoffice/components/Picker';
import { TASK_PRIORITIES, TASK_TYPES } from '../../../constants/tasks';
import useFileUpload from 'eoffice/utils/useFileUpload';
import { ATTACHMENT_TYPES } from 'eoffice/constants/common';
import AttachmentsCreate from "./AttackmentsCreate";
import {TASK_UPLOAD} from '../../../constants/documents'
import DocumentsModal from "./DocumentsModal";
import CoordinatorsModal from "./CoordinatorsModal";
const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    marginTop: 10,
    paddingBottom: 50,
  },
  input: {
    paddingBottom: 0,
    height: null,
    marginTop: 0,
    paddingTop: 7,
    color: '#2b2d50',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 0,
    alignSelf: 'stretch',
  },
  textarea: {
    ...Platform.select({
      ios: {
        marginTop: 6,
      },
      android: {
        marginTop: 0,
      },
    }),
    fontSize: 16,
    color: colors.darkGray,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    paddingLeft: 0,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: colors.blue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#5386ba',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  btnText: {
    color: 'white',
  },
  btnIcon: {
    color: 'white',
    fontSize: 14,
    marginRight: 5,
  },
  row: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 },

  rowTotal: {
    marginVertical: 10,
    flexDirection: 'row',
    paddingRight: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  label: {
    color: colors.blue,
    fontWeight: 'bold',
    fontSize: 20,
  },

  text: {
    color: colors.blue,
    width: 120,
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'right',
  },
  pickerText: {
    flex: 1,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
  pickerPlaceholder: {
    color: colors.gray,
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
    paddingVertical: 10,
  },
  btnUpload: {
    backgroundColor: 'transparent',
    borderColor: colors.lightBlue,
    height: 36,
    paddingTop: 6,
    paddingRight: 6,
    paddingBottom: 6,
    paddingLeft: 6,
    marginRight: 4,
  },
  titleStyleContent: {
    fontSize: 20,
    color: colors.darkGray,
    fontWeight: 'bold',
  },
});

const CreateScreen = ({
  receiversForTask,
  findReceiversForTask,
  currentUserDeptRole,
  createTask,
  assignersForTask,
  findAllAssignersForTask,
  mode,
}) =>
{
  const [isOpenDoc, setOpenModalDoc] = useState(false)
  const [isOpenCoordinators, setOpenCoordinators] = useState(false)
  const [lstCoordinators, setLstCoordinators] = useState([]);
  const [request, setRequest] = useState({});
  const [priors, setPriors] = useState([]);
  const [lstAttachments, setLstAttachments] = useState([]);
  const [lstDocAttach, setLstDocAttach] = useState([]);
  const [state, actions] = useFileUpload({ objectType: ATTACHMENT_TYPES.TASK });

  const closeModalDoc = () => {
    setOpenModalDoc(false);
  }
  const closeModalCoordinators = () => {
    setOpenCoordinators(false);
  }

  const submit = ({listChecked}) => {
    setLstDocAttach(listChecked)
    setOpenModalDoc(false)
  }

  const submitCoordinators = ({listChecked}) => {
    setLstCoordinators(listChecked)
    setOpenCoordinators(false)
  }

  const setValue = (key, value) => {
    setRequest(val => {
      return {
        ...val,
        [key]: value,
      };
    });
  };

  const selectIcon = (
    <Icon
      name="chevron-down"
      type="Feather"
      style={{ fontSize: 16, color: '#fff', marginRight: 0 }}
    />
  );

  function handleBackPress() {
    NavigationService.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  useEffect(() => {
    const priors = Object.keys(TASK_PRIORITIES).map(key => {
      return {
        id: key,
        label: TASK_PRIORITIES[key].label,
      };
    });
    setPriors(priors);
    findReceiversForTask();
    findAllAssignersForTask();
  }, []);

  const submitRequest = () => {
    if (!request.taskTitle) {
      Alert.alert('Thông báo', 'Chưa nhập tên công việc', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (!request.taskDetail) {
      Alert.alert('Thông báo', 'Chưa nhập mô tả công việc', [{ text: 'Đóng', style: 'destructive' }]);
      return;
    }
    if (!request.startDate) {
      Alert.alert('Thông báo', 'Chưa nhập ngày bắt đầu', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (!request.deadline) {
      Alert.alert('Thông báo', 'Chưa nhập ngày hết hạn', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    // if (!request.manday) {
    //   Alert.alert('Thông báo', 'Chưa nhập nhân công', [
    //     { text: 'Đóng', style: 'destructive' },
    //   ]);
    //   return;
    // }
    if (mode === TASK_TYPES.ASSIGNED && !request.receiverUserDeptRoleId) {
      Alert.alert('Thông báo', 'Chưa nhập người thực hiện ', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }

    if (mode === TASK_TYPES.RECEIVED &&!request.assignerUserDeptRoleId) {
      Alert.alert('Thông báo', 'Chưa nhập người giao việc ', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    let lstIds = []
    if (lstAttachments.length > 0) {
      lstIds = lstAttachments.map(item => item.id)
    }
    let listDocuments = []
    if (lstDocAttach.length > 0) {
      listDocuments = lstDocAttach.map(item => {
        return {
          'docId': item.docId,
          'docCode' : item.docCode,
          'docDate' : item.docDate,
          'docType' : item.vbOutgoingDocId === undefined ? 0 : 1,
          'quote' : item.quote,
        }
      })
    }
    let lstCoordinatorsId = []
    if (lstCoordinators.length > 0) {
      lstCoordinatorsId = lstCoordinators.map(item => {
        return {
          'coordinatorUserDeptRoleId' : item.id
        }
      })
    }
    let submitForm = {
      taskTitle: request.taskTitle,
      taskDetail: request.taskDetail,
      deadline: request.deadline.getTime(),
      startDate: request.startDate.getTime(),
      manday: request.manday ? request.manday : 0,
      priorityId: request.priorityId,
      receiverUserDeptRoleId: mode === TASK_TYPES.RECEIVED ? currentUserDeptRole.id : request.receiverUserDeptRoleId,
      assignerUserDeptRoleId: mode === TASK_TYPES.ASSIGNED ? currentUserDeptRole.id : request.assignerUserDeptRoleId,
      attachmentIds : lstIds,
      docRelationForms: listDocuments,
      coordinatorForms: lstCoordinatorsId,
    };

    createTask(submitForm);
  };

  async function showFilePicker() {
    let res = await actions.upload(false);
    const upload = state.files.pop();
    if (res) {
      if (upload) {
       await setLstAttachments(val => {
          return [
            ...val,
            upload
          ];
        });
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader
        Left={
          <IconButton
            icon="arrow-left"
            iconStyle={{ color: colors.gray }}
            style={styles.grayBg}
            onPress={() => handleBackPress()}
          />
        }
        Content={<Title style={styles.titleStyleContent}>{
          mode === TASK_TYPES.RECEIVED ?
                  'Đăng ký việc' :
                  'Giao việc'}</Title>}
        hasBorder
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView style={{ flex: 1 }}>
          <Form style={styles.form}>
            <IconField label="Tên công việc" iconName="edit" required>
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={request.taskTitle}
                onChangeText={txt => setValue('taskTitle', txt)}
                style={styles.input}
              />
            </IconField>
            <IconField label="Ngày bắt đầu" iconName="clock" required>
              <DatePicker
                mode="date"
                placeholderStyle={styles.pickerPlaceholder}
                style={styles.picker}
                textStyle={styles.pickerText}
                value={request.startDate}
                onChange={date => setValue('startDate', date)}
              />
            </IconField>
            <IconField label="Ngày hoàn thành" iconName="clock" required>
              <DatePicker
                mode="date"
                placeholderStyle={styles.pickerPlaceholder}
                style={styles.picker}
                textStyle={styles.pickerText}
                value={request.deadline}
                onChange={date => setValue('deadline', date)}
              />
            </IconField>

            {mode === TASK_TYPES.RECEIVED && <IconField label="Người giao" iconName="user" required>
              <Picker
                mode="dropdown"
                iosIcon={selectIcon}
                style={styles.picker}
                placeholder="-"
                placeholderStyle={styles.pickerPlaceholder}
                textStyle={styles.pickerText}
                selectedValue={request.assignerUserDeptRoleId}
                onValueChange={val => {
                  setValue('assignerUserDeptRoleId', val);
                }}
                items={assignersForTask.map(data => ({
                  label: data.fullName,
                  value: data.id,
                }))}
              />
            </IconField>}
            {mode === TASK_TYPES.ASSIGNED && <IconField label="Người thực hiện" iconName="user" required>
              <Picker
                mode="dropdown"
                iosIcon={selectIcon}
                style={styles.picker}
                placeholder="-"
                placeholderStyle={styles.pickerPlaceholder}
                textStyle={styles.pickerText}
                selectedValue={request.receiverUserDeptRoleId}
                onValueChange={val => {
                  setValue('receiverUserDeptRoleId', val);
                }}
                items={receiversForTask.map(data => ({
                  label: data.fullName,
                  value: data.id,
                }))}
              />
            </IconField>}
            <TouchableOpacity onPress={() => {
              setOpenCoordinators(true)
            }}>
              <IconField label="Người phối hợp" iconName="user-plus">
                <FlatList
                  style={{marginTop: 8}}
                  contentContainerStyle={{ paddingLeft: 5 }}
                  data={lstCoordinators}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) =>{ return (
                    <Text style={{fontSize: 17, fontWeight: '500', color: colors.darkGray,}} numberOfLines={1}>
                      {item.fullName}
                    </Text>
                  )}}
                  ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                  ListEmptyComponent={
                    <Text style={{ fontSize: 16, color: colors.gray, fontStyle: 'italic' }}>
                      Chưa có người phối hợp
                    </Text>
                  }
                />
              </IconField>
            </TouchableOpacity>
            <IconField label="Nhân công (ngày)" iconName="users">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={request.manday}
                onChangeText={txt => setValue('manday', txt)}
                style={styles.input}
                keyboardType='decimal-pad'
              />
            </IconField>
            <IconField label="Ưu tiên" iconName="alert-circle" required>
              <Picker
                mode="dropdown"
                iosIcon={selectIcon}
                style={styles.picker}
                placeholder="-"
                placeholderStyle={styles.pickerPlaceholder}
                textStyle={styles.pickerText}
                selectedValue={request.priorityId}
                onValueChange={val => {
                  setValue('priorityId', val);
                }}
                items={priors.map(data => ({
                  label: data.label,
                  value: data.id,
                }))}
              />
            </IconField>
            <IconField label="Mô tả" iconName="edit" required>
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={request.taskDetail}
                onChangeText={txt => setValue('taskDetail', txt)}
                style={styles.input}
              />
            </IconField>
            <IconField label="File đính kèm" iconName="file">
              <IconButton
                disabled={state.loading}
                icon="link"
                iconStyle={{ color: state.loading ? colors.lightBlue : colors.blue }}
                style={styles.btnUpload}
                onPress={() => {
                  showFilePicker()
                }}
              />
              <AttachmentsCreate attachments={lstAttachments} mode={TASK_UPLOAD.FILE_UPLOAD}/>
            </IconField>

            <IconField label="Văn bản đính kèm" iconName="file-text">
              <IconButton
                icon="plus-circle"
                iconStyle={{ color: colors.blue }}
                style={styles.btnUpload}
                onPress={() => {
                  setOpenModalDoc(true);
                }}
              />
              <AttachmentsCreate attachments={lstDocAttach} mode={TASK_UPLOAD.DOC_UPLOAD}/>
            </IconField>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
                paddingHorizontal: 20,
              }}
            >
              <Button
                style={[{ flex: 1, justifyContent: 'center' }, styles.btn]}
                onPress={submitRequest}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>Gửi yêu cầu</Text>
              </Button>
            </View>
          </Form>
          {isOpenDoc && <DocumentsModal closeModal={closeModalDoc} isOpen={isOpenDoc} submit={submit}></DocumentsModal>}
          {isOpenCoordinators &&
          <CoordinatorsModal
            closeModal={closeModalCoordinators}
            isOpen={isOpenCoordinators}
            submitCoordinators={submitCoordinators}/>}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = state => ({
  receiversForTask: selectors.receiversForTaskSelector(state),
  assignersForTask: selectors.assignersForTaskSelector(state),
  currentUserDeptRole: authSelector.deptRoleSelector(state),
  mode: listSelector.modeSelector(state),
});

const mapDispatchToProps = {
  findReceiversForTask: actions.findReceiversForTask,
  createTask: actions.createTask,
  findAllAssignersForTask: actions.findAllAssignersForTask,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateScreen);
