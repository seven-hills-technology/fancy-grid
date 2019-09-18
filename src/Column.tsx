import React from 'react';
import { ColumnDefinition } from './models/columnDefinition';
import { CellRenderer } from './CellRenderer';

export type ColumnProps = ColumnDefinition;

export const Column: React.FunctionComponent<ColumnProps> = () => {
    return null;
}


export function getColumnDefinitionFromColumnComponent(column: React.ReactComponentElement<typeof Column>): ColumnDefinition {
    const cellRendererFunctions = React.Children.map(column.props.children, child => {
        if (!React.isValidElement(child)) {
            return null;
        }

        if (child.type === CellRenderer) {
            const cellRendererComponent = child as React.ReactComponentElement<typeof CellRenderer>;
            return cellRendererComponent.props.children;
        }

        return null;
    });

    const cellRendererFunction = (cellRendererFunctions || []).filter(x => x != null)[0];

    return {
        name: column.props.name,
        title: column.props.title,
        cellRenderer: cellRendererFunction
    };
}