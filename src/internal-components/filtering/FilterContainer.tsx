import React from 'react';

import {FilterType} from '../../models/filterType';
import {FilterCollection, FilterDefinition} from '../../models/filterState';
import {InlineFilterContainer} from './InlineFilterContainer';
import {PopupFilterContainer} from './PopupFilterContainer';
import {ColumnDefinition} from '../../models/columnDefinition';
import {FilterState} from '../../models/filterState';

function updateFilterDefinitions(fieldName: string, filterState: FilterState, filterDefinitions: FilterDefinition[], filterTimeout: number) {
    const newFilter = [
        ...filterState.filter.filter(x => x.fieldName !== fieldName),
        ...filterDefinitions
    ];

    filterState.onFilterChange(newFilter, filterTimeout);
}

export interface FilterContainerProps {
    filterStyle: "popup" | "inline";
    filterState: FilterState;
    fieldName: string;
    fieldTitle: string;
}

export const FilterContainer: React.FunctionComponent<FilterContainerProps> = props => {
    const matchedFilterDefinitions = props.filterState.filter.filter((f) => f.fieldName == props.fieldName);
    const isFilterActive = matchedFilterDefinitions.filter(x => x.value != null && x.value.length > 0).length > 0;

    const filterTimeout = props.filterStyle === "inline" ? 1000 : 0;

    const filterTypes = [FilterType.StartsWith, FilterType.Contains];

    function onFilterChange(filterDefinitions: FilterDefinition[]) {
        updateFilterDefinitions(props.fieldName, props.filterState, filterDefinitions, filterTimeout)
    }

    return (
        <div className="fancy-grid-column-filter-container">
            {props.filterStyle === "inline" ? <InlineFilterContainer
                filterDefinition={matchedFilterDefinitions[0] ?? null}
                fieldName={props.fieldName}
                fieldTitle={props.fieldTitle}
                isActive={isFilterActive}
                filterTypes={filterTypes}
                onFilterChange={filterDefinition => onFilterChange([filterDefinition])}
            /> : null}
            {props.filterStyle === "popup" ? <PopupFilterContainer
                filterDefinitions={matchedFilterDefinitions}
                fieldName={props.fieldName}
                fieldTitle={props.fieldTitle}
                isActive={isFilterActive}
                filterTypes={filterTypes}
                onFilterChange={onFilterChange}
            /> : null}
        </div>
    )
};

FilterContainer.displayName = "FancyGrid.FilterContainer";