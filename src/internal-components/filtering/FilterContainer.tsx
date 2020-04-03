import React from 'react';

import {FilterType} from '../../models/filterType';
import {FilterCollection} from '../../models/filterState';
import {InlineFilterContainer} from './InlineFilterContainer';
import {PopupFilterContainer} from './PopupFilterContainer';
import {ColumnDefinition} from '../../models/columnDefinition';
import {FilterState} from '../../models/filterState';

function updateFilterDefinition(fieldName: string, filterState: FilterState, filterType: FilterType, value: string, filterTimeout: number) {
    const newFilter = [
        ...(
            // value.length === 0 ? (
            //     // if value is empty, then instead of updating the matching filter definition, we need to remove it if it exists
            //     filterState.filter.filter(x => x.fieldName !== fieldName)
            // ) : (
            //     // if value is not empty, then we need to update the matching filter definition if it exists
                filterState.filter.map(oldFilterStateFilterDefinition => oldFilterStateFilterDefinition.fieldName === fieldName ? (
                    {
                        fieldName,
                        filterType,
                        value
                    }
                ) : oldFilterStateFilterDefinition)
            // )
        ),
        ...(
            // value.length === 0 ? (
            //     // if value is empty, then there's no case where we'd want to create a new filter definition
            //     []
            // ) : (
                // if value is not empty, then we need to create the filter definition if it doesn't already exist
                filterState.filter.find(x => x.fieldName === fieldName) == null ? [
                    {
                        fieldName,
                        filterType,
                        value
                    }
                ] : []
            // )
        )
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
    const matchedFilter = props.filterState.filter.find((f) => f.fieldName == props.fieldName);
    const isFilterActive = matchedFilter != null && matchedFilter.value.length > 0;

    const selectedFilterType = matchedFilter?.filterType ?? props.filterState.defaultFilter ?? FilterType.StartsWith;
    const selectedValue = matchedFilter?.value ?? '';

    const filterTimeout = props.filterStyle === "inline" ? 1000 : 0;

    function onFilterChange(newFilterType: FilterType, newValue: string) {
        updateFilterDefinition(props.fieldName, props.filterState, newFilterType, newValue, filterTimeout)
    }

    const filterContainerProps = {
        fieldName: props.fieldName,
        fieldTitle: props.fieldTitle,
        isActive: isFilterActive,
        filterTypes: [FilterType.StartsWith, FilterType.Contains],
        selectedFilterType,
        selectedValue,
        onFilterChange
    };

    return (
        <div className="fancy-grid-column-filter-container">
            {props.filterStyle === "inline" ? <InlineFilterContainer {...filterContainerProps} /> : null}
            {props.filterStyle === "popup" ? <PopupFilterContainer {...filterContainerProps}/> : null}
        </div>
    )
};

FilterContainer.displayName = "FancyGrid.FilterContainer";