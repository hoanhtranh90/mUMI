import {
  endOfWeek,
  endOfMonth,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfYear,
  startOfWeek,
  subDays,
} from 'date-fns';
import { DOCUMENT_TYPE } from '../constants/documents';

const MONTH_DAYS = 30;
const YEAR_DAYS = 365;

const getValues = {
  monthAgo() {
    const today = startOfDay(new Date());
    return [subDays(today, MONTH_DAYS), today];
  },
  thisMonth() {
    const today = new Date();
    return [startOfMonth(today), startOfDay(endOfMonth(today))];
  },
  thisWeek() {
    const today = new Date();
    return [
      startOfWeek(today, { weekStartsOn: 0 }),
      startOfDay(endOfWeek(today, { weekStartsOn: 0 })),
    ];
  },
  thisYear() {
    const today = new Date();
    return [startOfYear(today), startOfDay(endOfYear(today))];
  },
  today() {
    const today = startOfDay(new Date());
    return [today, today];
  },
  weekAgo() {
    const today = startOfDay(new Date());
    return [subDays(today, 7), today];
  },
  yearAgo() {
    const today = startOfDay(new Date());
    return [subDays(today, YEAR_DAYS), today];
  },
};

export default [
  // VB DEN
  {
    id: 'docDateWeekAgo',
    getValue: getValues.weekAgo,
    label: '1 tuần trước',
    target: 'docDate',
    feature: 'documents',
    validate({ type }) {
      return type === DOCUMENT_TYPE.VB_DEN;
    },
  },
  {
    id: 'docDateMonthAgo',
    getValue: getValues.monthAgo,
    label: '1 tháng trước',
    target: 'docDate',
    feature: 'documents',
    validate({ type }) {
      return type === DOCUMENT_TYPE.VB_DEN;
    },
  },
  {
    id: 'docDateYearAgo',
    getValue: getValues.yearAgo,
    label: '1 năm trước',
    target: 'docDate',
    feature: 'documents',
    validate({ type }) {
      return type === DOCUMENT_TYPE.VB_DEN;
    },
  },
  {
    id: 'docDateToday',
    getValue: getValues.today,
    label: 'Hôm nay',
    target: 'docDate',
    feature: 'documents',
    validate({ type }) {
      return type === DOCUMENT_TYPE.VB_DEN;
    },
  },
  {
    id: 'docDateThisWeek',
    getValue: getValues.thisWeek,
    label: 'Tuần này',
    target: 'docDate',
    feature: 'documents',
    validate({ type }) {
      return type === DOCUMENT_TYPE.VB_DEN;
    },
  },
  {
    id: 'docDateThisMonth',
    getValue: getValues.thisMonth,
    label: 'Tháng này',
    target: 'docDate',
    feature: 'documents',
    validate({ type }) {
      return type === DOCUMENT_TYPE.VB_DEN;
    },
  },
  {
    id: 'docDateThisYear',
    getValue: getValues.thisYear,
    label: 'Năm nay',
    target: 'docDate',
    feature: 'documents',
    validate({ type }) {
      return type === DOCUMENT_TYPE.VB_DEN;
    },
  },

  // VB DI
  {
    id: 'createTimeWeekAgo',
    getValue: getValues.weekAgo,
    label: '1 tuần trước',
    target: 'createTime',
    feature: 'documents',
    validate({ type }) {
      return type === DOCUMENT_TYPE.VB_DI;
    },
  },
  {
    id: 'createTimeMonthAgo',
    getValue: getValues.monthAgo,
    label: '1 tháng trước',
    target: 'createTime',
    feature: 'documents',
    validate({ type }) {
      return type === DOCUMENT_TYPE.VB_DI;
    },
  },
  {
    id: 'createTimeYearAgo',
    getValue: getValues.yearAgo,
    label: '1 năm trước',
    target: 'createTime',
    feature: 'documents',
    validate({ type }) {
      return type === DOCUMENT_TYPE.VB_DI;
    },
  },
  {
    id: 'createTimeToday',
    getValue: getValues.today,
    label: 'Hôm nay',
    target: 'createTime',
    feature: 'documents',
    validate({ type }) {
      return type === DOCUMENT_TYPE.VB_DI;
    },
  },
  {
    id: 'createTimeThisWeek',
    getValue: getValues.thisWeek,
    label: 'Tuần này',
    target: 'createTime',
    feature: 'documents',
    validate({ type }) {
      return type === DOCUMENT_TYPE.VB_DI;
    },
  },
  {
    id: 'createTimeThisMonth',
    getValue: getValues.thisMonth,
    label: 'Tháng này',
    target: 'createTime',
    feature: 'documents',
    validate({ type }) {
      return type === DOCUMENT_TYPE.VB_DI;
    },
  },
  {
    id: 'createTimeThisYear',
    getValue: getValues.thisYear,
    label: 'Năm nay',
    target: 'createTime',
    feature: 'documents',
    validate({ type }) {
      return type === DOCUMENT_TYPE.VB_DI;
    },
  },

  {
    getValue: getValues.thisWeek,
    label: 'Tuần này',
    target: 'deadline',
    feature: 'tasks',
  },
  {
    getValue: getValues.thisMonth,
    label: 'Tháng này',
    target: 'deadline',
    feature: 'tasks',
  },
  {
    getValue: getValues.thisYear,
    label: 'Năm nay',
    target: 'deadline',
    feature: 'tasks',
  },
];
