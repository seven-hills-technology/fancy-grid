import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { AbsoluteBasicGridExample, code as absoluteBasicGridExampleCode } from './AbsoluteBasicGridExample';
import { CustomColumnTitlesExample, code as customColumnTitlesExampleCode } from './CustomColumnTitlesExample';
import { CustomCellRendererExample, code as customCellRendererExampleCode } from './CustomCellRendererExample';
import { PagerExample, code as pagerExampleCode } from './PagerExample';

export function Examples() {
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
            <div className="example-container">
                <SyntaxHighlighter language="jsx" style={theme}>{pagerExampleCode}</SyntaxHighlighter>
                <PagerExample />
            </div>
        </div>
    )
}