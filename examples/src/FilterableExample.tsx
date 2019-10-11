import React, { useState } from 'react';
import FancyGrid from '../../dist';

import usStates from './states.json';

export const code = `function applyFilter(dataRows: any[], filters: FancyGrid.FilterCollection) {
    let filteredDataRows = dataRows;
        for (const filter of filters) {
            const {fieldName, value, filterType} = filter;
            filteredDataRows = filteredDataRows.filter((x, i) => {
                const xVal = x[fieldName].toLowerCase();
                switch (filterType) {
                    case FancyGrid.FilterType.StartsWith:
                        if (String(xVal).startsWith(value.toLowerCase())) {
                            return true;
                        }
                        break;
                    case FancyGrid.FilterType.Contains:
                        if (String(xVal).includes(value.toLowerCase())) {
                            return true;
                        }
                        break;
                    default:
                        if (String(xVal).startsWith(value.toLowerCase())) {
                            return true;
                        }
                        break;
                }
                return false;
            });
        }
        return filteredDataRows;
}

export function FilterableExample() {
    const [filterState, setFilterState] = useState([] as FancyGrid.FilterCollection);
    const dataRows = applyFilter(usStates.data, filterState);
    
    return (
        <FancyGrid.Grid dataRows={dataRows}>
            <FancyGrid.ColumnList>
                <FancyGrid.Column
                    name="name"
                    title="Name"/>
                <FancyGrid.Column
                    name="abbreviation"
                    title="Abbreviation"/>
            </FancyGrid.ColumnList>
            <FancyGrid.Filterable filter={filterState} onFilterChange={setFilterState}/>
        </FancyGrid.Grid>
    )
}`

function applyFilter(dataRows: any[], filters: FancyGrid.FilterCollection) {
    let filteredDataRows = dataRows;
        for (const filter of filters) {
            const {fieldName, value, filterType} = filter;
            filteredDataRows = filteredDataRows.filter((x, i) => {
                const xVal = x[fieldName].toLowerCase();
                switch (filterType) {
                    case FancyGrid.FilterType.StartsWith:
                        if (String(xVal).startsWith(value.toLowerCase())) {
                            return true;
                        }
                        break;
                    case FancyGrid.FilterType.Contains:
                        if (String(xVal).includes(value.toLowerCase())) {
                            return true;
                        }
                        break;
                    default:
                        if (String(xVal).startsWith(value.toLowerCase())) {
                            return true;
                        }
                        break;
                }
                return false;
            });
        }
        return filteredDataRows;
}

export function FilterableExample() {
    const [filterState, setFilterState] = useState([] as FancyGrid.FilterCollection);
    const dataRows = applyFilter(usStates.data, filterState);
    
    return (
        <FancyGrid.Grid dataRows={dataRows}>
            <FancyGrid.ColumnList>
                <FancyGrid.Column
                    name="name"
                    title="Name"/>
                <FancyGrid.Column
                    name="abbreviation"
                    title="Abbreviation"/>
            </FancyGrid.ColumnList>
            <FancyGrid.Filterable filter={filterState} onFilterChange={setFilterState}/>
        </FancyGrid.Grid>
    )
}