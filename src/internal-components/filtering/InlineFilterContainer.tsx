import React, {useState} from 'react';

import {FilterTypeDropdownButton} from './FilterTypeDropdownButton';
import {FilterType} from '../../models/filterType';
import {FilterDefinition} from '../../models/filterState';


export interface InlineFilterContainerProps {
    fieldName: string;
    fieldTitle: string;
    isActive: boolean;
    filterTypes: FilterType[];
    filterDefinition: FilterDefinition | null;
    onFilterChange: (filterDefinition: FilterDefinition) => void;
}

export const InlineFilterContainer: React.FunctionComponent<InlineFilterContainerProps> = props => {
    const filterDefinition = props.filterDefinition ?? {
        fieldName: props.fieldName,
        value: "",
        filterType: props.filterTypes[0]
    };

    return (
        <>
            <input
                className="fancy-grid-column-filter-input fancy-grid-input"
                name={props.fieldName}
                onChange={(event) => props.onFilterChange({...filterDefinition, value: event.target.value})}
                placeholder={props.fieldTitle}
                type="text"
                value={filterDefinition.value} />
            <FilterTypeDropdownButton selectedFilterType={filterDefinition.filterType} filterTypes={props.filterTypes} onChange={newFilterType => props.onFilterChange({...filterDefinition, filterType: newFilterType})}>
                <div className={`filter-button ${props.isActive ? "filter-button-active" : ""}`}>
                    <i className={`${'filter-button-content'} fas fa-filter`} />
                </div>
            </FilterTypeDropdownButton>
        </>
    )
};

InlineFilterContainer.displayName = "FancyGrid.InlineFilterContainer";