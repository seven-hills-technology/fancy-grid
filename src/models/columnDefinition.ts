import { CellRendererFunction } from './cellRendererFunction';
import { FilterFunction } from './filterFunction';
import { FilterCollection } from '../models/filterState';
import { FilterType } from './filterType';

export interface ColumnDefinition {
    name: string;
    title: string;
    cellRenderer?: CellRendererFunction | null;
    filter?: FilterCollection | [];
    onFilterChange?: FilterFunction | null;
    filterType?: FilterType | null;
}