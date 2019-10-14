import React from 'react';
import { FilterCollection, FilterState } from '../models/filterState';
import { FilterType } from '../models/filterType';

export interface FilterableProps extends FilterState {
    children?: null;
}

export const Filterable: React.FunctionComponent<FilterableProps> = () => null;