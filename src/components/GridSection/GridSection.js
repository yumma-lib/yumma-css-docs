import React from 'react';
import styles from './GridSection.module.css';
import buttonImage from '@site/static/img/OverviewPage/button.png';
import screenImage from '@site/static/img/OverviewPage/screen.png';
import codeImage from '@site/static/img/OverviewPage/code.png';

const GridSection = () => {
    return (
        <div className={styles.gridContainer}>
            <div className={styles.gridBox}>
                <img src={buttonImage} alt="Image 1" />
                <h2>Components</h2>
                <p>Elevate your UI with <a href='ui-components/buttons'>buttons</a>, <a href='ui-components/navbars'>navbars</a>, <a href='ui-components/cards'>cards</a>, and more. Effortless customization.</p>
            </div>
            <div className={styles.gridBox}>
                <img src={screenImage} alt="Image 2" />
                <h2>Responsive</h2>
                <p>Seamlessly adapt designs using Yumma CSS's responsive system. Your creations, any screen.</p>
            </div>
            <div className={styles.gridBox}>
                <img src={codeImage} alt="Image 3" />
                <h2>Helper</h2>
                <p>Get Yumma CSS snippets in your VS code and boost your development with <a href='https://marketplace.visualstudio.com/items?itemName=yumma-css-helper.yumma-css-helper'>Yumma CSS Helper</a>.</p>
            </div>
        </div>
    );
};

export default GridSection;
