import React from 'react';
import tinycolor from 'tinycolor2';

import styles from './ColorList.module.css';

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

function generateClassData(baseClassName, propertyNames, colorClasses) {
    return colorClasses.flatMap(colorClass => {
        const { lightShades, baseColor, darkShades } = generateShades(colorClass.value);

        const shades = [
            ...lightShades.map((shade, index) => ({
                className: `${baseClassName}l-${colorClass.color}-${index + 1}`,
                properties: propertyNames.map(propertyName => `${propertyName}: ${shade}`),
                colorValue: shade
            })),
            {
                className: `${baseClassName}${colorClass.color}`,
                properties: propertyNames.map(propertyName => `${propertyName}: ${baseColor}`),
                colorValue: baseColor
            },
            ...darkShades.map((shade, index) => ({
                className: `${baseClassName}d-${colorClass.color}-${index + 1}`,
                properties: propertyNames.map(propertyName => `${propertyName}: ${shade}`),
                colorValue: shade
            }))
        ];

        return shades;
    });
}

const ColorList = ({ baseClassName, propertyNames, colorClasses }) => {
    const classData = generateClassData(baseClassName, propertyNames, colorClasses);

    return (
        <div className={styles.classList}>
            {classData.map((classItem, index) => (
                <div key={index} className={styles.classItem}>
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

export default ColorList;
