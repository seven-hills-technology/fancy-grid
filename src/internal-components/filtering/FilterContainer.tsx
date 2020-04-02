import React from 'react';

import {FilterType} from '../../models/filterType';
import {FilterCollection} from '../../models/filterState';
import {InlineFilterContainer} from './InlineFilterContainer';
import {PopupFilterContainer} from './PopupFilterContainer';
import {ColumnDefinition} from '../../models/columnDefinition';
import {FilterState} from '../../models/filterState';



function onFilterTextChanged(filterState: FilterState, columnDefinition: ColumnDefinition, filterText: string) {
    if (columnDefinition.name == null) {
        return;
    }

    let newFilter: FilterCollection = Object.assign([], filterState.filter);
    if (newFilter.length > 0) {
        const fieldNames: string[] = newFilter.map((x) => x.fieldName);
        //Check to see if there's a field that matches the filter already
        if (fieldNames.includes(columnDefinition.name)) {
            const index = fieldNames.indexOf(columnDefinition.name);
            newFilter[index].value = filterText;
        } else {
            //If not, add it
            newFilter.push({
                fieldName: columnDefinition.name,
                value: filterText,
                filterType: filterState.defaultFilter || FilterType.StartsWith
            });
        }
    } else {
        //If adding a filter but no filters exist
        newFilter = [
            {
                fieldName: columnDefinition.name,
                value: filterText,
                filterType: filterState.defaultFilter || FilterType.StartsWith
            }
        ];
    }
    filterState.onFilterChange!(newFilter);
}

function onFilterTypeChanged(filterState: FilterState, columnDefinition: ColumnDefinition, filterType: FilterType | null) {
    if (columnDefinition.name == null) {
        return;
    }

    let newFilter: FilterCollection = Object.assign([], filterState.filter);
    if (newFilter.length > 0) {
        const fieldNames: string[] = newFilter.map((x) => x.fieldName);
        //Check to see if there's a field that matches the filter already
        if (fieldNames.includes(columnDefinition.name)) {
            const index = fieldNames.indexOf(columnDefinition.name);
            newFilter[index].filterType = filterType;
        } else {
            //If not, add it
            newFilter.push({
                fieldName: columnDefinition.name,
                value: '',
                filterType: filterType
            });
        }
    } else {
        //If adding a filter but no filters exist
        newFilter = [
            {
                fieldName: columnDefinition.name,
                value: '',
                filterType: filterType
            }
        ];
    }
    filterState.onFilterChange!(newFilter);
}

export interface FilterContainerProps {
    filterStyle: "popup" | "inline";
    columnDefinition: ColumnDefinition;
    filterState: FilterState;
}

export const FilterContainer: React.FunctionComponent<FilterContainerProps> = props => {
    const matchedFilter = props.filterState!.filter.find((f) => f.fieldName == props.columnDefinition.name);
    const isFilterActive = matchedFilter?.value != null && matchedFilter?.value !== "";

    const selectedFilterType = matchedFilter?.filterType ?? props.filterState.defaultFilter ?? FilterType.StartsWith;
    const selectedValue = matchedFilter?.filterType != null ? matchedFilter.value : '';

    function onSelectedFilterTypeChange(filterType: FilterType) {
        onFilterTypeChanged(props.filterState, props.columnDefinition, filterType)
    }

    function onSelectedValueChange(value: string) {
        onFilterTextChanged(props.filterState!, props.columnDefinition, value, filterTimeout)
    }

    const filterContainerProps = {
        fieldName: props.columnDefinition.name ?? '',
        fieldTitle: props.columnDefinition.title ?? '',
        isActive: isFilterActive,
        filterTypes: [FilterType.StartsWith, FilterType.Contains],
        selectedFilterType,
        onSelectedFilterTypeChange,
        selectedValue,
        onSelectedValueChange
    };

    return (
        <div className="fancy-grid-column-filter-container">
            {props.filterStyle === "inline" ? <InlineFilterContainer {...filterContainerProps} /> : null}
            {props.filterStyle === "popup" ? <PopupFilterContainer {...filterContainerProps}/> : null}
        </div>
    )
};

FilterContainer.displayName = "FancyGrid.FilterContainer";