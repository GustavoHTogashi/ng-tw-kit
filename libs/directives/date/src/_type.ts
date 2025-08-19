/**
 * @description
 * Accepted date types for the directive.
 */
export type DateAccepted = Date | string | number;
export type DateType = 'day' | 'month' | 'year';
export type DateMode =
  | 'day-month'
  | 'month-year'
  | 'day-month-year'
  | 'day'
  | 'month'
  | 'year';
export type DateSelection = {
  start: number;
  end: number;
};
export type PartSize = number;
export type DateStep = -1 | 1;
