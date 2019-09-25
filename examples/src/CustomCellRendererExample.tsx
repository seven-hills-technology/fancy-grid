import React from 'react';
import FancyGrid from '../../dist';

export const code = `function CustomCellRendererExample() {
    const dataRows = [
        {a: 1, b: 2, c: 3, d: 11},
        {a: 4, b: 5, c: 6},
        {a: 7, b: 8, c: 9, d: 10}
    ]
    return (
        <FancyGrid.Grid dataRows={dataRows}>
            <FancyGrid.ColumnList>
                <FancyGrid.Column
                    name="a"
                    title="Column A"
                />
                <FancyGrid.Column
                    name="b"
                    title="Column B"
                />
                <FancyGrid.Column
                    name="c"
                    title="Column C">
                    </FancyGrid.Column>
                <FancyGrid.Column
                    name="d"
                    title="Column D">
                    <FancyGrid.CellRenderer>
                        {(data: any) => (
                            <strong>{data}</strong>
                        )}
                    </FancyGrid.CellRenderer>
                </FancyGrid.Column>
            </FancyGrid.ColumnList>
        </FancyGrid.Grid>
    )
}`

export function CustomCellRendererExample() {
    const dataRows = [
        {a: 1, b: 2, c: 3, d: 11},
        {a: 4, b: 5, c: 6},
        {a: 7, b: 8, c: 9, d: 10}
    ]
    return (
        <FancyGrid.Grid dataRows={dataRows} count={3}>
            <FancyGrid.ColumnList>
                <FancyGrid.Column
                    name="a"
                    title="Column A"
                />
                <FancyGrid.Column
                    name="b"
                    title="Column B"
                />
                <FancyGrid.Column
                    name="c"
                    title="Column C">
                    </FancyGrid.Column>
                <FancyGrid.Column
                    name="d"
                    title="Column D">
                    <FancyGrid.CellRenderer>
                        {(data: any) => (
                            <strong>{data}</strong>
                        )}
                    </FancyGrid.CellRenderer>
                </FancyGrid.Column>
            </FancyGrid.ColumnList>
        </FancyGrid.Grid>
    )
}