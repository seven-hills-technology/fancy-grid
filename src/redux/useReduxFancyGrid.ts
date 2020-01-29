import { FilterCollection } from './../models/filterState';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { SortCollection } from ".."
import { actionCreators } from './actionCreators';
import { GridState } from './state';
import { FancyGridDataRetrievalFunction } from "./types";


export type UseFancyGridReturnValue<T> = [T[], number, number, number, SortCollection, FilterCollection, (newPageNum: number) => void, (newPageSize: number) => void, (newSort: SortCollection) => void, (newFilter: FilterCollection) => void, () => void, boolean];


export const useReduxFancyGrid = <T>(gridName: string, dataRetrievalFunction: FancyGridDataRetrievalFunction<T>, additionalTriggers?: any[], jsonDataSelector: (res: any) => T[] = res => res.data, jsonTotalSelector: (res: any) => number = res => res.total): UseFancyGridReturnValue<T> => {
    const dispatch = useDispatch();

    const gridState = {
        ...useSelector<any, GridState<T>>(state => state.fancyGrid.defaultGridState),
        ...(useSelector<any, GridState<T>>(state => state.fancyGrid.grids[gridName]) ?? {})
    };

    const setPageNum = (newPageNum: number) => {
        dispatch(actionCreators.setPageNum(gridName, newPageNum));
    };

    const setPageSize = (newPageSize: number) => {
        dispatch(actionCreators.setPageSize(gridName, newPageSize));
    };

    const setSort = (newSort: SortCollection) => {
        dispatch(actionCreators.setSort(gridName, newSort));
    };

    const setFilter = (newFilter: FilterCollection) => {
        dispatch(actionCreators.setFilter(gridName, newFilter));
    };

    const updateData = () => {
        dispatch(actionCreators.updateData(gridName, dataRetrievalFunction, jsonDataSelector, jsonTotalSelector));
    };

    useEffect(updateData, [gridState.pageNum, gridState.pageSize, gridState.sort, gridState.filter, ...(additionalTriggers ?? [])]);

    return [gridState.data, gridState.total, gridState.pageNum, gridState.pageSize, gridState.sort, gridState.filter, setPageNum, setPageSize, setSort, setFilter, updateData, gridState.isLoading];
}