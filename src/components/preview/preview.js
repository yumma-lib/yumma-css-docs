import { useColorMode } from '@docusaurus/theme-common';
import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import { formatHTML, generateContainer, generateStyling } from './previewUtils';

const Preview = ({ data, usePadding = false, useCenter = false, useVersion = '', useHeight, noScroll = false, useTabs = false }) => {
  const iframeRef = useRef(null);

  const { colorMode } = useColorMode();
  const flexbox = useCenter ? 'display: flex;' : '';
  const stylesheet = `https://cdn.jsdelivr.net/gh/yumma-lib/yumma-css@${useVersion}/dist/yumma.css`;

  const processedCode = formatHTML(data);

  const container = generateContainer(stylesheet, flexbox, useCenter, usePadding, noScroll, processedCode);
  const styling = generateStyling(colorMode, useHeight, noScroll);

  const PreviewTab = () => (
    <iframe
      loading="lazy"
      ref={iframeRef}
      rel="noopener noreferrer"
      sandbox="allow-scripts allow-same-origin"
      srcDoc={container}
      style={styling}
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

Preview.propTypes = {
  data: PropTypes.string.isRequired,
  useCenter: PropTypes.bool,
  useHeight: PropTypes.string,
  usePadding: PropTypes.bool,
  noScroll: PropTypes.bool,
  useTabs: PropTypes.bool,
  useVersion: PropTypes.string
};

export default Preview;
