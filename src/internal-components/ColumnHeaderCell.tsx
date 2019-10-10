
import React from 'react';
import { ColumnDefinition } from '../models/columnDefinition';
import { SortState, SortCollection } from '../models/sortState';
import { FilterState, FilterCollection } from '../models/filterState';
import { POINT_CONVERSION_COMPRESSED } from 'constants';


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

function onFilterTextChanged(filterState: FilterState, columnDefinition: ColumnDefinition, value: string) {
    let newFilter: FilterCollection = Object.assign([], filterState.filter);
    if (newFilter.length > 0) {
        const fieldNames: string[] = newFilter.map((x) => x.fieldName);
        //Check to see if there's a field that matches the filter already
        if (fieldNames.includes(columnDefinition.name)) {
            const index = fieldNames.indexOf(columnDefinition.name);
            if (value.length == 0) {
                //If there is an the textbox is empty, remove the filter
                newFilter.splice(index)
            } else {
                //Update filter
                newFilter[index].value = value;
            }
        } else {
            //If not, add it
            newFilter.push({
                fieldName: columnDefinition.name,
                value: value,
                filterType: null
            });
        }
    } else {
        //If adding a filter but no filters exist
        newFilter = [
            {
                fieldName: columnDefinition.name,
                value: value,
                filterType: null
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
    return (
        <th onClick={() => props.sortState ? applySort(props.sortState!, props.columnDefinition) : null}>
            {props.columnDefinition.title}
            {props.sortState != null && props.sortState.sort != null && props.sortState.sort.length > 0 && props.sortState.sort[0].fieldName === props.columnDefinition.name ? (
                props.sortState.sort[0].dir === 'desc' ? <span> (desc)</span> : <span> (asc)</span>
            ) : null}
            {props.filterState != null && props.filterState.onFilterChange != null ? (
                <div>
                    <input name={props.columnDefinition.name} type="text" placeholder={props.columnDefinition.title}  onChange={(event) => onFilterTextChanged(props.filterState!, props.columnDefinition, event.target.value)} />
                </div>
            ) : null}
        </th>
    )
}