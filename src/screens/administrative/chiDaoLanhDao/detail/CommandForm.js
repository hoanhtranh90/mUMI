import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { Form, Input, Textarea } from 'native-base';
import colors from 'eoffice/utils/colors';
import { PROGRESS, COMMAND_STATUS } from 'eoffice/constants/administrative';
import _ from 'lodash';
import styles from './CommandForm.style';
import IconField from '../../common/IconField';
import DatePicker from '../../common/DatePicker';

const CommandForm = ({ actionList, hcCaseCommand }) => {
  const [command, setCommand] = useState({});

  useEffect(() => {
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
    if (hcCaseCommand.commandsDate) {
      commandObj.commandsDate = new Date(hcCaseCommand.commandsDate);
    }

    if (hcCaseCommand.completeDate) {
      commandObj.completeDate = new Date(hcCaseCommand.completeDate);
    }

    if (hcCaseCommand.deadline) {
      commandObj.deadline = new Date(hcCaseCommand.deadline);
    }

    if (hcCaseCommand.nextDeadline) {
      commandObj.nextDeadline = new Date(hcCaseCommand.nextDeadline);
    }

    if (hcCaseCommand.nextDeadline2) {
      commandObj.nextDeadline2 = new Date(hcCaseCommand.nextDeadline2);
    }

    if (hcCaseCommand.finishDate) {
      commandObj.finishDate = new Date(hcCaseCommand.finishDate);
    }

    setCommand(commandObj);
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Form style={styles.form}>
            <IconField label="Cuộc họp" iconName="info">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={hcCaseCommand.meeting}
                style={styles.input}
                disabled
              />
            </IconField>
            <IconField label="Lĩnh vực" iconName="layers">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={hcCaseCommand.sector}
                style={styles.input}
                disabled
              />
            </IconField>
            <IconField label="Nội dung kết luận" iconName="edit">
              <Textarea
                rowSpan={4}
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={hcCaseCommand.conclusion}
                disabled
                style={styles.textarea}
              />
            </IconField>

            <IconField label="Tiến độ thực hiện" iconName="corner-up-right">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={hcCaseCommand.progressImplement}
                style={styles.input}
                disabled
              />
            </IconField>

            <IconField label="Lãnh đạo chỉ đạo" iconName="user">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={hcCaseCommand.directiveFullName}
                style={styles.input}
                disabled
              />
            </IconField>
            <IconField label="Lãnh đạo phụ trách" iconName="user-check">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={hcCaseCommand.performFullName}
                style={styles.input}
                disabled
              />
            </IconField>
            <IconField label="Đơn vị chủ trì" iconName="users">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={hcCaseCommand.deptName}
                style={styles.input}
                disabled
              />
            </IconField>

            <IconField label="Hạn hoàn thành" iconName="calendar">
              <DatePicker
                placeholderStyle={styles.pickerPlaceholder}
                style={styles.picker}
                textStyle={styles.pickerText}
                value={command.deadline}
                disabled
              />
            </IconField>

            <IconField label="Ngày chỉ đạo" iconName="calendar">
              <DatePicker
                placeholderStyle={styles.pickerPlaceholder}
                style={styles.picker}
                textStyle={styles.pickerText}
                value={command.commandsDate}
                disabled
              />
            </IconField>

            <IconField label="Nội dung chỉ đạo" iconName="info">
              <Textarea
                rowSpan={4}
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={hcCaseCommand.directionContent}
                disabled
                style={styles.textarea}
              />
            </IconField>
            <IconField label="Tiến độ" iconName="activity">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={command.progress}
                style={styles.input}
                disabled
              />
            </IconField>

            <IconField label="Văn bản thuyết minh" iconName="file">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={hcCaseCommand.documentNumber}
                style={styles.input}
                disabled
              />
            </IconField>

            <IconField label="Trạng thái hoàn thành" iconName="bar-chart">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={command.commandsStatus}
                style={styles.input}
                disabled
              />
            </IconField>

            <IconField label="Ngày kết thúc chỉ đạo" iconName="calendar">
              <DatePicker
                placeholderStyle={styles.pickerPlaceholder}
                style={styles.picker}
                textStyle={styles.pickerText}
                value={command.finishDate}
                disabled
              />
            </IconField>

            <IconField label="Lý do chậm tiến độ" iconName="corner-right-down">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={hcCaseCommand.lateReason}
                style={styles.input}
                disabled
              />
            </IconField>

            {command.nextDeadline && (
              <IconField label="Hạn hoàn thành lần 2" iconName="calendar">
                <DatePicker
                  placeholderStyle={styles.pickerPlaceholder}
                  style={styles.picker}
                  textStyle={styles.pickerText}
                  value={command.nextDeadline}
                  disabled
                />
              </IconField>
            )}

            {command.nextDeadline2 && (
              <IconField label="Hạn hoàn thành lần 3" iconName="calendar">
                <DatePicker
                  placeholderStyle={styles.pickerPlaceholder}
                  style={styles.picker}
                  textStyle={styles.pickerText}
                  value={command.nextDeadline2}
                  disabled
                />
              </IconField>
            )}

            <IconField label="Ngày hoàn thành" iconName="calendar">
              <DatePicker
                placeholderStyle={styles.pickerPlaceholder}
                style={styles.picker}
                textStyle={styles.pickerText}
                value={command.completeDate}
                disabled
              />
            </IconField>

            <IconField label="Ghi chú" iconName="info">
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={hcCaseCommand.note}
                style={styles.input}
                disabled
              />
            </IconField>
          </Form>
        </View>
      </ScrollView>
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
