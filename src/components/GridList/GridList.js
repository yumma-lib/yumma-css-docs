import React from 'react';
import PropTypes from 'prop-types';
import styles from './GridList.modules.css';

const GridList = ({ cardData }) => {
    return (
        <div className={styles.gridListGrid}>
            {cardData.map((gridListProps, i) => (
                <div className={styles.gridList} key={i}>
                    <img className={styles.gridListIcon} src={gridListProps.icon} />
                    <h2>{gridListProps.title}</h2>
                    <p>{gridListProps.description}</p>
                </div>
            ))}
        </div>
    );
};

GridList.propTypes = {
    cardData: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default GridList;