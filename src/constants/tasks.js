import colors from '../utils/colors';

export const ADVANCE_SEARCH_LABELS = {
  taskTitle: 'Tiêu đề',
  taskDetail: 'Mô tả',
  deadLine: 'Hạn hoàn thành',
  assignTime: 'Ngày giao',
  receiveTime: 'Ngày hoàn thành',
  assignerUserDeptRole: 'Người giao',
  receiverUserDeptRole: 'Người thực hiện',
};
export const TASK_TYPES = {
  ASSIGNED: 'assigned',
  RECEIVED: 'received',
};

export const TASK_STATUS = {
  CHO_PHE_DUYET_DK: 0,
  DANG_THUC_HIEN: 1,
  HUY_PHE_DUYET_DK: 2,
  HOAN_THANH: 3,
  KET_THUC: 4,
  HUY: 5,
  TAM_DUNG: 6,
};

export const TASK_STATUS_DISPLAY = {
  [TASK_STATUS.CHO_PHE_DUYET_DK]: {
    label: 'Chờ phê duyệt',
    color: colors.green,
    bgColor: colors.lightGreen,
  },
  [TASK_STATUS.DANG_THUC_HIEN]: {
    label: 'Đang thực hiện',
    color: colors.yellow,
    bgColor: colors.lightYellow,
  },
  [TASK_STATUS.HUY_PHE_DUYET_DK]: {
    label: 'Huỷ phê duyệt',
    color: colors.red,
    bgColor: colors.lightRed,
  },
  [TASK_STATUS.HOAN_THANH]: {
    label: 'Hoàn thành',
    color: colors.blue,
    bgColor: colors.lightBlue,
  },
  [TASK_STATUS.KET_THUC]: {
    label: 'Kết thúc',
    color: colors.green,
    bgColor: colors.lightGreen,
  },
  [TASK_STATUS.HUY]: {
    label: 'Huỷ',
    color: colors.red,
    bgColor: colors.lightRed,
  },
  [TASK_STATUS.TAM_DUNG]: {
    label: 'Tạm dừng',
    color: colors.red,
    bgColor: colors.lightRed,
  },
};

export const TASK_FILTERS = {
  CHO_PHE_DUYET: {
    value: 'choPheDuyet',
    icon: 'clock',
    label: 'Chờ phê duyệt',
    color: colors.green,
    status: [TASK_STATUS.CHO_PHE_DUYET_DK],
  },
  DANG_THUC_HIEN: {
    value: 'dangThucHien',
    icon: 'play-circle',
    label: 'Chưa hoàn thành',
    color: colors.yellow,
    status: [TASK_STATUS.DANG_THUC_HIEN],
  },
  HOAN_THANH: {
    value: 'hoanThanh',
    icon: 'stop-circle',
    label: 'Hoàn thành',
    color: colors.gray,
    status: [TASK_STATUS.HOAN_THANH],
  },
  KET_THUC: {
    value: 'ketThuc',
    icon: 'check-circle',
    label: 'Kết thúc',
    color: colors.blue,
    status: [TASK_STATUS.KET_THUC],
  },
  TAM_DUNG: {
    value: 'tamDung',
    icon: 'x-circle',
    label: 'Tạm dừng/Hủy',
    color: colors.red,
    status: [TASK_STATUS.HUY_PHE_DUYET_DK, TASK_STATUS.HUY, TASK_STATUS.TAM_DUNG],
  },
};

export const TASK_PRIORITIES = {
  '451': {
    label: 'Cao',
    style: { color: colors.red },
  },
  '452': {
    label: 'Thấp',
    style: { color: colors.green },
  },
  '453': {
    label: 'Trung bình',
    style: { color: colors.yellow },
  },
};

export const TASK_ACTION_LOGS = {
  TASK_TAO_MOI_CONGVIEC: {
    icon: 'external-link-alt',
    iconType: 'FontAwesome5',
    label: 'Tạo mới',
    color: colors.green,
  },
  TASK_UPDATE_CONGVIEC: {
    icon: 'pencil-alt',
    iconType: 'FontAwesome5',
    label: 'Cập nhật',
    color: colors.blue,
  },
  TASK_TU_CHOI_HOAN_THANH: {
    icon: 'times-circle',
    iconType: 'FontAwesome5',
    label: 'Từ chối hoàn thành',
    color: colors.red,
  },
  TASK_APPROVE_HOAN_THANH: {
    icon: 'play-circle',
    iconType: 'FontAwesome5',
    label: 'Duyệt hoàn thành công việc',
    color: colors.green,
  },
  TASK_HOAN_THANH: {
    icon: 'check-circle',
    iconType: 'FontAwesome5',
    label: 'Hoàn thành công việc',
    color: colors.green,
  },
  TASK_PHE_DUYET_DK: {
    icon: 'arrow-alt-circle-right',
    iconType: 'FontAwesome5',
    label: 'Phê duyệt đăng ký',
    color: colors.green,
  },
  TASK_TU_CHOI_DK: {
    icon: 'calendar-times',
    iconType: 'FontAwesome5',
    label: 'Từ chối đăng ký',
    color: colors.red,
  },
  TASK_TAM_DUNG: {
    icon: 'pause-circle',
    iconType: 'FontAwesome5',
    label: 'Tạm dừng',
    color: colors.yellow,
  },
  TASK_HUY: {
    icon: 'ban',
    iconType: 'FontAwesome5',
    label: 'Hủy',
    color: colors.red,
  },
  TASK_UPDATE_TASK_PROGRESS: {
    icon: 'arrow-alt-circle-up',
    iconType: 'FontAwesome5',
    label: 'Cập nhật tiến độ',
    color: colors.blue,
  },
};
