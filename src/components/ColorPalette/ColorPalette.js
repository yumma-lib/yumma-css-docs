import styles from './ColorPalette.module.css';

import React from 'react';

import PropTypes from 'prop-types';


const ColorSwatch = ({ hexVal, dataTooltip }) => (
    <div
        className={styles.colorSwatchContainer}
        style={{ backgroundColor: hexVal }}
        data-tooltip={dataTooltip}
    />
);

const ColorPalette = ({ colorData }) => (
    <div className={styles.colorPalette}>
        {colorData.map((color) => (
            <div key={color.color} style={{ width: '100%' }}>
                <div className={styles.colorLineTitle}>{color.color}</div>
                <div className={styles.colorLine}>
                    {color.swatch.map((hexVal, i) => {
                        if (i < 6) {
                            const reverse = 6 - i;
                            return (
                                <ColorSwatch
                                    key={i}
                                    hexVal={hexVal}
                                    dataTooltip={`bg-l-${color.color.toLowerCase()}-${reverse}`}
                                />
                            );
                        } else if (i === 6) {
                            return (
                                <ColorSwatch
                                    key={i}
                                    hexVal={hexVal}
                                    dataTooltip={`bg-${color.color.toLowerCase()}`}
                                />
                            );
                        } else {
                            return (
                                <ColorSwatch
                                    key={i}
                                    hexVal={hexVal}
                                    dataTooltip={`bg-d-${color.color.toLowerCase()}-${i - 6}`}
                                />
                            );
                        }
                    })}
                </div>
            </div>
        ))}
    </div>
);

ColorPalette.propTypes = {
    colorData: PropTypes.arrayOf(
        PropTypes.shape({
            color: PropTypes.string.isRequired,
            swatch: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        }).isRequired
    ).isRequired,
};

export default ColorPalette;