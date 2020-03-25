import immer from 'immer';
// @flow

export const fastCopy = (original: Object): Object =>
  JSON.parse(JSON.stringify(original));

export const dndReplace = (
  collection: Array<any>,
  dragIndex: number,
  hoverIndex: number
): Array<any> => {
  const dragged = collection[dragIndex];
  const hovered = collection[hoverIndex];
  return immer(collection, (d) => {
    d[dragIndex] = hovered;
    d[hoverIndex] = dragged;
  });
};
