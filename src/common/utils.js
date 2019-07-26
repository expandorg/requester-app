// @flow

// eslint-disable-next-line import/prefer-default-export
export const fastCopy = (original: Object): Object =>
  JSON.parse(JSON.stringify(original));
