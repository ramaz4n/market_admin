import { type SelectOptions } from '@gravity-ui/uikit';

export const USER_STATUS_COLOR: Record<number, string> = {
  0: 'danger',
  10: 'success',
  9: 'amber',
};

export const USER_STATUS: SelectOptions = [
  { content: 'Активный', value: '10' },
  { content: 'Неактивный', value: '9' },
  { content: 'Удаленный', value: '0' },
];
