import React from 'react';
import tinycolor from 'tinycolor2';

import styles from './color.module.css';

// Utility function to generate shades
const mixColors = (color1, color2, weight) => {
    return tinycolor.mix(color1, color2, weight).toHexString();
};

const generateShades = (color) => {
    const lightShades = [];
    const darkShades = [];

    for (let i = 6; i >= 1; i--) {
        lightShades.push(mixColors(color, 'white', i * 10));
    }

    const baseColor = color;

    for (let i = 1; i <= 6; i++) {
        darkShades.push(mixColors(color, 'black', i * 10));
    }

    return { lightShades, baseColor, darkShades };
};

function generateClassData(classPrefix, classValue, colorClasses) {
    return colorClasses.flatMap(colorClass => {
        const { lightShades, baseColor, darkShades } = generateShades(colorClass.value);

        const shades = [
            ...lightShades.map((shade, i) => ({
                className: `${classPrefix}l-${colorClass.color}-${i + 1}`,
                properties: classValue.map(propertyName => `${propertyName}: ${shade}`),
                colorValue: shade
            })),
            {
                className: `${classPrefix}${colorClass.color}`,
                properties: classValue.map(propertyName => `${propertyName}: ${baseColor}`),
                colorValue: baseColor
            },
            ...darkShades.map((shade, i) => ({
                className: `${classPrefix}d-${colorClass.color}-${i + 1}`,
                properties: classValue.map(propertyName => `${propertyName}: ${shade}`),
                colorValue: shade
            }))
        ];

        return shades;
    });
}

const Color = ({ classPrefix, classValue, colorClasses }) => {
    const data = generateClassData(classPrefix, classValue, colorClasses);

    return (
        <div className={styles.classList}>
            {data.map((classItem, i) => (
                <div key={i} className={styles.classItem}>
                    <div className={styles.classProperties}>
                        <div className={styles.className}>{classItem.className}</div>
                        <code className={styles.propertyCode}>
                            {classItem.properties.join('\n')}
                        </code>
                    </div>
                    <div className={styles.colorPreview} style={{ backgroundColor: classItem.colorValue }}></div>
                </div>
            ))}
        </div>
    );
};

export default Color;
