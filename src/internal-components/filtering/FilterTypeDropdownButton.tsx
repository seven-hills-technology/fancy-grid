import React, {CSSProperties, useRef} from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap';

import {FilterType, FilterTypeDisplays} from '../../models/filterType';

export interface FilterTypeDropdownButtonProps {
    selectedFilterType: FilterType | null;
    filterTypes: FilterType[];
    onChange: (filterType: FilterType) => void;
    showCaret?: boolean
    style?: CSSProperties;
    disabled?: boolean;
}

export const FilterTypeDropdownButton: React.FunctionComponent<FilterTypeDropdownButtonProps> = props => {
    const {current: dropdownButtonId} = useRef(`filterTypeDropdownButton-${Math.random()}`);
    return (
        <DropdownButton
            id={dropdownButtonId}
            className={`${!props.showCaret ? "hide-caret": ""}`}
            title={props.children}
            variant="secondary-outline"
            style={props.style}
            disabled={props.disabled ?? false}
        >
        {props.filterTypes.map((filterType, i) => {
            return(
                <Dropdown.Item
                    key={i}
                    onClick={() => props.onChange(filterType)}
                    className={`${props.selectedFilterType === filterType ? 'fancy-grid-filter-list-selected' : ''}`}
                    active={props.selectedFilterType === filterType}
                >
                    {FilterTypeDisplays[filterType]}
                </Dropdown.Item>
            )
        })}
        </DropdownButton>
    );
};

FilterTypeDropdownButton.displayName = "FancyGrid.FilterTypeDropdownButton";