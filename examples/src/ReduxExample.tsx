import React, { useState, useEffect } from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import FancyGrid from '../../dist';

import usStates from './states.json';
import { Provider } from 'react-redux';

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

async function fetchData(pageNumber: number, pageSize: number, sort: FancyGrid.SortCollection, filter: FancyGrid.FilterCollection): Promise<DataState> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const filteredDataRows = applyFilter(usStates.data, filter);
    const sortedDataRows = applySort(filteredDataRows, sort);
    const currentPage = sortedDataRows.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);

    return {
        data: currentPage,
        total: filteredDataRows.length
    }
}

const store = createStore(
    combineReducers({
        fancyGrid: FancyGrid.fancyGridReducer
    }), 
    {},
    applyMiddleware(thunk));

export function ReduxExample() {
    
    return (
        <Provider store={store}>
            <FancyGrid.ReduxGrid
                gridName={"MyGrid123"}
                dataRetrievalFunction={fetchData}
            >
                <FancyGrid.ColumnList>
                    <FancyGrid.Column
                        name="name"
                        title="Name"/>
                    <FancyGrid.Column
                        name="abbreviation"
                        title="Abbreviation"/>
                </FancyGrid.ColumnList>
                <FancyGrid.ReduxFilterable />
                <FancyGrid.ReduxSortable />
                <FancyGrid.ReduxPager />
            </FancyGrid.ReduxGrid>
        </Provider>
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

async function fetchData(pageNumber: number, pageSize: number, sort: FancyGrid.SortCollection, filter: FancyGrid.FilterCollection): Promise<DataState> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const filteredDataRows = applyFilter(usStates.data, filter);
    const sortedDataRows = applySort(filteredDataRows, sort);
    const currentPage = sortedDataRows.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);

    return {
        data: currentPage,
        total: filteredDataRows.length
    }
}

const store = createStore(
    combineReducers({
        fancyGrid: FancyGrid.fancyGridReducer
    }), 
    {},
    applyMiddleware(thunk));

export function ReduxExample() {
    
    return (
        <Provider store={store}>
            <FancyGrid.ReduxGrid
                gridName={"MyGrid123"}
                dataRetrievalFunction={fetchData}
            >
                <FancyGrid.ColumnList>
                    <FancyGrid.Column
                        name="name"
                        title="Name"/>
                    <FancyGrid.Column
                        name="abbreviation"
                        title="Abbreviation"/>
                </FancyGrid.ColumnList>
                <FancyGrid.ReduxFilterable />
                <FancyGrid.ReduxSortable />
                <FancyGrid.ReduxPager />
            </FancyGrid.ReduxGrid>
        </Provider>
    )
}