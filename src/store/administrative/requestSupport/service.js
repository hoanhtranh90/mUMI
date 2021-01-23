const STATUS = {
  CHO_XU_LY: 1,
  DA_XU_LY: 2,
};
const APPROVE_STATUS = {
  CHO_PHE_dUYET: 1,
  HOANTHANH: 2,
  HUY: 3,
};

let listItem = [];

const getListRequest = async status => {
  return Promise.resolve(listItem.filter(item => item.status === status));
};

export const getProcessedRequest = params => {
  return new Promise(resolve => {
    getListRequest(STATUS.DA_XU_LY).then(data => resolve(data));
  });
};

export const getProcessingRequest = params => {
  return new Promise(resolve => {
    getListRequest(STATUS.CHO_XU_LY).then(data => resolve(data));
  });
};

export const createYC = form => {
  return new Promise(async resolve => {
    listItem.push(form);
    resolve({});
  });
};

export const cancelRequest = ({ id, note }) => {
  return new Promise(async resolve => {
    let request = listItem.find(item => item.id === id);
    request.approveStatus = APPROVE_STATUS.HUY;
    request.status = STATUS.DA_XU_LY;
    request.note = note;
    resolve({});
  });
};

export const approveRequest = id => {
  return new Promise(async resolve => {
    let request = listItem.find(item => item.id === id);
    request.approveStatus = APPROVE_STATUS.HOANTHANH;
    request.status = STATUS.DA_XU_LY;
    resolve({});
  });
};

export const findById = async id => {
  return new Promise(async resolve => {
    resolve(listItem.find(item => item.id === id));
  });
};
