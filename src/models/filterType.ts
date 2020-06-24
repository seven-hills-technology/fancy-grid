import {FieldType} from './filterableColumnDefinition';

export enum FilterType {
    IsEqualTo = "eq",
    IsNotEqualTo = "neq",
    StartsWith = "startswith",
    Contains = "contains",
    DoesNotContain = "doesnotcontain",
    EndsWith = "endswith",
    IsNull = "isnull",
    IsNotNull = "isnotnull",
    IsEmpty = "isempty",
    IsNotEmpty = "isnotempty",
    IsLessThanOrEqualTo = "lte",
    IsLessThan = "lt",
    IsGreaterThanOrEqualTo = "gte",
    IsGreaterThan = "gt",
    IsBeforeOrEqualTo = "lte",
    IsBefore = "lt",
    IsAfterOrEqualTo = "gte",
    IsAfter = "gt"
}

export const FilterTypeDisplays = {
    [FilterType.IsEqualTo]: "Is equal to",
    [FilterType.IsNotEqualTo]: "Is not equal to",
    [FilterType.StartsWith]: "Starts with",
    [FilterType.Contains]: "Contains",
    [FilterType.DoesNotContain]: "Does not contain",
    [FilterType.EndsWith]: "Ends with",
    [FilterType.IsNull]: "Is null",
    [FilterType.IsNotNull]: "Is not null",
    [FilterType.IsEmpty]: "Is empty",
    [FilterType.IsNotEmpty]: "Is not empty",
    [FilterType.IsLessThanOrEqualTo]: "Is less than or equal to",
    [FilterType.IsLessThan]: "Is less than",
    [FilterType.IsGreaterThanOrEqualTo]: "Is greater than or equal to",
    [FilterType.IsGreaterThan]: "Is greater than",
    [FilterType.IsBeforeOrEqualTo]: "Is before or equal to",
    [FilterType.IsBefore]: "Is before",
    [FilterType.IsAfterOrEqualTo]: "Is after or equal to",
    [FilterType.IsAfter]: "Is after"
};



export function getFilterTypesForFieldType(fieldType: FieldType) {
    switch (fieldType) {
        case 'text':
            return [
                FilterType.StartsWith,
                FilterType.Contains,
                FilterType.DoesNotContain,
                FilterType.EndsWith,
                FilterType.IsEqualTo,
                FilterType.IsNotEqualTo,
                FilterType.IsEmpty,
                FilterType.IsNotEmpty,
                FilterType.IsLessThanOrEqualTo,
                FilterType.IsLessThan,
                FilterType.IsGreaterThanOrEqualTo,
                FilterType.IsGreaterThan
            ];
        case 'number':
            return [
                FilterType.IsEqualTo,
                FilterType.IsNotEqualTo,
                FilterType.IsLessThanOrEqualTo,
                FilterType.IsLessThan,
                FilterType.IsGreaterThanOrEqualTo,
                FilterType.IsGreaterThan,
                FilterType.IsNull,
                FilterType.IsNotNull
            ];
        case 'boolean':
        case 'yesNo':
            return [
                FilterType.IsEqualTo,
                FilterType.IsNotEqualTo,
                FilterType.IsNull,
                FilterType.IsNotNull
            ];
        case 'date':
        case 'datetime':
            return [
                FilterType.IsEqualTo,
                FilterType.IsNotEqualTo,
                FilterType.IsNull,
                FilterType.IsNotNull,
                FilterType.IsBeforeOrEqualTo,
                FilterType.IsBefore,
                FilterType.IsAfterOrEqualTo,
                FilterType.IsAfter
            ]
    }
}