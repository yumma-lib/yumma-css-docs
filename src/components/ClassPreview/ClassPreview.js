import PropTypes from 'prop-types';
import React from 'react';

const ClassPreview = ({ codeData, isPadded = false, isCentered = false, isVersion = '', isHeight }) => {

  const noRightClick = (event) => {
    const { target } = event;
    if (target.tagName === 'A' && target.getAttribute('href') === '#') {
      event.preventDefault();
    }
  };

  const flex = isCentered ? 'display: flex;' : '';

  const styles = `
    ${flex}
    justify-content: ${isCentered ? 'center' : 'flex-start'};
    align-items: ${isCentered ? 'center' : 'flex-start'};
    ${isPadded ? 'padding: 12px 14px;' : ''}
  `;

  const stylesheet = `https://cdn.jsdelivr.net/gh/rrenildopereiraa/yumma-css@${isVersion}/dist/yumma.css`;

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
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
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
