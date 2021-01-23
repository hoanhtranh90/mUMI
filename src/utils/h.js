import moment from "moment";
export function findAll(items, eachFn) {
  if (!items) return null;

  let arr = [];

  for (let index = 0; index < items.length; index++)
    if (eachFn(items[index], index)) arr.push(items[index]);

  return arr;
}

export function exists(items, compareFn) {
  return indexOf(items, compareFn) !== -1;
}

export function collect(items, eachFn) {
  if (!items) return null;

  let arr = [];

  for (let index = 0; index < items.length; index++)
    arr.push(eachFn(items[index], index));

  return arr;
}

export function indexOf(items, compareFn) {
  if (!items) return -1;
  for (let index = 0; index < items.length; index++)
    if (compareFn(items[index], index)) return index;
  return -1;
}

export function find(items, eachFn) {
  if (!items) return null;

  for (let index = 0; index < items.length; index++)
    if (eachFn(items[index], index)) return items[index];

  return null;
}
export function formatDate(value) {
  return value ? new moment(new Date(value)).format('DD/MM/YYYY') : null;
}
