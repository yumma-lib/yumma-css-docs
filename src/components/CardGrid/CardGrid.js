import React from 'react';
import PropTypes from 'prop-types';
import './CardGrid.css';

const CardGrid = ({ cardData }) => {
    return (
        <div className='card-grid'>
            {cardData.map((card, index) => (
                <div className='card' key={index}>
                    <img src={card.cardIcon} />
                    <h2>{card.cardTitle}</h2>
                    <p>{card.cardDesc}</p>
                </div>
            ))}
        </div>
    );
};

CardGrid.propTypes = {
    cardData: PropTypes.arrayOf(
        PropTypes.shape({
            cardIcon: PropTypes.string.isRequired,
            cardTitle: PropTypes.string.isRequired,
            cardDesc: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CardGrid;
