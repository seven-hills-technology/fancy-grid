import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { SortCollection } from ".."
import { actionCreators } from './actionCreators';
import { GridState } from './state';
import { FancyGridDataRetrievalFunction } from "./types";


export type UseFancyGridReturnValue<T> = [T[], number, number, number, SortCollection, (newPageNum: number) => void, (newPageSize: number) => void, (newSort: SortCollection) => void];


export const useReduxFancyGrid = <T>(gridName: string, dataRetrievalFunction: FancyGridDataRetrievalFunction<T>, additionalTriggers?: any[], jsonDataSelector: (res: any) => T[] = res => res.data, jsonTotalSelector: (res: any) => number = res => res.total): UseFancyGridReturnValue<T> => {
    const dispatch = useDispatch();
    // const dispatch = (...params: any[]) => {};

    const gridState = {
        ...useSelector<any, GridState<T>>(state => state.fancyGrid.defaultGridState),
        ...(useSelector<any, GridState<T>>(state => state.fancyGrid.grids[gridName]) ?? {})
    };

    // const gridState: any = {};

    const setPageNum = (newPageNum: number) => {
        dispatch(actionCreators.setPageNum(gridName, newPageNum));
    };

    const setPageSize = (newPageSize: number) => {
        dispatch(actionCreators.setPageSize(gridName, newPageSize));
    };

    const setSort = (newSort: SortCollection) => {
        dispatch(actionCreators.setSort(gridName, newSort));
    };

    useEffect(() => {
        dispatch(actionCreators.updateData(gridName, dataRetrievalFunction, jsonDataSelector, jsonTotalSelector));
    }, [gridState.pageNum, gridState.pageSize, gridState.sort, ...(additionalTriggers ?? [])]);

    return [gridState.data, gridState.total, gridState.pageNum, gridState.pageSize, gridState.sort, setPageNum, setPageSize, setSort];
}