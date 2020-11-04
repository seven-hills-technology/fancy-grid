import { CellRendererFunction } from './cellRendererFunction';
import {FieldType} from './filterableColumnDefinition';
import { FilterType } from './filterType';

export interface ColumnDefinition {
    name?: string;
    title?: string;
    cellRenderer?: CellRendererFunction | null;
    tdProps?: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
    sortable?: boolean;
    filterable?: boolean | "inline" | "popup";
    fieldType?: FieldType;
    whiteList?: FilterType[]
}