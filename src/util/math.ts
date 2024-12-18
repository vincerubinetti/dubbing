export const tension = (value: number, strength: number) =>
  sign(value) * ((strength ** Math.abs(value) - 1) / (strength - 1)) || value;

export const sign = (value: number) => (value < 0 ? -1 : 1);

export const round = (value: number, multiple: number) =>
  Math.round(value / multiple) * multiple;
