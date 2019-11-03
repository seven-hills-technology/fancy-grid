import React from 'react';
import { RemoteDataSourceDefinition } from '../models/remoteDataSourceDefinition';
import { DataSourceDefinition } from '../models/dataSourceDefinition';

export type RemoteDataSourceProps = RemoteDataSourceDefinition;

export const RemoteDataSource: React.FunctionComponent<RemoteDataSourceProps> = () => {
    return null;
}

export function getRemoteDataSourceDefinitionFromRemoteDataSourceComponent(column: React.ReactComponentElement<typeof RemoteDataSource>): DataSourceDefinition {
    return {
        fetchData: column.props.fetchData
    };
}