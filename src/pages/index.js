import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import React from "react";
import ReactPlayer from 'react-player'

import styles from './index.module.css';

export default function Index() {

    return (
        <Layout>
            <div>
                <div className={styles.yma__header}>
                    <div>
                        <h1 className={styles.yma__heading}>Quickly build amazing websites with less code in your markup.</h1>
                        <p className={styles.yma__paragraph}>Bundled with <Link to='/components'>components</Link> and small classes that are designed for fast development with small class names such as <Link to='/docs/fundamentals/layout/inset'><code>ins</code></Link>, <Link to='/components/buttons'><code>btn</code></Link>, <Link to='/docs/positioning/display'><code>d-f</code></Link>, and many more.</p>
                        <div className={styles.yma__action}>
                            <Link className={styles.yma__btn} to='/docs/installation'>Get started</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
