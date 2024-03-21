import styles from './ClassList.module.css';

import React from 'react';

function generateClassData(baseClassName, propertyNames, range, increment, unit, additionalClasses) {
    const classData = [];

    for (let i = 0; i <= range; i++) {
        const properties = propertyNames.map(propertyName => `${propertyName}: ${i * increment}${unit};`);
        classData.push({
            className: `${baseClassName}${i}`,
            properties: properties
        });
    }

    if (additionalClasses) {
        additionalClasses.forEach((additionalClass) => {
            const properties = propertyNames.map(propertyName => `${propertyName}: ${additionalClass.value};`);
            classData.push({
                className: `${baseClassName}${additionalClass.name}`,
                properties: properties
            });
        });
    }

    return classData;
}

const ClassList = ({ classData, baseClassName, propertyNames, range, increment, unit, additionalClasses }) => {
    const data = classData || generateClassData(baseClassName, propertyNames, range, increment, unit, additionalClasses);

    return (
        <div className={styles.classList}>
            {data.map((classItem, index) => (
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

export default ClassList;
