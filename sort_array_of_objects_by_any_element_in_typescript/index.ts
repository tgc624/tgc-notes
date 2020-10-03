export const sortBy = <T>(sortTarget: keyof T) =>
  (array: T[]) => array.sort((a, b) => (a < b ? -1 : 1));
