import React from 'react';
import { FilterCollection } from './models/filterState';

export interface FilterableProps {
    children?: null;
    filter: FilterCollection;
}

export const Filterable: React.FunctionComponent<FilterableProps> = () => null;