import React, { useState, useRef } from 'react';

import {Grid, LocalDataSource, Sortable, Pager, FilterCollection, Filterable, SortCollection} from '..';

import { useReduxFancyGrid } from './useReduxFancyGrid';
import { FancyGridDataRetrievalFunction } from './types';
import { useSelector } from 'react-redux';
import { ReduxState } from './state';
import {ReduxFilterable, ReduxFilterableProps} from './ReduxFilterable';
import {ReduxSortable, ReduxSortableProps} from './ReduxSortable';
import { ReduxPager } from './ReduxPager';
import {IncludingReduxGridProps} from '../public-components/Grid';

export interface ReduxGridProps<T> extends IncludingReduxGridProps {
    gridName: string;
    dataRetrievalFunction: FancyGridDataRetrievalFunction<T>;
    updateTriggers?: any[];
    jsonDataSelector?: (res: any) => T[];
    jsonTotalSelector?: (res: any) => number;
    store?: any;
    showRefreshButton?: boolean;
}

export const ReduxGrid: React.FunctionComponent<ReduxGridProps<any>> = props => {
    let showFilterable = false;
    let filterStyle: "inline" | "popup" | undefined = undefined;
    let showSortable = false;
    let defaultSort: SortCollection | undefined = undefined;
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
            defaultSort = (child.props as ReduxSortableProps).defaultSort;
        } else if (child.type === ReduxPager) {
            showPager = true;
        }
    });


    const showRefreshButton = props.showRefreshButton ?? true;

    const defaultFilter = useSelector<ReduxState, FilterCollection>(state => state.fancyGrid.defaultGridState.filter);
    const [workingFilter, setWorkingFilter] = useState(defaultFilter)

    const [data, total, pageNum, pageSize, sort, filter, setPageNum, setPageSize, setSort, setFilter, forceUpdateData, isLoading] = useReduxFancyGrid(props.gridName, props.dataRetrievalFunction, props.updateTriggers ?? [], props.jsonDataSelector, props.jsonTotalSelector);
    const numPages = Math.ceil((total ?? 0) / pageSize);

    const updateFilterTimerRef = useRef(null as any);

    const updateFilter = (newFilter: FilterCollection, filterTimeout: number) => {
        setWorkingFilter(newFilter);
        if (updateFilterTimerRef.current != null) {
            clearTimeout(updateFilterTimerRef.current);
        }
        updateFilterTimerRef.current = setTimeout(() => void setFilter(newFilter), filterTimeout);
    }

    const [defaultSortInitialized, setDefaultSortInitialized] = useState(false);

    if (!defaultSortInitialized) {
        if (defaultSort != null) {
            setSort(defaultSort);
        }
        setDefaultSortInitialized(true);
    }


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