import React from 'react';
import {FilterableColumnDefinition} from '../../models/filterableColumnDefinition';
import {filterTypeUsesValue} from '../../models/filterState';
import {FilterType} from '../..';

export interface FilterInputProps {
    columnDefinition: FilterableColumnDefinition;
    filterType: FilterType;
    filterStyle: "popup" | "inline";
    value: string;
    onChange: (value: string) => void;
    autoFocus?: boolean;
}

export const FilterInput: React.FunctionComponent<FilterInputProps> = React.memo(props => {
    const filterTypeUsesFieldValue = filterTypeUsesValue(props.filterType);
    const isInputDisabled = !filterTypeUsesFieldValue;

    if (props.filterStyle === "popup" && isInputDisabled) {
        return null;
    }

    switch (props.columnDefinition.fieldType) {
        case "text":
        case "number":
        case "date":
            return (
                <input
                    className="fancy-grid-column-filter-input fancy-grid-input"
                    name={props.columnDefinition.name}
                    onChange={(event) => props.onChange(event.target.value)}
                    placeholder={props.columnDefinition.title}
                    type={props.columnDefinition.fieldType}
                    value={props.value}
                    disabled={isInputDisabled}
                    autoFocus={props.autoFocus}
                />
            );
        case 'boolean':
            return (
                <select
                    className="fancy-grid-column-filter-input fancy-grid-input"
                    name={props.columnDefinition.name}
                    onChange={(event) => props.onChange(event.target.value)}
                    value={props.value}
                    disabled={isInputDisabled}
                    autoFocus={props.autoFocus}
                >
                    {props.value === "" ? <option value="">(Pick one)</option> : null}
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            )
        case 'yesNo':
            return (
                <select
                    className="fancy-grid-column-filter-input fancy-grid-input"
                    name={props.columnDefinition.name}
                    onChange={(event) => props.onChange(event.target.value)}
                    value={props.value}
                    disabled={isInputDisabled}
                    autoFocus={props.autoFocus}
                >
                    {props.value === "" ? <option value="">(Pick one)</option> : null}
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            )
        case 'dropdown':
            return (
                <select
                    className="fancy-grid-column-filter-input fancy-grid-input fancy-grid-dropdown"
                    name={props.columnDefinition.name}
                    onChange={(event) => props.onChange(event.target.value)}
                    value={props.value}
                    autoFocus={props.autoFocus}
                >
                    {props.value === "" ? <option value="">(Pick one)</option> : null}
                    {props.columnDefinition.dropdownOptions!.map((x, i) => 
                        <option key={i} value={x.value}>{x.text}</option>
                    )}
                </select>
            )
        default:
            return null;
    }
});

FilterInput.displayName = "FancyGrid.FilterInput";