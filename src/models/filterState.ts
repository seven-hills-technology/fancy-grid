import { FilterType } from "./filterType";

export interface FilterDefinition {
    fieldName: string;
    value: string;
    filterType: FilterType;
}

export type FilterCollection = FilterDefinition[];

export interface FilterState {
    filter: FilterCollection;
    filterStyle?: "inline" | "popup";
    defaultFilter?: FilterType;
    onFilterChange: (newFilter: FilterCollection, filterTimeout: number) => void;
}