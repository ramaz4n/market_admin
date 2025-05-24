export type Granularity =
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'full'
  | 'full_w_d';

export const Formats: Record<Granularity, string> = {
  day: 'DD.MM.YYYY',
  full: 'DD.MMMM.YYYY HH:mm:ss',
  full_w_d: 'D MMMM YYYY HH:mm:ss',
  hour: 'DD.MM.YYYY HH:mm',
  minute: 'DD.MM.YYYY HH:mm',
  second: 'DD.MM.YYYY HH:mm:ss',
};
