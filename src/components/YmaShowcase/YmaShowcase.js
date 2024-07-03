import styles from './YmaShowcase.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import Link from '@docusaurus/Link';

const YmaShowcase = ({ cardData }) => {
    return (
        <div className={styles.cardGrid}>
            {cardData.map((cardGridProps, i) => (
                <div className={styles.cardElement} key={i}>
                    {cardGridProps.href ? (
                        <Link to={cardGridProps.href} className={styles.cardLink}>
                            <img className={styles.cardIcon} src={cardGridProps.icon} alt={cardGridProps.title} />
                            <h2 className={styles.cardTitle}>{cardGridProps.title}</h2>
                            <p className={styles.cardDescription}>{cardGridProps.description}</p>
                        </Link>
                    ) : (
                        <>
                            <img className={styles.cardIcon} src={cardGridProps.icon} />
                            <h2>{cardGridProps.title}</h2>
                            <p>{cardGridProps.description}</p>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

YmaShowcase.propTypes = {
    cardData: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            href: PropTypes.string
        })
    ).isRequired,
};

export default YmaShowcase;
