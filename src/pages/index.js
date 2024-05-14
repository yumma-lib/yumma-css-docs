import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import React from "react";
import { IoPlayOutline } from "react-icons/io5";

import styles from './index.module.css';

export default function Index() {

    return (
        <Layout>
            <div style={{ margin: '12px' }}>
                <div className={styles.yma__header}>
                    <div>
                        <h1 className={styles.yma__heading}>Quickly build amazing websites with less code in your markup.</h1>
                        <p className={styles.yma__paragraph}>Bundled with components and small classes that are designed for fast development with small class names such as ins, btn, d-f, and many more.</p>
                        <div className={styles.yma__action}>
                            <Link className={styles.yma__btn} to='/docs/installation'>Get started</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.yma__video}>
                    <img className={styles.yma__video__thumbnail} src="/img/thumbnail.png" alt="Yumma CSS Video Thumbnail" />
                    <div className={styles.yma__video__container}>
                        <a className={styles.yma__video__btn} href="#">
                            <IoPlayOutline className={styles.yma__video__btn__icon} />
                            Play the overview
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
