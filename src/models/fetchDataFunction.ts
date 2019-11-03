import { DataResult } from './dataResult';
import {  FilterCollection } from "./filterState";
import { SortCollection } from "./sortState";

export type FetchDataFunction = (filter: FilterCollection, sort: SortCollection, pageNum: number, pageSize: number) => Promise<DataResult>;