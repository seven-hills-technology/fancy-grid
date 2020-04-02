import React from 'react';

import {FilterTypeDropdownButton} from './FilterTypeDropdownButton';
import {FilterType} from '../../models/filterType';


export interface InlineFilterContainerProps {
    fieldName: string;
    fieldTitle: string;
    isActive: boolean;
    filterTypes: FilterType[];
    selectedFilterType: FilterType;
    onSelectedFilterTypeChange: (filterType: FilterType) => void;
    selectedValue: string;
    onSelectedValueChange: (value: string) => void;
}

export const InlineFilterContainer: React.FunctionComponent<InlineFilterContainerProps> = props => {
    return (
        <>
            <input
                className="fancy-grid-column-filter-input fancy-grid-input"
                name={props.fieldName}
                onChange={(event) => props.onSelectedValueChange(event.target.value)}
                placeholder={props.fieldTitle}
                type="text"
                value={props.selectedValue} />
            <FilterTypeDropdownButton selectedFilterType={props.selectedFilterType} filterTypes={props.filterTypes} onChange={props.onSelectedFilterTypeChange}>
                <div className={`filter-button ${props.isActive ? "filter-button-active" : ""}`}>
                    <i className={`${'filter-button-content'} fas fa-filter`} />
                </div>
            </FilterTypeDropdownButton>
        </>
    )
};

InlineFilterContainer.displayName = "FancyGrid.InlineFilterContainer";