export interface PageState {
    count: number;
    page: number;
    numPages: number;
    onPageChange: (newPage: number) => void;
    pageSize: number;
    onPageSizeChange: (newPageSize: number, oldPageSize: number) => void;
}