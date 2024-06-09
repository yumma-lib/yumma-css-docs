import { useColorMode } from '@docusaurus/theme-common';
import CodeBlock from '@theme/CodeBlock';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import beautify from 'js-beautify';

const ClassPreview = ({ codeData, isPadded = false, isCentered = false, setVersion = '', isHeight, hideScroll = false }) => {
  const iframeRef = useRef(null);

  const { colorMode } = useColorMode();
  const flex = isCentered ? 'display: flex;' : '';
  const stylesheet = `https://cdn.jsdelivr.net/gh/yumma-lib/yumma-css@${setVersion}/dist/yumma.css`;

  const styles = `
    ${flex} justify-content: ${isCentered ? 'center' : 'flex-start'}; align-items: ${isCentered ? 'center' : 'flex-start'};
    ${isPadded ? 'padding: 12px 14px;' : ''}
    ${hideScroll ? 'overflow-y: hidden;' : ''}
  `;

  const formatHTML = (html) => {
    return beautify.html(html, {
      indent_size: 4,
      wrap_line_length: 120,
      preserve_newlines: false,
    });
  };

  const processedCode = formatHTML(codeData);

  const container = `
  <html>
    <head>
      <link rel="stylesheet" href="${stylesheet}">
      <style>
        ${hideScroll ? 'body { overflow-y: hidden; }' : ''}
      </style>
    </head>
    <body>
      <div style="${styles}">${processedCode}</div>
    </body>
  </html>
`;

  const styling = {
    backgroundColor: colorMode === 'dark' ? '#1d2026' : '#f9fafb',
    border: colorMode === 'dark' ? '1px solid #2d2f33' : '1px solid #e5e7eb',
    borderRadius: '8px',
    height: isHeight || '200px',
    width: '100%',
    overflowY: hideScroll ? 'hidden' : 'auto'
  };

  return (
    <div>
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts allow-same-origin"
        style={styling}
        srcDoc={container}
        loading="lazy"
        rel="noopener noreferrer"
      />
      <CodeBlock language="html">
        {processedCode}
      </CodeBlock>
    </div>
  );
};

ClassPreview.propTypes = {
  codeData: PropTypes.string.isRequired,
  isPadded: PropTypes.bool,
  isCentered: PropTypes.bool,
  setVersion: PropTypes.string,
  isHeight: PropTypes.string,
  hideScroll: PropTypes.bool,
};

export default ClassPreview;