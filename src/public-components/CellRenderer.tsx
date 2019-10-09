import React from 'react';

export interface CellRendererProps {
    children: (data: any) => JSX.Element;
}

export const CellRenderer: React.FunctionComponent<CellRendererProps> = () => {
    return null;
}