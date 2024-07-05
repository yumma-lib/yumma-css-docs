import beautify from 'js-beautify';

export const generateContainer = (stylesheet, flex, useCenter, usePadding, useScroll, processedCode) => `
  <html>
    <head>
      <link rel="stylesheet" href="${stylesheet}">
      <style>
        #preview-tab {
          ${flex} 
          justify-content: ${useCenter ? 'center' : 'flex-start'}; 
          align-items: ${useCenter ? 'center' : 'flex-start'};
          ${usePadding ? 'padding: 12px 14px;' : ''}
          ${useScroll ? 'overflow-y: hidden;' : ''}
        }
        ${useScroll ? 'body { overflow-y: hidden; }' : ''}
      </style>
    </head>
    <body>
      <div id="preview-tab">${processedCode}</div>
    </body>
  </html>
`;

export const generateStyling = (colorMode, useHeight, useScroll) => ({
    backgroundColor: colorMode === 'dark' ? '#1d2026' : '#f9fafb',
    border: colorMode === 'dark' ? '1px solid #2d2f33' : '1px solid #e5e7eb',
    borderRadius: '8px',
    height: useHeight || '200px',
    width: '100%',
    overflowY: useScroll ? 'hidden' : 'auto'
});

export const formatHTML = (html) => beautify.html(html, {
    indent_size: 4,
    wrap_line_length: 160,
    preserve_newlines: false
});
