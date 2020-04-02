import React, {useRef, useState} from 'react';
import {Overlay, Popover} from 'react-bootstrap';

import {FilterTypeDropdownButton} from './FilterTypeDropdownButton';
import {FilterType} from '../../models/filterType';


export interface PopupFilterContainerProps {
    fieldName: string;
    fieldTitle: string;
    isActive: boolean;
    filterTypes: FilterType[];
    selectedFilterType: FilterType;
    onSelectedFilterTypeChange: (filterType: FilterType) => void;
    selectedValue: string;
    onSelectedValueChange: (value: string) => void;
}

export const PopupFilterContainer: React.FunctionComponent<PopupFilterContainerProps> = props => {
    const target = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                <FilterTypeDropdownButton selectedFilterType={props.selectedFilterType} filterTypes={props.filterTypes} onChange={props.onSelectedFilterTypeChange}>
                    <div>
                        {props.selectedFilterType}
                    </div>
                </FilterTypeDropdownButton>
                <input
                    className="fancy-grid-column-filter-input fancy-grid-input"
                    name={props.fieldName}
                    onChange={(event) => props.onSelectedValueChange(event.target.value)}
                    placeholder={props.fieldTitle}
                    type="text"
                    value={props.selectedValue} />
            </Popover.Content>
        </Popover>
    );

    return (
        <>
            <div ref={target} className={`filter-button ${props.isActive ? "filter-button-active" : ""}`} onClick={() => setShow(!show)}>
                <i className={`${'filter-button-content'} fas fa-filter`} />
            </div>
            <Overlay target={target.current!} show={show} placement="right" rootClose={true} onHide={() => setShow(false)}>
                {({ref, style}) => (
                    <div ref={ref} style={style}>
                        {popover}
                    </div>
                )}
            </Overlay>
        </>
    )
};

PopupFilterContainer.displayName = "FancyGrid.PopupFilterContainer";