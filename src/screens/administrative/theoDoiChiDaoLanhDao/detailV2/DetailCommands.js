/* eslint-disable import/no-extraneous-dependencies */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Platform, TouchableOpacity, FlatList, Alert} from 'react-native';
import {Button, Form, Icon, Input, Picker, Spinner, Text, Textarea} from "native-base";
import IconField from "../../common/IconField";
import colors from "../../../../utils/colors";
import * as service from '../../../../store/administrative/theoDoiChiDaoLanhDao/service';
import SelectedModal from "./SelectedModal";
import useFileUpload from 'eoffice/utils/useFileUpload';
import { ATTACHMENT_TYPES, HC_CASE_COMMANDS_USER } from 'eoffice/constants/common';
import {COMMANDS_STATUS} from "../../../../constants/administrative";
import {formatDate, formatDateTime} from "../../../../utils/utils";
import {styles} from './DetailCommandsStyles'
import {CHI_DAO_STATE} from "../../../../constants/common";

let type = 'CHUTRI';

const DetailCommands = (
  {
    navigation,
    findAllLanhDao,
    listLD,
    listChuTriPhoiHop,
    findChuTriPhoiHop,
    findEachChuTriPhoiHop,
    listChuTri,
    listPhoiHop,
    getHcCaseCommands,
    hcCaseCommands,
    userDeptRole,
    donViThucHienDept,
    itemDetail,
    findAllSector,
    listSector,
  }
) => {

  const [item, setDetail] = useState(null);
  const [request, setRequest] = useState({});
  const [isOpenModal, setOpenModal] = useState(false);
  const [lstDataVB, setLstDataVB] = useState([]);
  const [lstVB, setLstVB] = useState([]);

  const [lstChuTri, setChuTri] = useState(listChuTri);
  const [lstPhoiHop, setPhoiHop] = useState(listPhoiHop);

  const [lstFile, setLstFile] = useState([]);
  const [state, actions] = useFileUpload({ objectType: ATTACHMENT_TYPES.NOTE_RELATION });

  let color = '#fff';
  let statusColor = '';
  let commandsStatus = '';

  if (item) {
    if (item.state === CHI_DAO_STATE.HOAN_THANH) {
      color = 'rgba(57, 202, 116, 0.2)';
      statusColor = '#39ca74';
      commandsStatus = 'Hoàn thành';
    } else if (item.state === CHI_DAO_STATE.CHO_PHE_DUYET_HOAN_THANH) {
      color = '#d0e7fb';
      statusColor = '#5CA6FC';
      commandsStatus = 'Chờ phê duyệt';
    } else if (item.state === CHI_DAO_STATE.DANG_THUC_HIEN) {
      color = 'rgba(240, 195, 48, 0.2)';
      statusColor = '#f0c330';
      commandsStatus = 'Đang xử lý';
    } else if (item.state === CHI_DAO_STATE.HUY_CHI_DAO) {
      color = '#f5abab';
      statusColor = '#FF0000';
      commandsStatus = 'Huỷ';
    }
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  const submit = ({listChecked}) => {
    switch (type) {
      case "CHUTRI":
        setChuTri(listChecked)
        break
      case "PHOIHOP":
        setPhoiHop(listChecked)
        break
      case "VANBAN":
        setLstVB(listChecked)
        break
    }
    setOpenModal(false)
  }

  const setValue = (key, value) => {
    setRequest(val => {
      return {
        ...val,
        [key]: value,
      };
    });
  };

  useEffect(() => {
    const data = navigation.getParam('detail')
    if (data && data.item) {
      setDetail(data.item)
    } else {
      if (itemDetail) {
        setDetail(itemDetail)
      }
    }
  },[itemDetail])


  useEffect(() => {
    findAllSector()
    findAllLanhDao({item})
    findChuTriPhoiHop({item})
    if (item) {
      getDetail(item)
      getHcCaseCommands({item})
      //getVBLienQuan(item)
    }
  }, [item])


  useEffect(() => {
    if (item && listChuTriPhoiHop) {
      findEachChuTriPhoiHop({item})
    }
  },[listChuTriPhoiHop])

  useEffect(() => {
    setChuTri(listChuTri)
    setPhoiHop(listPhoiHop)
  },[listChuTri,listPhoiHop])


  async function getVBLienQuan(item) {
    if (item.parentDeptId) {
      const lstDocs = await service.getListOutGoingDocs(item.parentDeptId)
      if (lstDocs.length > 0) {
        setLstDataVB(lstDocs)
      }
    }
  }


  function getDetail(item) {
      setValue('meeting', item.meeting)

      setValue('sector', item.sector)

      setValue('commandsDate', item.commandsDate)

      setValue('deadline', item.deadline)

      setValue('conclusion', item.conclusion)

      setValue('directiveFullName', item.directiveFullName)

      setValue('performFullName', item.performFullName)

      setValue('directionContent', item.directionContent)

      setValue('directiveId', item.directiveId)

      setValue('performId', item.performId)

  }

  const submitRequest = () => {
    if (!request.meeting) {
      Alert.alert('Thông báo', 'Tên cuộc họp không được để trống', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (!request.sector) {
      Alert.alert('Thông báo', 'Lĩnh vực không được để trống', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (!request.commandsDate) {
      Alert.alert('Thông báo', 'Ngày chỉ đạo không được để trống', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (!request.conclusion || request.conclusion.isEmpty) {
      Alert.alert('Thông báo', 'Nội dung kết luận không được để trống', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (!request.conclusion || request.conclusion.isEmpty) {
      Alert.alert('Thông báo', 'Nội dung kết luận không được để trống', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (!request.directiveFullName) {
      Alert.alert('Thông báo', 'Lãnh đạo chỉ đạo không được để trống', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (!request.performFullName) {
      Alert.alert('Thông báo', 'Lãnh đạo phụ trách không được để trống', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (lstChuTri.length === 0) {
      Alert.alert('Thông báo', 'Đơn vị chủ trì không được để trống', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }
    if (lstPhoiHop.length === 0) {
      Alert.alert('Thông báo', 'Đơn vị phối hợp không được để trống', [
        { text: 'Đóng', style: 'destructive' },
      ]);
      return;
    }

    let dataDeptForms = [];
    const dataChuTri = lstChuTri.map(item => {
      return {
        deptId: item.deptId,
        processType: 'chuTri'
      }
    })
    dataDeptForms.concat(dataChuTri)
    const dataPhoiHop = lstPhoiHop.map(item => {
      return {
        deptId: item.deptId,
        processType: 'phoiHop'
      }
    })
    dataDeptForms.concat(dataPhoiHop)

    let submitForm = {
      commandsDate: request.commandsDate,
      conclusion: request.conclusion,
      deadline: request.deadline,
      directionContent: request.directionContent,
      finishDate: request.completeDate ? request.completeDate : null,
      meeting: request.meeting,
      sector: request.sector,
      directiveId: request.directiveId,
      performId: request.performId,
      // docRelationForms
      deptForms: dataDeptForms,
    };

  };

  async function showFilePicker() {
    let res = await actions.upload(false);
    const upload = state.files.pop();
    if (res) {
      if (upload) {
        await setLstFile(val => {
          return [
            ...val,
            upload
          ];
        });
      }
    }
  }

  function getHcCommandStatusLabel(commandStatus) {
    switch (commandStatus) {
      case COMMANDS_STATUS.COMPLETE:
        return "Hoàn thành";
      case COMMANDS_STATUS.PROCESSING:
        return "Đang xử lý";
      case COMMANDS_STATUS.USUALLY:
        return "Công việc hằng ngày";
      default:
        return "";
    }
  }

  function getStateLabel(hcCaseCommands) {
    if (hcCaseCommands) {
      if (hcCaseCommands.deadline > hcCaseCommands.completeDate) {
        return "Trước hạn";
      } else if (hcCaseCommands.deadline < hcCaseCommands.completeDate) {
        return "Quá hạn";
      } else {
        return "Đúng hạn";
      }
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={styles.container}>
          <Form style={styles.form}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={[styles.wrapperStatus, { backgroundColor: color }]}>
                <Text style={[styles.status, { color: statusColor }]}>{commandsStatus}</Text>
              </View>
              {(hcCaseCommands && hcCaseCommands.isDuplicate) ?
                <View style={[styles.wrapperStatus, { backgroundColor: 'rgba(132,104,4,0.2)' }]}>
                  <Text style={[styles.status, { color: 'rgb(136,119,10)' }]}>Trùng chỉ đạo</Text>
                </View> : <View></View>
              }
              {(hcCaseCommands &&
                hcCaseCommands.deadline &&
                hcCaseCommands.completeDate) ?
                <View style={[styles.wrapperStatus, { backgroundColor: '#f5abab' }]}>
                  <Text style={[styles.status, { color: '#FF0000' }]}>{getStateLabel(hcCaseCommands)}</Text>
                </View> : <View></View>
              }
            </View>
            <Text style={styles.headerTxt}>Thông tin chỉ đạo</Text>
            <IconField label="Cuộc họp" iconName="info" >
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={request.meeting}
                onChangeText={meeting => setValue('meeting', meeting)}
                style={styles.input}
                editable={false}
              />
            </IconField>
            <IconField label="Lĩnh vực" iconName="layers" >
              <Picker
                mode="dropdown"
                textStyle={styles.pickerText}
                style={styles.picker}
                selectedValue={request.sector}
                placeholder="-"
                placeholderStyle={styles.pickerPlaceholder}
                onValueChange={itemValue => setValue('sector',itemValue)}
                enabled={false}
              >
                {listSector && listSector.map(item => (
                  <Picker.Item
                    value={item.value} label={item.label}
                  />
                ))}
              </Picker>
            </IconField>
            <IconField label="Ngày chỉ đạo" iconName="clock" >
              {/*<DatePicker*/}
              {/*  mode="date"*/}
              {/*  placeholderStyle={styles.pickerPlaceholder}*/}
              {/*  style={styles.picker}*/}
              {/*  textStyle={styles.pickerText}*/}
              {/*  value={request.commandsDate}*/}
              {/*  onChange={date => setValue('commandsDate', date)}*/}
              {/*/>*/}
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={request && request.commandsDate ? formatDate(new Date(request.commandsDate)) : ''}
                style={styles.input}
                editable={false}
              />
            </IconField>
            {/*{item && item.completeDate && <IconField label="Ngày kết thúc chỉ đạo" iconName="clock" >*/}
            {/*  <DatePicker*/}
            {/*    mode="date"*/}
            {/*    placeholderStyle={styles.pickerPlaceholder}*/}
            {/*    style={styles.picker}*/}
            {/*    textStyle={styles.pickerText}*/}
            {/*    value={request.completeDate}*/}
            {/*    onChange={date => setValue('completeDate', date)}*/}
            {/*  />*/}
            {/*</IconField>}*/}
            <IconField label="Nội dung kết luận" iconName="info" >
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={request.conclusion}
                onChangeText={conclusion => setValue('conclusion', conclusion)}
                style={styles.input}
                editable={false}
              />
            </IconField>
            <IconField label="Lãnh đạo chỉ đạo" iconName="layers" >
              {/*<Picker*/}
              {/*  mode="dropdown"*/}
              {/*  textStyle={styles.pickerText}*/}
              {/*  style={styles.picker}*/}
              {/*  selectedValue={request.directiveFullName}*/}
              {/*  placeholder="-"*/}
              {/*  placeholderStyle={styles.pickerPlaceholder}*/}
              {/*  onValueChange={itemValue => setValue('directiveFullName',itemValue)}*/}
              {/*  enabled={false}*/}
              {/*>*/}
              {/*  {listLD && listLD.map(item => {*/}
              {/*    return <Picker.Item value={item.fullName} label={item.fullName} />*/}
              {/*  })}*/}
              {/*</Picker>*/}
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={request.directiveFullName}
                style={styles.input}
                editable={false}
              />
            </IconField>
            <IconField label="Lãnh đạo phụ trách" iconName="layers" >
              {/*<Picker*/}
              {/*  mode="dropdown"*/}
              {/*  textStyle={styles.pickerText}*/}
              {/*  style={styles.picker}*/}
              {/*  selectedValue={request.performFullName}*/}
              {/*  placeholder="-"*/}
              {/*  placeholderStyle={styles.pickerPlaceholder}*/}
              {/*  onValueChange={itemValue => setValue('performFullName',itemValue)}*/}
              {/*  enabled={false}*/}
              {/*>*/}
              {/*  {listLD && listLD.map(item => {*/}
              {/*    return <Picker.Item value={item.fullName} label={item.fullName} />*/}
              {/*  })}*/}

              {/*</Picker>*/}
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={request.performFullName}
                style={styles.input}
                editable={false}
              />
            </IconField>
            {/*<TouchableOpacity onPress={() => {*/}
            {/*  type = 'CHUTRI'*/}
            {/*  //setOpenModal(true)*/}
            {/*}}>*/}
            <IconField label="Đơn vị chủ trì" iconName="user-plus" >
              <FlatList
                style={{marginTop: 8}}
                contentContainerStyle={{ paddingLeft: 5 }}
                data={lstChuTri}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>{ return (
                  <Text style={{fontSize: 17, fontWeight: '500', color: colors.darkGray,}} numberOfLines={1}>
                    {item.deptName}
                  </Text>
                )}}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                ListEmptyComponent={
                  <Text style={{ fontSize: 16, color: colors.gray, fontStyle: 'italic' }}>
                    Chưa có đơn vị chủ trì
                  </Text>
                }
              />
            </IconField>
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity onPress={() => {*/}
            {/*  type = 'PHOIHOP'*/}
            {/*  //setOpenModal(true)*/}
            {/*}}>*/}
            <IconField label="Đơn vị phối hợp" iconName="user-plus" >
              <FlatList
                style={{marginTop: 8}}
                contentContainerStyle={{ paddingLeft: 5 }}
                data={lstPhoiHop}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>{ return (
                  <Text style={{fontSize: 17, fontWeight: '500', color: colors.darkGray,}} numberOfLines={1}>
                    {item.deptName}
                  </Text>
                )}}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                ListEmptyComponent={
                  <Text style={{ fontSize: 16, color: colors.gray, fontStyle: 'italic' }}>
                    Chưa có đơn vị phối hợp
                  </Text>
                }
              />
            </IconField>
            {/*</TouchableOpacity>*/}
            <IconField label="Thời hạn hoàn thành" iconName="clock" >
              {/*<DatePicker*/}
              {/*  mode="date"*/}
              {/*  placeholderStyle={styles.pickerPlaceholder}*/}
              {/*  style={styles.picker}*/}
              {/*  textStyle={styles.pickerText}*/}
              {/*  value={hcCaseCommands.deadline}*/}
              {/*  onChange={date => setValue('deadline', date)}*/}
              {/*/>*/}
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={hcCaseCommands && hcCaseCommands.deadline ? formatDate(new Date(hcCaseCommands.deadline)) : ''}
                style={styles.input}
                editable={false}
              />
            </IconField>
            <IconField label="Ý kiến chỉ đạo" iconName="info" >
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={request.directionContent}
                onChangeText={directionContent => setValue('directionContent', directionContent)}
                style={styles.input}
                editable={false}
              />
            </IconField>
            {/*<Text style={styles.headerTxt}>CÔNG VĂN LIÊN QUAN</Text>*/}
            {/*<IconField label="File đính kèm" iconName="file">*/}
            {/*  <IconButton*/}
            {/*    disabled={state.loading}*/}
            {/*    icon="link"*/}
            {/*    iconStyle={{ color: state.loading ? colors.lightBlue : colors.blue }}*/}
            {/*    style={styles.btnUpload}*/}
            {/*    onPress={() => {*/}
            {/*      showFilePicker()*/}
            {/*    }}*/}
            {/*  />*/}
            {/*  <Attachments attachments={lstFile} mode={TASK_UPLOAD.FILE_UPLOAD}/>*/}
            {/*</IconField>*/}

            {/*<IconField label="Văn bản đính kèm" iconName="file-text">*/}
            {/*  <IconButton*/}
            {/*    icon="plus-circle"*/}
            {/*    iconStyle={{ color: colors.blue }}*/}
            {/*    style={styles.btnUpload}*/}
            {/*    onPress={() => {*/}
            {/*      type = 'VANBAN'*/}
            {/*      setOpenModal(true)*/}
            {/*    }}*/}
            {/*  />*/}
            {/*  <Attachments attachments={lstVB} mode={TASK_UPLOAD.DOC_UPLOAD}/>*/}
            {/*</IconField>*/}
            {/*<View*/}
            {/*  style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 50,*/}
            {/*    paddingHorizontal: 20,*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <Button*/}
            {/*    style={[{ flex: 1, justifyContent: 'center' }, styles.btn]}*/}
            {/*    onPress={submitRequest}*/}
            {/*  >*/}
            {/*    <Text style={{ color: 'white', fontSize: 20 }}>{item ? 'Cập nhật' : 'Thêm mới'}</Text>*/}
            {/*  </Button>*/}
            {/*</View>*/}
            {hcCaseCommands && hcCaseCommands.commandsStatus &&
            <View>
              <Text style={styles.headerTxt}>Báo cáo của đơn vị{" "}
                {donViThucHienDept ? donViThucHienDept.deptName : ""}</Text>
              <IconField label="Lãnh đạo đ/v phụ trách" iconName="user" >
                <Input
                  multiline
                  numberOfLines={3}
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={userDeptRole[0] ? `${userDeptRole[0].fullName} (${
                    userDeptRole[0].positionName
                  } - ${userDeptRole[0].deptName})` : '-'}
                  style={styles.input}
                  editable={false}
                />
              </IconField>
              <IconField label="Chuyên viên đ/v phụ trách" iconName="user" >
                <Input
                  multiline
                  numberOfLines={3}
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={userDeptRole[1] ? `${userDeptRole[1].fullName} (${
                    userDeptRole[1].positionName
                  } - ${userDeptRole[1].deptName})` : '-'}
                  style={styles.input}
                  editable={false}
                />
              </IconField>
              <IconField label="Tiến độ xử lý" iconName="user" >
                <Input
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={hcCaseCommands
                    ? getHcCommandStatusLabel(hcCaseCommands.commandsStatus)
                    : "-"}
                  style={styles.input}
                  editable={false}
                />
              </IconField>
              <IconField label="Ngày hoàn thành" iconName="clock" >
                {/*<DatePicker*/}
                {/*  mode="date"*/}
                {/*  placeholderStyle={styles.pickerPlaceholder}*/}
                {/*  style={styles.picker}*/}
                {/*  textStyle={styles.pickerText}*/}
                {/*  value={(hcCaseCommands ? hcCaseCommands.completeDate : null)}*/}
                {/*/>*/}
                <Input
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={(hcCaseCommands && hcCaseCommands.completeDate ?
                    formatDate(new Date(hcCaseCommands.completeDate)) : '-')}
                  style={styles.input}
                  editable={false}
                />
              </IconField>
              <IconField label="Báo cáo tiến độ thực hiện" iconName="user" >
                <Input
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={hcCaseCommands ? hcCaseCommands.progressImplement : "-"}
                  style={styles.input}
                  editable={false}
                />
              </IconField>
              <IconField label="Ngày gia hạn hoàn thành" iconName="clock" >
                {/*<DatePicker*/}
                {/*  mode="date"*/}
                {/*  placeholderStyle={styles.pickerPlaceholder}*/}
                {/*  style={styles.picker}*/}
                {/*  textStyle={styles.pickerText}*/}
                {/*  value={hcCaseCommands*/}
                {/*    ? hcCaseCommands.nextDeadline2 ||*/}
                {/*    hcCaseCommands.nextDeadline*/}
                {/*    : null}*/}
                {/*/>*/}
                <Input
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={hcCaseCommands
                    ? (hcCaseCommands.nextDeadline2 ? formatDate(new Date(hcCaseCommands.nextDeadline2)) : '-') ||
                    (hcCaseCommands.nextDeadline ? formatDate(new Date(hcCaseCommands.nextDeadline)) : '-')
                    : '-'}
                  style={styles.input}
                  editable={false}
                />
              </IconField>
              <IconField label="Lý do chậm tiến độ" iconName="info" >
                <Input
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={hcCaseCommands ? hcCaseCommands.lateReason : "-" }
                  style={styles.input}
                  editable={false}
                />
              </IconField>
            </View>
            }
          </Form>
          {isOpenModal
          && <SelectedModal closeModal={closeModal}
                            isOpen={isOpenModal} submit={submit}
                            list={type === 'VANBAN' ? lstDataVB : listChuTriPhoiHop}
                            type={type}>
          </SelectedModal>}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailCommands;
