import React from 'react';
import { CellRendererFunction } from '../models/cellRendererFunction';
import { ColumnDefinition } from '../models/columnDefinition';

export interface DataCellProps {
    columnDefinition: ColumnDefinition;
    cellValue: any;
    rowValue: any;
    cellRenderer: CellRendererFunction | null | undefined;
}

export const DataCell: React.FunctionComponent<DataCellProps> = props => {
    const renderedValue = props.cellRenderer != null ? props.cellRenderer(props.cellValue, props.rowValue) : props.cellValue;
    return <td className="fancy-grid-body-cell" {...(props.columnDefinition.tdProps != null ? props.columnDefinition.tdProps : {})}>
        {renderedValue}
    </td>
}

DataCell.displayName = "FancyGrid.DataCell";