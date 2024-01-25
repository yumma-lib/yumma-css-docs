import React from 'react';
import PropTypes from 'prop-types';
import './CardGrid.css';

const CardGrid = ({ cardData }) => {
    return (
        <div className='card-grid'>
            {cardData.map((card, i) => (
                <div className='card' key={i}>
                    <img className='card-icon' src={card.icon} />
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>
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
