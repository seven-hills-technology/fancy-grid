import React, {useMemo, useRef, useState} from 'react';
import {Button, Overlay, Popover} from 'react-bootstrap';

import {FilterTypeDropdownButton} from './FilterTypeDropdownButton';
import {
    FilterType,
    FilterTypeDisplays,
    FilterTypeOperatorCodes,
    getFilterTypesForFieldType
} from '../../models/filterType';
import {FilterDefinition} from '../../models/filterState';
import {FilterableColumnDefinition} from '../../models/filterableColumnDefinition';
import {FilterInput} from './FilterInput';

interface PopoverContainerProps {
    columnDefinition: FilterableColumnDefinition;
    filterDefinitions: FilterDefinition[];
    onSubmit: (filterDefinitions: FilterDefinition[]) => void;
    onClear: () => void;
}

const PopoverContainer: React.FunctionComponent<PopoverContainerProps> = props => {
    const [filterDefinitions, setFilterDefinitions] = useState(props.filterDefinitions);
    const filterTypes = useMemo(() => {
        const filterTypesForFieldType = getFilterTypesForFieldType(props.columnDefinition.fieldType);
        if (props.columnDefinition.whiteList != null) {
            return props.columnDefinition.whiteList.filter(x => filterTypesForFieldType.includes(x));
        }
        return filterTypesForFieldType;
    }, [props.columnDefinition]);

    function addFilter() {
        setFilterDefinitions([
            ...filterDefinitions,
            {
                fieldName: props.columnDefinition.name,
                fieldType: props.columnDefinition.fieldType,
                filterType: filterTypes[0],
                operator: FilterTypeOperatorCodes[filterTypes[0]],
                value: ""
            }
        ]);
    }

    if (filterDefinitions.length === 0) {
        addFilter();
    }

    function removeFilter(filterIndex: number) {
        setFilterDefinitions(filterDefinitions.filter((_, i) => i !== filterIndex));
    }

    function setFilterType(index: number, filterType: FilterType) {
        setFilterDefinitions(filterDefinitions.map((x, i) => i !== index ? x : {
            ...x,
            filterType,
            operator: FilterTypeOperatorCodes[filterType]
        }));
    }

    function setValue(index: number, value: string) {
        setFilterDefinitions(filterDefinitions.map((x, i) => i !== index ? x : {
            ...x,
            value
        }));
    }

    function submitFilter() {
        props.onSubmit(filterDefinitions);
    }

    function clearFilter() {
        props.onClear();
    }

    return (
        <Popover id="popover-basic" style={{minWidth: "300px"}}>
            <Popover.Content>
                <form onSubmit={event => {submitFilter(); event.preventDefault()}}>
                    <p>Show items with value that:</p>
                    {filterDefinitions.map((filterDefinition, i) => (
                        <React.Fragment key={i}>
                            <div style={{marginBottom: "1rem"}}>
                                <FilterTypeDropdownButton
                                    disabled={filterTypes.length <= 1}
                                    selectedFilterType={filterDefinition.filterType}
                                    filterTypes={filterTypes}
                                    onChange={filterType => setFilterType(i, filterType as FilterType)}
                                    showCaret={true}
                                    style={{display: "inline-block"}}
                                >
                                    {FilterTypeDisplays[filterDefinition.filterType]}
                                </FilterTypeDropdownButton>
                                <Button variant={'outline-secondary'} onClick={() => removeFilter(i)}>
                                    <i className="fas fa-times-circle" />
                                </Button>
                            </div>
                            <FilterInput
                                filterStyle="popup"
                                columnDefinition={props.columnDefinition}
                                filterType={filterDefinition.filterType}
                                value={filterDefinition.value}
                                onChange={value => setValue(i, value)}
                                autoFocus={i === 0}
                            />
                        </React.Fragment>
                    ))}
                    <div style={{marginTop: "1rem"}}>
                        <Button variant={'outline-secondary'} onClick={addFilter}>
                            <i className="fas fa-plus-circle" />
                        </Button>
                    </div>
                    <div style={{marginTop: "1rem"}}>
                        <Button type="submit" variant={'outline-secondary'}>Filter</Button>
                        <Button variant={'outline-secondary'} onClick={clearFilter}>Clear</Button>
                    </div>
                </form>
            </Popover.Content>
        </Popover>
    )
};

export interface PopupFilterContainerProps {
    columnDefinition: FilterableColumnDefinition;
    filterDefinitions: FilterDefinition[];
    isActive: boolean;
    onFilterChange: (filterDefinitions: FilterDefinition[]) => void;
}

export const PopupFilterContainer: React.FunctionComponent<PopupFilterContainerProps> = props => {
    const target = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    function submitFilter(filterDefinitions: FilterDefinition[]) {
        props.onFilterChange(filterDefinitions);
        setShow(false);
    }

    function clearFilter() {
        props.onFilterChange([]);
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
                            columnDefinition={props.columnDefinition}
                            filterDefinitions={props.filterDefinitions}
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