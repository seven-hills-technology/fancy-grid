import React from 'react';

export interface GridProps {
    dataRows: any[];
}

export function Grid(props: GridProps) {
    const allColumnNames = [...new Set(([] as string[]).concat(...props.dataRows.map(xx => Object.keys(xx))))];

    return (
        <table>
            <thead>
                <tr>
                    {allColumnNames.map(columnName => (
                        <th>{columnName}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.dataRows.map(dataRow => (
                    <tr>
                        {allColumnNames.map(columnName => (
                            <td>{dataRow[columnName]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}