import React from 'react';
import { ColumnDefinition } from '../models/columnDefinition';
import { SortState, SortCollection } from '../models/sortState';
import { FilterState } from '../models/filterState';
import {FilterContainer} from './filtering/FilterContainer';
import { FilterableColumnDefinition } from '../models/filterableColumnDefinition';


function applySort(sortState: SortState, columnDefinition: ColumnDefinition) {
    if (columnDefinition.name == null) {
        return;
    }

    if (sortState.sort.length > 0 && sortState.sort[0].fieldName === columnDefinition.name) {
        const dir = sortState.sort[0].dir === 'desc' ? 'asc' : 'desc';
        const newSort: SortCollection = [
            {
                fieldName: columnDefinition.name,
                dir
            }
        ];
        sortState.onSortChange(newSort);
    } else {
        const newSort: SortCollection = [
            {
                fieldName: columnDefinition.name,
                dir: 'asc'
            }
        ];
        sortState.onSortChange(newSort);
    }
}

function getFilterStyle(columnDefinition: ColumnDefinition, filterState: FilterState | null) {
    if (filterState == null || columnDefinition.filterable === false) {
        return false;
    }

    if (columnDefinition.filterable === "inline" || columnDefinition.filterable === "popup") {
        return columnDefinition.filterable;
    }

    return filterState.filterStyle ?? "inline";
}

export interface ColumnHeaderCellProps {
    columnDefinition: ColumnDefinition;
    sortState: SortState | null;
    filterState: FilterState | null;
}
 
export const ColumnHeaderCell: React.FunctionComponent<ColumnHeaderCellProps> = props => {
    const filterStyle = getFilterStyle(props.columnDefinition, props.filterState);
    let sortable = (props.columnDefinition.sortable == null || props.columnDefinition.sortable === true) && props.columnDefinition.name != null && props.sortState != null && props.sortState.onSortChange != null;

    let isSorting = props.sortState != null && props.sortState.sort != null && props.sortState.sort.length > 0 && props.sortState.sort[0].fieldName === props.columnDefinition.name;
    let direction = isSorting ? props.sortState!.sort[0].dir : null;

    const filterableColumnDefinition = props.filterState != null && props.columnDefinition.name != null && filterStyle !== false ? {
        name: props.columnDefinition.name,
        title: props.columnDefinition.title ?? props.columnDefinition.name,
        filterStyle,
        fieldType: props.columnDefinition.fieldType ?? "text",
        whiteList: props.columnDefinition.whiteList,
        dropdownOptions: props.columnDefinition.dropdownOptions
    } as FilterableColumnDefinition : null;

    return (
        <th {...(props.columnDefinition.tdProps != null ? props.columnDefinition.tdProps : {})} className={props.columnDefinition.className != null ? props.columnDefinition.className : ''}>
            <div className='fancy-grid-column-header-text-container'>
                <span className={`fancy-grid-column-header-text ${sortable ? 'fancy-grid-sortable' : ''} ${isSorting && direction ? 'fancy-grid-column-header-text-sort-' + direction : ''}`}
                      onClick={() => props.sortState && sortable ? applySort(props.sortState!, props.columnDefinition) : null}
                >
                    {props.columnDefinition.title}
                </span>

                {props.filterState != null && filterableColumnDefinition?.filterStyle === "popup" ? (
                    <FilterContainer
                        columnDefinition={filterableColumnDefinition}
                        filterState={props.filterState}
                    />
                ) : null}
            </div>
            {props.filterState != null && filterableColumnDefinition?.filterStyle === "inline" ? (
                <FilterContainer
                    columnDefinition={filterableColumnDefinition}
                    filterState={props.filterState}
                />
            ) : null}
        </th>
    )
}

ColumnHeaderCell.displayName = "FancyGrid.ColumnHeaderCell";