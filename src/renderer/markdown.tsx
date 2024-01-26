import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ raw }: { raw: string }) => {
    return (
        <div>
            <ReactMarkdown>{raw}</ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
