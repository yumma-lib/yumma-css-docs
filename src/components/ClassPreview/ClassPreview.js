import { useColorMode } from '@docusaurus/theme-common';
import CodeBlock from '@theme/CodeBlock';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

const ClassPreview = ({ codeData, isPadded = false, isCentered = false, isVersion = '', isHeight, hideScroll = false }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const noRightClick = (event) => {
      event.preventDefault();
    };

    const iframeDocument = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
    iframeDocument.addEventListener('contextmenu', noRightClick);

    return () => {
      iframeDocument.removeEventListener('contextmenu', noRightClick);
    };
  }, []);

  const { colorMode } = useColorMode();
  const flex = isCentered ? 'display: flex;' : '';
  const stylesheet = `https://cdn.jsdelivr.net/gh/yumma-lib/yumma-css@${isVersion}/dist/yumma.css`;

  const styles = `
    ${flex}
    justify-content: ${isCentered ? 'center' : 'flex-start'};
    align-items: ${isCentered ? 'center' : 'flex-start'};
    ${isPadded ? 'padding: 12px 14px;' : ''}
    ${hideScroll ? 'overflow-y: hidden;' : ''}
  `;

  const iframe = `
    <html>
      <head>
        <link rel="stylesheet" href="${stylesheet}">
        <style>
          ${hideScroll ? 'body { overflow-y: hidden; }' : ''}
          a[href="#"] { pointer-events: none; cursor: default; } /* Prevent navigation for anchor tags with href="#" */
        </style>
      </head>
      <body>
        <div style="${styles}">${codeData}</div>
      </body>
    </html>
  `;

  const iframeStyle = {
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
        style={iframeStyle}
        srcDoc={iframe}
        loading="lazy"
        rel="noopener noreferrer"
      />
      <CodeBlock language="html">
        {codeData}
      </CodeBlock>
    </div>
  );
};

ClassPreview.propTypes = {
  codeData: PropTypes.string.isRequired,
  isPadded: PropTypes.bool,
  isCentered: PropTypes.bool,
  isVersion: PropTypes.string,
  isHeight: PropTypes.string,
  hideScroll: PropTypes.bool,
};

export default ClassPreview;