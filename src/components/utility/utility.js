import styles from './utility.module.css';
import React from 'react';

function generateClassData(classPrefix, classValues, range, increment, unit, additionalClasses) {
    const data = [];

    for (let i = 0; i <= range; i++) {
        const properties = classValues.map(propertyName => `${propertyName}: ${i * increment}${unit};`);
        data.push({
            className: `${classPrefix}${i}`,
            properties: properties
        });
    }

    if (additionalClasses) {
        additionalClasses.forEach((additionalClass) => {
            const properties = classValues.map(propertyName => `${propertyName}: ${additionalClass.value};`);
            data.push({
                className: `${classPrefix}${additionalClass.name}`,
                properties: properties
            });
        });
    }

    return data;
}

const Utility = ({ additionalClasses, classPrefix, data, increment, classValues, range, unit }) => {
    const codeData = data || generateClassData(classPrefix, classValues, range, increment, unit, additionalClasses);

    return (
        <div className={styles.classList}>
            {codeData.map((classItem, index) => (
                <div key={index} className={styles.classItem}>
                    <div className={styles.className}>{classItem.className}</div>
                    <div className={styles.classProperties}>
                        <code className={styles.propertyCode}>
                            {classItem.properties.join('\n')}
                        </code>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Utility;
