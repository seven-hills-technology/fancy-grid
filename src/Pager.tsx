import React from 'react';

export interface PagerProps {
    children?: null;
    page: number;
    numPages: number;
    onPageChange: (newPage: number) => void;
}

export const Pager: React.FunctionComponent<PagerProps> = () => {
    return null;
}