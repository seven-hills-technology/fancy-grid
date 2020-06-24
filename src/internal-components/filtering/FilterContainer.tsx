import React from 'react';

import {FilterDefinition, FilterState, isValidFilterDefinition} from '../../models/filterState';
import {InlineFilterContainer} from './InlineFilterContainer';
import {PopupFilterContainer} from './PopupFilterContainer';
import {FilterableColumnDefinition} from '../../models/filterableColumnDefinition';

function updateFilterDefinitions(fieldName: string, filterState: FilterState, filterDefinitions: FilterDefinition[], filterTimeout: number) {
    const newFilter = [
        ...filterState.filter.filter(x => x.fieldName !== fieldName),
        ...filterDefinitions
    ];

    filterState.onFilterChange(newFilter, filterTimeout);
}

export interface FilterContainerProps {
    columnDefinition: FilterableColumnDefinition;
    filterState: FilterState;
}

export const FilterContainer: React.FunctionComponent<FilterContainerProps> = props => {
    const matchedFilterDefinitions = props.filterState.filter.filter((f) => f.fieldName == props.columnDefinition.name);
    const isFilterActive = matchedFilterDefinitions.filter(x => isValidFilterDefinition(x)).length > 0;

    const filterTimeout = props.columnDefinition.filterStyle === "inline" ? 1000 : 0;


    function onFilterChange(filterDefinitions: FilterDefinition[]) {
        updateFilterDefinitions(props.columnDefinition.name, props.filterState, filterDefinitions, filterTimeout)
    }

    return (
        <div className="fancy-grid-column-filter-container">
            {props.columnDefinition.filterStyle === "inline" ? <InlineFilterContainer
                columnDefinition={props.columnDefinition}
                filterDefinition={matchedFilterDefinitions[0] ?? null}
                isActive={isFilterActive}
                onFilterChange={filterDefinition => onFilterChange([filterDefinition])}
            /> : null}
            {props.columnDefinition.filterStyle === "popup" ? <PopupFilterContainer
                columnDefinition={props.columnDefinition}
                filterDefinitions={matchedFilterDefinitions}
                isActive={isFilterActive}
                onFilterChange={onFilterChange}
            /> : null}
        </div>
    )
};

FilterContainer.displayName = "FancyGrid.FilterContainer";