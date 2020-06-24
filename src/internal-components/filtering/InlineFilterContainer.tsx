import React, {useMemo, useState} from 'react';

import {FilterTypeDropdownButton} from './FilterTypeDropdownButton';
import {getFilterTypesForFieldType} from '../../models/filterType';
import {FilterDefinition} from '../../models/filterState';
import {FilterableColumnDefinition} from '../../models/filterableColumnDefinition';


export interface InlineFilterContainerProps {
    columnDefinition: FilterableColumnDefinition;
    isActive: boolean;
    filterDefinition: FilterDefinition | null;
    onFilterChange: (filterDefinition: FilterDefinition) => void;
}

export const InlineFilterContainer: React.FunctionComponent<InlineFilterContainerProps> = props => {
    const filterTypes = useMemo(() => getFilterTypesForFieldType(props.columnDefinition.fieldType), [props.columnDefinition]);

    const filterDefinition = props.filterDefinition ?? {
        fieldName: props.columnDefinition.name,
        value: "",
        filterType: filterTypes[0]
    };

    return (
        <>
            <input
                className="fancy-grid-column-filter-input fancy-grid-input"
                name={props.columnDefinition.name}
                onChange={(event) => props.onFilterChange({...filterDefinition, value: event.target.value})}
                placeholder={props.columnDefinition.title}
                type="text"
                value={filterDefinition.value} />
            <FilterTypeDropdownButton selectedFilterType={filterDefinition.filterType} filterTypes={filterTypes} onChange={newFilterType => props.onFilterChange({...filterDefinition, filterType: newFilterType})}>
                <div className={`filter-button ${props.isActive ? "filter-button-active" : ""}`}>
                    <i className={`${'filter-button-content'} fas fa-filter`} />
                </div>
            </FilterTypeDropdownButton>
        </>
    )
};

InlineFilterContainer.displayName = "FancyGrid.InlineFilterContainer";