import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import React from "react";

import styles from './index.modules.css';

export default function Index() {

    return (
        <Layout>
            <div>
                <div className={styles.yma__header}>
                    <div>
                        <h1 className={styles.yma__heading}>Quickly build amazing websites with less code in your markup.</h1>
                        <p className={styles.yma__paragraph}>Bundled with <Link to='/components'>components</Link> and utility classes designed for quick development with small class names.</p>
                        <div className={styles.yma__action}>
                            <Link className={styles.yma__btn} to='/docs/installation'>Get started</Link>
                        </div>
                    </div>
                    {/* something will go here again */}
                </div>
            </div>
        </Layout>
    );
}
