import React from 'react';
import { ColumnList, getColumnDefinitionsFromColumnListComponent } from './ColumnList';
import { ColumnDefinition } from './models/columnDefinition';
import { CellRendererFunction } from './models/cellRendererFunction';
import { PageState } from './models/pageState';
import { Pager } from './Pager';

export interface GridProps {
    dataRows: any[];
}

function getAllFieldNamesFromListOfObjects(list: any[]): string[] {
    return [...new Set(([] as string[]).concat(...list.map(x => Object.keys(x))))];
}

export const Grid: React.FunctionComponent<GridProps> = (props) => {
    let columnListColumnDefinitions: ColumnDefinition[] | null = null;
    let pageState: PageState | null = null;

    React.Children.forEach(props.children, child => {
        if (!React.isValidElement(child)) {
            return;
        }

        if (child.type === ColumnList) {
            const columnList = child as React.ReactComponentElement<typeof ColumnList>;
            columnListColumnDefinitions = getColumnDefinitionsFromColumnListComponent(columnList);
        } else if (child.type === Pager) {
            const pager = child as React.ReactComponentElement<typeof Pager>;
            pageState = {
                page: pager.props.page,
                numPages: pager.props.numPages,
                onPageChange: pager.props.onPageChange
            }
        }
    });

    const columnDefinitions = columnListColumnDefinitions || getAllFieldNamesFromListOfObjects(props.dataRows).map(x => ({name: x, title: x, cellRenderer: null}));

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
                            <td key={i}>{columnDefinition.cellRenderer != null ? (columnDefinition.cellRenderer as unknown as CellRendererFunction)(dataRow[columnDefinition.name], dataRow) : dataRow[columnDefinition.name]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
            {pageState != null ? (
                <tfoot>
                    <tr>
                        <td colSpan={columnDefinitions.length}>
                            <button disabled={pageState!.page <= 0} onClick={() => pageState!.onPageChange(pageState!.page - 1)}>&lt;</button>
                            <span>{pageState!.page + 1}</span>
                            <button disabled={pageState!.page >= (pageState!.numPages - 1)} onClick={() => pageState!.onPageChange(pageState!.page + 1)}>&gt;</button>
                        </td>
                    </tr>
                </tfoot>
            ) : null}
        </table>
    )
}