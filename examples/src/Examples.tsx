import React from 'react';
import { AbsoluteBasicGridExample, code as absoluteBasicGridExampleCode } from './AbsoluteBasicGridExample';
import { CustomColumnTitlesExample, code as customColumnTitlesExampleCode } from './CustomColumnTitlesExample';
import { CustomCellRendererExample, code as customCellRendererExampleCode } from './CustomCellRendererExample';

export function Examples() {
    const dataRows = [
        {a: 1, b: 2, c: 3, d: 11},
        {a: 4, b: 5, c: 6},
        {a: 7, b: 8, c: 9, d: 10}
    ]
    return (
        <div className="examples-container">
            <div className="example-container">
                <pre>{absoluteBasicGridExampleCode}</pre>
                <AbsoluteBasicGridExample />
            </div>
            <div className="example-container">
                <pre>{customColumnTitlesExampleCode}</pre>
                <CustomColumnTitlesExample />
            </div>
            <div className="example-container">
                <pre>{customCellRendererExampleCode}</pre>
                <CustomCellRendererExample />
            </div>
        </div>
    )
}