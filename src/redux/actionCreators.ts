import { Dispatch } from "redux";

import { SortCollection } from "..";

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

        const res = await dataRetrievalFunction(gridState.pageNum, gridState.pageSize, gridState.sort);
        const data = jsonDataSelector(res);
        const total = jsonTotalSelector(res);
        dispatch({
            type: ActionsTypes.FANCY_GRID_SET_DATA,
            payload: {
                gridName,
                data,
                total
            }
        });
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
    }
};