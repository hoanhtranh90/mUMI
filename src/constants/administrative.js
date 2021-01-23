export const ADMINISTRATIVE_TYPE = {
  PENDING: 1,
  COMPLETE: 2,
};

export const FLOW_INFO = {
  PHONG_HOP: 'PHONG_HOP',
  DIEU_XE: 'DIEU_XE',
  LICH_TUAN: 'LICH_TUAN',
  PHONG_HOP_DX: 'PHONG_HOP_DX',
  DIEU_XE_DX: 'DIEU_XE_DX',
  CHI_DAO: 'CHI_DAO',
  THEO_DOI_CHI_DAO_LANH_DAO: 'THEO_DOI_CHI_DAO_LANH_DAO',
  VE_MAY_BAY: 'VEMAYBAY',
  GUI_YEU_CAU : 'GUI_YEU_CAU',
  KHACH_SAN: 'KHACH_SAN',
};

export const LICHTUAN_TYPE = {
  DA_XU_LY: 1,
  CAN_XU_LY: 2,
};

export const KHACH_SAN_TYPE = {
  CHO_XU_LY: 1,
  DA_XU_LY: 2,
};

export const SEND_REQUEST_TYPE = {
  CHO_XU_LY: 1,
  DA_XU_LY: 2,
};

export const ADVANCE_SEARCH_LABELS = {
  startDate: 'Ngày bắt đầu',
  endDate: 'Ngày kết thúc',

  meeting: 'Cuộc họp',
  sector: 'Lĩnh vực',
  conclusion: 'Nội dung kết luận',
  directiveId: 'Lãnh đạo chỉ đạo',
  performId: 'Lãnh đạo phụ trách',
  deptId: 'Đơn vị chủ trì',
  progress: 'Tiến độ',
  commandsStatus: 'Trạng thái hoàn thành',
  startTimeCommand: 'Bắt đầu Ngày chỉ đạo',
  endTimeCommand: 'Kết thúc Ngày chỉ đạo',
  startTimeDeadline: 'Bắt đầu Hạn hoàn thành',
  endTimeDeadline: 'Kết thúc Hạn hoàn thành',
  startTimeFinish: 'Bắt đầu Ngày kết thúc chỉ đạo',
  endTimeFinish: 'Kết thúc Ngày kết thúc chỉ đạo',
};

export const CREATE_LABELS_LT = {
  title: 'Tiêu đề cuộc họp',
  content: 'Nội dung làm việc',
  startDate: 'Thời gian bắt đầu',
  endDate: 'Thời gian kết thúc',
  place: 'Địa điểm',
  listLanhDao: 'Danh sách lãnh đạo',
  participant: 'Thành phần tham dự',
  chaired: 'Đơn vị chủ trì',
  coop: 'Đơn vị phối hợp',
  videoc: 'Đơn vị họp qua cầu truyền hình',
  rqMore: 'Có tạo yêu cầu phòng họp không?',
  roomName: 'Chọn phòng họp',
  note: 'Ghi chú',
  attachments: 'File đính kèm',

  roomNameSelected: 'Phòng họp đã xếp',
  newRoomNameSelected: 'Phòng họp mới được xếp',
  selectRoom: 'Chọn phòng họp',
  noteDK: 'Ghi chú đăng ký',
  cancel: 'Lý do hủy',
  capQT: 'Cấp quy trình',
  chonCQT: 'Chọn cấp quy trình',
  popupChonCQT: 'Vui lòng chọn cấp quy trình trước',
};

export const CREATE_LABELS_PH = {
  title: 'Tiêu đề cuộc họp',
  content: 'Nội dung cuộc họp',
  startDate: 'Thời gian bắt đầu',
  endDate: 'Thời gian kết thúc',
  participant: 'Thành phần tham dự',
  important: 'Độ quan trọng',
  service: 'Dịch vụ chuẩn bị',
  extension: 'Tiện ích hỗ trợ',

  roomName: 'Phòng họp được xếp',
  note: 'Ghi chú',

  roomNameSelected: 'Phòng họp đã xếp',
  newRoomNameSelected: 'Phòng họp mới được xếp',
  selectRoom: 'Chọn phòng họp',
};

export const CREATE_LABELS_DAT_XE = {
  title: 'Tiêu đề',
  content: 'Nội dung yêu cầu',
  startTime: 'Thời gian đi',
  endTime: 'Thời gian về',
  fromPlace: 'Địa điểm xuất phát',
  toPlace: 'Địa điểm đến',
  numberOfPeople: 'Số người đi',
  contactNumber: 'Số điện thoại liên hệ',
  requestType: 'Loại yêu cầu',
  selectCar: 'Chọn xe',
  selectDriver: 'Chọn lái xe',
  noSelected: '-',
  note: 'Ghi chú',

  carSelected: 'Xe đã chọn',
  driverSelected: 'Lái xe đã chọn',
};

export const CREATE_LABELS_VE_MAY_BAY = {
  title: 'Tên yêu cầu',
  content: 'Nội dung yêu cầu',
  fileToTrinh: ' File tờ trình',
  fileVeDienTu: ' Vé máy bay',
  startTime: 'Thời gian đi',
  endTime: 'Thời gian về',
  fromPlace: 'Điểm đi',
  toPlace: 'Điểm đến',
  numberOfPeople: 'Số người đi',
  contactNumber: 'Số điện thoại liên hệ',
  requestType: 'Loại yêu cầu',
  selectCar: 'Chọn xe',
  selectDriver: 'Chọn lái xe',
  noSelected: '-',
  note: 'Ghi chú',
  files: 'File tờ trình',
  ticket: 'Vé máy bay',
  carSelected: 'Xe đã chọn',
  driverSelected: 'Lái xe đã chọn',

  name: 'Họ tên',
  sex: 'Giới tính',
  phonenumber: 'Số điện thoại',
  email: 'Email',
  card: 'Thẻ bông sen vàng',
  dateOfBirth: 'Ngày sinh',
  room: 'Đơn vị',
  prefix: 'Chức danh',
  passport: 'Hộ chiếu/CMTND',
  timeRequired: 'Thời gian bay yêu cầu',
  timeReal: 'Thời gian bay thực tế',
  ticketNumber: 'Số vé máy bay',
};

export const IMPORTANT = [
  { id: 0, text: 'Không có lãnh đạo', value: 'KHONGLANHDAO' },
  { id: 1, text: 'Có lãnh đạo', value: 'COLANHDAO' },
  { id: 2, text: 'Quan trọng', value: 'QUANTRONG' },
];

export const SECTOR = [
  { id: 0, text: 'Kinh doanh', value: 'Kinh doanh' },
  { id: 1, text: 'Kỹ thuật - Đầu tư', value: 'Kỹ thuật - Đầu tư' },
  { id: 2, text: 'Quản lý chung', value: 'Quản lý chung' },
];

export const PROGRESS = [
  { id: 0, text: 'Đúng hạn', value: 'ON_TIME' },
  { id: 1, text: 'Muộn', value: 'LATE' },
];

export const COMMAND_STATUS = [
  { id: 0, text: 'Công việc hoàn thành', value: 'COMPLETE' },
  { id: 1, text: 'Công việc đang xử lý', value: 'PROCESSING' },
  { id: 1, text: 'Công việc thường xuyên', value: 'USUALLY' },
];

export const SERVICES = [
  { id: 0, text: 'Nước', value: 'NUOC' },
  { id: 1, text: 'Máy chiếu', value: 'MAYCHIEU' },
  { id: 2, text: 'Hội nghị truyền hình', value: 'TRUYENHINH' },
  { id: 3, text: 'Hoa quả', value: 'HOAQUA' },
];

export const ACTION_CODE = {
  HUY_YEU_CAU: 'huyyeucau',
  PHE_DUYET: 'pheduyet',
  TU_CHOI: 'tuchoi',
  CAP_NHAT: 'capnhat',
  TU_HUY_YEU_CAU: 'tuhuyyeucau',
  DANG_KY: 'dangky',
};

export const COMMANDS_STATUS = {
  COMPLETE: 'COMPLETE',
  PROCESSING: 'PROCESSING',
  USUALLY: 'USUALLY',
};

export const STATUS_CODE = {
  HUY: 'HUY',
  DANGXULY: 'DANGXULY',
  HOANTHANH: 'HOANTHANH',
};

export const STATE_CODE = {
  CHO_PHE_DUYET: 'chopheduyet_state',
  DA_PHE_DUYET: 'dapheduyet_state',
  DA_TU_CHOI : 'khongpheduyet_state',
  HUY : 'huyyeucau_state',
};

export const HANHCHINH_TYPE = {
  CREATE: 1,
  DETAIL: 2,
};

export const REQUEST_TYPE = [
  { id: 0, text: 'Nội thành', value: 'NOITHANH' },
  { id: 1, text: 'Ngoại thành', value: 'LIENTINH' },
];

export const RQMORES = [{ id: 0 }];

export const DEEP_LINK = {
  VIEW_DETAIL_DIEU_XE: 'viewDetailDieuXe',
  VIEW_DETAIL_DIEU_XE_DX: 'viewDetailDieuXeDX',
  VIEW_DETAIL_PH: 'viewDetailPhongHop',
  VIEW_DETAIL_PH_DX: 'viewDetailPhongHopDX',
  VIEW_DETAIL_LICH_TUAN: 'viewDetailLichTuan',
  VIEW_FULL_LICH_TUAN: 'viewFullLichTuan',
};

export const ROLE_CODE = {
  TONG_HOP_LICH_TUAN: 'tonghoplichtuan',
  DANG_KY_LICH_TUAN: 'DKLICHTUAN',
  LANH_DAO: 'lanhdao',
  CHUYEN_VIEN: 'chuyenvien',
};

export const POSITION_CODE = {
  THU_KY: "Tk",
};

export const TCT_DEPT_CODE = 'TCT';
export const TOGIUPVIEC_HDTV = 'TGVHDTV-TCT';
export const TCT_DEPT_ID = 'TCT';
export const HDTV_DEPT_CODE = 'HDTV';
export const ROOT_DEPT_CODE = 'ROOT';

export const HC_CASE_CALENDAR = {
  MEETING_TYPE: {
    ONLINE: "online",
    OFFLINE: "offline",
    ONLINE_MOBIMEETING_CODINH: "mobimeetingCoDinh",
    ONLINE_OTHER: "onlineOther",
  }
}
export const CHI_DAO_MESSAGE_TYPE = {
    CREATE: "hcCommands.create",
    UPDATE: "hcCommands.update",
    DK_DEADLINE: "hcCommands.dkDeadline",
    GIA_HAN: "hcCommands.giaHan",
    HUY: "hcCommands.huy",
    YCBS: "hcCommands.ycbs",
    PHE_DUYET: "hcCommands.pheDuyet",
    BAO_CAO: "hcCommands.baoCao",
    CHO_Y_KIEN: "hcCommands.choYKien"
}

export const MESSAGE_TYPE_DIEU_XE =  {
    CAP_NHAT: "hcDieuXe.capnhat",
    HUY_YEU_CAU: "hcDieuXe.huyyeucau",
    PHE_DUYET: "hcDieuXe.pheduyet",
    DANG_KY: "hcDieuXe.dangky",
    TU_CHOI: "hcDieuXe.tuchoi",
}
export const MESSAGE_TYPE_MAY_BAY = {
    CAP_NHAT: "hcCaseFlight.capnhat",
    HUY_YEU_CAU: "hcCaseFlight.huyyeucau",
    PHE_DUYET: "hcCaseFlight.pheduyet",
    DANG_KY: "hcCaseFlight.dangky",
    TU_CHOI: "hcCaseFlight.tuchoi"
}

export const MESSAGE_TYPE_KHACH_SAN = {
    CAP_NHAT: "hcCaseHotel.capnhat",
    HUY_YEU_CAU: "hcCaseHotel.huyyeucau",
    PHE_DUYET: "hcCaseHotel.pheduyet",
    DANG_KY: "hcCaseHotel.dangky",
    TU_CHOI: "hcCaseHotel.tuchoi"
}

export const HC_CASE_FLIGHT_FILE = {
  TO_TRINH_MAY_BAY: 1,
  VE_MAY_BAY: 2,
  TO_TRINH_KHACH_SAN: 3,
  VE_KHACH_SAN: 4,
}

export const modes = [
  {
    label: 'Tất cả',
    state: null,
    icon: 'menu',
  },
  {
    label: 'Chờ phê duyệt',
    state: STATE_CODE.CHO_PHE_DUYET,
    icon: 'clock',
  },
  {
    label: 'Đã phê duyệt',
    state: STATE_CODE.DA_PHE_DUYET,
    icon: 'check-circle',
  },
  {
    label: 'Đã từ chối',
    state: STATE_CODE.DA_TU_CHOI,
    icon: 'x-circle',
  },
  {
    label: 'Huỷ',
    state: STATE_CODE.HUY,
    icon: 'x',
  },
];
