import React from 'react';
import { ColumnList, getColumnDefinitionsFromColumnListComponent } from './ColumnList';
import { ColumnDefinition } from './models/columnDefinition';
import { CellRendererFunction } from './models/cellRendererFunction';
import { PageState } from './models/pageState';
import { Pager } from './Pager';
import { SortState, SortCollection } from './models/sortState';
import { Sortable } from './Sortable';

export interface GridProps {
    dataRows: any[];
    count?: number;
}

function getAllFieldNamesFromListOfObjects(list: any[]): string[] {
    return [...new Set(([] as string[]).concat(...list.map(x => Object.keys(x))))];
}

export const Grid: React.FunctionComponent<GridProps> = (props) => {
    let columnListColumnDefinitions: ColumnDefinition[] | null = null;
    let pageState: PageState | null = null;
    let sortState: SortState | null = null;

    function columnHeaderClicked(columnDefinition: ColumnDefinition) {
        if (sortState != null) {
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
    }

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
                onPageChange: pager.props.onPageChange,
                pageSize: pager.props.pageSize,
                onPageSizeChange: pager.props.onPageSizeChange
            }
        } else if (child.type === Sortable) {
            const sortable = child as React.ReactComponentElement<typeof Sortable>;
            sortState = {
                sort: sortable.props.sort || [],
                onSortChange: sortable.props.onSortChange
            };
        }
    });

    const columnDefinitions = columnListColumnDefinitions || getAllFieldNamesFromListOfObjects(props.dataRows).map(x => ({name: x, title: x, cellRenderer: null}));

    return (
        <table>
            <thead>
                <tr>
                    {columnDefinitions.map((columnDefinition, i) => (
                        <th key={i} onClick={() => columnHeaderClicked(columnDefinition)}>
                            {columnDefinition.title}
                            {sortState != null && sortState.sort != null && sortState.sort.length > 0 && sortState.sort[0].fieldName === columnDefinition.name ? (
                                sortState.sort[0].dir === 'desc' ? <span> (desc)</span> : <span> (asc)</span>
                            ) : null}
                        </th>
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
                        <td>
                            <select onChange={(event) => pageState!.onPageSizeChange(Number(event.target.value), pageState!.pageSize)} value={pageState!.pageSize}>
                                {[5, 10, 20, 50, 100].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select> 
                        </td>
                        <td> {(((pageState!.page + 1) * pageState!.pageSize) - pageState!.pageSize ) + 1 + " - " + ((pageState!.page * pageState!.pageSize) + props.dataRows.length) + " of " + props.count + " items"}
                        </td>
                    </tr>
                </tfoot>
            ) : null}
        </table>
    )
}