import React from 'react';

import { Grid, LocalDataSource, Sortable, Pager } from '..';

import { useReduxFancyGrid } from './useReduxFancyGrid';
import { FancyGridDataRetrievalFunction } from './types';

export interface ReduxGridProps<T> {
    gridName: string;
    dataRetrievalFunction: FancyGridDataRetrievalFunction<T>;
    updateTriggers?: any[];
    jsonDataSelector?: (res: any) => T[];
    jsonTotalSelector?: (res: any) => number;
    store?: any;
}

export const ReduxGrid: React.FunctionComponent<ReduxGridProps<any>> = props => {
    const [pobpcControllers, total, pageNum, pageSize, sort, setPageNum, setPageSize, setSort] = useReduxFancyGrid(props.gridName, props.dataRetrievalFunction, props.updateTriggers ?? [], props.jsonDataSelector, props.jsonTotalSelector);
    const numPages = Math.ceil((total ?? 0) / pageSize);

    return (
        <Grid>
            {props.children}
            <LocalDataSource
                data={pobpcControllers}
            />
            <Sortable
                sort={sort}
                onSortChange={setSort}
            />
            <Pager
                count={total}
                numPages={numPages}
                onPageChange={setPageNum}
                onPageSizeChange={setPageSize}
                page={pageNum}
                pageSize={pageSize}
            />
        </Grid>
    )
}