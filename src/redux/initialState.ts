import { FancyGridContainerState } from "./state";

export const initialFancyGridState: FancyGridContainerState = {
    defaultGridState: {
        data: [],
        total: 0,
        pageNum: 0,
        pageSize: 10,
        sort: []
    },
    grids: {}
}