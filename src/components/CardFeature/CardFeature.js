import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardFeature.modules.css';

const CardFeature = ({ cardData }) => {
    return (
        <div className={styles.cardFeatureGrid}>
            {cardData.map((cardProps, i) => (
                <div className={styles.cardFeature} key={i}>
                    <img className={styles.cardFeatureIcon} src={cardProps.icon} />
                    <h2>{cardProps.title}</h2>
                    <p>{cardProps.description}</p>
                </div>
            ))}
        </div>
    );
};

CardFeature.propTypes = {
    cardData: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CardFeature;