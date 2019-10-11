import React from 'react';
import { SortState } from '../models/sortState';

export interface SortableProps extends SortState {
    children?: null;
}

export const Sortable: React.FunctionComponent<SortableProps> = () => null;