import React from "react";
import './index.css';
import Link from "@docusaurus/Link";
import CardGrid from '@site/src/components/CardGrid/CardGrid';

const Index = () => {
    return (
        <div>
            <div className='yummaHero'>
                <h1 className='yummaTitle'>Yumma CSS</h1>
                <p className='yummaDescription'>Lightweight and streamlined CSS library</p>
                <Link to='docs/intro' class="button button--lg button--primary">Get Started</Link>
            </div>

            <section className='yummaFeatures'>
                <h1>Key Features</h1>
                <CardGrid
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

            <div className='yummaHero'>
                <h1 className='yummaTitle'>Quick Start</h1>
                <p className='yummaDescription'>Start by including Yumma CSS in your project</p>
                <pre>npm install yummacss@latest</pre>
            </div>
        </div>
    );
};

export default Index;
