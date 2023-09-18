import React from 'react';
import styles from './CodePreview.module.css';

const CodePreview = ({ htmlContent, sidePadding = false }) => {
  const preventDefaultOnClick = event => {
    if (event.target.tagName === 'A' && event.target.getAttribute('href') === '#') {
      event.preventDefault();
    }
  };

  const iframeHtml = `
    <html>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/yummacss/dist/yumma.css">
        <style>
          display: flex;
          justify-content: center;
          align-items: center;
        </style>
        <script>
          window.addEventListener('click', ${preventDefaultOnClick});
        </script>
      </head>
      <body>
        <div class="${styles['preview-container']}">${htmlContent}</div>
      </body>
    </html>
  `;

  const iframeStyle = {
    width: '100%',
    height: '200px',
    border: 'none',
    paddingTop: '15px',
    paddingLeft: sidePadding ? '15px' : '0px',
    paddingRight: sidePadding ? '15px' : '0px',
    backgroundColor: '#ffffff',
    borderRadius: '8px'
  };

  return (
    <iframe
      title="Code Preview"
      sandbox="allow-scripts allow-same-origin"
      style={iframeStyle}
      srcDoc={iframeHtml}
    />
  );
};

export default CodePreview;
