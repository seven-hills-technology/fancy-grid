import React, {useMemo} from 'react';
import { ColumnDefinition } from '../models/columnDefinition';
import { DataRow } from './DataRow';

export interface DataBodyDataRowProps {
    dataItem: any;
    rowIndex: number;
    columnDefinitions: ColumnDefinition[];
    dataItemIdentityFunction: (x: any) => any;
    selectedDataItems?: any[];
    onRowClick?: (row: any, index: number) => void;
}

export const DataBodyDataRow: React.FunctionComponent<DataBodyDataRowProps> = React.memo(({dataItem, rowIndex, columnDefinitions, dataItemIdentityFunction, selectedDataItems, onRowClick}) => {
    const dataItemIdentity = useMemo(() => dataItemIdentityFunction(dataItem), [dataItem, dataItemIdentityFunction]);
    const isSelected = useMemo(() => (selectedDataItems ?? []).some(x => dataItemIdentityFunction(x) === dataItemIdentity), [selectedDataItems, dataItemIdentityFunction, dataItemIdentity]);

    return (
        <DataRow
            dataItem={dataItem}
            columnDefinitions={columnDefinitions}
            onRowClick={onRowClick != null ? () => onRowClick!(dataItem, rowIndex) : undefined}
            isSelected={isSelected}
        />
    );
});


export interface DataBodyProps {
    dataItems: any[];
    columnDefinitions: ColumnDefinition[];
    dataItemIdentityFunction: (x: any) => any;
    selectedDataItems?: any[];
    onRowClick?: (row: any, index: number) => void;
}

export const DataBody: React.FunctionComponent<DataBodyProps> = props => {
    return <tbody>
        {props.dataItems.map((dataItem, i) => (
            <DataBodyDataRow
                key={i}
                dataItem={dataItem}
                rowIndex={i}
                columnDefinitions={props.columnDefinitions}
                dataItemIdentityFunction={props.dataItemIdentityFunction}
                selectedDataItems={props.selectedDataItems}
                onRowClick={props.onRowClick}
            />
        ))}
    </tbody>
}

DataBody.displayName = "FancyGrid.DataBody";