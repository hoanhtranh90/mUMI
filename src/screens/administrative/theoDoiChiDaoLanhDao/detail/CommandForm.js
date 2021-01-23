/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { Form, Input, Textarea, Picker, Text, Button, Icon, Spinner } from 'native-base';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import colors from 'eoffice/utils/colors';
import md5 from 'md5';
import { PROGRESS, COMMAND_STATUS } from 'eoffice/constants/administrative';
import useDownload from 'eoffice/utils/useDownload';
import _ from 'lodash';
import styles from './CommandForm.style';
import IconField from '../../common/IconField';
import RoundButton from '../../common/RoundButton';
import DatePicker from '../../common/DatePicker';

const CommandForm = ({
  actionList,
  hcCaseCommand,
  ldDonViList,
  listDVChuTri,
  listUserLDDV,
  listUserCVDV,
  updateChiDao,
  caseMasterIdState,
}) => {
  const [command, setCommand] = useState({});
  const [ldDonVi, setLdDonVi] = useState([]);
  const [dVChuTri, setDVChuTri] = useState([]);
  const [listUserCVDVState, setListUserCVDVState] = useState([]);
  const [itemUserCVDVState, setItemUserCVDVState] = useState([]);
  const [listUserLDDVState, setListUserLDDVState] = useState([]);
  const [itemUserLDDVState, setItemUserLDDVState] = useState([]);
  const [meeting, setMeeting] = useState('');
  const [sector, setSector] = useState('');
  const [commandsDate, setCommandsDate] = useState(null);
  const [finishDate, setFinishDate] = useState(null);
  const [conclusion, setConclusion] = useState('');
  const [directiveId, setDirectiveId] = useState('');
  const [performId, setPerformId] = useState('');
  const [deptId, setDeptId] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [note, setNote] = useState('');
  const [directionContent, setDirectionContent] = useState('');
  const [vanBan, setVanBan] = useState(`${md5(new Date().getTime())}_VanBan.pdf`);
  // const [directionContent, setDirectionContent] = useState('');
  const [downloadState, startDownload] = useDownload({
    attachmentId: hcCaseCommand.attachmentId,
    fileName: vanBan,
    open: true,
    type: 'ORIGINAL',
  });

  async function getLdDonViListA() {
    setLdDonVi(await ldDonViList());
    // console.log('ldDonViListldDonViListldDonViList', await ldDonViList());
    // console.log('listDVChuTrilistDVChuTrilistDVChuTri', await listDVChuTri());
    setDVChuTri(await listDVChuTri());
  }
  useEffect(() => {
    // console.log('aksdkjashdjkashjkdhjsakhdkjahsjkdhjkashd', listUserLDDV);
    // console.log('aksdkjashdjkashjkdhjsakhdkjahsjkdhjkashd', listUserCVDV);
    // console.log(hcCaseCommand);
    // console.log(actionList);
    const cvTmp = [];
    cvTmp[0] = {
      fullName: 'chuyên viên',
      id: 0,
      children: listUserCVDV,
    };
    const itemUserCVDVStateTmp = listUserCVDV.map(itemt => itemt.id);
    setListUserCVDVState(cvTmp);
    setItemUserCVDVState(itemUserCVDVStateTmp);

    const ldTmp = [];
    ldTmp[0] = {
      fullName: 'lãnh đạo',
      id: 0,
      children: listUserLDDV,
    };
    const itemUserLDDVStateTmp = listUserLDDV.map(itemt => itemt.id);
    setListUserLDDVState(ldTmp);
    setItemUserLDDVState(itemUserLDDVStateTmp);

    getLdDonViListA();
    const commandObj = hcCaseCommand;
    if (hcCaseCommand.progress) {
      _.forEach(PROGRESS, obj => {
        if (obj.value === hcCaseCommand.progress) {
          commandObj.progress = obj.text;
        }
      });
    }

    if (hcCaseCommand.commandsStatus) {
      _.forEach(COMMAND_STATUS, obj => {
        if (obj.value === hcCaseCommand.commandsStatus) {
          commandObj.commandsStatus = obj.text;
        }
      });
    }
    commandObj.meeting = hcCaseCommand.meeting;
    commandObj.sector = hcCaseCommand.sector;

    commandObj.conclusion = hcCaseCommand.conclusion;
    commandObj.progressImplement = hcCaseCommand.progressImplement;
    commandObj.directiveId = hcCaseCommand.directiveId;
    commandObj.performId = hcCaseCommand.performId;
    commandObj.deptId = hcCaseCommand.deptId;
    commandObj.directionContent = hcCaseCommand.directionContent;
    commandObj.documentNumber = hcCaseCommand.documentNumber;
    // note
    commandObj.attachmentId = hcCaseCommand.attachmentId;
    commandObj.lateReason = hcCaseCommand.lateReason;
    commandObj.note = hcCaseCommand.note;
    commandObj.status = hcCaseCommand.status;
    commandObj.isDelete = hcCaseCommand.isDelete;
    commandObj.createTime = hcCaseCommand.createTime;
    commandObj.updateTime = hcCaseCommand.updateTime;
    commandObj.state = hcCaseCommand.state;
    commandObj.requestUserId = hcCaseCommand.requestUserId;
    commandObj.requestRoleId = hcCaseCommand.requestRoleId;
    commandObj.requestDeptId = hcCaseCommand.meerequestDeptIdting;
    commandObj.parentDeptId = hcCaseCommand.parentDeptId;

    if (hcCaseCommand.commandsDate) {
      commandObj.commandsDate = new Date(hcCaseCommand.commandsDate);
      setCommandsDate(new Date(hcCaseCommand.commandsDate));
    }

    if (hcCaseCommand.completeDate) {
      commandObj.completeDate = new Date(hcCaseCommand.completeDate);
    }

    if (hcCaseCommand.deadline) {
      commandObj.deadline = new Date(hcCaseCommand.deadline);
      setDeadline(new Date(hcCaseCommand.deadline));
    }

    if (hcCaseCommand.nextDeadline) {
      commandObj.nextDeadline = new Date(hcCaseCommand.nextDeadline);
    }

    if (hcCaseCommand.nextDeadline2) {
      commandObj.nextDeadline2 = new Date(hcCaseCommand.nextDeadline2);
    }

    if (hcCaseCommand.finishDate) {
      commandObj.finishDate = new Date(hcCaseCommand.finishDate);
      setFinishDate(new Date(hcCaseCommand.finishDate));
    }
    setMeeting(hcCaseCommand.meeting);

    setSector(hcCaseCommand.sector);
    setConclusion(hcCaseCommand.conclusion);
    setDirectiveId(hcCaseCommand.directiveId);
    setPerformId(hcCaseCommand.performId);
    setDeptId(hcCaseCommand.deptId);
    setDirectionContent(hcCaseCommand.directionContent);
    setNote(note);
    setCommand(commandObj);
  }, []);

  const updateChiDaoLanhDao = actionCodeTmp => {
    updateChiDao({ directionContent, actionCode: actionCodeTmp, caseMasterId: caseMasterIdState });
  };

  const dowloadCongVan = async () => {
    const dateTmp = new Date();
    const nameFileTmp = `${md5(dateTmp.getTime())}_VanBan.pdf`;
    await setVanBan(nameFileTmp);
    startDownload();
  };
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Form style={styles.form}>
            <Text style={styles.headerTxt}>THÔNG TIN CHỈ ĐẠO</Text>
            <View pointerEvents="none">
              <IconField label="Cuộc họp" iconName="info">
                <Textarea
                  rowSpan={4}
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={meeting}
                  style={styles.textarea}
                  onChangeText={txt => setMeeting(txt)}
                />
              </IconField>
              <IconField label="Lĩnh vực" iconName="layers">
                <Picker
                  mode="dropdown"
                  textStyle={styles.pickerText}
                  style={styles.picker}
                  selectedValue={sector}
                  onValueChange={itemValue => setSector(itemValue)}
                >
                  <Picker.Item value="Kinh doanh" label="Kinh doanh" />
                  <Picker.Item value="Kỹ thuật - Đầu tư" label="Kỹ thuật - Đầu tư" />
                  <Picker.Item value="Quản lý chung" label="Quản lý chung" />
                </Picker>
              </IconField>
              <IconField label="Ngày chỉ đạo" iconName="calendar">
                <DatePicker
                  placeholderStyle={styles.pickerPlaceholder}
                  style={styles.picker}
                  textStyle={styles.pickerText}
                  value={commandsDate}
                  onChange={date => setCommandsDate(date)}
                />
              </IconField>

              <IconField label="Ngày kết thúc chỉ đạo" iconName="calendar">
                <DatePicker
                  placeholderStyle={styles.pickerPlaceholder}
                  style={styles.picker}
                  textStyle={styles.pickerText}
                  value={finishDate}
                  onChange={date => setFinishDate(date)}
                />
              </IconField>

              <IconField label="Nội dung kết luận" iconName="edit">
                <Textarea
                  rowSpan={4}
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={conclusion}
                  style={styles.textarea}
                  onChangeText={txt => setConclusion(txt)}
                />
              </IconField>

              <IconField label="Lãnh đạo chỉ đạo" iconName="user">
                <Picker
                  mode="dropdown"
                  textStyle={styles.pickerText}
                  style={styles.picker}
                  selectedValue={directiveId}
                  onValueChange={itemValue => setDirectiveId(itemValue)}
                >
                  {ldDonVi.map(({ userId, userName }) => (
                    <Picker.Item value={userId} label={userName} />
                  ))}
                </Picker>
              </IconField>

              <IconField label="Lãnh đạo phụ trách" iconName="user-check">
                <Picker
                  mode="dropdown"
                  textStyle={styles.pickerText}
                  style={styles.picker}
                  selectedValue={performId}
                  onValueChange={itemValue => setPerformId(itemValue)}
                >
                  {ldDonVi.map(({ userId, userName }) => (
                    <Picker.Item value={userId} label={userName} />
                  ))}
                </Picker>
              </IconField>

              <IconField label="Đơn vị chủ trì" iconName="users">
                <Picker
                  mode="dropdown"
                  textStyle={styles.pickerText}
                  style={styles.picker}
                  selectedValue={deptId}
                  onValueChange={itemValue => setDeptId(itemValue)}
                >
                  {dVChuTri.map(({ deptName, id }) => (
                    <Picker.Item value={id} label={deptName} />
                  ))}
                </Picker>
              </IconField>

              <IconField label="Thời hạn hoàn thành" iconName="calendar">
                <DatePicker
                  placeholderStyle={styles.pickerPlaceholder}
                  style={styles.picker}
                  textStyle={styles.pickerText}
                  value={deadline}
                  onChange={date => setDeadline(date)}
                />
              </IconField>
            </View>
            <IconField label="Ý kiến chỉ đạo" iconName="info">
              <Textarea
                rowSpan={4}
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={directionContent}
                style={styles.textarea}
                onChangeText={txt => setDirectionContent(txt)}
              />
            </IconField>
            <Text style={styles.headerTxt}>THÔNG TIN BÁO CÁO</Text>
            <View pointerEvents="none">
              <IconField label="Chuyên viên đơn vị phụ trách" iconName="info">
                <View style={{ flex: 1 }}>
                  <SectionedMultiSelect
                    showDropDowns={false}
                    selectedItems={itemUserCVDVState}
                    readOnlyHeadings={false}
                    uniqueKey="id"
                    subKey="children"
                    autoFocus
                    single={false}
                    displayKey="fullName"
                    hideSearch
                    items={listUserCVDVState}
                    animateDropDowns={false}
                  />
                </View>
              </IconField>
              <IconField label="Lãnh đạo đơn vị phụ trách" iconName="info">
                <View style={{ flex: 1 }}>
                  <SectionedMultiSelect
                    showDropDowns={false}
                    selectedItems={itemUserLDDVState}
                    readOnlyHeadings={false}
                    uniqueKey="id"
                    subKey="children"
                    autoFocus
                    single={false}
                    displayKey="fullName"
                    hideSearch
                    items={listUserLDDVState}
                    animateDropDowns={false}
                  />
                </View>
              </IconField>

              <IconField label="Tiến độ xử lý" iconName="activity">
                <Picker
                  mode="dropdown"
                  textStyle={styles.pickerText}
                  style={styles.picker}
                  selectedValue={command.commandsStatus}
                >
                  <Picker.Item key="COMPLETE" label="Hoàn thành" />
                  <Picker.Item key="PROCESSING" label="Đang xử lý " />
                  <Picker.Item key="USUALLY" label="Công việc hằng ngày" />
                </Picker>
              </IconField>

              <IconField label="Ngày hoàn thành" iconName="calendar">
                <DatePicker
                  placeholderStyle={styles.pickerPlaceholder}
                  style={styles.picker}
                  textStyle={styles.pickerText}
                  value={command.completeDate}
                />
              </IconField>
              <IconField label="Công văn thuyết minh" iconName="file">
                <Input
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={command.documentNumber}
                  style={styles.input}
                />
              </IconField>
            </View>
            <Button
              block
              style={styles.btn}
              onPress={dowloadCongVan}
              disabled={downloadState.downloading || downloadState.opening}
            >
              <Text style={styles.btnText} uppercase={false}>
                {downloadState.downloading && 'Đang tải văn bản'}
                {downloadState.opening && 'Đang mở văn bản'}
                {!downloadState.downloading && !downloadState.opening && 'Xem nội dung văn bản'}
              </Text>
              {!downloadState.downloading && <Icon name="eye" style={styles.btnIcon} />}
              {downloadState.downloading && (
                <Spinner size="small" style={styles.btnIcon} color="white" />
              )}
            </Button>
            <View pointerEvents="none">
              <IconField label="Báo cáo tiến độ thực hiện" iconName="corner-up-right">
                <Input
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={command.progressImplement}
                  style={styles.input}
                />
              </IconField>

              <IconField label="Lý do chậm tiến độ" iconName="corner-up-right">
                <Input
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={command.lateReason}
                  style={styles.input}
                />
              </IconField>

              <IconField label="Hạn hoàn thành lần 2" iconName="calendar">
                <DatePicker
                  placeholderStyle={styles.pickerPlaceholder}
                  style={styles.picker}
                  textStyle={styles.pickerText}
                  value={command.nextDeadline}
                />
              </IconField>

              <IconField label="Hạn hoàn thành lần 3" iconName="calendar">
                <DatePicker
                  placeholderStyle={styles.pickerPlaceholder}
                  style={styles.picker}
                  textStyle={styles.pickerText}
                  value={command.nextDeadline2}
                />
              </IconField>
            </View>
            <Text style={styles.headerTxt}>THÔNG TIN ĐÁNH GIÁ</Text>
            <View pointerEvents="none">
              <IconField label="Tiến độ thực hiện" iconName="activity">
                <Picker
                  mode="dropdown"
                  textStyle={styles.pickerText}
                  style={styles.picker}
                  selectedValue={command.progress}
                >
                  <Picker.Item value="ON_TIME" label="Đúng hạn" />
                  <Picker.Item value="LATE" label="Chậm tiến độ" />
                </Picker>
              </IconField>
              <IconField label="Nội dung phản hồi" iconName="info">
                <Input
                  placeholder="-"
                  placeholderTextColor={colors.gray}
                  value={note}
                  style={styles.input}
                  onChangeText={txt => setNote(txt)}
                />
              </IconField>
            </View>
          </Form>
        </View>
      </ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
        {actionList.map((data, index) => (
          <RoundButton
            title={data.actionName}
            color="#fff"
            key={index.toString()}
            titleColor="#007aff"
            onPress={() => updateChiDaoLanhDao(data.actionCode)}
          />
        ))}
      </View>
    </View>
  );
};

CommandForm.propTypes = {
  hcCaseCommand: PropTypes.shape({}),
  actionList: PropTypes.arrayOf(PropTypes.shape({})),
};
CommandForm.defaultProps = {
  hcCaseCommand: {},
  actionList: [],
};

export default CommandForm;
