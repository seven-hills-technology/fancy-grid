import React from 'react';
import { ColumnDefinition } from '../models/columnDefinition';
import { DataRow } from './DataRow';

export interface DataBodyProps {
    dataItems: any[];
    columnDefinitions: ColumnDefinition[];
}

export const DataBody: React.FunctionComponent<DataBodyProps> = props => {
    return <tbody>
        {props.dataItems.map((dataItem, i) => (
            <DataRow
                key={i}
                dataItem={dataItem}
                columnDefinitions={props.columnDefinitions}
            />
        ))}
    </tbody>
}