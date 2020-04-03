import React, {useRef, useState} from 'react';
import {Button, Overlay, Popover} from 'react-bootstrap';

import {FilterTypeDropdownButton} from './FilterTypeDropdownButton';
import {FilterType} from '../../models/filterType';

interface PopoverContainerProps {
    fieldName: string;
    fieldTitle: string;
    initialSelectedFilterType: FilterType;
    filterTypes: FilterType[];
    initialSelectedValue: string;
    onSubmit: (selectedFilterType: FilterType, selectedValue: string) => void;
    onClear: () => void;
}

const PopoverContainer: React.FunctionComponent<PopoverContainerProps> = props => {
    const [selectedFilterType, setSelectedFilterType] = useState(props.initialSelectedFilterType);
    const [selectedValue, setSelectedValue] = useState(props.initialSelectedValue);

    function submitFilter() {
        props.onSubmit(selectedFilterType, selectedValue);
    }

    function clearFilter() {
        props.onClear();
    }

    return (
        <Popover id="popover-basic">
            <Popover.Content>
                <p>Show items with value that:</p>
                <div style={{marginBottom: "1rem"}}>
                    <FilterTypeDropdownButton selectedFilterType={selectedFilterType} filterTypes={props.filterTypes} onChange={filterType => setSelectedFilterType(filterType as FilterType)} showCaret={true}>
                        {selectedFilterType}
                    </FilterTypeDropdownButton>
                </div>
                <input
                    type="text"
                    className="fancy-grid-column-filter-input fancy-grid-input"
                    name={props.fieldName}
                    placeholder={props.fieldTitle}
                    onChange={(event) => setSelectedValue(event.target.value)}
                    value={selectedValue} />
                <div style={{marginTop: "1rem"}}>
                    <Button variant={'outline-secondary'} onClick={submitFilter}>Filter</Button>
                    <Button variant={'outline-secondary'} onClick={clearFilter}>Clear</Button>
                </div>
            </Popover.Content>
        </Popover>
    )
};

export interface PopupFilterContainerProps {
    fieldName: string;
    fieldTitle: string;
    isActive: boolean;
    filterTypes: FilterType[];
    selectedFilterType: FilterType;
    selectedValue: string;
    onFilterChange: (filterType: FilterType, value: string) => void;
}

export const PopupFilterContainer: React.FunctionComponent<PopupFilterContainerProps> = props => {
    const target = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    function submitFilter(filterType: FilterType, value: string) {
        props.onFilterChange(filterType, value);
        setShow(false);
    }

    function clearFilter() {
        props.onFilterChange(FilterType.StartsWith, "");
        setShow(false);
    }

    return (
        <>
            <div ref={target} className={`filter-button ${props.isActive ? "filter-button-active" : ""}`} onClick={() => setShow(!show)}>
                <i className={`${'filter-button-content'} fas fa-filter`} />
            </div>
            <Overlay target={target.current!} show={show} placement="right" rootClose={true} onHide={() => setShow(false)}>
                {({ref, style}) => (
                    <div ref={ref} style={style}>
                        <PopoverContainer
                            fieldName={props.fieldName}
                            fieldTitle={props.fieldTitle}
                            initialSelectedFilterType={props.selectedFilterType}
                            filterTypes={props.filterTypes}
                            initialSelectedValue={props.selectedValue}
                            onSubmit={submitFilter}
                            onClear={clearFilter}
                        />
                    </div>
                )}
            </Overlay>
        </>
    )
};

PopupFilterContainer.displayName = "FancyGrid.PopupFilterContainer";