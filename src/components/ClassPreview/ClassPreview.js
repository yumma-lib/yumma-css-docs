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
  const stylesheet = `https://cdn.jsdelivr.net/npm/yummacss@${isVersion}/dist/yumma.css`;

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
    width: '100%',
    height: isHeight || '200px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.0) 0px 2px 4px, rgba(0, 0, 0, 0.1) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
    borderRadius: '8px'
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
