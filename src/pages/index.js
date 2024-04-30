import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import React from "react";

import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";

import styles from './index.modules.css';

export default function Index() {
    const files =
    {
        '/index.html': {
            code: `<!DOCTYPE html>
<html>

<head>
  <title>Yumma CSS</title>
  <meta charset="UTF-8" />
  <link href="https://cdn.jsdelivr.net/npm/yummacss/dist/yumma.min.css" rel="stylesheet" crossorigin="anonymous">
</head>

<body>
  <div class="ins h-1/1">
    <h1 class="t-pink">Hello Yumma CSS!</h1>
  </div>
</body>

</html>`,
        },
    };

    const dependencies = {
        'react': 'latest',
        'react-dom': 'latest',
        'yummacss': 'latest'
    };

    return (
        
        <Layout>
            <div>
                <div className={styles.yma__header}>
                    <div>
                        <div className={styles.yma__margin__y}>
                            <h1 className={styles.yma__heading}>Quickly build amazing websites with less code in your markup.</h1>
                            <p className={styles.yma__description}>A CSS library bundled with components and utility classes designed for quick development with fewer class names.</p>
                        </div>
                        <div className={styles.yma__margin__y}>
                            <Link className={styles.yma__primary__button} to='/docs/intro'>Get started</Link>
                            <Link className={styles.yma__secondary__button} to='/playground'>Try it now</Link>
                        </div>

                        <SandpackProvider template="static" files={files} dependencies={dependencies} >
                            <SandpackLayout>
                                <SandpackFileExplorer
                                    style={{ height: '500px' }}
                                />
                                <SandpackCodeEditor
                                    closableTabs={true}
                                    showTabs
                                    style={{ height: '500px', pre: '' }}
                                />
                                <SandpackPreview
                                    showNavigator
                                    style={{ height: '500px' }}
                                />
                            </SandpackLayout>
                        </SandpackProvider>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
