import {PROCESS_TYPE} from "../../../../constants/common";
import * as h from "../../../../utils/h";
import {getHcCommandSectorName} from "../../../../utils/utils";

let data = {
  actionNameLabel: null,
  dataJson: null,
  oldHcCaseCommandsCommon: null,
  newHcCaseCommandsCommon: null,
  hcCaseCommandsList: null,
  oldHcCaseCommandsList: null,
  oldDirectiveActor: null,
  oldPerformActor: null,
  directiveActor: null,
  performActor: null,
  thucHienDepartments: null,
  oldThucHienDepartments: null,
  newDeadline: null,
  oldDeadline: null,
  hcDocRelations: null,
  oldHcDocRelations: null,
  valueChangeLogs: [],
}

function getDisplayProperty(property) {
  switch (property) {
    case "meeting":
      return "Cuộc họp";
    case "sector":
      return "Lĩnh vực";
    case "commandsDate":
      return "Ngày chỉ đạo";
    case "conclusion":
      return "Nội dung kết luận";
    case "directiveId":
      return "Lãnh đạo chỉ đạo";
    case "performId":
      return "Lãnh đạo phụ trách";
    case "deadline":
      return "Thời hạn hoàn thành";
    case "directionContent":
      return "Ý kiến chỉ đạo";
    case "chuTriDepts":
      return "Đơn vị chủ trì";
    case "phoiHopDepts":
      return "Đơn vị phối hợp";
    case "hcDocRelations":
      return "Văn bản liên quan";
    default:
      return "-";
  }
}

const compareProperty = [
  "meeting",
  "sector",
  "commandsDate",
  "conclusion",
  "directiveId",
  "performId",
  "deadline",
  "directionContent",
  "chuTriDepts",
  "phoiHopDepts",
  "hcDocRelations",
]

function populateValueChangeLogsForActor(property) {
  let oldId;
  let newId;
  let oldActor;
  let newActor;
  switch (property) {
    case "directiveId":
      oldId = this.oldDirectiveActor ? this.oldDirectiveActor.id : null;
      newId = this.directiveActor ? this.directiveActor.id : null;
      oldActor = this.oldDirectiveActor;
      newActor = this.directiveActor;
      break;
    case "performId":
      oldId = this.oldPerformActor ? this.oldPerformActor.id : null;
      newId = this.performActor ? this.performActor.id : null;
      oldActor = this.oldPerformActor;
      newActor = this.performActor;
      break;
  }
  if (oldId !== newId) {
    this.valueChangeLogs.push({
      property: property,
      propertyLabel: getDisplayProperty(property),
      oldValue: buildUserDeptRoleViewLabel(oldActor),
      newValue: buildUserDeptRoleViewLabel(newActor)
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
      newValue: buildHcDocRelationsLabel(this.hcDocRelations)
    });
  }
}

function sortHcDocRelations(oldHcDocRelations) {
  return oldHcDocRelations.sort((item1, item2) => {
    let createTime1 = new Date(item1.createTime);
    let createTime2 = new Date(item2.createTime);
    let compareResult = createTime1.getTime() - createTime2.getTime();
    return compareResult !== 0
      ? compareResult
      : item1.id.localeCompare(item2.id);
  });
}

function isDiffHcDocRelation(hcDocRelation, oldHcDocRelation) {
  return (
    hcDocRelation.id !== oldHcDocRelation.id ||
    hcDocRelation.referenceObjectId !==
    oldHcDocRelation.referenceObjectId ||
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
        hcDocRelation.quote || "-",
        hcDocRelation.docCode || "-",
        h.formatDate(hcDocRelation.docDate) || "-"
      ].join(" | ");
    }) || []
  )
    .join("\n")
    .trim();
}

function buildUserDeptRoleViewLabel(userDeptRoleView) {
  return userDeptRoleView
    ? `${userDeptRoleView.fullName} (${userDeptRoleView.positionName} ${
      userDeptRoleView.deptName
    })`
    : null;
}

function populateValueChangeLogsForThucHienDepts(property) {
  let processType;
  switch (property) {
    case "chuTriDepts":
      processType = PROCESS_TYPE.CHU_TRI;
      break;
    case "phoiHopDepts":
      processType = PROCESS_TYPE.PHOI_HOP;
      break;
  }

  let oldDepartments = h.findAll(this.oldThucHienDepartments, dept =>
    h.exists(
      this.oldHcCaseCommandsList,
      hcCaseCommands =>
        hcCaseCommands.deptId === dept.id &&
        hcCaseCommands.processType === processType
    )
  );

  let departments = h.findAll(this.thucHienDepartments, dept =>
    h.exists(
      this.hcCaseCommandsList,
      hcCaseCommands =>
        hcCaseCommands.deptId === dept.id &&
        hcCaseCommands.processType === processType
    )
  );

  let oldValue = (h.collect(oldDepartments, dept => dept.deptName) || [])
    .join("\n")
    .trim();

  let newValue = (h.collect(departments, dept => dept.deptName) || [])
    .join("\n")
    .trim();

  if (oldValue !== newValue) {
    this.valueChangeLogs.push({
      property: property,
      propertyLabel: getDisplayProperty(property),
      oldValue: oldValue,
      newValue: newValue
    });
  }
}


export const getChangeLog = async (data, listSector) => {
  const dataJson = JSON.parse(data);
  this.oldHcCaseCommandsCommon =  dataJson.oldHcCaseCommandsCommon;
  this.newHcCaseCommandsCommon =  dataJson.newHcCaseCommandsCommon;
  this.hcCaseCommandsList =  dataJson.hcCaseCommandsList;
  this.oldHcCaseCommandsList =  dataJson.oldHcCaseCommandsList;
  this.oldDirectiveActor =  dataJson.oldDirectiveActor;
  this.oldPerformActor =  dataJson.oldPerformActor;
  this.directiveActor =  dataJson.directiveActor;
  this.performActor =  dataJson.performActor;
  this.thucHienDepartments =  dataJson.thucHienDepartments;
  this.oldThucHienDepartments =  dataJson.oldThucHienDepartments;
  this.newDeadline =  dataJson.newDeadline;
  this.oldDeadline =  dataJson.oldDeadline;
  this.hcDocRelations = dataJson.hcDocRelations || [];
  this.oldHcDocRelations = dataJson.oldHcDocRelations || [];
  this.valueChangeLogs = [];
  await compareProperty.forEach(property => {
    switch (property) {
      case "deadline":
        if (this.oldDeadline !== this.newDeadline) {
          this.valueChangeLogs.push({
            property: property,
            propertyLabel: getDisplayProperty(property),
            oldValue: h.formatDate(this.oldDeadline),
            newValue: h.formatDate(this.newDeadline)
          });
        }
        break;
      case "directiveId":
      case "performId":
        populateValueChangeLogsForActor(property);
        break;
      case "chuTriDepts":
      case "phoiHopDepts":
        populateValueChangeLogsForThucHienDepts(property);
        break;
      case "hcDocRelations":
        populateValueChangeLogsForHcDocRelations(property);
        break;
      case "commandsDate":
        let oldV= this.oldHcCaseCommandsCommon[property];
        let newV = this.newHcCaseCommandsCommon[property];
        if (oldV !== newV) {
          this.valueChangeLogs.push({
            property: property,
            propertyLabel: getDisplayProperty(property),
            oldValue: h.formatDate(oldV),
            newValue: h.formatDate(newV)
          });
        }
        break;
      case "sector":
        oldValue = this.oldHcCaseCommandsCommon[property];
        newValue = this.newHcCaseCommandsCommon[property];
        if (oldValue !== newValue) {
          return this.valueChangeLogs.push({
            property: property,
            propertyLabel: getDisplayProperty(property),
            oldValue: getHcCommandSectorName(oldValue, listSector),
            newValue: getHcCommandSectorName(newValue, listSector)
          });
        }
        break;
      default:
        let oldValue = this.oldHcCaseCommandsCommon[property];
        let newValue = this.newHcCaseCommandsCommon[property];
        if (oldValue !== newValue) {
          this.valueChangeLogs.push({
            property: property,
            propertyLabel: getDisplayProperty(property),
            oldValue: oldValue,
            newValue: newValue
          });
        }
        break;
    }
  })
  return this.valueChangeLogs;
}



