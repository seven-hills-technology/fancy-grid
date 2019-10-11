import React from 'react';
import { ColumnDefinition } from '../models/columnDefinition';
import { CellRendererFunction } from '../models/cellRendererFunction';
import { DataCell } from './DataCell';

export interface DataRowProps {
    dataItem: any;
    columnDefinitions: ColumnDefinition[];
}

export const DataRow: React.FunctionComponent<DataRowProps> = props => {
    return <tr>
        {props.columnDefinitions.map((columnDefinition, i) => (
            <DataCell
                key={i}
                cellValue={props.dataItem[columnDefinition.name]}
                cellRenderer={columnDefinition.cellRenderer}
            />
        ))}
    </tr>
}

DataRow.displayName = "FancyGrid.DataRow";