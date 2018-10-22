/* eslint-disable */

export const insertAtIndex = (array, index, item) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index),
];
