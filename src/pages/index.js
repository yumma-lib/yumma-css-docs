import React from "react";
import styles from './index.modules.css';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import GridList from '@site/src/components/GridList/GridList';

const Index = () => {
    const { siteConfig } = useDocusaurusContext();

    return (
        <div>
            <div className={styles.yummaHero}>
                <h1 className={styles.yummaTitle}>{siteConfig.title}</h1>
                <p className={styles.yummaDescription}>Lightweight and streamlined CSS library</p>
                <Link className={styles.yummaButton} to='docs/intro'>Get Started</Link>
            </div>

            <section className={styles.yummaFeatures}>
                <h1>Awesome Features</h1>
                <GridList
                    cardData={[
                        {
                            icon: `${require('@site/static/img/IndexPage/components.png').default}`,
                            title: 'Components',
                            description: 'Explore our components to add buttons, navbars, cards, and other elements to your interface.',
                        },
                        {
                            icon: `${require('@site/static/img/IndexPage/responsiveness.png').default}`,
                            title: 'Responsiveness',
                            description: 'Customize your design elements with the help of a responsive design system.',
                        },
                        {
                            icon: `${require('@site/static/img/IndexPage/productivity.png').default}`,
                            title: 'Productivity',
                            description: 'Get Yumma CSS snippets in your VS code and boost your development with Yumma CSS Helper.',
                        },
                        {
                            icon: `${require('@site/static/img/IndexPage/themes.png').default}`,
                            title: 'Themes',
                            description: 'Use the color palette for amazing applications and create your own themes.',
                        },
                        {
                            icon: `${require('@site/static/img/IndexPage/utilities.png').default}`,
                            title: 'Utilities',
                            description: 'Advanced tiny utility classes that you can use on your applications.',
                        },
                        {
                            icon: `${require('@site/static/img/IndexPage/playground.png').default}`,
                            title: 'Playground',
                            description: 'Our official real-time code editor with Yumma CSS integrated into it.',
                        },
                    ]}
                />
            </section>

            <div className={styles.yummaHero}>
                <h1 className={styles.yummaTitle}>Quick Start</h1>
                <p className={styles.yummaDescription}>Start by including Yumma CSS in your project</p>
                <pre>npm install yummacss@latest</pre>
            </div>
        </div>
    );
};

export default Index;
