import { useColorMode } from '@docusaurus/theme-common';
import PropTypes from 'prop-types';
import React from 'react';

const ClassPreview = ({ codeData, isPadded = false, isCentered = false, isVersion = '', isHeight }) => {

  const noRightClick = (event) => {
    const { target } = event;
    if (target.tagName === 'A' && target.getAttribute('href') === '#') {
      event.preventDefault();
    }
  };

  const { colorMode, setColorMode } = useColorMode();
  const flex = isCentered ? 'display: flex;' : '';

  const styles = `
    ${flex}
    justify-content: ${isCentered ? 'center' : 'flex-start'};
    align-items: ${isCentered ? 'center' : 'flex-start'};
    ${isPadded ? 'padding: 12px 14px;' : ''}
  `;

  const stylesheet = `https://cdn.jsdelivr.net/gh/yumma-lib/yumma-css@${isVersion}/dist/yumma.css`;

  const iframe = `
    <html>
      <head>
        <link rel="stylesheet" href="${stylesheet}">
        <script> window.addEventListener('click', ${noRightClick}); </script>
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
  };

  return (
    <iframe
      sandbox="allow-scripts allow-same-origin"
      style={iframeStyle}
      srcDoc={iframe}
      rel="noopener noreferrer"
    />
  );
};

ClassPreview.propTypes = {
  codeData: PropTypes.string.isRequired,
  isPadded: PropTypes.bool,
  isCentered: PropTypes.bool,
  isVersion: PropTypes.string,
  isHeight: PropTypes.string,
};

export default ClassPreview;