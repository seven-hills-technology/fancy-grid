import React from 'react';
import { FilterType } from '../models/filterType';
import {DropdownButton, Dropdown} from 'react-bootstrap';

export interface DataRowProps {
    isActive: boolean;
    filterTypes: FilterType[];
    value: FilterType | null;
    onChange: (filterType: string) => void;
}

export const FilterButton: React.FunctionComponent<DataRowProps> = props => {
    return (
        <DropdownButton className="fancy-grid-filter-button-container"
            id="filterSelect"
            title={
                <div className={`filter-button ${props.isActive ? "filter-button-active" : ""}`}>
                    <i className={`${'filter-button-content'} fas fa-filter`} />
                </div>
            }>
                {props.filterTypes.map((filterType, i) => {
                    return(
                        <Dropdown.Item
                            key={i} 
                            onClick={() => props.onChange(filterType.toString())} 
                            className={`${props.value != null && props.value == filterType ? 'fancy-grid-filter-list-selected' : ''}`}>
                                {filterType}
                        </Dropdown.Item>
                        )
                    })
                }
        </DropdownButton>
    );
}