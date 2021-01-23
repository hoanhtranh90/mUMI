import { connect } from 'react-redux';
import { actions as phongHopDXActions } from 'eoffice/store/administrative/phongHopDotXuat/detail';
import { actions as datXeDXActions } from 'eoffice/store/administrative/datXeDotXuat/detail';
import { actions as lichTuanActions } from 'eoffice/store/administrative/lichTuan/detail';

import NavigationService from 'eoffice/utils/NavigationService';
import { FLOW_INFO } from 'eoffice/constants/administrative';
import Utilities from './Utilities';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onUtilityPress: async (item, flowCode) => {
    if (flowCode === FLOW_INFO.PHONG_HOP || flowCode === FLOW_INFO.PHONG_HOP_DX) {
      await dispatch(
        phongHopDXActions.listRoomCalendar({
          startTime: item.startDate.getTime(),
          endTime: item.endDate.getTime(),
        })
      );
      NavigationService.navigate('CalendarMeeting');
    } else if (flowCode === FLOW_INFO.DIEU_XE || flowCode === FLOW_INFO.DIEU_XE_DX) {
      await dispatch(
        datXeDXActions.listCarCalendar({
          startTime: item.startTime.getTime(),
          endTime: item.endTime.getTime(),
        })
      );
      NavigationService.navigate('CalendarCar');
    } else if (flowCode === FLOW_INFO.LICH_TUAN) {
      await dispatch(
        lichTuanActions.listcalendarRoomDetail({
          startTime: item.startDate.getTime(),
          endTime: item.endDate.getTime(),
        })
      );
      NavigationService.navigate('CalendarMeeting');
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Utilities);
