import React from 'react';
import { FilterCollection, FilterState } from '../models/filterState';

export interface FilterableProps extends FilterState {
    children?: null;
    filter: FilterCollection;
}

export const Filterable: React.FunctionComponent<FilterableProps> = () => null;