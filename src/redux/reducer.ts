import { SortCollection } from '..';

import { ActionsTypes } from './actionTypes';
import { initialFancyGridState } from './initialState';

export const fancyGridReducer = (state: any = initialFancyGridState, action: {type: string, payload: any}): any => {
    switch (action.type) {
        case ActionsTypes.FANCY_GRID_SET_ALL_WITH_DEFAULTS: {
            const {gridName} = action.payload as {gridName: string};
            return {
                ...state,
                grids: {
                    ...state.grids,
                    [gridName]: state.defaultGridState
                }
            };
        }
        case ActionsTypes.FANCY_GRID_SET_DATA: {
            const {gridName, data, total} = action.payload as {gridName: string, data: any[], total: number};
            return {
                ...state,
                grids: {
                    ...state.grids,
                    [gridName]: {
                        ...state.grids[gridName],
                        data,
                        total
                    }
                }
            };
        }
        case ActionsTypes.FANCY_GRID_SET_TOTAL: {
            const {gridName, total} = action.payload as {gridName: string, total: number};
            return {
                ...state,
                grids: {
                    ...state.grids,
                    [gridName]: {
                        ...state.grids[gridName],
                        total
                    }
                }
            };
        }
        case ActionsTypes.FANCY_GRID_SET_PAGE_NUM: {
            const {gridName, pageNum} = action.payload as {gridName: string, pageNum: number};
            return {
                ...state,
                grids: {
                    ...state.grids,
                    [gridName]: {
                        ...state.grids[gridName],
                        pageNum
                    }
                }
            };
        }
        case ActionsTypes.FANCY_GRID_SET_PAGE_SIZE: {
            const {gridName, pageSize} = action.payload as {gridName: string, pageSize: number};
            return {
                ...state,
                grids: {
                    ...state.grids,
                    [gridName]: {
                        ...state.grids[gridName],
                        pageSize
                    }
                }
            };
        }
        case ActionsTypes.FANCY_GRID_SET_SORT: {
            const {gridName, sort} = action.payload as {gridName: string, sort: SortCollection};
            return {
                ...state,
                grids: {
                    ...state.grids,
                    [gridName]: {
                        ...state.grids[gridName],
                        sort
                    }
                }
            };
        }
        default:
            return state;
    }
}