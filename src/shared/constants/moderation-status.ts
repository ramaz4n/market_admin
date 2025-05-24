import { type SelectOptions } from '@gravity-ui/uikit';

export enum ModerationStatus {
  Approved = 20,
  Pending = 10,
  Rejected = 30,
}

export enum ModerationStatusString {
  Approved = '20',
  Pending = '10',
  Rejected = '30',
}

export enum ModerationType {
  New = 10,
  Editing = 20,
}

export enum ModerationTypeString {
  Editing = '20',
  New = '10',
}

export const MODERATION_STATUS_COLOR: Record<number, string> = {
  [ModerationStatus.Approved]: 'success',
  [ModerationStatus.Rejected]: 'danger',
  [ModerationStatus.Pending]: 'amber',
};

export const MODERATION_TYPES: SelectOptions = [
  {
    content: 'Новый',
    value: ModerationTypeString.New,
  },
  {
    content: 'Редактирование',
    value: ModerationTypeString.Editing,
  },
];

export const MODERATION_STATUS_LIST: SelectOptions = [
  {
    content: 'На проверке',
    value: ModerationStatusString.Pending,
  },
  {
    content: 'Принят',
    value: ModerationStatusString.Approved,
  },
  {
    content: 'Отклонен',
    value: ModerationStatusString.Rejected,
  },
];
