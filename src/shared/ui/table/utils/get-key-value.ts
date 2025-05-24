import { TableDataColumn, TableDataItem } from '@/shared/ui/table/table.tsx';

function getKeyValue(
  item: TableDataItem,
  column: TableDataColumn<TableDataItem>,
) {
  if (column.render) return column.render(item);

  return item[column.key] || '—';
}

export { getKeyValue };
