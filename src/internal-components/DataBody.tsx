import React from 'react';
import { ColumnDefinition } from '../models/columnDefinition';
import { DataRow } from './DataRow';

export interface DataBodyProps {
    dataItems: any[];
    columnDefinitions: ColumnDefinition[];
    onRowClick?: (row: any, index: number) => void;
}

export const DataBody: React.FunctionComponent<DataBodyProps> = props => {
    return <tbody>
        {props.dataItems.map((dataItem, i) => (
            <DataRow
                key={i}
                dataItem={dataItem}
                columnDefinitions={props.columnDefinitions}
                onRowClick={props.onRowClick != null ? () => props.onRowClick!(dataItem, i) : undefined}
            />
        ))}
    </tbody>
}

DataBody.displayName = "FancyGrid.DataBody";