import React, { useState } from 'react';
import FancyGrid from '../../dist';

import usStates from './states.json';

export const code = `function PagerExample() {
    const [pageNum, setPageNum] = useState(0);
    const pageSize = 10;
    const currentPage = usStates.slice(pageNum * pageSize, (pageNum + 1) * pageSize);
    const numPages = Math.ceil(usStates.length / pageSize);

    const onPageChange = (newPageNum: number) => {
        setPageNum(newPageNum);
    };
    
    return (
        <FancyGrid.Grid dataRows={currentPage}>
            <FancyGrid.ColumnList>
                <FancyGrid.Column
                    name="name"
                    title="Name"
                />
                <FancyGrid.Column
                    name="abbreviation"
                    title="Abbreviation"
                />
            </FancyGrid.ColumnList>
            <FancyGrid.Pager
                page={pageNum}
                numPages={numPages}
                onPageChange={onPageChange}
            />
        </FancyGrid.Grid>
    )
}`

export function PagerExample() {
    const [pageNum, setPageNum] = useState(0);
    const pageSize = 10;
    const currentPage = usStates.slice(pageNum * pageSize, (pageNum + 1) * pageSize);
    const numPages = Math.ceil(usStates.length / pageSize);

    const onPageChange = (newPageNum: number) => {
        setPageNum(newPageNum);
    };
    
    return (
        <FancyGrid.Grid dataRows={currentPage}>
            <FancyGrid.ColumnList>
                <FancyGrid.Column
                    name="name"
                    title="Name"
                />
                <FancyGrid.Column
                    name="abbreviation"
                    title="Abbreviation"
                />
            </FancyGrid.ColumnList>
            <FancyGrid.Pager
                page={pageNum}
                numPages={numPages}
                onPageChange={onPageChange}
            />
        </FancyGrid.Grid>
    )
}