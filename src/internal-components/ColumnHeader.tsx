import React from 'react';
import { ColumnDefinition } from '../models/columnDefinition';
import { SortState } from '../models/sortState';
import { FilterState } from '../models/filterState';
import { ColumnHeaderCell } from './ColumnHeaderCell';

export interface ColumnHeaderRowProps {
    columnDefinitions: ColumnDefinition[];
    sortState: SortState | null;
    filterState: FilterState | null;
}

export const ColumnHeader: React.FunctionComponent<ColumnHeaderRowProps> = props => {
    return (
        <thead>
            <tr>
                {props.columnDefinitions.map((columnDefinition, i) => (
                    <ColumnHeaderCell 
                        key={i} 
                        columnDefinition={columnDefinition}
                        sortState={props.sortState}
                        filterState={props.filterState}
                    />
                ))}
            </tr>
        </thead>
    )
}

ColumnHeader.displayName = "FancyGrid.ColumnHeader";