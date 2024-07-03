import { useColorMode } from '@docusaurus/theme-common';
import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import beautify from 'js-beautify';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

const YmaPreview = ({ codeData, usePadding = false, useCenter = false, useVersion = '', useHeight, useScroll = false, useTabs = false }) => {
  const iframeRef = useRef(null);

  const { colorMode } = useColorMode();
  const flex = useCenter ? 'display: flex;' : '';
  const stylesheet = `https://cdn.jsdelivr.net/gh/yumma-lib/yumma-css@${useVersion}/dist/yumma.css`;

  const styles = `
    ${flex} justify-content: ${useCenter ? 'center' : 'flex-start'}; align-items: ${useCenter ? 'center' : 'flex-start'};
    ${usePadding ? 'padding: 12px 14px;' : ''}
    ${useScroll ? 'overflow-y: hidden;' : ''}
  `;

  const formatHTML = (html) => {
    return beautify.html(html, {
      indent_size: 4,
      wrap_line_length: 160,
      preserve_newlines: false,
    });
  };

  const processedCode = formatHTML(codeData);

  const container = `
  <html>
    <head>
      <link rel="stylesheet" href="${stylesheet}">
      <style>
        ${useScroll ? 'body { overflow-y: hidden; }' : ''}
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
    height: useHeight || '200px',
    width: '100%',
    overflowY: useScroll ? 'hidden' : 'auto'
  };

  const PreviewTab = () => (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts allow-same-origin"
      style={styling}
      srcDoc={container}
      loading="lazy"
      rel="noopener noreferrer"
    />
  );

  const MarkupTab = () => (
    <CodeBlock language="html">
      {processedCode}
    </CodeBlock>
  );

  return useTabs ? (
    <Tabs>
      <TabItem label="Preview" value="preview">
        <PreviewTab />
      </TabItem>
      <TabItem label="Markup" value="markup">
        <MarkupTab />
      </TabItem>
    </Tabs>
  ) : (
    <div>
      <PreviewTab />
      <MarkupTab />
    </div>
  );
};

YmaPreview.propTypes = {
  codeData: PropTypes.string.isRequired,
  useCenter: PropTypes.bool,
  useHeight: PropTypes.string,
  usePadding: PropTypes.bool,
  useScroll: PropTypes.bool,
  useTabs: PropTypes.bool,
  useVersion: PropTypes.string
};

export default YmaPreview;
