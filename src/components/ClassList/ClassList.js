import React from 'react';
import './ClassList.css';

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
        <div className='classList'>
            {data.map((classItem, index) => (
                <div key={index} className='classItem'>
                    <div className='className'>{classItem.className}</div>
                    <div className='classProperties'>
                        <code className={'propertyCode'}>
                            {classItem.properties.join('\n')}
                        </code>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ClassList;
