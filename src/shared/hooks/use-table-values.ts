import { useStoreMap } from 'effector-react';

import { $table, TableStoreValue } from '../models/table.ts';
import { TableNames } from '../types/table.ts';

export const useTableValues = <T extends TableStoreValue>(name: TableNames) =>
  useStoreMap($table, (state) => state[name]) as T;

export const useTableHasValues = (name: TableNames) =>
  Boolean(
    Object.keys(useTableValues(name) || {}).filter((f) => f !== 'page').length,
  );
