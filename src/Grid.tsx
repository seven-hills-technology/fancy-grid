import React from 'react';
import { ColumnList, getColumnDefinitionsFromColumnListComponent } from './ColumnList';
import { ColumnDefinition } from './models/columnDefinition';

export interface GridProps {
    dataRows: any[];
}

function getAllFieldNamesFromListOfObjects(list: any[]): string[] {
    return [...new Set(([] as string[]).concat(...list.map(x => Object.keys(x))))];
}

export const Grid: React.FunctionComponent<GridProps> = (props) => {
    let columnListColumnDefinitions: ColumnDefinition[] | null = null;

    React.Children.forEach(props.children, child => {
        if (!React.isValidElement(child)) {
            return;
        }

        if (child.type === ColumnList) {
            const columnList = child as React.ReactComponentElement<typeof ColumnList>;
            columnListColumnDefinitions = getColumnDefinitionsFromColumnListComponent(columnList);
        }
    });

    const columnDefinitions = columnListColumnDefinitions || getAllFieldNamesFromListOfObjects(props.dataRows).map(x => ({name: x, title: x}));

    return (
        <table>
            <thead>
                <tr>
                    {columnDefinitions.map((columnDefinition, i) => (
                        <th key={i}>{columnDefinition.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.dataRows.map((dataRow, i) => (
                    <tr key={i}>
                        {columnDefinitions.map((columnDefinition, i) => (
                            <td key={i}>{dataRow[columnDefinition.name]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}