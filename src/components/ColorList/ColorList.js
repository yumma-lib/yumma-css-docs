import React from 'react';
import styles from './ColorList.module.css';

function generateClassData(baseClassName, propertyNames, colorClasses) {
    return colorClasses.map(colorClass => {
        const properties = propertyNames.map(propertyName =>
            propertyName.includes(':') ? propertyName : `${propertyName}: ${colorClass.value}`
        );
        return {
            className: `${baseClassName}${colorClass.color}`,
            properties: properties,
            colorValue: colorClass.value
        };
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

export default ColorList