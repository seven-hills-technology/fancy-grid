import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
                <SyntaxHighlighter language="jsx" style={theme}>{absoluteBasicGridExampleCode}</SyntaxHighlighter>
                <AbsoluteBasicGridExample />
            </div>
            <div className="example-container">
                <SyntaxHighlighter language="jsx" style={theme}>{customColumnTitlesExampleCode}</SyntaxHighlighter>
                <CustomColumnTitlesExample />
            </div>
            <div className="example-container">
                <SyntaxHighlighter language="jsx" style={theme}>{customCellRendererExampleCode}</SyntaxHighlighter>
                <CustomCellRendererExample />
            </div>
        </div>
    )
}