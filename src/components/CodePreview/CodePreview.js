import React from 'react';
import PropTypes from 'prop-types';

const CodePreview = ({ htmlContent, isPadded = false, isCentered = false, isVersion = '' }) => {
  const preventDefaultOnClick = (event) => {
    const { target } = event;
    if (target.tagName === 'A' && target.getAttribute('href') === '#') {
      event.preventDefault();
    }
  };

  const displayFlex = isCentered ? 'display: flex;' : '';

  const containerStyles = `
    ${displayFlex}
    justify-content: ${isCentered ? 'center' : 'flex-start'};
    align-items: ${isCentered ? 'center' : 'flex-start'};
    ${isPadded ? 'padding: 12px 14px;' : ''}
  `;
  const cdnURL = `https://cdn.jsdelivr.net/gh/rrenildopereiraa/yumma-css@${isVersion}/dist/yumma.css`;

  const iframeHtml = `
    <html>
      <head>
        <link rel="stylesheet" href="${cdnURL}">
        <style>
          body {
            margin: 0;
          }
          .container {
            ${containerStyles}
          }
        </style>
        <script>
          window.addEventListener('click', ${preventDefaultOnClick});
        </script>
      </head>
      <body>
        <div class="container">${htmlContent}</div>
      </body>
    </html>
  `;

  const iframeStyle = {
    width: '100%',
    height: '200px',
    border: 'none',
    backgroundColor: '#f6f8fa',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,.1)',
    borderRadius: '8px'
  };

  return (
    <iframe
      sandbox="allow-scripts allow-same-origin"
      style={iframeStyle}
      srcDoc={iframeHtml}
      title="Code Preview"
      rel="noopener noreferrer"
    />
  );
};

CodePreview.propTypes = {
  htmlContent: PropTypes.string.isRequired,
  isPadded: PropTypes.bool,
  isCentered: PropTypes.bool,
  isVersion: PropTypes.string,
};

export default CodePreview;
