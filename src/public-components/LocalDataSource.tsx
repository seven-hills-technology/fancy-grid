import React from 'react';
import { LocalDataSourceDefinition } from '../models/localDataSourceDefinition';
import { DataSourceDefinition } from '../models/dataSourceDefinition';

export type LocalDataSourceProps = LocalDataSourceDefinition;

export const LocalDataSource: React.FunctionComponent<LocalDataSourceProps> = () => {
    return null;
}

export function getLocalDataSourceDefinitionFromLocalDataSourceComponent(column: React.ReactComponentElement<typeof LocalDataSource>): DataSourceDefinition {
    return {
        data: column.props.data
    };
}