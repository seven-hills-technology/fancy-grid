import React, { useState } from 'react';
import FancyGrid, { FilterType } from '../../dist';

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

export function FilterableWithPopupsExample() {
    const [filterState, setFilterState] = useState([] as FancyGrid.FilterCollection);
    const dataRows = applyFilter(usStates.data, filterState);
    
    return (
        <FancyGrid.Grid>
            <FancyGrid.ColumnList>
                <FancyGrid.Column
                    name="name"
                    title="Name"
                    filterable="popup"/>
                <FancyGrid.Column
                    name="abbreviation"
                    title="Abbreviation"
                    filterable="popup"/>
            </FancyGrid.ColumnList>
            <FancyGrid.Filterable filter={filterState} onFilterChange={setFilterState}/>
            <FancyGrid.LocalDataSource data={dataRows} />
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
                }
                return false;
            });
        }
        return filteredDataRows;
}

export function FilterableWithPopupsExample() {
    const [filterState, setFilterState] = useState([] as FancyGrid.FilterCollection);
    const dataRows = applyFilter(usStates.data, filterState);
    
    return (
        <FancyGrid.Grid>
            <FancyGrid.ColumnList>
                <FancyGrid.Column
                    name="name"
                    title="Name"
                    filterable="popup"/>
                <FancyGrid.Column
                    name="abbreviation"
                    title="Abbreviation"
                    filterable="popup"/>
            </FancyGrid.ColumnList>
            <FancyGrid.Filterable filter={filterState} onFilterChange={setFilterState} defaultFilter={FilterType.StartsWith}/>
            <FancyGrid.LocalDataSource data={dataRows} />
        </FancyGrid.Grid>
    )
}