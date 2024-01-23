import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardSection.module.css';

const CardSection = ({ cardData }) => {
    return (
        <div className={styles.cnn}>
            {cardData.map((card, index) => (
                <div className={styles.card} key={index}>
                    <img src={card.cardIcon} />
                    <h2>{card.cardTitle}</h2>
                    <p>{card.cardDesc}</p>
                </div>
            ))}
        </div>
    );
};

CardSection.propTypes = {
    cardData: PropTypes.arrayOf(
        PropTypes.shape({
            cardIcon: PropTypes.string.isRequired,
            cardTitle: PropTypes.string.isRequired,
            cardDesc: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CardSection;
