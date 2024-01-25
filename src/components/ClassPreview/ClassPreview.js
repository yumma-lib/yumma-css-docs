import React from 'react';
import PropTypes from 'prop-types';

const ClassPreview = ({ htmlContent, isPadded = false, isCentered = false, isVersion = '' }) => {
  const noRightClick = (event) => {
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
          window.addEventListener('click', ${noRightClick});
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
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    boxShadow: 'rgba(0, 0, 0, 0.0) 0px 2px 4px, rgba(0, 0, 0, 0.1) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
    borderRadius: '8px'
  };

  return (
    <iframe
      sandbox="allow-scripts allow-same-origin"
      style={iframeStyle}
      srcDoc={iframeHtml}
      rel="noopener noreferrer"
    />
  );
};

ClassPreview.propTypes = {
  htmlContent: PropTypes.string.isRequired,
  isPadded: PropTypes.bool,
  isCentered: PropTypes.bool,
  isVersion: PropTypes.string,
};

export default ClassPreview;
