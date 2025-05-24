import { PersonGear, PersonMagnifier } from '@gravity-ui/icons';
import { type IconData } from '@gravity-ui/uikit';

export enum UserRoleName {
  'Администратор' = 'Администратор',
  'Модератор' = 'Модератор',
  'Пользователь' = 'Пользователь',
}

export const USER_ROLE_ICON: Record<string, IconData> = {
  [UserRoleName.Администратор]: PersonMagnifier,
  [UserRoleName.Модератор]: PersonGear,
};

export const USER_ROLE_LIST = [
  {
    content: UserRoleName.Администратор,
    value: UserRoleName.Администратор,
  },
  {
    content: UserRoleName.Модератор,
    value: UserRoleName.Модератор,
  },
];
