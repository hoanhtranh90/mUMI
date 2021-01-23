import { connect } from 'react-redux';
import { selectors } from 'eoffice/store/administrative/datXeDotXuat/detail';
import CalendarCar from './CalendarCar';

const mapStateToProps = state => ({
  listCarCalendar: selectors.listCarCalendarSelector(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarCar);
