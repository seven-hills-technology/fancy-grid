import { Dispatch } from "redux";

import { SortCollection, FilterCollection } from "..";

import { ActionsTypes } from "./actionTypes";
import { FancyGridDataRetrievalFunction } from "./types";
import { ReduxState } from "./state";

export const actionCreators = {
    setAllWithDefaults: (gridName: string) => async (dispatch: Dispatch<any>) => {
        dispatch({
            type: ActionsTypes.FANCY_GRID_SET_ALL_WITH_DEFAULTS,
            payload: {
                gridName
            }
        });
    },
    updateData: <T>(gridName: string, dataRetrievalFunction: FancyGridDataRetrievalFunction<T>, jsonDataSelector: (res: any) => T[], jsonTotalSelector: (res: any) => number) => async (dispatch: Dispatch<any>, getState: () => ReduxState) => {
        const state = getState();

        const gridState = {
            ...state.fancyGrid.defaultGridState,
            ...state.fancyGrid.grids[gridName]
        };

        await actionCreators.setIsLoading(gridName, true)(dispatch);
        const res = await dataRetrievalFunction(gridState.pageNum, gridState.pageSize, gridState.sort, gridState.filter);
        await actionCreators.setIsLoading(gridName, false)(dispatch);
        const data = jsonDataSelector(res);
        const total = jsonTotalSelector(res);

        if (data == null || !Array.isArray(data) || total == null || !Number.isInteger(total)) {
            const reasons = [
                ...(data == null ? ["* data is null or undefined"] : []),
                ...(data != null && !Array.isArray(data) ? ["* data is not an array"] : []),
                ...(total == null ? ["* total is null or undefined"] : []),
                ...(total != null && !Number.isInteger(total) ? ["* total is not an integer"] : [])
            ];

            throw new Error(`The response from the grid's data retrieval function could not be properly decoded:\n${reasons.join("\n")}`);
        }

        const currentPageFirstDataItemIndex = gridState.pageNum * gridState.pageSize;
        const overallLastDataItemIndex = total - 1;

        if (!(total === 0 && gridState.pageNum === 0) && currentPageFirstDataItemIndex > overallLastDataItemIndex) {
            const lastPageNum = Math.max(Math.ceil(total / gridState.pageSize) - 1, 0);
            dispatch(actionCreators.setPageNum(gridName, lastPageNum));
            dispatch(actionCreators.updateData(gridName, dataRetrievalFunction, jsonDataSelector, jsonTotalSelector))
        } else {
            dispatch({
                type: ActionsTypes.FANCY_GRID_SET_DATA,
                payload: {
                    gridName,
                    data,
                    total
                }
            });
        }
    },
    setPageNum: (gridName: string, pageNum: number) => async (dispatch: Dispatch<any>) => {
        dispatch({
            type: ActionsTypes.FANCY_GRID_SET_PAGE_NUM,
            payload: {
                gridName,
                pageNum
            }
        });
    },
    setPageSize: (gridName: string, pageSize: number) => async (dispatch: Dispatch<any>) => {
        dispatch({
            type: ActionsTypes.FANCY_GRID_SET_PAGE_SIZE,
            payload: {
                gridName,
                pageSize
            }
        });
    },
    setSort: (gridName: string, sort: SortCollection) => async (dispatch: Dispatch<any>) => {
        dispatch({
            type: ActionsTypes.FANCY_GRID_SET_SORT,
            payload: {
                gridName,
                sort
            }
        })
    },
    setFilter: (gridName: string, filter: FilterCollection) => async (dispatch: Dispatch<any>) => {
        dispatch({
            type: ActionsTypes.FANCY_GRID_SET_FILTER,
            payload: {
                gridName,
                filter
            }
        })
    },
    setIsLoading: (gridName: string, isLoading: boolean) => async (dispatch: Dispatch<any>) => {
        dispatch({
            type: ActionsTypes.FANCY_GRID_SET_IS_LOADING,
            payload: {
                gridName,
                isLoading
            }
        });
    }
};