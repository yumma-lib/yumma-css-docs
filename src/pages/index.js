import React from "react";
import styles from './index.module.css';
import Link from "@docusaurus/Link";
import CardSection from '@site/src/components/CardSection/CardSection';

const Index = () => {
    return (
        <div>
            <div className={styles.heroSection}>
                <h1 className={styles.heroTitle}>Yumma CSS</h1>
                <p className={styles.heroDesc}>Lightweight and streamlined CSS library</p>
                <div><Link to='/docs/intro' className={styles.btnPrimary}>Get Started</Link></div>
            </div>

            <section className={styles.featureSection}>
                <h1 className={styles.featureTitle}>Key Features</h1>
                <CardSection
                    cardData={[
                        {
                            cardIcon: `${require('@site/static/img/IndexPage/components.png').default}`,
                            cardTitle: 'Components',
                            cardDesc: 'Explore our components to add buttons, navbars, cards, and other elements to your interface.',
                        },
                        {
                            cardIcon: `${require('@site/static/img/IndexPage/responsiveness.png').default}`,
                            cardTitle: 'Responsiveness',
                            cardDesc: 'Customize your design elements with the help of a responsive design system.',
                        },
                        {
                            cardIcon: `${require('@site/static/img/IndexPage/productivity.png').default}`,
                            cardTitle: 'Productivity',
                            cardDesc: 'Get Yumma CSS snippets in your VS code and boost your development with Yumma CSS Helper.',
                        },
                        {
                            cardIcon: `${require('@site/static/img/IndexPage/themes.png').default}`,
                            cardTitle: 'Themes',
                            cardDesc: 'Use the color palette for amazing applications and create your own themes.',
                        },
                        {
                            cardIcon: `${require('@site/static/img/IndexPage/utilities.png').default}`,
                            cardTitle: 'Utilities',
                            cardDesc: 'Advanced tiny utility classes that you can use on your applications.',
                        },
                        {
                            cardIcon: `${require('@site/static/img/IndexPage/playground.png').default}`,
                            cardTitle: 'Playground',
                            cardDesc: 'Our official real-time code editor with Yumma CSS integrated into it.',
                        },
                    ]}
                />
            </section>

            <div className={styles.heroSection}>
                <h1 className={styles.heroTitle}>Quick Start</h1>
                <h1 className={styles.heroDesc}>Start by including Yumma CSS in your project</h1>
                <pre>npm install yummacss@latest</pre>
            </div>
        </div>
    );
};

export default Index;
