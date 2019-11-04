
import React from 'react';
import { ColumnDefinition } from '../models/columnDefinition';
import { SortState, SortCollection } from '../models/sortState';
import { FilterState, FilterCollection, FilterDefinition } from '../models/filterState';
import { POINT_CONVERSION_COMPRESSED } from 'constants';
import { FilterType } from '../models/filterType';
import { FilterButton } from './FilterButton';


function applySort(sortState: SortState, columnDefinition: ColumnDefinition) {
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

function onFilterTextChanged(filterState: FilterState, columnDefinition: ColumnDefinition, filterText: string) {
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

export interface ColumnHeaderCellProps {
    columnDefinition: ColumnDefinition;
    sortState: SortState | null;
    filterState: FilterState | null;
}

export const ColumnHeaderCell: React.FunctionComponent<ColumnHeaderCellProps> = props => {
    let matchedFilter: FilterDefinition | null = null;
    let filterable = props.filterState != null && props.filterState.onFilterChange != null;
    let sortable = props.sortState != null && props.sortState.onSortChange != null;
    if (filterable) {
        matchedFilter = props.filterState!.filter.find((f) => f.fieldName == props.columnDefinition.name)! || null;
    }

    let isSorting = props.sortState != null && props.sortState.sort != null && props.sortState.sort.length > 0 && props.sortState.sort[0].fieldName === props.columnDefinition.name;
    let direction = isSorting ? props.sortState!.sort[0].dir : null;

    return (
        <th className="fancy-grid-column-header" {...(props.columnDefinition.tdProps != null ? props.columnDefinition.tdProps : {})}>
            <div className={`${'fancy-grid-column-header-text-container'} ${sortable ? 'fancy-grid-sortable' : ''}`} onClick={() => props.sortState ? applySort(props.sortState!, props.columnDefinition) : null}>
                <span className={`fancy-grid-column-header-text ${isSorting && direction ? 'fancy-grid-column-header-text-sort-' + direction : ''}`}>{props.columnDefinition.title}</span>
            </div>
            {filterable ? (
                <div className="fancy-grid-column-filter-container">
                    <input 
                        className="fancy-grid-column-filter-input fancy-grid-input"
                        name={props.columnDefinition.name}
                        onChange={(event) => onFilterTextChanged(props.filterState!, props.columnDefinition, event.target.value)}
                        placeholder={props.columnDefinition.title}
                        type="text"
                        value={matchedFilter != null && matchedFilter.value != null ? matchedFilter.value : ''} />
                    <FilterButton 
                        onChange={(filterType) => onFilterTypeChanged(props.filterState!, props.columnDefinition, filterType == '' || filterType == null ? null : filterType as FilterType)} 
                        value={matchedFilter != null && matchedFilter.filterType != null ? matchedFilter.filterType : props.filterState!.defaultFilter || FilterType.StartsWith}
                        filterTypes={[FilterType.StartsWith, FilterType.Contains]} />
                    </div>
            ) : null}
        </th>
    )
}

ColumnHeaderCell.displayName = "FancyGrid.ColumnHeaderCell";