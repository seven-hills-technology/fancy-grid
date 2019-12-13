import { SortCollection } from "..";

export type FancyGridDataRetrievalFunction<T> = (pageNumber: number, pageSize: number, sort: SortCollection) => Promise<{data: T[], total: number}>;