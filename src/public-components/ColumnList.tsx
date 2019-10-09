import React from 'react';
import { Column, getColumnDefinitionFromColumnComponent } from './Column';
import { ColumnDefinition } from '../models/columnDefinition';

export function getColumnDefinitionsFromColumnListComponent(columnList: React.ReactComponentElement<typeof ColumnList>): ColumnDefinition[] {
    const columnDefinitions = React.Children.map(columnList.props.children, child => {
        if (!React.isValidElement(child)) {
            return;
        }

        if (child.type === Column) {
            const column = child as React.ReactComponentElement<typeof Column>;
            return getColumnDefinitionFromColumnComponent(column);
        }

        return null;
    })
        .filter(x => x != null)
        .map(x => x as ColumnDefinition) // useless line to convince typescript that nothing in this list is null;

    return columnDefinitions;
}

export const ColumnList: React.FunctionComponent = () => {
    return null;
}