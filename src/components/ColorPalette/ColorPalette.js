import PropTypes from 'prop-types';
import React from 'react';
import tinycolor from 'tinycolor2';
import styles from './ColorPalette.module.css';

const ColorSwatch = ({ value, tooltip }) => (
    <div className={styles.colorSwatchContainer} style={{ backgroundColor: value }} data-tooltip={tooltip} />
);

const mixColors = (color1, color2, weight) => {
    return tinycolor.mix(color1, color2, weight).toHexString();
};

const generateShades = (color) => {
    const shades = [];
    for (let i = 6; i >= 1; i--) {
        shades.push(mixColors(color, 'white', i * 10));
    }

    shades.push(color);
    for (let i = 1; i <= 6; i++) {
        shades.push(mixColors(color, 'black', i * 10));
    }

    return shades;
};

const ColorPalette = ({ colorData }) => (
    <div className={styles.colorPalette}>
        {colorData.map((colorItem) => {
            const shades = generateShades(colorItem.color);
            return (
                <div key={colorItem.color} style={{ width: '100%' }}>
                    <div className={styles.colorLineTitle}>{colorItem.name}</div>
                    <div className={styles.colorLine}>
                        {shades.map((value, i) => {
                            if (i < 6) {
                                return (
                                    <ColorSwatch key={i} value={value} tooltip={`${value}`} />
                                );
                            } else if (i === 6) {
                                return (
                                    <ColorSwatch key={i} value={value} tooltip={`${value}`} />
                                );
                            } else {
                                return (
                                    <ColorSwatch key={i} value={value} tooltip={`${value}`} />
                                );
                            }
                        })}
                    </div>
                </div>
            );
        })}
    </div>
);

ColorPalette.propTypes = {
    colorData: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
};

export default ColorPalette;