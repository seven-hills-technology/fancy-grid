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
            <tr>
                <td colSpan={props.columnDefinitions.length}>
                    <button disabled={props.pageState.page <= 0} onClick={() => props.pageState.onPageChange(0)}>&lt;&lt;</button>
                    <button disabled={props.pageState.page <= 0} onClick={() => props.pageState.onPageChange(props.pageState.page - 1)}>&lt;</button>
                    <span>{props.pageState.page + 1}</span>
                    <button disabled={props.pageState.page >= (props.pageState.numPages - 1)} onClick={() => props.pageState.onPageChange(props.pageState.page + 1)}>&gt;</button>
                    <button disabled={props.pageState.page >= (props.pageState.numPages - 1)} onClick={() => props.pageState.onPageChange(props.pageState.numPages - 1)}>&gt;&gt;</button>
                </td>
                <td>
                    <select onChange={(event) => props.pageState.onPageSizeChange(Number(event.target.value), props.pageState.pageSize)} value={props.pageState.pageSize}>
                        {[5, 10, 20, 50, 100].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select> 
                </td>
                <td>{`${firstItemIndex} - ${lastItemIndex} of ${total} items`}
                </td>
            </tr>
        </tfoot>
    )
}

PagerFooter.displayName = "FancyGrid.PagerFooter";