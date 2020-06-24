import { FilterType } from "./filterType";
import {FieldType} from './filterableColumnDefinition';

export interface FilterDefinition {
    fieldName: string;
    fieldType: FieldType;
    value: string;
    filterType: FilterType;
    operator: string;
}

export type FilterCollection = FilterDefinition[];

export interface FilterState {
    filter: FilterCollection;
    filterStyle?: "inline" | "popup";
    defaultFilter?: FilterType;
    onFilterChange: (newFilter: FilterCollection, filterTimeout: number) => void;
}

export function isValidFilterDefinition(filterDefinition: FilterDefinition) {
    return !filterTypeUsesValue(filterDefinition.filterType) || filterDefinition.value?.trim().length > 0;
}

export function filterTypeUsesValue(filterType: FilterType) {
    switch (filterType) {
        case FilterType.IsEqualTo:
        case FilterType.IsNotEqualTo:
        case FilterType.StartsWith:
        case FilterType.Contains:
        case FilterType.DoesNotContain:
        case FilterType.EndsWith:
        case FilterType.IsLessThanOrEqualTo:
        case FilterType.IsLessThan:
        case FilterType.IsGreaterThanOrEqualTo:
        case FilterType.IsGreaterThan:
        case FilterType.IsBeforeOrEqualTo:
        case FilterType.IsBefore:
        case FilterType.IsAfterOrEqualTo:
        case FilterType.IsAfter:
            return true;

        case FilterType.IsNull:
        case FilterType.IsNotNull:
        case FilterType.IsEmpty:
        case FilterType.IsNotEmpty:
            return false;
    }
}