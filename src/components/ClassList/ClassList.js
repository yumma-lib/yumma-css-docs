import React from 'react';
import styles from './ClassList.module.css';

function generateClassData(baseClassName, propertyName, range, increment, unit, additionalClasses) {
    const classData = [];

    for (let i = 0; i <= range; i++) {
        classData.push({
            className: `${baseClassName}${i}`,
            properties: [
                `${propertyName}: ${i * increment}${unit};`
            ]
        });
    }

    if (additionalClasses) {
        additionalClasses.forEach((additionalClass) => {
            classData.push({
                className: `${baseClassName}${additionalClass.name}`,
                properties: [
                    `${propertyName}: ${additionalClass.value};`
                ]
            });
        });
    }

    return classData;
}

const ClassList = ({ classData, baseClassName, propertyName, range, increment, unit, additionalClasses }) => {
    const data = classData || generateClassData(baseClassName, propertyName, range, increment, unit, additionalClasses);

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
