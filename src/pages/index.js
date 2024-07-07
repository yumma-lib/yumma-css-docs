import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import React from "react";

import './unreleased.css';

export default function Index() {

    const description = 'Packaged with components and utility classes to get your applications into production.';

    return (
        <Layout description={description}>
            <div className="mx-2">
                <main style={{ maxWidth: '56rem' }} className="d-f fd-c jc-c lg:mb-30 lg:mt-24 mb-18 mt-12 mx-auto ta-c">
                    <h1 className="as-c d-f fs-6xl fw-700 lg:text-6xl lh-1">Quickly build applications with less code in your markup</h1>
                    <p className="as-c fs-xl lh-3 max-w-100 md:max-w-full ta-c">Packaged with all of the necessary components and utility classes to facilitate the transition of your applications from development to production.</p>
                    <section className="as-c d-f fd-c mt-6 sm:fd-r sm:w-auto">
                        <Link className="ai-c bg-pink h:t-white d-if fs-sm fw-700 jc-c lh-3 px-3 py-3 rad-2 sm:px-6 sm:w-auto t-white w-full" to="/docs/installation">Get started</Link>
                    </section>
                </main>
            </div>
        </Layout>
    );
}