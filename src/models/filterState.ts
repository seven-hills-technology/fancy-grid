import { FilterType } from "./filterType";

export interface FilterDefinition {
    fieldName: string;
    value: string;
    filterType?: FilterType | string | null;
}

export type FilterCollection = FilterDefinition[];

export interface FilterState {
    filter: FilterCollection;
    onFilterChange: (newFilter: FilterCollection) => void;
}