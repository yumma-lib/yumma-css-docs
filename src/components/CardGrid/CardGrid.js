import styles from './CardGrid.modules.css';

import React from 'react';

import PropTypes from 'prop-types';

const CardGrid = ({ cardData }) => {
    return (
        <div className={styles.cardGrid}>
            {cardData.map((cardGridProps, i) => (
                <div className={styles.cardElement} key={i}>
                    <img className={styles.cardIcon} src={cardGridProps.icon} />
                    <h2>{cardGridProps.title}</h2>
                    <p>{cardGridProps.description}</p>
                </div>
            ))}
        </div>
    );
};

CardGrid.propTypes = {
    cardData: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CardGrid;