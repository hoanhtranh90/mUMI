import _ from 'lodash';
import { useReducer } from 'react';
import differenceInDays from 'date-fns/differenceInDays';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';

function dateToObj(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return {
    day,
    month,
    year,
    dateString: `${year}-${`${month}`.padStart(2, '0')}-${`${day}`.padStart(2, '0')}`,
    timestamp: date.getTime(),
  };
}

function setupMarkedDates(from, to, markedDates, mark) {
  const fromDate = new Date(from.timestamp);
  const toDate = new Date(to.timestamp);
  const range = differenceInDays(toDate, fromDate);

  if (range === 0) {
    return [{ [to.dateString]: mark }, range];
  }

  if (range >= 0) {
    const newMarkedDates = { ...markedDates };
    _.times(range, index => {
      const tmp = addDays(fromDate, index + 1);
      const formatted = format(tmp, 'yyyy-MM-dd');
      if (index < range - 1) {
        newMarkedDates[formatted] = mark;
      } else {
        newMarkedDates[formatted] = { ...mark, endingDay: true };
      }
    });

    return [newMarkedDates, range];
  }

  return [markedDates, range];
}

function getInitialState(range, mark) {
  if (!range || !range[0]) {
    return {
      fromDate: null,
      isFromPicked: false,
      isToPicked: false,
      markedDates: {},
    };
  }

  let from;
  let to;
  if (range[0].dateString) {
    [from, to] = range;
  } else {
    from = dateToObj(range[0]);
    to = dateToObj(range[1]);
  }
  const markedDates = {
    [from.dateString]: {
      ...mark,
      startingDay: true,
    },
  };
  const [newMarkedDates] = setupMarkedDates(from, to, markedDates, mark);

  return {
    fromDate: from,
    markedDates: newMarkedDates,
    isFromPicked: true,
    isToPicked: true,
  };
}

export default ({ initialRange, mark, onSuccess }) => {
  const reducer = (state, action) => {
    if (action.type === 'setFrom') {
      const markedDates = {
        [action.day.dateString]: { ...mark, startingDay: true },
      };
      return {
        isFromPicked: true,
        isToPicked: false,
        fromDate: action.day,
        markedDates,
      };
    }
    if (action.type === 'setTo') {
      return {
        ...state,
        isFromPicked: true,
        isToPicked: true,
        markedDates: action.markedDates,
      };
    }

    return state;
  };

  const [state, dispatch] = useReducer(reducer, getInitialState(initialRange, mark));

  const onDayPressed = day => {
    // eslint-disable-next-line no-param-reassign
    day.timestamp -= 25200000;
    if (!state.isFromPicked || (state.isFromPicked && state.isToPicked)) {
      dispatch({ type: 'setFrom', day });
      return;
    }

    if (!state.isToPicked) {
      const [newMarkedDates, range] = setupMarkedDates(
        state.fromDate,
        day,
        state.markedDates,
        mark
      );
      if (range >= 0) {
        dispatch({ type: 'setTo', markedDates: newMarkedDates });
        if (_.isFunction(onSuccess)) {
          onSuccess(state.fromDate, day);
        }
      } else {
        dispatch({ type: 'setFrom', day });
      }
    }
  };

  return [state, onDayPressed];
};
