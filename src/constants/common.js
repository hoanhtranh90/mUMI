export const ACTION_LOG_TYPES = {
  VB_DI: 0,
  VB_DEN: 1,
  COMMENT: 2,
  CONG_VIEC: 3,
};

export const ATTACHMENT_TYPES = {
  VB_DEN: 1,
  VB_DI: 2,
  CHU_KY: 3,
  COMMENT: 4,
  RELATION_DOC: 5,
  TASK: 6,
  BOOKDOC: 8,
  VB_BAOCAOCHIDAO: 9,
  TOTRINH_VEMAYBAY: 30,
  VEMAYBAY: 31,
  TOTRINH_KHACHSAN: 32,
  KHACHSAN: 33,
  NOTE_RELATION: 42,
};

export const COMMENT_TYPES = {
  VB_DI: 0,
  VB_DEN: 1,
  TASK: 2,
};

export const SECTOR = {
  KINHDOANH: 'Kinh Doanh',
  KITHUATDAUTU: 'Kĩ thuật đầu tư',
  QUANLYCHUNG: 'Quản lý chung',
};

export const PROCESS_TYPE = {
  CHU_TRI: 'chuTri',
  PHOI_HOP: 'phoiHop',
};

export const HC_CASE_COMMANDS_USER = {
  TYPE: {
    PHU_TRACH_CAP1: 'phuTrachCap1',
    PHU_TRACH_CAP2: 'phuTrachCap2',
  },
};

export const CHI_DAO = {
  TAO_MOI: 'taoMoi',
  CAP_NHAT: 'capNhat',
  BAO_CAO_TIEN_DO: 'baoCaoTienDo',
  BAO_CAO_HOAN_THANH: 'baoCaoHoanThanh',
  GIA_HAN: 'giaHan',
  PHE_DUYET: 'pheDuyet',
  YEU_CAU_BO_SUNG: 'yeuCauBoSung',
};

export const CHI_DAO_STATE = {
  DANG_THUC_HIEN: 'dangThucHien_state',
  CHO_PHE_DUYET_HOAN_THANH: 'choPheDuyetHoanThanh_state',
  HOAN_THANH: 'hoanThanh_state',
  HUY_CHI_DAO: 'huyChiDao_state',
};

export const DOWNLOAD_TYPES = {
  ORIGINAL: 'original',
  PDF: 'pdf',
  IMG: 'image',
};

export const FILE_UPLOAD_MAX_SIZE = 5;

export const IMAGE_SIZE_COMMENT = {
  width: 1275,
  height: 1650,
};

export const DOCRELATION_TYPE = {
  CAN_CU: '442',
  TO_TRINH: '443',
};

export const DOCRELATION_TEXT_TYPE = {
  CAN_CU: 'Căn cứ',
  TO_TRINH: 'Tờ trình',
  KHAC: 'Khác',
};

export const NOTE_DATA_TYPE = {
  TEXT_INPUT: 'text',
  FILE: 'attachment',
  IMAGE: 'image',
  CALENDAR: 'calendar',
};

export const CHANGE_LOG = {
  VERSION: 'v1.60.20201201.1',
};
