import { Sandpack } from "@codesandbox/sandpack-react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import GridList from '@site/src/components/GridList/GridList';
import logo from '@site/static/img/yummacss.png';
import React from "react";

import styles from './index.modules.css';

const Index = () => {
    const { siteConfig } = useDocusaurusContext();

    return (
        <div>
            <div className={styles.yma__hero}>
                <div>
                    <img className={styles.yma__heroLogo} src={logo} alt="Yumma CSS Logo" />
                    <h1 className={styles.yma__heading}>{siteConfig.title}</h1>
                    <p className={styles.yma__description}>Build beautiful websites with small class names</p>
                    <Link className={styles.yma__Button} to='/docs/intro'>Read Docs</Link>
                    <Link className={styles.yma__SecondaryButton} to='/playground'>Try It Now</Link>
                </div>
            </div>

            <section className={styles.yma__section}>
                <h1 className={styles.yma__heading}>Awesome Features</h1>
                <p className={styles.yma__description}>Discover why Yumma CSS is so special</p>
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
                            description: 'Get Yumma CSS Intelephense in your Visual Studio Code and boost your development.'
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

            <section className={styles.yma__hero}>
                <h1 className={styles.yma__heading}>Interface Components</h1>
                <p className={styles.yma__description}>Use or build your own interface components using classes like <code>d-f</code>, <code>nav-white</code>, <code>t-lead</code> and much more!</p>

            </section>

            <section className={styles.yma__section}>
                <h1 className={styles.yma__heading}>Getting Started</h1>
                <p className={styles.yma__description}>Start by including Yumma CSS in your project</p>
                <pre>npm i yummacss@latest</pre>
            </section>
        </div >
    );
};

export default Index;