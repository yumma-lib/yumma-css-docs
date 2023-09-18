import React from 'react';

const CodePreview = ({ htmlContent, isPadded = false, isCentered = false, isVersion = '' }) => {
  const preventDefaultOnClick = event => {
    if (event.target.tagName === 'A' && event.target.getAttribute('href') === '#') {
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
  const cdnURL = `https://unpkg.com/yummacss@${isVersion}/dist/yumma.css`;

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
    />
  );
};

export default CodePreview;
