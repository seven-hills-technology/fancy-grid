import { CellRendererFunction } from './cellRendererFunction';

export interface ColumnDefinition {
    name?: string;
    title?: string;
    cellRenderer?: CellRendererFunction | null;
    tdProps?: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
    sortable?: boolean;
    filterable?: boolean | "inline" | "popup";
}