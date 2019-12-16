import { SortCollection, FilterCollection } from "..";

export type FancyGridDataRetrievalFunction<T> = (pageNumber: number, pageSize: number, sort: SortCollection, filter: FilterCollection) => Promise<{data: T[], total: number}>;