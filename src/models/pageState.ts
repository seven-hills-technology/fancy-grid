export interface PageState {
    page: number;
    numPages: number;
    onPageChange: (newPage: number) => void;
}
