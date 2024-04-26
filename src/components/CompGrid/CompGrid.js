import Link from '@docusaurus/Link';
import PropTypes from 'prop-types';
import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './CompGrid.modules.css';

const CompGrid = ({ sectionData }) => {
    const { colorMode, setColorMode } = useColorMode();

    return (
        <div className={styles.compGrid}>
            {sectionData.map((compGridProps, i) => (
                <div className={styles.compElement} key={i}>
                    {compGridProps.href ? (
                        <Link to={compGridProps.href} className={styles.compLink}>
                            <div>
                                {colorMode === 'dark' ? <img className={styles.compImage} src={compGridProps.srcDark} alt={compGridProps.title} /> : <img className={styles.compImage} src={compGridProps.src} alt={compGridProps.title} />}
                            </div>
                            <div className={styles.compFooter}>
                                <h3 className={styles.compTitle}>{compGridProps.title}</h3>
                                {compGridProps.badge && <span className={styles.compBadge}>{compGridProps.badge}</span>}
                                <p className={styles.compDescription}>{compGridProps.description}</p>
                            </div>
                        </Link>
                    ) : (
                        <>
                            <div style={{ cursor: 'not-allowed' }}>
                                <img className={styles.compImage} src={compGridProps.src} alt={compGridProps.title} />
                            </div>
                            <div className={styles.compFooter} style={{ cursor: 'not-allowed' }}>
                                <h3 className={styles.compTitle}>{compGridProps.title}</h3>
                                {compGridProps.badge && <span className={styles.compBadge}>{compGridProps.badge}</span>}
                                <p className={styles.compDescription}>{compGridProps.description}</p>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

CompGrid.propTypes = {
    sectionData: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            badge: PropTypes.string,
            description: PropTypes.string.isRequired,
            href: PropTypes.string
        })
    ).isRequired,
};

export default CompGrid;