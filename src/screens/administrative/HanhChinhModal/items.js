import Assets from 'eoffice/assets';
import { FLOW_INFO } from 'eoffice/constants/administrative';

export default [
  {
    id: 1,
    icon: Assets.phongHop,
    title: 'Đăng ký phòng họp',
    flowCode: FLOW_INFO.PHONG_HOP,
  },
  {
    id: 3,
    icon: Assets.dieuXe,
    title: 'Yêu cầu điều xe',
    flowCode: FLOW_INFO.DIEU_XE,
  },
  {
    id: 4,
    icon: Assets.dieuXe,
    title: 'Đặt vé máy bay',
    flowCode: FLOW_INFO.VE_MAY_BAY,
  },
  {
    id: 5,
    icon: Assets.dieuXe,
    title: 'Gửi yêu cầu',
    flowCode: FLOW_INFO.GUI_YEU_CAU,
  },
  {
    id: 6,
    icon: Assets.dieuXe,
    title: 'Theo dõi kết luận chỉ đạo',
    flowCode: FLOW_INFO.THEO_DOI_CHI_DAO_LANH_DAO,
  },
  {
    id: 7,
    icon: Assets.dieuXe,
    title: 'Đặt phòng khách sạn',
    flowCode: FLOW_INFO.KHACH_SAN,
  },
];
