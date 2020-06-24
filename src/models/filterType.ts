import {FieldType} from './filterableColumnDefinition';

export enum FilterType {
    IsEqualTo = "IsEqualTo",
    IsNotEqualTo = "IsNotEqualTo",
    StartsWith = "StartsWith",
    Contains = "Contains",
    DoesNotContain = "DoesNotContain",
    EndsWith = "EndsWith",
    IsNull = "IsNull",
    IsNotNull = "IsNotNull",
    IsEmpty = "IsEmpty",
    IsNotEmpty = "IsNotEmpty",
    IsLessThanOrEqualTo = "IsLessThanOrEqualTo",
    IsLessThan = "IsLessThan",
    IsGreaterThanOrEqualTo = "IsGreaterThanOrEqualTo",
    IsGreaterThan = "IsGreaterThan",
    IsBeforeOrEqualTo = "IsBeforeOrEqualTo",
    IsBefore = "IsBefore",
    IsAfterOrEqualTo = "IsAfterOrEqualTo",
    IsAfter = "IsAfter"
}

export const FilterTypeOperatorCodes = {
    [FilterType.IsEqualTo]: "eq",
    [FilterType.IsNotEqualTo]: "neq",
    [FilterType.StartsWith]: "startswith",
    [FilterType.Contains]: "contains",
    [FilterType.DoesNotContain]: "doesnotcontain",
    [FilterType.EndsWith]: "endswith",
    [FilterType.IsNull]: "isnull",
    [FilterType.IsNotNull]: "isnotnull",
    [FilterType.IsEmpty]: "isempty",
    [FilterType.IsNotEmpty]: "isnotempty",
    [FilterType.IsLessThanOrEqualTo]: "lte",
    [FilterType.IsLessThan]: "lt",
    [FilterType.IsGreaterThanOrEqualTo]: "gte",
    [FilterType.IsGreaterThan]: "gt",
    [FilterType.IsBeforeOrEqualTo]: "lte",
    [FilterType.IsBefore]: "lt",
    [FilterType.IsAfterOrEqualTo]: "gte",
    [FilterType.IsAfter]: "gt"
};

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