import { SandpackCodeEditor, SandpackFileExplorer, SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import React from "react";

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

    return (
        <Layout>
            <div>
                <div className={styles.yma__header}>
                    <div>
                        <h1 className={styles.yma__heading}>Quickly build amazing websites with less code in your markup.</h1>
                        <p className={styles.yma__paragraph}>Bundled with <Link to='/components'>components</Link> and utility classes designed for quick development with small class names.</p>
                        <div className={styles.yma__action}>
                            <Link className={styles.yma__primary__btn} to='/docs/installation'>Get started</Link>
                            <Link className={styles.yma__secondary__btn} to='/playground'>Try it now</Link>
                        </div>
                    </div>
                    <SandpackProvider template="static" files={files}>
                        <SandpackLayout>
                            <SandpackFileExplorer
                                style={{ height: '500px' }}
                            />
                            <SandpackCodeEditor
                                closableTabs={true}
                                showTabs
                                style={{ height: '500px'}}
                            />
                            <SandpackPreview
                                showNavigator
                                style={{ height: '500px' }}
                            />
                        </SandpackLayout>
                    </SandpackProvider>
                </div>
            </div>
        </Layout>
    );
}
