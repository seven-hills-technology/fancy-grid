export interface SortDefinition {
    fieldName: string;
    dir?: 'asc' | 'desc' | undefined
}

export type SortCollection = SortDefinition[];

export interface SortState {
    sort: SortCollection;
    onSortChange: (newSort: SortCollection) => void;
}