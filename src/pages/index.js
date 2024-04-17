import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CardGrid from '@site/src/components/CardGrid/CardGrid';
import logo from '@site/static/img/yummacss.png';
import Layout from "@theme/Layout";
import React from "react";

import styles from './index.modules.css';

export default function Index() {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout>
            <div>
                <div className={styles.yma__header}>
                    <div>
                        <img src={logo} alt={`${siteConfig.title} Logo`} style={{ borderRadius: '1.5rem' }} />
                        <h1 className={styles.yma__heading}>{siteConfig.title}</h1>
                        <p className={styles.yma__description}>Build beautiful websites with small class names</p>
                        <Link className={styles.yma__primary__button} to='/docs/intro'>Read Docs</Link>
                        <Link className={styles.yma__secondary__button} to='/playground'>Try It Now</Link>
                    </div>
                </div>

                <section className={styles.yma__section}>
                    <h1 className={styles.yma__heading}>Awesome Features</h1>
                    <p className={styles.yma__description}>Discover why Yumma CSS is so special</p>

                    <CardGrid
                        cardData={[
                            {
                                icon: `${require('@site/static/img/homepage/components.png').default}`,
                                title: 'Components',
                                description: 'Explore our components to add buttons, navbars, cards, and other elements to your interface.',
                                url: '/components'
                            },
                            {
                                icon: `${require('@site/static/img/homepage/responsiveness.png').default}`,
                                title: 'Responsiveness',
                                description: 'Customize your design elements with the help of a responsive design system.',
                                url: '/docs/fundamentals/layout/breakpoints'
                            },
                            {
                                icon: `${require('@site/static/img/homepage/screencasts.png').default}`,
                                title: 'Screencasts',
                                description: 'Take a look at our screencasts to learn more about how to implement Yumma CSS in your applications.',
                                url: 'https://www.youtube.com/@yummacss'
                            },
                            {
                                icon: `${require('@site/static/img/homepage/themes.png').default}`,
                                title: 'Themes',
                                description: 'Use the color palette for amazing applications and create your own themes.',
                                url: '/docs/fundamentals/appearance/color-palette'
                            },
                            {
                                icon: `${require('@site/static/img/homepage/utilities.png').default}`,
                                title: 'Utilities',
                                description: 'Advanced tiny utility classes that you can use on your applications.',
                                url: '/docs/positioning/display'
                            },
                            {
                                icon: `${require('@site/static/img/homepage/playground.png').default}`,
                                title: 'Playground',
                                description: 'Our official real-time code editor with Yumma CSS integrated into it.',
                                url: '/playground'
                            },
                        ]}
                    />
                </section>
            </div>
        </Layout>
    );
}