import React from 'react';
import { ColumnDefinition } from '../models/columnDefinition';
import { CellRendererFunction } from '../models/cellRendererFunction';
import { DataCell } from './DataCell';

export interface DataRowProps {
    dataItem: any;
    columnDefinitions: ColumnDefinition[];
    onRowClick?: () => void;
    isSelected: boolean;
}

export const DataRow: React.FunctionComponent<DataRowProps> = props => {
    const className = [
        props.onRowClick ? 'fancy-grid-body-row-clickable' : '',
        props.isSelected ? 'fancy-grid-body-row-selected' : ''
    ].join(' ');
    return <tr className={className} onClick={() => { props.onRowClick ? props.onRowClick() : null}}>
        {props.columnDefinitions.map((columnDefinition, i) => (
            <DataCell
                key={i}
                columnDefinition={columnDefinition}
                cellValue={columnDefinition.name != null ? props.dataItem[columnDefinition.name] : null}
                rowValue={props.dataItem}
                cellRenderer={columnDefinition.cellRenderer}
            />
        ))}
    </tr>
}

DataRow.displayName = "FancyGrid.DataRow";