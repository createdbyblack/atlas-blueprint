import React from 'react';
import styles from 'styles/pages/_Getstarted.module.scss';

const StepsIndicator = ({ step }) => {
  const forms = [1, 2, 3, 4];

  return (
    <>
      {forms.map((obj) => {
        return (
          <div
            key={obj}
            className={`${styles['circle']} ${
              obj == step && styles['current']
            }`}
          ></div>
        );
      })}
    </>
  );
};

export default StepsIndicator;
