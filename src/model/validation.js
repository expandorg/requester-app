// @flow

export const ge = (g: number = 0) => [
  (v: number) => v >= g,
  `Should be equal or greater then ${g}`,
];
export const gt = (g: number = 0) => [
  (v: number) => v > g,
  `Should be greater then ${g}`,
];

export const lt = (g: number = 0) => [
  (v: number) => v < g,
  `Should be greater then ${g}`,
];
