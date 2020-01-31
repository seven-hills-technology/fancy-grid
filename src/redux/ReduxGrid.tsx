import React, { useState, useRef } from 'react';

import { Grid, LocalDataSource, Sortable, Pager, FilterCollection, Filterable } from '..';

import { useReduxFancyGrid } from './useReduxFancyGrid';
import { FancyGridDataRetrievalFunction } from './types';
import { useSelector } from 'react-redux';
import { ReduxState } from './state';
import {ReduxFilterable, ReduxFilterableProps} from './ReduxFilterable';
import { ReduxSortable } from './ReduxSortable';
import { ReduxPager } from './ReduxPager';
import {IncludingReduxGridProps} from '../public-components/Grid';

export interface ReduxGridProps<T> extends IncludingReduxGridProps {
    gridName: string;
    dataRetrievalFunction: FancyGridDataRetrievalFunction<T>;
    updateTriggers?: any[];
    jsonDataSelector?: (res: any) => T[];
    jsonTotalSelector?: (res: any) => number;
    store?: any;
    filterTimeout?: number;
    showRefreshButton?: boolean;
}

export const ReduxGrid: React.FunctionComponent<ReduxGridProps<any>> = props => {
    const showRefreshButton = props.showRefreshButton ?? true;

    const defaultFilter = useSelector<ReduxState, FilterCollection>(state => state.fancyGrid.defaultGridState.filter);
    const [workingFilter, setWorkingFilter] = useState(defaultFilter)

    const [data, total, pageNum, pageSize, sort, filter, setPageNum, setPageSize, setSort, setFilter, forceUpdateData, isLoading] = useReduxFancyGrid(props.gridName, props.dataRetrievalFunction, props.updateTriggers ?? [], props.jsonDataSelector, props.jsonTotalSelector);
    const numPages = Math.ceil((total ?? 0) / pageSize);

    const updateFilterTimerRef = useRef(null as any);

    const updateFilter = (newFilter: FilterCollection) => {
        setWorkingFilter(newFilter);
        if (updateFilterTimerRef.current != null) {
            clearTimeout(updateFilterTimerRef.current);
        }
        updateFilterTimerRef.current = setTimeout(() => setFilter(workingFilter), props.filterTimeout ?? 1000);
    }



    let showFilterable = false;
    let filterStyle: "inline" | "popup" | undefined = undefined;
    let showSortable = false;
    let showPager = false;

    React.Children.forEach(props.children, child => {
        if (!React.isValidElement(child)) {
            return;
        }

        if (child.type === ReduxFilterable) {
            showFilterable = true;
            filterStyle = (child.props as ReduxFilterableProps).filterStyle;
        } else if (child.type === ReduxSortable) {
            showSortable = true;
        } else if (child.type === ReduxPager) {
            showPager = true;
        }
    });

    return (
        <Grid isLoading={isLoading} {...props}>
            {props.children}
            <LocalDataSource
                data={data}
            />
            {showFilterable ? (
                <Filterable 
                    filter={workingFilter}
                    filterStyle={filterStyle}
                    onFilterChange={updateFilter}
                />
            ) : null}
            {showSortable ? (
                <Sortable
                    sort={sort}
                    onSortChange={setSort}
                />
            ) : null}
            {showPager ? (
                <Pager
                    count={total}
                    numPages={numPages}
                    onPageChange={setPageNum}
                    onPageSizeChange={setPageSize}
                    page={pageNum}
                    pageSize={pageSize}
                    onRefresh={showRefreshButton ? forceUpdateData : undefined}
                />
            ) : null}
        </Grid>
    )
}