import React from 'react';
import { CellRendererFunction } from '../models/cellRendererFunction';

export interface CellRendererProps {
    children: CellRendererFunction;
}

export const CellRenderer: React.FunctionComponent<CellRendererProps> = () => {
    return null;
}