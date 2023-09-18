import React from 'react';
import styles from './ClassList.module.css';

const ClassList = ({ classData }) => {
    return (
        <div className={styles.classList}>
            {classData.map((classItem, index) => (
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
