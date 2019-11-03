import { FetchDataFunction } from './fetchDataFunction';

export interface RemoteDataSourceDefinition {
    fetchData: FetchDataFunction
}