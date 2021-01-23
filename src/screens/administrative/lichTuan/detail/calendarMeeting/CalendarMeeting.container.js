import { connect } from 'react-redux';
import { selectors } from 'eoffice/store/administrative/lichTuan/detail';
import CalendarMeeting from './CalendarMeeting';

const mapStateToProps = state => ({
  listcalendarRoomDetail: selectors.listcalendarRoomDetailSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarMeeting);
