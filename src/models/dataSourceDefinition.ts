import { FetchDataFunction } from './fetchDataFunction';

export interface DataSourceDefinition {
    data?: any[];
    fetchData?: FetchDataFunction;
}