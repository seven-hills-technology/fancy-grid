import React, { useState, useEffect } from 'react';
import FancyGrid from '../../dist';

import usStates from './states.json';

interface DataState {
    data: any[];
    total: number;
}

export const code = `function applyFilter(dataRows: any[], filters: FancyGrid.FilterCollection) {
    let filteredDataRows = dataRows;
        for (const filter of filters) {
            const {fieldName, value, filterType} = filter;
            filteredDataRows = filteredDataRows.filter((x, i) => {
                const xVal = x[fieldName].toLowerCase();
                switch (filterType) {
                    case FancyGrid.FilterType.StartsWith:
                        if (String(xVal).startsWith(value.toLowerCase())) {
                            return true;
                        }
                        break;
                    case FancyGrid.FilterType.Contains:
                        if (String(xVal).includes(value.toLowerCase())) {
                            return true;
                        }
                        break;
                    default:
                        if (String(xVal).startsWith(value.toLowerCase())) {
                            return true;
                        }
                        break;
                }
                return false;
            });
        }
        return filteredDataRows;
}

export function FilterableExample() {
    const [filterState, setFilterState] = useState([] as FancyGrid.FilterCollection);
    const dataRows = applyFilter(usStates.data, filterState);
    
    return (
        <FancyGrid.Grid dataRows={dataRows}>
            <FancyGrid.ColumnList>
                <FancyGrid.Column
                    name="name"
                    title="Name"/>
                <FancyGrid.Column
                    name="abbreviation"
                    title="Abbreviation"/>
            </FancyGrid.ColumnList>
            <FancyGrid.Filterable filter={filterState} onFilterChange={setFilterState}/>
        </FancyGrid.Grid>
    )
}`

function applyFilter(dataRows: any[], filters: FancyGrid.FilterCollection) {
    let filteredDataRows = dataRows;
        for (const filter of filters) {
            const {fieldName, value, filterType} = filter;
            filteredDataRows = filteredDataRows.filter((x, i) => {
                const xVal = x[fieldName].toLowerCase();
                switch (filterType) {
                    case FancyGrid.FilterType.StartsWith:
                        if (String(xVal).startsWith(value.toLowerCase())) {
                            return true;
                        }
                        break;
                    case FancyGrid.FilterType.Contains:
                        if (String(xVal).includes(value.toLowerCase())) {
                            return true;
                        }
                        break;
                    default:
                        if (String(xVal).startsWith(value.toLowerCase())) {
                            return true;
                        }
                        break;
                }
                return false;
            });
        }
        return filteredDataRows;
}

function applySort(dataRows: any[], sorts: FancyGrid.SortCollection) {
    return dataRows.sort((a, b) => {
        for (const sort of sorts) {
            const {fieldName, dir} = sort;
            const aVal = a[fieldName];
            const bVal = b[fieldName];

            if (aVal > bVal) {
                return dir === 'desc' ? -1 : 1;
            } else if (aVal < bVal) {
                return dir === 'desc' ? 1 : -1;
            }
        }

        return 0;
    })
}

async function fetchData(filterState: FancyGrid.FilterCollection, sortState: FancyGrid.SortCollection, pageNum: number, pageSize: number): Promise<DataState> {
    const filteredDataRows = applyFilter(usStates.data, filterState);
    const sortedDataRows = applySort(filteredDataRows, sortState);
    const currentPage = sortedDataRows.slice(pageNum * pageSize, (pageNum + 1) * pageSize);

    return {
        data: currentPage,
        total: filteredDataRows.length
    }
}

export function EverythingExample() {
    const [dataState, setDataState] = useState({data: [], total: 0} as DataState | null);
    const [pageNum, setPageNum] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [numPages, setNumPages] = useState(0);
    const [filterState, setFilterState] = useState([] as FancyGrid.FilterCollection);
    const [sortState, setSortState] = useState([] as FancyGrid.SortCollection);

    const onPageSizeChange = (newPageSize: number, oldPageSize: number) => {
        const currentPage = pageNum;

        const currentIndex = (currentPage * oldPageSize) + 1;
        const newPageNum = Math.floor((currentIndex - 1) / newPageSize);

        setPageSize(newPageSize);
        setPageNum(newPageNum);
    };

    const onFilterChange = (filterState: FancyGrid.FilterCollection) => {
        setFilterState(filterState);
        if (pageNum != 0) {
            setPageNum(0);
        }
    }

    const onFetchData = async (filterState: FancyGrid.FilterCollection, sortState: FancyGrid.SortCollection, pageNum: number, pageSize: number): Promise<DataState> => {
        const result = await fetchData(filterState, sortState, pageNum, pageSize);
        const newNumPages = Math.ceil(result.total / pageSize);

        if (numPages != newNumPages) {
            setNumPages(newNumPages);
        } else if (dataState != null && result.total != dataState.total) {
            setDataState(result);
        }

        return result;
    }
    
    return (
        <FancyGrid.Grid>
            <FancyGrid.ColumnList>
                <FancyGrid.Column
                    name="name"
                    title="Name"/>
                <FancyGrid.Column
                    name="abbreviation"
                    title="Abbreviation"/>
            </FancyGrid.ColumnList>
            <FancyGrid.Filterable filter={filterState} onFilterChange={onFilterChange}/>
            <FancyGrid.Sortable
                sort={sortState}
                onSortChange={setSortState}
            />
            <FancyGrid.RemoteDataSource
                fetchData={onFetchData}
            />
            <FancyGrid.Pager
                count={dataState!.total}
                page={pageNum}
                numPages={numPages}
                onPageChange={setPageNum}
                pageSize={pageSize}
                onPageSizeChange={onPageSizeChange}
            />
        </FancyGrid.Grid>
    )
}