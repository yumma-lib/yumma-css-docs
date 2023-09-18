import React from 'react';
import styles from './GridSection.module.css';
import buttonImage from '@site/static/img/IntroductionPage/button.png';
import screenImage from '@site/static/img/IntroductionPage/screen.png';
import codeImage from '@site/static/img/IntroductionPage/code.png';

const GridSection = () => {
    return (
        <div className={styles.gridContainer}>
            <div className={styles.gridBox}>
                <img src={buttonImage} alt="Button" />
                <h2>Components</h2>
                <p>Explore our components to add <a href='components/buttons'>buttons</a>, <a href='components/navbars'>navbars</a>, <a href='components/cards'>cards</a>, and other elements to your interface.</p>
            </div>
            <div className={styles.gridBox}>
                <img src={screenImage} alt="Screen" />
                <h2>Responsiveness</h2>
                <p>Customize your design elements with the help of a responsive design system.</p>
            </div>
            <div className={styles.gridBox}>
                <img src={codeImage} alt="Code" />
                <h2>Productivity</h2>
                <p>Get Yumma CSS snippets in your VS code and boost your development with <a href='https://marketplace.visualstudio.com/items?itemName=yumma-css-helper.yumma-css-helper'>Yumma CSS Helper</a>.</p>
            </div>
        </div>
    );
};

export default GridSection;
