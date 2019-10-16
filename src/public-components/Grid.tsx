import React, { ReactNode } from 'react';
import { ColumnList, getColumnDefinitionsFromColumnListComponent } from './ColumnList';
import { ColumnDefinition } from '../models/columnDefinition';
import { PageState } from '../models/pageState';
import { Pager } from './Pager';
import { SortState, SortCollection } from '../models/sortState';
import { Sortable } from './Sortable';
import { FilterState, FilterCollection } from '../models/filterState';
import { Filterable } from './Filterable';
import { DataBody } from '../internal-components/DataBody';
import { ColumnHeader } from '../internal-components/ColumnHeader';
import { PagerFooter } from '../internal-components/PagerFooter';

export interface GridProps {
    dataRows: any[];
}

function getAllFieldNamesFromListOfObjects(list: any[]): string[] {
    return [...new Set(([] as string[]).concat(...list.map(x => Object.keys(x))))];
}

function extractInformationFromGridChildren(children: ReactNode): {
    columnListColumnDefinitions: ColumnDefinition[] | null,
    pageState: PageState | null,
    sortState: SortState | null,
    filterState: FilterState | null
} {

    let columnListColumnDefinitions: ColumnDefinition[] | null = null;
    let pageState: PageState | null = null;
    let sortState: SortState | null = null;
    let filterState: FilterState | null = null;

    React.Children.forEach(children, child => {
        if (!React.isValidElement(child)) {
            return;
        }

        if (child.type === ColumnList) {
            const columnList = child as React.ReactComponentElement<typeof ColumnList>;
            columnListColumnDefinitions = getColumnDefinitionsFromColumnListComponent(columnList);
        } else if (child.type === Pager) {
            const pager = child as React.ReactComponentElement<typeof Pager>;
            pageState = {
                count: pager.props.count,
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
        } else if (child.type === Filterable) {
            const filterable = child as React.ReactComponentElement<typeof Filterable>;
            filterState = {
                filter: filterable.props.filter || [],
                onFilterChange: filterable.props.onFilterChange
            };
        } 
    });

    return {columnListColumnDefinitions, pageState, sortState, filterState};
}

export const Grid: React.FunctionComponent<GridProps> = (props) => {
    const {columnListColumnDefinitions, pageState, sortState, filterState} = extractInformationFromGridChildren(props.children);
    const columnDefinitions = columnListColumnDefinitions || getAllFieldNamesFromListOfObjects(props.dataRows).map(x => ({name: x, title: x, cellRenderer: null, filter: []}));

    return (
        <table>
            <ColumnHeader
                columnDefinitions={columnDefinitions}
                sortState={sortState}
                filterState={filterState}
            />
            <DataBody
                dataItems={props.dataRows}
                columnDefinitions={columnDefinitions}
            />
            {pageState != null ? (
                <PagerFooter 
                    columnDefinitions={columnDefinitions}
                    pageState={pageState}
                    dataRows={props.dataRows}
                />
            ) : null}
        </table>
    )
}

Grid.displayName = "FancyGrid.Grid";