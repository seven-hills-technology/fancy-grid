import React from 'react';
import { ColumnDefinition } from '../models/columnDefinition';
import { CellRendererFunction } from '../models/cellRendererFunction';
import { DataCell } from './DataCell';

export interface DataRowProps {
    dataItem: any;
    columnDefinitions: ColumnDefinition[];
    onRowClick?: () => void;
}

export const DataRow: React.FunctionComponent<DataRowProps> = props => {
    return <tr className={`fancy-grid-body-row ${props.onRowClick ? 'fancy-grid-body-row-clickable' : ''}`} onClick={() => { props.onRowClick ? props.onRowClick() : null}}>
        {props.columnDefinitions.map((columnDefinition, i) => (
            <DataCell
                key={i}
                columnDefinition={columnDefinition}
                cellValue={props.dataItem[columnDefinition.name]}
                cellRenderer={columnDefinition.cellRenderer}
            />
        ))}
    </tr>
}

DataRow.displayName = "FancyGrid.DataRow";