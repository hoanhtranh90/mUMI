import { connect } from 'react-redux';
import { selectors } from 'eoffice/store/administrative/phongHopDotXuat/detail';
import CalendarMeeting from './CalendarMeeting';

const mapStateToProps = state => ({
  listRoomCalendar: selectors.listRoomCalendarSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarMeeting);
