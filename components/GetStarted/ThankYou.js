import React, { useState } from 'react';

import styles from '../../styles/pages/_Getstarted.module.scss';

const ThankYou = () => {
  return (
    <>
      <div className='thank_you'> 
        <h1>Thank You</h1>
        <p>
          Our team will review your inquiry and one
          of our light specialists will contact you
          with next steps.
        </p>
        <button type="button">BACK TO HOME</button>
      </div>
    </>
  );
};

export default ThankYou;
