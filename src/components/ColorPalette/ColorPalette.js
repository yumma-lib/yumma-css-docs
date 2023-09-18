import React from 'react';
import PropTypes from 'prop-types';
import styles from './ColorPalette.module.css';

const ColorSwatch = ({ hexValue, dataTooltip }) => (
    <div
        className={styles.colorSwatchContainer}
        style={{ backgroundColor: hexValue }}
        data-tooltip={dataTooltip}
    />
);

const ColorPalette = ({ colorData }) => (
    <div className={styles.colorPalette}>
        {colorData.map((color) => (
            <div key={color.color} style={{ width: '100%' }}>
                <div className={styles.colorLineTitle}>{color.color}</div>
                <div className={styles.colorLine}>
                    {color.swatch.map((hexValue, index) => {
                        if (index < 6) {
                            return (
                                <ColorSwatch
                                    key={index}
                                    hexValue={hexValue}
                                    dataTooltip={`bg-l-${color.color.toLowerCase()}-${index + 1}`}
                                />
                            );
                        } else if (index === 6) {
                            return (
                                <ColorSwatch
                                    key={index}
                                    hexValue={hexValue}
                                    dataTooltip={`bg-${color.color.toLowerCase()}`}
                                />
                            );
                        } else {
                            return (
                                <ColorSwatch
                                    key={index}
                                    hexValue={hexValue}
                                    dataTooltip={`bg-d-${color.color.toLowerCase()}-${index - 6}`}
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