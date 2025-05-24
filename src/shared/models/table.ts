/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, createStore } from 'effector';

import { TableNames } from '../types/table.ts';

export type TableStoreValue<T = unknown> = Record<string, T>;
export type TableStore<T = unknown> = Partial<
  Record<TableNames, TableStoreValue<T>>
>;

type UpdatePayload = { name: TableNames; value: TableStoreValue };

export const $table = createStore<TableStore>({});

export const $tableApi = createApi($table, {
  clear: (s, name: string) => ({
    ...s,
    [name]: {},
  }),
  remove: (s, { tName, name }: { name: string; tName: TableNames }) => ({
    ...s,
    [tName]: {
      ...s?.[tName],
      [name]: undefined,
    },
  }),

  reset: () => ({}),
  update: (s, { name, value }: UpdatePayload) => ({
    ...s,
    [name]: { ...s[name], ...value },
  }),
});
