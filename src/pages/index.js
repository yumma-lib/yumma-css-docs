import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import React from "react";

import "yummacss/dist/yumma.css";

export default function Index() {

    return (
        <Layout>
            <main style={{ maxWidth: '56rem' }} className="d-f fd-c jc-c lg:mb-10 lg:mt-8 mb-6 mt-4 mr-auto ml-auto ta-c">
                <h1 className="as-c d-f fs-6xl fw-600 lg:text-6xl lh-1">Quickly build amazing websites with less code in your markup.</h1>
                <p className="as-c fs-2xl t-lead lh-3 max-w-100 md:max-w-full ta-c">Bundled with components and small class names that are designed for fast development.</p>
                <section className="as-c d-f fd-c mt-2 sm:fd-r sm:w-auto w-full">
                    <Link className="ai-c bg-pink h:t-white d-if fs-md fw-700 jc-c lh-3 px-1 py-1 rad-8 sm:px-2 sm:w-auto t-white w-full" to="/docs/installation">Get started</Link>
                </section>
            </main>
        </Layout>
    );
}