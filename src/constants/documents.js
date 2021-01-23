import colors from '../utils/colors';

export const DOC_USER_STATUS = {
  CHO_XU_LY: 0,
  DA_XU_LY: 1,
  NHAN_DE_BIET: 2,
  DU_THAO: 3,
  DA_PHAT_HANH: 4,
  TAT_CA: 5,
  UY_QUYEN: 6,
  PHOI_HOP: 7,
  CHU_TRI: 8,
  DXL_CHU_TRI: 9,
  DXL_NHAN_DE_BIET: 10,
  DXL_PHOI_HOP: 11,
  TO_TRINH_CHUA_YK: 12,
  TO_TRINH_CXL: 13,
  TO_TRINH_DBL: 14,
  TO_TRINH_DCXL: 15,
};

export const RELATION_TYPE = {
  NGUOI_SOAN_THAO: 'nguoiSoanThao',
  NGUOI_XU_LI: 'nguoiChuyenXuLi',
  NGUOI_UY_QUYEN: 'nguoiUyQuyen',
  NGUOI_PHOI_HOP: 'nguoiPhoiHop',
  NGUOI_DUOC_BCC: 'nguoiDcBCC',
};

export const DOC_TYPE_NOTIFICATION = {
  VB_DEN: 0,
  VB_DI: 1,
};

export const TASK_UPLOAD = {
  FILE_UPLOAD: 'FILE_UPLOAD',
  DOC_UPLOAD: 'DOC_UPLOAD',
};

export const DOC_STATUS_DISPLAY = {
  0: {
    label: 'Chờ xử lý',
    icon: 'inbox',
    color: colors.green,
    bgColor: colors.lightGreen,
  },
  1: {
    label: 'Đã xử lý',
    icon: 'check-circle',
    color: colors.darkGray,
    bgColor: colors.lightGray,
  },
  2: {
    label: 'Nhận để biết',
    icon: 'info',
    color: colors.yellow,
    bgColor: colors.lightYellow,
  },
  3: {
    label: 'Dự thảo',
    icon: 'inbox',
    color: colors.green,
    bgColor: colors.lightGreen,
  },
  4: {
    label: 'Đã phát hành',
    icon: 'check-circle',
    color: colors.darkGray,
    bgColor: colors.lightGray,
  },
  6: {
    label: 'Uỷ quyền',
    icon: 'user-check',
    color: colors.darkGray,
    bgColor: colors.lightGray,
  },
  7: {
    label: 'Phối hợp',
    icon: 'user-check',
    color: colors.yellow,
    bgColor: colors.lightYellow,
  },
  8: {
    label: 'Chủ trì',
    icon: 'user-check',
    color: colors.green,
    bgColor: colors.lightGreen,
  },
  9: {
    label: 'Chủ trì',
    icon: 'user-check',
    color: colors.green,
    bgColor: colors.lightGreen,
  },
  10: {
    label: 'Nhận để biết',
    icon: 'user-check',
    color: colors.green,
    bgColor: colors.lightGreen,
  },
  11: {
    label: 'Phối hợp',
    icon: 'user-check',
    color: colors.green,
    bgColor: colors.lightGreen,
  },
  // ==================Trạng thái tờ trình==============//
  12: {
    label: 'TTr quá hạn ý kiến',
    icon: 'file',
    color: colors.green,
    bgColor: colors.lightGreen,
  },
  13: {
    label: 'Chưa xử lý',
    icon: 'user-check',
    color: colors.green,
    bgColor: colors.lightGreen,
  },
  14: {
    label: 'Đã bình luận',
    icon: 'user-check',
    color: colors.green,
    bgColor: colors.lightGreen,
  },
  15: {
    label: 'Đã chuyển xử lý',
    icon: 'user-check',
    color: colors.green,
    bgColor: colors.lightGreen,
  },
  // ==================Trạng thái tờ trình==============//
};

export const DOCUMENT_TYPE = {
  VB_DEN: 1,
  VB_DI: 2,
};

export const INCOMING_DOC_STATUS = {
  TAO_MOI: 0,
  DANG_XU_LY: 1,
  NHAN_DE_BIET: 2,
  DA_HOAN_THANH: 3,
  DA_THU_HOI: 4,
  TU_CHOI: 6,
  KET_THUC: 7,
  TU_CHOI_TIEP_NHAN: 8,
};

export const OUTGOING_DOC_STATUS = {
  TAO_MOI: 0,
  DANG_XU_LI: 1,
  DA_XU_LY: 2,
  DA_BAN_HANH: 3,
  CHO_BAN_HANH: 4,
  DA_THU_HOI: 5,
  TU_CHOI: 6,
  TU_CHOI_BANHANH: 7,
};

export const DRAFT_FILTERS = [
  {
    label: 'Tạo mới',
    value: OUTGOING_DOC_STATUS.TAO_MOI,
    icon: 'external-link',
    color: colors.green,
  },
  {
    label: 'Đang trình ký',
    value: OUTGOING_DOC_STATUS.DANG_XU_LI,
    icon: 'play-circle',
    color: colors.blue,
  },
  {
    label: 'Chờ ban hành',
    value: OUTGOING_DOC_STATUS.CHO_BAN_HANH,
    icon: 'clock',
    color: colors.green,
  },
  {
    label: 'Từ chối',
    value: OUTGOING_DOC_STATUS.TU_CHOI,
    icon: 'x-circle',
    color: colors.red,
  },
];

export const ACTION_LOGS = {
  ACTION_NAMES: {
    CC: 'cc',
    BANHANH: 'banHanh',
    CHOBANHANH: 'choBanHanh',
    CHUYENXULI: 'chuyenXuLi',
    INSERT: 'insert',
    KETTHUC: 'kethuc',
    TUCHOI: 'tuChoi',
    THUHOI: 'thuHoi',
    UPDATE: 'update',
    THUHOI_BANHANH: 'thuHoiBanHanh',
    CHUYENXULI_DONVI: 'chuyenXuLiDonVi',
    CHUYENXULI_KYSO: 'kySoChuyenXuLi',
    BANHHANH_CANHAN: 'banHanhCaNhan',
    TUCHOI_TIEPNHAN: 'tuChoiTiepNhan',
    BANHANH_HIEUCHINH: 'hieuChinhBanHanh',
    TUCHOI_GHICHUVB: 'tuChoiGhiChuVb',
    TUCHOI_BANHANH: 'tuChoiBanHanh',
    HIEUCHINH_BANHANH_CANHAN: 'hieuChinhBanHanhCaNhan',
    BAN_HANH_TOI: 'banHanhToi',
    HIEU_CHINH: 'hieuChinh',
    CHO_Y_KIEN: 'choYKien',
    BAN_HANH_V2: 'banHanhV2',
    DA_DEN: 'daDenTltvb',
    DA_NHAN: 'daNhanTltvb',
    TU_CHOI_TIEP_NHAN: 'tltvbTuChoiTiepNhan',
    TIEP_NHAN: 'tiepNhanTltvb',
    PHAN_CONG: 'tltvbPhanCong',
    DANG_XU_LY: 'tltvbDangXuLy',
    HOAN_THANH: 'tltvbHoanThanh',
    DONG_Y: 'dongYTltvb',
    TU_CHOI: 'tuChoiTltvb',
    HE_THONG_BAN_HANH: 'banHanhTltvb',
    TRA_LAI: 'tltvbTraLai',
    TU_CHOI_TRA_LAI: 'tltvbTuChoiTraLai',
    GUI_YEU_CAU_THUHOI_BANHANH: 'guiYeuCauThuHoiBanHanh',
  },
  TYPE: {
    VB_DI: 0,
    VB_DEN: 1,
    COMMENT: 2,
  },
};

export const COMMENT_TYPE = {
  VB_DI: 0,
  VB_DEN: 1,
};

export const OUTGOING_PROCESS_STATUS = {
  CHO_XU_LY: 0,
  DA_XU_LY: 1,
  TU_CHOI: 3,
};

export const INCOMING_PROCESS_STATUS = {
  CHO_XU_LY: 0,
  DA_XU_LY: 1,
  NHAN_DE_BIET: 2,
  TU_CHOI: 3,
  KET_THUC: 4,
};

export const STEP_TYPE = {
  CA_NHAN: 'caNhan',
  DON_VI: 'donVi',
};

export const STEP_POS_TYPE = {
  BAT_DAU: 1,
  KET_THUC: 2,
  BOTH: 3,
};

// -- Khẩn,15
// -- Bình thường,16
// -- Thượng khẩn,17
// -- Hỏa tốc hẹn giờ,25
// -- Hỏa tốc,26
export const HIGH_LEVELS_PIORITY_IDS = ['15', '17', '25', '26'];

// Tối mật,27
// Bình thường,12
// Mật,13
// Tuyệt Mật,14
export const HIGH_LEVELS_SECURITY_IDS = ['13', '14', '27'];

export const PROCESS_TYPE_TEXTS = {
  0: 'Chủ trì',
  1: 'Nhận để biết',
  2: 'Phối hợp',
};

export const PROCESS_TYPES = {
  CHU_TRI: {
    text: PROCESS_TYPE_TEXTS[0],
    value: 0,
  },
  NHAN_DE_BIET: {
    text: PROCESS_TYPE_TEXTS[1],
    value: 1,
  },
  PHOI_HOP: {
    text: PROCESS_TYPE_TEXTS[2],
    value: 2,
  },
};

export const CATEGORY_GROUP_CODE = {
  PRIORITY: 'VOFFICE_CAT_URGENCY',
  DOC_TYPE: 'VOFFICE_CAT_DOCTYPE',
  SECRET_LEVEL: 'VOFFICE_CAT_SECRET',
  DOC_RELATION_TYPE: 'DOC_RELATION_TYPE',
};

export const ADVANCE_SEARCH_LABELS = {
  priorityId: 'Độ khẩn',
  fileContent: 'Nội dung văn bản',
  docCode: 'Số ký hiệu',
  quote: 'Trích yếu',
  docTypeId: 'Loại văn bản',
  publisherIdDen: 'Đơn vị phát hành (bên trong)',
  publisherIdDi: 'Đơn vị ban hành',
  outsidePublisherName: 'Đơn vị phát hành (bên ngoài)',
  processTime: 'Ngày chuyển',
  vbDocUserUpdateTime: 'Ngày xử lý',
  // docDate: 'Ngày văn bản',
  docDate: 'Ngày chuyển',
  incomingDate: 'Ngày đến',
  createTime: 'Ngày tạo',
  receiveDeptId: 'Nơi nhận bên trong',
  otherReceivePlaces: 'Nơi nhận bên ngoài',
};

export const ACTION_HISTORY_LABELS = {
  [ACTION_LOGS.ACTION_NAMES.BANHANH_HIEUCHINH]: {
    icon: 'check-circle',
    label: 'Hiệu chỉnh và Ban hành',
    color: colors.blue,
    labelSuffix: 'đến',
  },
  [ACTION_LOGS.ACTION_NAMES.CHUYENXULI_KYSO]: {
    icon: 'fast-forward',
    label: 'Ký số và chuyển xử lý',
    color: colors.blue,
    labelSuffix: 'đến',
  },
  [ACTION_LOGS.ACTION_NAMES.BANHHANH_CANHAN]: {
    icon: 'check-circle',
    label: 'Ban hành văn bản',
    color: colors.blue,
    labelSuffix: 'tới',
  },
  [ACTION_LOGS.ACTION_NAMES.TUCHOI_TIEPNHAN]: {
    icon: 'x-circle',
    label: 'Từ chối',
    color: colors.red,
    labelSuffix: 'bởi',
  },
  [ACTION_LOGS.ACTION_NAMES.CC]: {
    icon: 'share',
    label: 'CC văn bản',
    color: colors.blue,
    labelSuffix: 'đến',
    iconType: 'FontAwesome',
  },
  [ACTION_LOGS.ACTION_NAMES.BANHANH]: {
    icon: 'check-circle',
    label: 'Ban hành văn bản',
    color: colors.green,
    labelSuffix: 'tới',
  },
  [ACTION_LOGS.ACTION_NAMES.BAN_HANH_V2]: {
    icon: 'check-circle',
    label: 'Ban hành văn bản',
    color: colors.green,
    labelSuffix: 'tới',
  },
  [ACTION_LOGS.ACTION_NAMES.CHOBANHANH]: {
    icon: 'clock',
    label: 'Duyệt ban hành',
    color: colors.blue,
    labelSuffix: 'bởi',
  },
  [ACTION_LOGS.ACTION_NAMES.CHUYENXULI]: {
    icon: 'fast-forward',
    label: 'Chuyển xử lý',
    color: colors.blue,
    labelSuffix: 'đến',
  },
  [ACTION_LOGS.ACTION_NAMES.CHUYENXULI_DONVI]: {
    icon: 'fast-forward',
    label: 'Chuyển xử lý',
    color: colors.blue,
    labelSuffix: 'đến',
  },
  [ACTION_LOGS.ACTION_NAMES.INSERT]: {
    icon: 'file-plus',
    label: 'Tạo mới',
    color: colors.green,
  },
  [ACTION_LOGS.ACTION_NAMES.KETTHUC]: {
    iconType: 'FontAwesome5',
    icon: 'calendar-check',
    label: 'Kết thúc',
    color: colors.green,
  },
  [ACTION_LOGS.ACTION_NAMES.TUCHOI]: {
    icon: 'x-circle',
    label: 'Từ chối',
    color: colors.red,
    labelSuffix: 'bởi',
  },
  [ACTION_LOGS.ACTION_NAMES.THUHOI]: {
    iconType: 'FontAwesome5',
    icon: 'undo',
    label: 'Thu hồi',
    color: colors.yellow,
    labelSuffix: 'từ',
  },
  [ACTION_LOGS.ACTION_NAMES.THUHOI_BANHANH]: {
    iconType: 'FontAwesome5',
    icon: 'reply-all',
    label: 'Thu hồi văn bản',
    color: colors.yellow,
    labelSuffix: 'từ',
  },
  [ACTION_LOGS.ACTION_NAMES.UPDATE]: {
    icon: 'edit-2',
    label: 'Cập nhật',
    color: colors.blue,
  },
  [ACTION_LOGS.ACTION_NAMES.CHO_Y_KIEN]: {
    icon: 'edit',
    label: 'Cho ý kiến',
    color: colors.blue,
  },
  [ACTION_LOGS.ACTION_NAMES.TUCHOI_GHICHUVB]: {
    icon: 'x-circle',
    label: 'Từ chối văn bản đính kèm',
    color: colors.red,
  },
  [ACTION_LOGS.ACTION_NAMES.TUCHOI_BANHANH]: {
    icon: 'x-circle',
    label: 'Từ chối ban hành',
    color: colors.red,
  },
  [ACTION_LOGS.ACTION_NAMES.HIEUCHINH_BANHANH_CANHAN]: {
    icon: 'edit',
    label: 'Hiệu chỉnh và ban hành văn bản',
    color: colors.green,
    labelSuffix: 'đến',
  },
  [ACTION_LOGS.ACTION_NAMES.HIEU_CHINH]: {
    icon: 'edit',
    label: 'Hiệu chỉnh văn bản',
    color: colors.blue,
    labelSuffix: '',
  },
  attachment: {
    icon: 'file-plus',
    label: 'Thêm văn bản liên quan',
    color: colors.blue,
  },
  comment: {
    icon: 'feather',
    label: 'Bình luận',
    color: colors.yellow,
  },
};

export const FLOW_INSTANCE_STATUS = {
  // Trang thai cua van ban di
  DANG_XU_LY: 1, // Van ban dang xu ly
  DA_BAN_HANH: 3, // Van ban ban hanh
  KET_THUC: 4, // Van ban cho ban hanh
  DA_THU_HOI: 5, // Van ban da thu hoi
  TU_CHOI: 6, // Van ban da thu hoi
  PROCESSING: 7, // Luong hanh chinh dang xu ly
  COMPLETED: 8, // Luong hanh chinh da hoan thanh
  CANCELED: 9, // Luong hanh chinh da bi huy
};

export const DEPT_TYPE = {
  PB_CN: 'phongBanChucNang',
  DV_TT: 'donViTrucThuoc',
  DVK: 'donViKhac',
};

export const DEPT_TYPE_NAME = {
  [DEPT_TYPE.PB_CN]: 'Phòng Ban Chức năng',
  [DEPT_TYPE.DV_TT]: 'Đơn vị trực thuộc',
  [DEPT_TYPE.DVK]: 'Đơn vị khác',
};

export const DOC_RELATION_OBJECT_TYPE = {
  ATTACHMENT: 2,
  OUTGOING_DOC: 1,
  VB_DEN: 0,
};

export const MENU_LIST = {
  VB_DEN: 'Văn bản đến',
  VB_DEN_CHOTIEPNHAN: 'Chờ tiếp nhận',
  VB_DEN_CHOXULY: 'Chờ xử lý',
  VB_DEN_DAXULY: 'Đã xử lý',
  VB_DEN_DATIEPNHAN: 'Đã tiếp nhận',
  VB_DI: 'Văn bản đi',
  VB_DI_DUTHAO: 'Văn bản dự thảo',
  VB_DI_DAPHATHANH: 'Đã phát hành',
  VB_DI_CHOBANHANH: 'Chờ ban hành',
  VB_DI_DABANHANH: 'Đã ban hành',
  VB_DI_DAVAOSO: 'Đã vào sổ',
  QL_SOVANBAN: 'Quản lý sổ văn bản',
  QL_SOVANBAN_SODEN: 'Sổ đến',
  QL_SOVANBAN_SODI: 'Sổ đi',
  QL_SOVANBAN_BOOKSO: 'Book số văn bản',
  CONGVIEC: 'Công việc',
  CONGVIEC_GIAO: 'Công việc tôi giao',
  CONGVIEC_DUOCGIAO: 'Công việc được giao',
  CAUHINH: 'Cấu hình',
  CAUHINH_LUONGVANBAN: 'Luồng văn bản',
  CAUHINH_QUANTRINGUOIDUNG: 'Quản trị người dùng',
  CAUHINH_QUANTRIDONVI: 'Quản trị đơn vị',
  CAUHINH_QUANLYUYQUYEN: 'Quản lý ủy quyền',
  CAUHINH_QUANLYNGAYLE: 'Quản lý ngày lễ',
  CAUHINH_QUANLYDANHMUC: 'Quản lý danh mục',
  CAUHINH_QUANLYVAITRO: 'Quản lý vai trò',
  HANHCHINH: 'Hành chính',
  HANHCHINH_DANGKYPHONGHOP: 'Đăng ký phòng họp',
  HANHCHINH_DANGKYPHONGHOPDOTXUAT: 'Đăng ký phòng họp đột xuất',
  HANHCHINH_YEUCAUDIEUXE: 'Yêu cầu điều xe',
  HANHCHINH_YEUCAUDIEUXEDOTXUAT: 'Yêu cầu điều xe đột xuất',
  HANHCHINH_THEODOIKETLUANCHIDAO: 'Theo dõi kết luận chỉ đạo',
  HANHCHINH_LICHTUAN: 'Đăng ký lịch tuần',
  TO_TRINH_QUA_HAN: 'TTr cần cho ý kiến',
};

export const POSITION_NAME = {
  CHUYEN_VIEN: 'Chuyên viên',
  VAN_THU: 'Văn thư',
  ADMIN: 'Admin',
};

export const STATUS = {
  ACTIVE: 'active',
  DEACTIVE: 'deactive',
};

export const ROLE = {
  LANH_DAO: 'lanhdao',
};

export const CATEGORY_CODE = {
  TO_TRINH_XIN_Y_KIEN_HDTV: 'ttrhdtv',
  GIAI_TRINH_Y_KIEN_HDTV: 'gtrhdtv',
};

export const ROOT_DEPT_CODE = 'ROOT';
export const HDTV_DEPT_CODE = 'HDTV';
export const TCT_DEPT_CODE = 'TCT';

export const CHI_DAO = {
  TAO_MOI: 'taoMoi',
  CAP_NHAT: 'capNhat',
  BAO_CAO_TIEN_DO: 'baoCaoTienDo',
  BAO_CAO_HOAN_THANH: 'baoCaoHoanThanh',
  GIA_HAN: 'giaHan',
  PHE_DUYET: 'pheDuyet',
  YEU_CAU_BO_SUNG: 'yeuCauBoSung',
  DANG_KY_DEADLINE: 'dangKyDeadline',
  HUY_YEU_CAU: 'huyYeuCau',
  BAO_TRUNG_CHI_DAO: 'baoTrungChiDao',
  CHO_Y_KIEN: 'choYKien',
};
export const FLOW_TYPE = {
  VB_DEN: 1,
  VB_DI: 2,
  DONG_TRINH: 3,
};
export const CATEGORY = {
  STATUS: {
    ACTIVE: 'active',
    DEACTIVE: 'deactive',
  },

  CODE: {
    DOC_TYPE: {
      TO_TRINH_XIN_Y_KIEN_HDTV: 'ttrhdtv',
      GIAI_TRINH_Y_KIEN_HDTV: 'gtrhdtv',
      PHIEU_Y_KIEN: 'phieuykien',
      TO_TRINH: 'ttr',
    },
  },
};
