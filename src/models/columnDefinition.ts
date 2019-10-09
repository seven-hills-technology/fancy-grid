import { CellRendererFunction } from './cellRendererFunction';

export interface ColumnDefinition {
    name: string;
    title: string;
    cellRenderer?: CellRendererFunction | null;
}