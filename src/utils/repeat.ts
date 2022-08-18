// One should never need to type Array.from(new Array(n))
export const repeat = (n: number, filler?: any) =>
  Array.from(new Array(n)).fill(filler);
