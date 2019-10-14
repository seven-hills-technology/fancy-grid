import React, { ReactNode, useState, useCallback, useMemo } from 'react';
import { ColumnList, getColumnDefinitionsFromColumnListComponent } from './ColumnList';
import { ColumnDefinition } from '../models/columnDefinition';
import { PageState } from '../models/pageState';
import { Pager } from './Pager';
import { SortState } from '../models/sortState';
import { Sortable } from './Sortable';
import { FilterState } from '../models/filterState';
import { Filterable } from './Filterable';
import { DataBody } from '../internal-components/DataBody';
import { ColumnHeader } from '../internal-components/ColumnHeader';
import { PagerFooter } from '../internal-components/PagerFooter';
import { LocalDataSource } from './LocalDataSource';
import { DataSourceDefinition } from '../models/dataSourceDefinition';
import { DataResult } from '../models/dataResult';
import { RemoteDataSource } from './RemoteDataSource';

export interface GridProps { }

function getAllFieldNamesFromListOfObjects(list: any[]): string[] {
    return [...new Set(([] as string[]).concat(...list.map(x => Object.keys(x))))];
}

function extractInformationFromGridChildren(children: ReactNode): {
    columnListColumnDefinitions: ColumnDefinition[] | null,
    pageState: PageState | null,
    sortState: SortState | null,
    filterState: FilterState | null,
    dataSource: DataSourceDefinition | null
} {

    let columnListColumnDefinitions: ColumnDefinition[] | null = null;
    let pageState: PageState | null = null;
    let sortState: SortState | null = null;
    let filterState: FilterState | null = null;
    let dataSource: DataSourceDefinition | null = null;

    React.Children.forEach(children, child => {
        if (!React.isValidElement(child)) {
            return;
        }

        if (child.type === ColumnList) {
            const columnList = child as React.ReactComponentElement<typeof ColumnList>;
            columnListColumnDefinitions = getColumnDefinitionsFromColumnListComponent(columnList);
        } else if (child.type === Pager) {
            const pager = child as React.ReactComponentElement<typeof Pager>;
            pageState = pager.props;
        } else if (child.type === Sortable) {
            const sortable = child as React.ReactComponentElement<typeof Sortable>;
            sortState = sortable.props;
        } else if (child.type === Filterable) {
            const filterable = child as React.ReactComponentElement<typeof Filterable>;
            filterState = filterable.props;
        } else if (child.type === LocalDataSource) {
            const localDataSource = child as React.ReactComponentElement<typeof LocalDataSource>;
            dataSource = {
                data: localDataSource.props.data
            }
        } else if (child.type === RemoteDataSource) {
            const remoteDataSource = child as React.ReactComponentElement<typeof RemoteDataSource>;
            dataSource = {
                fetchData: remoteDataSource.props.fetchData
            }
        }
    });

    return {columnListColumnDefinitions, pageState, sortState, filterState, dataSource};
}

export const Grid: React.FunctionComponent<GridProps> = (props) => {
    const [dataResult, setDataResult] = useState({data: [], total: 0} as DataResult);

    const {columnListColumnDefinitions, pageState, sortState, filterState, dataSource} = extractInformationFromGridChildren(props.children);

    const updateDataResultAsync = async () => {
        if (dataSource == null) {
            throw new Error("broke");
        } if (dataSource.data != null) {
            return {data: dataSource.data, total: pageState != null ? pageState.count : 0};
        } else if (dataSource.fetchData != null) {
            return await dataSource.fetchData(filterState!.filter, sortState!.sort, pageState!.page, pageState!.pageSize)
        } else {
            throw new Error("broke");
        }
    }
    
    const dataResultPromise = useMemo(() => updateDataResultAsync(), [filterState, sortState, pageState]);
    dataResultPromise
        .then(newDataResult => {
            if (newDataResult !== dataResult && (newDataResult.data !== dataResult.data || newDataResult.total !== dataResult.total)) {
                setDataResult(newDataResult);
            }
        })

    const columnDefinitions = columnListColumnDefinitions || getAllFieldNamesFromListOfObjects(dataResult.data).map(x => ({name: x, title: x, cellRenderer: null, filter: []}));

    return (
        <table className="fancy-grid">
            <ColumnHeader
                columnDefinitions={columnDefinitions}
                sortState={sortState}
                filterState={filterState}
            />
            <DataBody
                dataItems={dataResult.data}
                columnDefinitions={columnDefinitions}
            />
            {pageState != null ? (
                <PagerFooter 
                    columnDefinitions={columnDefinitions}
                    pageState={pageState}
                    visibleDataRows={dataResult.data.length}
                    total={dataResult.total}
                />
            ) : null}
        </table>
    )
}

Grid.displayName = "FancyGrid.Grid";