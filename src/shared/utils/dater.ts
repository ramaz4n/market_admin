import dayjs from 'dayjs';

import { Formats } from '@/shared/constants/date-formats.ts';

export class Dater {
  toString(date?: string | number, format = Formats.day) {
    if (!date) return;

    if (typeof date === 'number') {
      return dayjs(date * 1000).format(format);
    }

    return dayjs(date).format(format);
  }
}

export const dater = new Dater();
