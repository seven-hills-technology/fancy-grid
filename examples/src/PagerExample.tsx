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

    const onPageSizeChange = (newPageSizeNum: number, oldPageSize: number) => {
        const currentPage = pageNum;

        const currentIndex = (currentPage * oldPageSize) + 1;
        const newPageNum = Math.floor((currentIndex - 1) / newPageSizeNum);

        setPageSizeNum(newPageSizeNum);
        setPageNum(newPageNum);
    };
    
    return (
        <FancyGrid.Grid dataRows={currentPage} count={usStates.count}>
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
                pageSize={pageSizeNum}
                onPageSizeChange={onPageSizeChange}
            />
        </FancyGrid.Grid>
    )
}`

export function PagerExample() {
    const [pageNum, setPageNum] = useState(0);
    const [pageSizeNum, setPageSizeNum] = useState(20);
    const currentPage = usStates.data.slice(pageNum * pageSizeNum, (pageNum + 1) * pageSizeNum);
    const numPages = Math.ceil(usStates.count / pageSizeNum);

    const onPageChange = (newPageNum: number) => {
        setPageNum(newPageNum);
    };

    const onPageSizeChange = (newPageSizeNum: number, oldPageSize: number) => {
        const currentPage = pageNum;

        const currentIndex = (currentPage * oldPageSize) + 1;
        const newPageNum = Math.floor((currentIndex - 1) / newPageSizeNum);

        setPageSizeNum(newPageSizeNum);
        setPageNum(newPageNum);
    };
    
    return (
        <FancyGrid.Grid dataRows={currentPage} count={usStates.count}>
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
                pageSize={pageSizeNum}
                onPageSizeChange={onPageSizeChange}
            />
        </FancyGrid.Grid>
    )
}