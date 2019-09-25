export interface PageState {
    page: number;
    numPages: number;
    onPageChange: (newPage: number) => void;
    pageSize: number;
    onPageSizeChange: (newPageSize: number, oldPageSize: number) => void;
}