import React from 'react';
import { ColumnDefinition } from '../models/columnDefinition';
import { PageState } from '../models/pageState';

export interface ColumnHeaderRowProps {
    columnDefinitions: ColumnDefinition[];
    pageState: PageState;
    visibleDataRows: number;
    total: number;
}

export const PagerFooter: React.FunctionComponent<ColumnHeaderRowProps> = props => {
    const firstItemIndex = props.pageState.page * props.pageState.pageSize + 1;
    const lastItemIndex = firstItemIndex + props.visibleDataRows - 1;

    const total = props.total != null ? props.total : props.pageState.count;

    return (
        <tfoot>
            <tr className="fancy-grid-footer-row">
                <td className="fancy-grid-footer-controls" colSpan={props.columnDefinitions.length}>
                    {/* <button className="fancy-grid-button" disabled={props.pageState.page <= 0} onClick={() => props.pageState.onPageChange(0)}>&lt;&lt;</button> */}
                    <button className="fancy-grid-button" disabled={props.pageState.page <= 0} onClick={() => props.pageState.onPageChange(props.pageState.page - 1)}>Previous</button>
                    <span className="fancy-grid-footer-page-number">Page {props.pageState.page + 1}</span>
                    <button className="fancy-grid-button" disabled={props.pageState.page >= (props.pageState.numPages - 1)} onClick={() => props.pageState.onPageChange(props.pageState.page + 1)}>Next</button>
                    {/* <button className="fancy-grid-button" disabled={props.pageState.page >= (props.pageState.numPages - 1)} onClick={() => props.pageState.onPageChange(props.pageState.numPages - 1)}>&gt;&gt;</button> */}
                </td>
                <td className="fancy-grid-footer-pagesize">
                    <select className="fancy-grid-select" onChange={(event) => props.pageState.onPageSizeChange(Number(event.target.value), props.pageState.pageSize)} value={props.pageState.pageSize}>
                        {[5, 10, 20, 50, 100].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select> 
                </td>
                <td className="fancy-grid-footer-items-showing">
                    <span className="fancy-grid-footer-items-count">{`${firstItemIndex} - ${lastItemIndex} of ${total} items`}</span>
                </td>
            </tr>
        </tfoot>
    )
}

PagerFooter.displayName = "FancyGrid.PagerFooter";