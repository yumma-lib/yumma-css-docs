import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from './index.modules.css';
import logo from '@site/static/img/yumma-css.png';
import GridList from '@site/src/components/GridList/GridList';
import ClassPreview from '@site/src/components/ClassPreview/ClassPreview';


const Index = () => {
    const { siteConfig } = useDocusaurusContext();

    return (
        <div>

            <div className={styles.yummaHero}>
                <div className={styles.cnn}>
                    <img className={styles.yummaHeroLogo} src={logo} alt="Yumma CSS Logo" />
                    <h1 className={styles.yummaTitle}>{siteConfig.title}</h1>
                    <p className={styles.yummaDescription}>The lightweight and streamlined library</p>
                    <Link className={styles.yummaButton} to='docs/intro'>Get Started</Link>
                </div>
            </div>

            <section className={styles.yummaFeatures}>
                <h1 className={styles.yummaTitle}>Awesome Features</h1>
                <p className={styles.yummaDescription}>Discover why Yumma CSS is so special</p>
                <GridList
                    cardData={[
                        {
                            icon: `${require('@site/static/img/Homepage/components.png').default}`,
                            title: 'Components',
                            description: 'Explore our components to add buttons, navbars, cards, and other elements to your interface.'
                        },
                        {
                            icon: `${require('@site/static/img/Homepage/responsiveness.png').default}`,
                            title: 'Responsiveness',
                            description: 'Customize your design elements with the help of a responsive design system.'
                        },
                        {
                            icon: `${require('@site/static/img/Homepage/productivity.png').default}`,
                            title: 'Productivity',
                            description: 'Get Yumma CSS snippets in your VS code and boost your development with Yumma CSS Helper.'
                        },
                        {
                            icon: `${require('@site/static/img/Homepage/themes.png').default}`,
                            title: 'Themes',
                            description: 'Use the color palette for amazing applications and create your own themes.'
                        },
                        {
                            icon: `${require('@site/static/img/Homepage/utilities.png').default}`,
                            title: 'Utilities',
                            description: 'Advanced tiny utility classes that you can use on your applications.'
                        },
                        {
                            icon: `${require('@site/static/img/Homepage/playground.png').default}`,
                            title: 'Playground',
                            description: 'Our official real-time code editor with Yumma CSS integrated into it.'
                        },
                    ]}
                />
            </section>

            <section className={styles.yummaHero}>
                <h1 className={styles.yummaTitle}>Interface Components</h1>
                <p className={styles.yummaDescription}>Use or build your own interface components using classes like <code>d-f</code>, <code>nav-white</code>, <code>t-lead</code> and much more!</p>
            </section>

            <section className={styles.yummaFeatures}>
                <h1 className={styles.yummaTitle}>Quick Start</h1>
                <p className={styles.yummaDescription}>Start by including Yumma CSS in your project</p>
                <pre>npm install yummacss@latest</pre>
            </section>

        </div>
    );
};

export default Index;
