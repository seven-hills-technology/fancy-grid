import React, {useMemo} from 'react';
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
    const numPages = props.pageState.numPages;
    const currentPage = props.pageState.page;

    const currentPageDropdownOptions = useMemo(() => [...Array(Math.max(numPages, currentPage + 1)).keys()], [currentPage, numPages]);

    return (
        <tfoot>
            <tr className="fancy-grid-footer-row">
                <td colSpan={props.columnDefinitions.length}>
                    <div style={{width: "100%", display: "flex", flexDirection: "row"}}>
                        <div style={{flex: "0 0 160px"}}>
                            <button className="fancy-grid-button fancy-grid-footer-button" disabled={props.pageState.page <= 0} onClick={() => props.pageState.onPageChange(props.pageState.page - 1)}>
                                <i className="far fa-arrow-alt-circle-left"></i>
                            </button>
                            <select className="fancy-grid-select" onChange={(event) => props.pageState.onPageChange(Number(event.target.value))} value={props.pageState.page} style={{height: "34px"}}>
                                {currentPageDropdownOptions.map(pageNum => (
                                    <option key={pageNum} value={pageNum}>
                                        Page {pageNum+ 1}
                                    </option>
                                ))}
                            </select>
                            <button className="fancy-grid-button fancy-grid-footer-button" disabled={props.pageState.page >= (props.pageState.numPages - 1)} onClick={() => props.pageState.onPageChange(props.pageState.page + 1)}>
                            <i className="far fa-arrow-alt-circle-right"></i>
                            </button>
                        </div>
                        <div style={{flex: "0 0 100px"}}>
                            <select className="fancy-grid-select" onChange={(event) => props.pageState.onPageSizeChange(Number(event.target.value), props.pageState.pageSize)} value={props.pageState.pageSize}>
                                {[5, 10, 20, 50, 100].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select> 
                        </div>
                        <div style={{flex: "1 0 0"}}></div>
                        <div style={{flex: "0 0 160px"}}>
                            <div className="fancy-grid-footer-text">{`${firstItemIndex} - ${lastItemIndex} of ${total} items`}</div>
                        </div>
                        {props.pageState.onRefresh != null ? (
                            <div style={{flex: "0 0 50px"}}>
                                <button className="fancy-grid-button fancy-grid-footer-button" onClick={props.pageState.onRefresh}>
                                    <i className="fas fa-sync-alt"></i>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </td>
            </tr>
        </tfoot>
    )
}

PagerFooter.displayName = "FancyGrid.PagerFooter";