import React, {useMemo, useState} from 'react';

import {FilterTypeDropdownButton} from './FilterTypeDropdownButton';
import {FilterTypeOperatorCodes, getFilterTypesForFieldType} from '../../models/filterType';
import {FilterDefinition} from '../../models/filterState';
import {FilterableColumnDefinition} from '../../models/filterableColumnDefinition';
import {FilterInput} from './FilterInput';


export interface InlineFilterContainerProps {
    columnDefinition: FilterableColumnDefinition;
    isActive: boolean;
    filterDefinition: FilterDefinition | null;
    onFilterChange: (filterDefinition: FilterDefinition) => void;
}

export const InlineFilterContainer: React.FunctionComponent<InlineFilterContainerProps> = props => {
    const filterTypes = useMemo(() => {
        const filterTypesForFieldType = getFilterTypesForFieldType(props.columnDefinition.fieldType);
        if (props.columnDefinition.whiteList != null) {
            return props.columnDefinition.whiteList.filter(x => filterTypesForFieldType.includes(x));
        }
        return filterTypesForFieldType;
    }, [props.columnDefinition]);

    const filterDefinition = props.filterDefinition ?? {
        fieldName: props.columnDefinition.name,
        fieldType: props.columnDefinition.fieldType,
        value: "",
        filterType: filterTypes[0],
        operator: FilterTypeOperatorCodes[filterTypes[0]]
    };

    return (
        <>
            <FilterInput
                filterStyle="inline"
                columnDefinition={props.columnDefinition}
                value={filterDefinition.value}
                onChange={value => props.onFilterChange({...filterDefinition, value})}
                filterType={filterDefinition.filterType}
            />

            {(filterTypes && filterTypes.length > 1 && props.columnDefinition.fieldType !== 'dropdown') &&
                <FilterTypeDropdownButton selectedFilterType={filterDefinition.filterType} filterTypes={filterTypes} onChange={newFilterType => props.onFilterChange({...filterDefinition, filterType: newFilterType, operator: FilterTypeOperatorCodes[newFilterType]})}>
                    <div className={`filter-button ${props.isActive ? "filter-button-active" : ""}`}>
                        <i className={`${'filter-button-content'} fas fa-filter`} />
                    </div>
                </FilterTypeDropdownButton>
            }
        </>
    )
};

InlineFilterContainer.displayName = "FancyGrid.InlineFilterContainer";