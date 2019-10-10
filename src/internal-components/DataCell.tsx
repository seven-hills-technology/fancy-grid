import React from 'react';
import { CellRendererFunction } from '../models/cellRendererFunction';

export interface DataCellProps {
    cellValue: any;
    cellRenderer: CellRendererFunction | null | undefined;
}

export const DataCell: React.FunctionComponent<DataCellProps> = props => {
    const renderedValue = props.cellRenderer != null ? props.cellRenderer(props.cellValue) : props.cellValue;
    return <td>
        {renderedValue}
    </td>
}