import * as h from '../../../../utils/h';
import { HC_CASE_COMMANDS_USER } from '../../../../constants/common';
import { COMMANDS_STATUS } from '../../../../constants/administrative';
let data = {
  actionNameLabel: null,
  dataJson: null,
  oldHcCaseCommands: null,
  newHcCaseCommands: null,
  oldHcCaseCommandsUsers: null,
  newHcCaseCommandsUsers: null,
  newPhuTrachActors: null,
  oldPhuTrachActors: null,
  hcDocRelations: null,
  oldHcDocRelations: null,
  valueChangeLogs: [],
};
const compareProperty = [
  'phuTrachCap1Id',
  'phuTrachCap2Id',
  'commandsStatus',
  'completeDate',
  'progressImplement',
  'lateReason',
  'hcDocRelations',
];

function getDisplayProperty(property) {
  switch (property) {
    case 'phuTrachCap1Id':
      return 'Lãnh đạo đ/v phụ trách';
    case 'phuTrachCap2Id':
      return 'Chuyên viên đ/v phụ trách';
    case 'commandsStatus':
      return 'Tiến độ xử lý';
    case 'completeDate':
      return 'Ngày hoàn thành';
    case 'progressImplement':
      return 'Báo cáo kết quả thực hiện';
    case 'lateReason':
      return 'Lý do chậm tiến độ';
    case 'hcDocRelations':
      return 'Văn bản liên quan';
    default:
      return '-';
  }
}

function getHcCommandStatusLabel(commandStatus) {
  switch (commandStatus) {
    case COMMANDS_STATUS.COMPLETE:
      return 'Hoàn thành';
    case COMMANDS_STATUS.PROCESSING:
      return 'Đang xử lý';
    case COMMANDS_STATUS.USUALLY:
      return 'Công việc hằng ngày';
    default:
      return '';
  }
}

function populateValueChangeLogsForActor(property, type) {
  let oldActor = h.find(this.oldPhuTrachActors, actor =>
    h.exists(
      this.oldHcCaseCommandsUsers,
      hcCaseCommandsUser =>
        hcCaseCommandsUser.userId === actor.id && hcCaseCommandsUser.type === type
    )
  );
  let newActor = h.find(this.newPhuTrachActors, actor =>
    h.exists(
      this.newHcCaseCommandsUsers,
      hcCaseCommandsUser =>
        hcCaseCommandsUser.userId === actor.id && hcCaseCommandsUser.type === type
    )
  );
  let oldId = oldActor ? oldActor.id : null;
  let newId = newActor ? newActor.id : null;

  if (oldId !== newId) {
    this.valueChangeLogs.push({
      property: property,
      propertyLabel: getDisplayProperty(property),
      oldValue: buildUserDeptRoleViewLabel(oldActor),
      newValue: buildUserDeptRoleViewLabel(newActor),
    });
  }
}

function populateValueChangeLogsForHcDocRelations(property) {
  this.oldHcDocRelations = sortHcDocRelations(this.oldHcDocRelations);
  this.hcDocRelations = sortHcDocRelations(this.hcDocRelations);
  if (isDiffHcDocRelations(this.hcDocRelations, this.oldHcDocRelations)) {
    this.valueChangeLogs.push({
      property: property,
      propertyLabel: getDisplayProperty(property),
      oldValue: buildHcDocRelationsLabel(this.oldHcDocRelations),
      newValue: buildHcDocRelationsLabel(this.hcDocRelations),
    });
  }
}

function sortHcDocRelations(oldHcDocRelations) {
  return oldHcDocRelations.sort((item1, item2) => {
    let createTime1 = new Date(item1.createTime);
    let createTime2 = new Date(item2.createTime);
    let compareResult = createTime1.getTime() - createTime2.getTime();
    return compareResult !== 0 ? compareResult : item1.id.localeCompare(item2.id);
  });
}

function isDiffHcDocRelation(hcDocRelation, oldHcDocRelation) {
  return (
    hcDocRelation.id !== oldHcDocRelation.id ||
    hcDocRelation.referenceObjectId !== oldHcDocRelation.referenceObjectId ||
    hcDocRelation.quote !== oldHcDocRelation.quote ||
    hcDocRelation.docCode !== oldHcDocRelation.docCode ||
    hcDocRelation.docDate !== oldHcDocRelation.docDate
  );
}

function isDiffHcDocRelations(hcDocRelations, oldHcDocRelations) {
  if (hcDocRelations.length !== oldHcDocRelations.length) return true;
  return h.exists(hcDocRelations, (hcDocRelation, index) => {
    let oldHcDocRelation = oldHcDocRelations[index];
    return isDiffHcDocRelation(hcDocRelation, oldHcDocRelation);
  });
}

function buildHcDocRelationsLabel(hcDocRelations) {
  return (
    h.collect(hcDocRelations, hcDocRelation => {
      return [
        hcDocRelation.quote || '-',
        hcDocRelation.docCode || '-',
        h.formatDate(hcDocRelation.docDate) || '-',
      ].join(' | ');
    }) || []
  )
    .join('\n')
    .trim();
}

function buildUserDeptRoleViewLabel(userDeptRoleView) {
  return userDeptRoleView
    ? `${userDeptRoleView.fullName} (${userDeptRoleView.positionName} ${userDeptRoleView.deptName})`
    : null;
}

export const getChangeLogReportSuccess = async data => {
  const dataJson = JSON.parse(data);
  this.oldHcCaseCommands = dataJson.oldHcCaseCommands;
  this.newHcCaseCommands = dataJson.newHcCaseCommands;
  this.oldHcCaseCommandsUsers = dataJson.oldHcCaseCommandsUsers;
  this.newHcCaseCommandsUsers = dataJson.newHcCaseCommandsUsers;
  this.newPhuTrachActors = dataJson.newPhuTrachActors;
  this.oldPhuTrachActors = dataJson.oldPhuTrachActors;
  this.hcDocRelations = dataJson.hcDocRelations || [];
  this.oldHcDocRelations = dataJson.oldHcDocRelations || [];
  this.valueChangeLogs = [];
  await compareProperty.forEach(property => {
    let oldValue;
    let newValue;
    switch (property) {
      case 'phuTrachCap1Id':
        populateValueChangeLogsForActor(property, HC_CASE_COMMANDS_USER.TYPE.PHU_TRACH_CAP1);
        break;
      case 'phuTrachCap2Id':
        populateValueChangeLogsForActor(property, HC_CASE_COMMANDS_USER.TYPE.PHU_TRACH_CAP2);
        break;
      case 'commandsStatus':
        oldValue = this.oldHcCaseCommands[property];
        newValue = this.newHcCaseCommands[property];
        if (oldValue !== newValue) {
          return this.valueChangeLogs.push({
            property: property,
            propertyLabel: getDisplayProperty(property),
            oldValue: getHcCommandStatusLabel(oldValue),
            newValue: getHcCommandStatusLabel(newValue),
          });
        }
        break;
      case 'completeDate':
        oldValue = this.oldHcCaseCommands[property] ? this.oldHcCaseCommands[property] : null;
        newValue = this.newHcCaseCommands[property] ? this.newHcCaseCommands[property] : null;
        if (oldValue !== newValue) {
          return this.valueChangeLogs.push({
            property: property,
            propertyLabel: getDisplayProperty(property),
            oldValue: h.formatDate(oldValue),
            newValue: h.formatDate(newValue),
          });
        }
        break;
      case 'hcDocRelations':
        populateValueChangeLogsForHcDocRelations(property);
        break;
      default:
        oldValue = this.oldHcCaseCommands[property];
        newValue = this.newHcCaseCommands[property];
        if (oldValue !== newValue) {
          return this.valueChangeLogs.push({
            property: property,
            propertyLabel: getDisplayProperty(property),
            oldValue: oldValue,
            newValue: newValue,
          });
        }
    }
  });
  return this.valueChangeLogs;
};
