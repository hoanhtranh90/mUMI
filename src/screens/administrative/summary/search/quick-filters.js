import { endOfWeek, startOfWeek } from 'date-fns';

export default [
  {
    getValueStart() {
      const today = new Date();
      const stLastWeek = startOfWeek(today, { weekStartsOn: 0 });
      stLastWeek.setDate(stLastWeek.getDate() - 7);
      return stLastWeek;
    },
    getValueEnd() {
      const today = new Date();
      const endLastWeek = endOfWeek(today, { weekStartsOn: 0 });
      endLastWeek.setDate(endLastWeek.getDate() - 7);
      return endLastWeek;
    },
    label: 'Tuần trước',
    targetStart: 'startDate',
    targetEnd: 'endDate',
    feature: 'administrative',
  },
  {
    getValueStart() {
      const today = new Date();
      return startOfWeek(today, { weekStartsOn: 0 });
    },
    getValueEnd() {
      const today = new Date();
      return endOfWeek(today, { weekStartsOn: 0 });
    },
    label: ' Tuần này ',
    targetStart: 'startDate',
    targetEnd: 'endDate',
    feature: 'administrative',
  },
  {
    getValueStart() {
      const today = new Date();
      const stNextWeek = startOfWeek(today, { weekStartsOn: 0 });
      stNextWeek.setDate(stNextWeek.getDate() + 7);
      return stNextWeek;
    },
    getValueEnd() {
      const today = new Date();
      const endNextWeek = endOfWeek(today, { weekStartsOn: 0 });
      endNextWeek.setDate(endNextWeek.getDate() + 7);
      return endNextWeek;
    },
    label: ' Tuần sau ',
    targetStart: 'startDate',
    targetEnd: 'endDate',
    feature: 'administrative',
  },
];
