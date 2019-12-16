import { FilterCollection } from './../models/filterState';
import { SortCollection } from "..";

export interface ReduxState {
    fancyGrid: FancyGridContainerState;
}

export interface FancyGridContainerState {
    defaultGridState: GridState<any>;
    grids: GridDefinitionCollection
}

export interface GridState<T> {
    data: T[];
    total: number;
    pageNum: number;
    pageSize: number;
    sort: SortCollection;
    filter: FilterCollection;
    isLoading: boolean;
}

export interface GridDefinition<T> extends GridState<T> {
    gridName: string
}

export type GridDefinitionCollection = {[gridName: string]: GridDefinition<any>};